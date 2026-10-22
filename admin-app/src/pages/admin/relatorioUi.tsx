import React, { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ChevronDown, Copy, Eye, File as FileIcon, FileSpreadsheet, FileText, Maximize2, Minimize2, Printer, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { Modal, fmt, useAdminToast } from './adminUi';
import { EmptyState } from './PageHeader';

/**
 * Peças compartilhadas das telas de Relatórios do admin, no padrão de Relatórios › Recompensas (.adm-rc-*):
 * breadcrumb + tela cheia, barra de ferramentas (selects em pílula, filtros, exportações), card de filtros,
 * cabeçalho ordenável, estado vazio, rodapé com paginação e modal "Relatórios exportados".
 * O markup é o mesmo da tela de Recompensas; não mude classes/atributos sem conferir as 4 telas.
 */

// ── Constantes e utilitários ─────────────────────────────────────────
export const PAGE_SIZES = [10, 25, 50, 100];
/** Formato de saída do formulário de filtros: aplicar na tela ou baixar CSV. */
export type OutputFormat = 'tela' | 'csv';
/** Valor de célula exportado (copiar/CSV/XLS). Número sai como número no XLS. */
export type Cell = string | number;

/** dd/mm/aaaa, opcionalmente seguida de vírgula e hora hh:mm ou hh:mm:ss (formatos gravados pelo módulo da loja). */
export const DATE_RE = /^(\d{2})\/(\d{2})\/(\d{4})(?:,?\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/;
/** Data no formato do módulo → timestamp (0 se inválido). */
export function parseDate(d?: string): number {
  const m = DATE_RE.exec(d ?? '');
  if (!m) return 0;
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), Number(m[4] ?? 0), Number(m[5] ?? 0), Number(m[6] ?? 0)).getTime();
}
/** Coluna "Data - Hora": dd/mm/aaaa hh:mm:ss; sem hora na origem → só a data. */
export function formatDateTime(d?: string): string {
  const m = DATE_RE.exec((d ?? '').trim());
  if (!m) return d ?? '';
  const date = `${m[1]}/${m[2]}/${m[3]}`;
  return m[4] ? `${date} ${m[4]}:${m[5]}:${m[6] ?? '00'}` : date;
}
/** Campo de período "dd/mm/aaaa" → timestamp do início do dia; null se vazio, fora do formato ou data inexistente (ex.: 31/02). */
export function parseDay(v?: string): number | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((v ?? '').trim());
  if (!m) return null;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return d.getDate() === Number(m[1]) && d.getMonth() === Number(m[2]) - 1 ? d.getTime() : null;
}
const pad2 = (n: number) => String(n).padStart(2, '0');
/** Date → "dd/mm/aaaa hh:mm:ss" (mesmo formato da coluna "Data - Hora"). */
export const stampDateTime = (d: Date) =>
  `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

export const norm = (v: unknown) => String(v ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
export const byText = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '', 'pt-BR', { sensitivity: 'base' });

/** Botões de página: todas até 7; acima disso 1 … (atual ±1) … última. */
export function pageItems(cur: number, pages: number): (number | 'gap')[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const shown = [...new Set([1, cur - 1, cur, cur + 1, pages])].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  shown.forEach((p, i) => {
    if (i > 0 && p - shown[i - 1] > 1) out.push('gap');
    out.push(p);
  });
  return out;
}

export function downloadCsv(csv: string, filename: string, type = 'text/csv;charset=utf-8') {
  const blob = new Blob([csv], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── Copiar / CSV / XLS ───────────────────────────────────────────────
/** Anti-injeção de fórmula (OWASP): texto iniciado por = + - @ tab ou CR ganha "'" na frente; números e textos só numéricos ("-50") não mudam. */
const noFormula = (c: Cell): string =>
  typeof c === 'string' && /^[=+\-@\t\r]/.test(c) && !/^[-+]?\d[\d.,]*$/.test(c) ? `'${c}` : String(c);

/** Tabela em texto separado por tabulação (colar no Excel/Sheets). */
export const toTsv = (headers: string[], rows: Cell[][]) =>
  [headers, ...rows]
    .map((r) => r.map((c) => noFormula(c).replace(/[\t\r\n]+/g, ' ')).join('\t'))
    .join('\n');

const csvField = (c: Cell) => {
  const s = noFormula(c);
  return /[;"\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
/** CSV com separador ';' e BOM UTF-8 (abre com acentos no Excel pt-BR) — mesmo formato previsto no módulo da loja. */
export const toCsv = (headers: string[], rows: Cell[][]) =>
  `\uFEFF${[headers, ...rows].map((r) => r.map(csvField).join(';')).join('\r\n')}`;

const escHtml = (v: unknown) =>
  String(v ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch] as string));
/** Tabela HTML que o Excel abre como planilha (.xls), sem dependência nova. Texto forçado como texto (datas/e-mails intactos). */
export const toXlsHtml = (headers: string[], rows: Cell[][]) => {
  const head = headers.map((h) => `<th>${escHtml(h)}</th>`).join('');
  const body = rows
    .map((r) => `<tr>${r.map((c) => (typeof c === 'number' ? `<td>${c}</td>` : `<td style="mso-number-format:'\\@'">${escHtml(c)}</td>`)).join('')}</tr>`)
    .join('');
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body><table border="1"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></body></html>`;
};

/** Copia texto para a área de transferência (Clipboard API com fallback para execCommand). */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* cai no fallback abaixo */
  }
  const prev = document.activeElement as HTMLElement | null;
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  (document.fullscreenElement ?? document.body).appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  prev?.focus();
  return ok;
}

// ── Tela cheia + impressão ───────────────────────────────────────────
/**
 * Tela cheia da área de conteúdo do admin (que também contém o toast) e modo de impressão:
 * na impressão/PDF a tabela mostra todas as linhas filtradas, não só a página atual (printAll).
 */
export function useReportChrome() {
  const toast = useAdminToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [printAll, setPrintAll] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  /** Elemento posto em tela cheia (área de conteúdo do admin, que também contém o toast). */
  const fsElRef = useRef<HTMLElement | null>(null);
  const canFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled === true;

  useEffect(() => {
    const syncFs = () => setIsFullscreen(!!fsElRef.current && document.fullscreenElement === fsElRef.current);
    // flushSync: o navegador tira o "retrato" da impressão logo após o beforeprint.
    const beforePrint = () => flushSync(() => setPrintAll(true));
    const afterPrint = () => setPrintAll(false);
    document.addEventListener('fullscreenchange', syncFs);
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    return () => {
      document.removeEventListener('fullscreenchange', syncFs);
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
      // Saiu da tela (ex.: troca de hash) ainda em tela cheia: devolve o layout normal.
      if (fsElRef.current && document.fullscreenElement === fsElRef.current) document.exitFullscreen?.().catch(() => {});
    };
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    const target = pageRef.current?.parentElement ?? pageRef.current;
    if (!target?.requestFullscreen) return;
    fsElRef.current = target;
    target.requestFullscreen().catch(() => toast.push('Não foi possível abrir em tela cheia.', 'error'));
  };

  return { pageRef, canFullscreen, isFullscreen, toggleFullscreen, printAll };
}

// ── Breadcrumb + tela cheia ──────────────────────────────────────────
export const ReportCrumbBar: React.FC<{ title: string; canFullscreen: boolean; isFullscreen: boolean; onToggleFullscreen: () => void }> = ({
  title,
  canFullscreen,
  isFullscreen,
  onToggleFullscreen,
}) => (
  <div className="adm-rc-crumbbar">
    <nav className="adm-rc-breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>Relatórios</li>
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
    {canFullscreen && (
      <button
        type="button"
        className="adm-rc-fs-btn"
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? 'Sair da tela cheia' : 'Expandir'}
        title={isFullscreen ? 'Sair da tela cheia' : 'Expandir'}
      >
        {isFullscreen ? <Minimize2 size={20} strokeWidth={1.75} aria-hidden="true" /> : <Maximize2 size={20} strokeWidth={1.75} aria-hidden="true" />}
      </button>
    )}
  </div>
);

// ── Barra de ferramentas ─────────────────────────────────────────────
export interface ReportToolbarProps {
  /** id do card de filtros (aria-controls). */
  filtersId: string;
  pageSize: number;
  onPageSizeChange: (n: number) => void;
  format: OutputFormat;
  onFormatChange: (f: OutputFormat) => void;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  onOpenExports: () => void;
  /** Sem linhas filtradas: desabilita copiar/exportar/imprimir. */
  noRows: boolean;
  onCopy: () => void;
  onCsv: () => void;
  onXls: () => void;
  onPrint: () => void;
  /** Recarrega os dados do servidor (botão "Atualizar" no fim da linha de ícones). */
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const ReportToolbar: React.FC<ReportToolbarProps> = ({
  filtersId,
  pageSize,
  onPageSizeChange,
  format,
  onFormatChange,
  filtersOpen,
  onToggleFilters,
  onOpenExports,
  noRows,
  onCopy,
  onCsv,
  onXls,
  onPrint,
  onRefresh,
  refreshing = false,
}) => {
  const toolActions = [
    { key: 'filtros', Icon: SlidersHorizontal, label: 'Mostrar/esconder filtros', onClick: onToggleFilters, disabled: false, controlsFilters: true },
    { key: 'copiar', Icon: Copy, label: 'Copiar linhas filtradas', onClick: onCopy, disabled: noRows },
    { key: 'csv', Icon: FileSpreadsheet, label: 'Exportar CSV', onClick: onCsv, disabled: noRows },
    { key: 'pdf', Icon: FileText, label: 'Exportar PDF (escolha “Salvar como PDF” na impressão)', onClick: onPrint, disabled: noRows },
    { key: 'xls', Icon: FileIcon, label: 'Exportar XLS', onClick: onXls, disabled: noRows },
    { key: 'imprimir', Icon: Printer, label: 'Imprimir', onClick: onPrint, disabled: noRows },
    ...(onRefresh ? [{ key: 'atualizar', Icon: RefreshCw, label: refreshing ? 'Atualizando…' : 'Atualizar dados', onClick: onRefresh, disabled: refreshing }] : []),
  ];

  return (
    <div className="adm-rc-toolbar">
      <div className="adm-rc-toolbar-row">
        <label className="adm-rc-pill-select">
          <span className="adm-sr-only">Itens por página</span>
          <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="adm-rc-pill-select-arrow" aria-hidden="true"><ChevronDown size={22} strokeWidth={1.5} /></span>
        </label>

        <label className="adm-rc-pill-select">
          <span className="adm-sr-only">Formato de saída</span>
          <select value={format} onChange={(e) => onFormatChange(e.target.value as OutputFormat)}>
            <option value="tela">Em tela</option>
            <option value="csv">CSV</option>
          </select>
          <span className="adm-rc-pill-select-arrow" aria-hidden="true"><ChevronDown size={22} strokeWidth={1.5} /></span>
        </label>

        <button type="button" className="adm-rc-btn-navy" onClick={onToggleFilters} aria-expanded={filtersOpen} aria-controls={filtersId}>
          <SlidersHorizontal size={20} strokeWidth={1.75} aria-hidden="true" />
          <span>Mostrar/<wbr />esconder filtros</span>
        </button>

        <button type="button" className="adm-rc-btn-exports" onClick={onOpenExports} aria-haspopup="dialog">
          <Eye size={20} strokeWidth={1.75} aria-hidden="true" />
          <span>Relatórios exportados</span>
        </button>
      </div>

      <div className="adm-rc-toolbar-row is-icons">
        {toolActions.map(({ key, Icon: ActionIcon, label, onClick, disabled, controlsFilters }) => (
          <button
            key={key}
            type="button"
            className="adm-rc-round-btn"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            aria-expanded={controlsFilters ? filtersOpen : undefined}
            aria-controls={controlsFilters ? filtersId : undefined}
          >
            <ActionIcon size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Card de filtros ──────────────────────────────────────────────────
/** Traços (dentro de um <svg> 24×24) dos ícones dos campos de filtro. */
export const FILTER_ICONS = {
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </>
  ),
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  /** Responsável (admin): escudo. */
  shield: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />,
  /** Escopo / alvo: alvo concêntrico. */
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  /** Tipo de ação: raio. */
  zap: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
};

const FieldIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="adm-rc-inp-ico" aria-hidden="true">
    {children}
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="adm-rc-cal-icon" aria-hidden="true">
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/** Período "dd/mm/aaaa até dd/mm/aaaa" (campo de texto, igual ao de Recompensas). */
export const ReportPeriodFilter: React.FC<{ labelId: string; from: string; to: string; onFromChange: (v: string) => void; onToChange: (v: string) => void }> = ({
  labelId,
  from,
  to,
  onFromChange,
  onToChange,
}) => (
  <div className="adm-rc-field adm-rc-field-period">
    <label className="adm-rc-label" id={labelId}>PERÍODO</label>
    <div className="adm-rc-period-box" role="group" aria-labelledby={labelId}>
      <CalendarIcon />
      <input
        type="text"
        className="adm-rc-date-text-input"
        aria-label="Data inicial"
        value={from}
        onChange={(e) => onFromChange(e.target.value)}
        placeholder="dd/mm/aaaa"
      />
      <span className="adm-rc-period-sep">até</span>
      <input
        type="text"
        className="adm-rc-date-text-input"
        aria-label="Data final"
        value={to}
        onChange={(e) => onToChange(e.target.value)}
        placeholder="dd/mm/aaaa"
      />
      <CalendarIcon />
    </div>
  </div>
);

/** Campo de texto com ícone. `className` define a largura (ex.: adm-rc-field-user). */
export const ReportTextFilter: React.FC<{ id: string; label: string; className: string; placeholder: string; icon: React.ReactNode; value: string; onChange: (v: string) => void }> = ({
  id,
  label,
  className,
  placeholder,
  icon,
  value,
  onChange,
}) => (
  <div className={`adm-rc-field ${className}`}>
    <label className="adm-rc-label" htmlFor={id}>{label}</label>
    <div className="adm-rc-input-wrap">
      <FieldIcon>{icon}</FieldIcon>
      <input
        id={id}
        className="adm-rc-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

/** Select com ícone e seta. `className` define a largura (ex.: adm-rc-field-cat). */
export const ReportSelectFilter: React.FC<{ id: string; label: string; className: string; icon: React.ReactNode; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }> = ({
  id,
  label,
  className,
  icon,
  value,
  options,
  onChange,
}) => (
  <div className={`adm-rc-field ${className}`}>
    <label className="adm-rc-label" htmlFor={id}>{label}</label>
    <div className="adm-rc-select-wrap">
      <FieldIcon>{icon}</FieldIcon>
      <select
        id={id}
        className="adm-rc-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="adm-rc-sel-arr" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </div>
);

/** Card de filtros: campos em linha + "Limpar filtros" e "Aplicar filtros" (ou "Exportar CSV" no formato CSV). */
export const ReportFilterCard: React.FC<{
  id: string;
  ariaLabel: string;
  open: boolean;
  format: OutputFormat;
  error?: string;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  children: React.ReactNode;
}> = ({ id, ariaLabel, open, format, error, onSubmit, onClear, children }) => (
  <div className="adm-rc-card adm-rc-filter-card" id={id} hidden={!open}>
    <form onSubmit={onSubmit} noValidate aria-label={ariaLabel} className="adm-rc-filter-form">
      <div className="adm-rc-fields-row">
        {children}

        {/* AÇÕES DOS FILTROS */}
        <div className="adm-rc-actions-wrap">
          <button type="button" className="adm-rc-btn-ghost" onClick={onClear}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Limpar filtros
          </button>
          <button type="submit" className="adm-rc-btn-apply">
            {format === 'csv' ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Exportar CSV
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Aplicar filtros
              </>
            )}
          </button>
        </div>
      </div>
      {error && <span className="adm-rc-filter-err" role="alert">{error}</span>}
    </form>
  </div>
);

// ── Tabela ───────────────────────────────────────────────────────────
/** <th> ordenável: botão com chevron laranja (forte na coluna ativa; para cima quando crescente). */
export const SortTh: React.FC<{ label: string; active: boolean; asc: boolean; onSort: () => void }> = ({ label, active, asc, onSort }) => (
  <th scope="col" aria-sort={active ? (asc ? 'ascending' : 'descending') : undefined}>
    <button type="button" className={`adm-rc-sort-btn${active ? ' is-active' : ''}`} onClick={onSort}>
      {label}
      <ChevronDown size={16} strokeWidth={1.75} className={active && asc ? 'is-up' : undefined} aria-hidden="true" />
    </button>
  </th>
);

/** Estado vazio dentro do card da tabela (com "Limpar filtros" quando há filtro a desfazer). */
export const ReportEmpty: React.FC<{ title: string; text: string; onClear?: () => void }> = ({ title, text, onClear }) => (
  <div className="adm-empty">
    <strong>{title}</strong>
    <span>{text}</span>
    {onClear && <button type="button" className="adm-rc-btn-outline" style={{ marginTop: '1rem' }} onClick={onClear}>Limpar filtros</button>}
  </div>
);

/** Rodapé: "Mostrando de X até Y de Z registros", resultados por página e paginação em pílula. */
export const ReportFooter: React.FC<{
  shownFrom: number;
  shownTo: number;
  total: number;
  pageSize: number;
  onPageSizeChange: (n: number) => void;
  page: number;
  pages: number;
  onPageChange: (p: number) => void;
  perPageId?: string;
}> = ({ shownFrom, shownTo, total, pageSize, onPageSizeChange, page, pages, onPageChange, perPageId = 'adm-rc-perpage' }) => (
  <div className="adm-rc-footer">
    <div className="adm-rc-footer-top">
      <p className="adm-rc-footer-info" aria-live="polite">
        Mostrando de {fmt(shownFrom)} até {fmt(shownTo)} de {fmt(total)} registros
      </p>
      <div className="adm-rc-perpage">
        <label htmlFor={perPageId}>resultados por página:</label>
        <span className="adm-rc-perpage-select">
          <select id={perPageId} value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>
    </div>
    <nav className="adm-rc-pager" aria-label="Paginação">
      <button type="button" className="adm-rc-pager-btn" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Anterior
      </button>
      {pageItems(page, pages).map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} className="adm-rc-pager-gap" aria-hidden="true">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={`adm-rc-pager-btn is-num${p === page ? ' is-active' : ''}`}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Página ${p}`}
          >
            {p}
          </button>
        ),
      )}
      <button type="button" className="adm-rc-pager-btn" onClick={() => onPageChange(page + 1)} disabled={page >= pages}>
        Próximo
      </button>
    </nav>
  </div>
);

// ── Modal: histórico de exportações ──────────────────────────────────
export interface ExportEntryBase {
  id: string;
  date: string;
  count: number;
}

export function ExportsModal<E extends ExportEntryBase>({
  entries,
  supported,
  describe,
  subtitle = 'Histórico das exportações em CSV.',
  onClose,
  onDownload,
}: {
  entries: E[];
  supported: boolean;
  /** Texto da coluna "Filtros". */
  describe: (e: E) => string;
  subtitle?: string;
  onClose: () => void;
  onDownload: (e: E) => void;
}) {
  return (
    <Modal title="Relatórios exportados" subtitle={subtitle} size="lg" onClose={onClose} footer={<button type="button" className="adm-btn is-ghost" onClick={onClose}>Fechar</button>}>
      {!supported ? (
        <div className="adm-alert" role="alert">Histórico de exportações indisponível no módulo da loja.</div>
      ) : entries.length === 0 ? (
        <EmptyState title="Nenhuma exportação realizada" text="Use “Exportar CSV” para gerar o primeiro relatório." />
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table is-stack is-compact" aria-label="Histórico de exportações">
            <thead><tr><th>Data / hora</th><th className="is-right">Registros</th><th>Filtros</th><th className="adm-th-act"><span className="adm-sr-only">Baixar</span></th></tr></thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td data-label="Data / hora">{e.date}</td>
                  <td data-label="Registros" className="is-right">{fmt(e.count)}</td>
                  <td data-label="Filtros" className="adm-td-muted">{describe(e)}</td>
                  <td className="adm-td-actions">
                    <button type="button" className="adm-btn is-ghost is-sm" onClick={() => onDownload(e)} aria-label={`Baixar novamente a exportação de ${e.date}`}>Baixar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}

// ── Controlador genérico (relatórios só leitura: rankings, resets) ───
/** Exportação CSV feita na tela (o módulo da loja só tem histórico para resgates): fica na memória da sessão. */
export interface SessionExportEntry extends ExportEntryBase {
  filtersText: string;
  filename: string;
  csv: string;
}
const sessionExports: Record<string, SessionExportEntry[]> = {};
let exportSeq = 0;

export interface ReportColumn<R, S extends string> {
  field: S;
  label: string;
  /** Comparador em ordem crescente; a tela inverte quando a ordem é decrescente. */
  sort: (a: R, b: R) => number;
  /** Valor da coluna em copiar/CSV/XLS (mesma ordem e formato da tabela). */
  cell: (r: R) => Cell;
}

export interface ReportControllerOptions<R, F, S extends string> {
  /** Todas as linhas do relatório (sem filtro). Passe uma referência estável (useMemo). */
  rows: R[];
  emptyFilters: F;
  matches: (r: R, f: F) => boolean;
  /** Colunas de dados (constante do módulo). */
  columns: ReportColumn<R, S>[];
  defaultSort: { field: S; asc: boolean };
  /** Desempate fixo quando a coluna ordenada empata (constante do módulo). */
  tieBreak?: (a: R, b: R) => number;
  /** Mensagem de erro dos filtros ('' = válido). */
  validate?: (f: F) => string;
  /** Descrição curta dos filtros (histórico de exportações). */
  describe: (f: F) => string;
  /** Prefixo do arquivo exportado e chave do histórico da sessão (ex.: 'ranking-sintetico'). */
  fileBase: string;
}

/**
 * Estado e ações de um relatório no padrão de Recompensas: rascunho/aplicação de filtros, formato (tela/CSV),
 * ordenação, paginação, copiar/CSV/XLS/imprimir e histórico de exportações da sessão.
 */
export function useReportController<R, F extends object, S extends string>(o: ReportControllerOptions<R, F, S>) {
  const toast = useAdminToast();
  const chrome = useReportChrome();
  const [draft, setDraft] = useState<F>(o.emptyFilters);
  const [applied, setApplied] = useState<F>(o.emptyFilters);
  const [filterError, setFilterError] = useState('');
  const [format, setFormat] = useState<OutputFormat>('tela');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sortField, setSortField] = useState<S>(o.defaultSort.field);
  const [sortAsc, setSortAsc] = useState(o.defaultSort.asc);
  const [pageSize, setPageSizeState] = useState(50);
  const [page, setPage] = useState(1);
  const [exportsOpen, setExportsOpen] = useState(false);
  const [history, setHistory] = useState<SessionExportEntry[]>(() => sessionExports[o.fileBase] ?? []);

  const { rows: allRows, columns, tieBreak } = o;
  const sorted = useMemo(() => {
    const col = columns.find((c) => c.field === sortField) ?? columns[0];
    return [...allRows].sort((a, b) => {
      const diff = col.sort(a, b);
      return (sortAsc ? diff : -diff) || (tieBreak ? tieBreak(a, b) : 0);
    });
  }, [allRows, columns, tieBreak, sortField, sortAsc]);

  const headers = columns.map((c) => c.label);
  const cellsOf = (r: R) => columns.map((c) => c.cell(r));

  const filtered = sorted.filter((r) => o.matches(r, applied));
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const cur = Math.min(page, pages);
  const startIdx = (cur - 1) * pageSize;
  const pageRows = chrome.printAll ? filtered : filtered.slice(startIdx, startIdx + pageSize);
  const shownFrom = total === 0 ? 0 : chrome.printAll ? 1 : startIdx + 1;
  const shownTo = chrome.printAll ? total : startIdx + pageRows.length;

  const setField = <K extends keyof F>(k: K, v: F[K]) => setDraft((p) => ({ ...p, [k]: v }));

  const exportCsv = (list: R[], filters: F) => {
    const csv = toCsv(headers, list.map(cellsOf));
    const filename = `${o.fileBase}-${new Date().toISOString().slice(0, 10)}.csv`;
    downloadCsv(csv, filename);
    exportSeq += 1;
    const entry: SessionExportEntry = { id: `${o.fileBase}-${exportSeq}`, date: stampDateTime(new Date()), count: list.length, filtersText: o.describe(filters), filename, csv };
    sessionExports[o.fileBase] = [entry, ...(sessionExports[o.fileBase] ?? [])];
    setHistory(sessionExports[o.fileBase]);
    toast.push(`CSV exportado com sucesso (${fmt(list.length)} registros).`);
  };

  const apply = (e?: React.FormEvent) => {
    e?.preventDefault();
    const err = o.validate?.(draft) ?? '';
    if (err) {
      setFilterError(err);
      return;
    }
    setFilterError('');
    // Formato "CSV": baixa o arquivo com os filtros do formulário em vez de aplicá-los na tela.
    if (format === 'csv') {
      const matching = sorted.filter((r) => o.matches(r, draft));
      if (matching.length === 0) {
        toast.push('Nenhum registro encontrado com esses filtros para exportar.', 'info');
        return;
      }
      exportCsv(matching, draft);
      return;
    }
    setApplied({ ...draft });
    setPage(1);
  };

  const clear = () => {
    setDraft(o.emptyFilters);
    setApplied(o.emptyFilters);
    setFilterError('');
    setPage(1);
  };

  const toggleSort = (field: S) => {
    if (sortField === field) {
      setSortAsc((a) => !a);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
    setPage(1);
  };

  const setPageSize = (n: number) => {
    setPageSizeState(n);
    setPage(1);
  };

  const copyRows = async () => {
    const ok = await copyText(toTsv(headers, filtered.map(cellsOf)));
    toast.push(
      ok ? `${fmt(total)} ${total === 1 ? 'linha copiada' : 'linhas copiadas'} para a área de transferência.` : 'Não foi possível copiar. Verifique as permissões do navegador.',
      ok ? 'success' : 'error',
    );
  };

  const exportXls = () => {
    downloadCsv(toXlsHtml(headers, filtered.map(cellsOf)), `${o.fileBase}-${new Date().toISOString().slice(0, 10)}.xls`, 'application/vnd.ms-excel;charset=utf-8');
    toast.push(`XLS exportado com sucesso (${fmt(total)} registros).`);
  };

  const redownload = (e: SessionExportEntry) => {
    downloadCsv(e.csv, e.filename);
    toast.push('Exportação baixada novamente.');
  };

  return {
    chrome,
    draft,
    setField,
    applied,
    apply,
    clear,
    filterError,
    format,
    setFormat,
    filtersOpen,
    toggleFilters: () => setFiltersOpen((v) => !v),
    sortField,
    sortAsc,
    toggleSort,
    pageSize,
    setPageSize,
    page: cur,
    pages,
    setPage,
    pageRows,
    total,
    shownFrom,
    shownTo,
    copyRows,
    exportCsv: () => exportCsv(filtered, applied),
    exportXls,
    printReport: () => window.print(),
    exportsOpen,
    openExports: () => setExportsOpen(true),
    closeExports: () => setExportsOpen(false),
    history,
    redownload,
  };
}
