import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ApiError, getLeads, grantPortalAccess, type Lead, type LeadsResponse } from '../../api';
import { ConfirmDialog, Modal, fmt, useAdminToast } from './adminUi';
import { LoadingState } from './PageHeader';
import {
  ExportsModal,
  FILTER_ICONS,
  ReportCrumbBar,
  ReportEmpty,
  ReportFilterCard,
  ReportFooter,
  ReportPeriodFilter,
  ReportSelectFilter,
  ReportTextFilter,
  ReportToolbar,
  SortTh,
  byText,
  copyText,
  norm,
  parseDay,
  stampDateTime,
  useReportController,
  type ReportColumn,
} from './relatorioUi';
import { extraLabel, extraValue, formularioLabel, interesseLabel, paginaLabel, portalLabel } from './leadLabels';
import './leads.css';

/**
 * Relatórios › Marketing Comercial › Leads site: tudo o que os formulários do site gravaram em leads_site,
 * no padrão das telas de relatório do admin (Ranking sintético). Filtros, ordenação, paginação e exportações
 * rodam no navegador sobre a lista que /api/admin/leads devolve (até 5.000 mais recentes).
 */

type LeadRow = {
  id: string;
  ts: number;
  dataHora: string;
  tipo: Lead['tipo'];
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
  interesse: string;
  formulario: string;
  portal: string;
  pagina: string;
  mensagem: string;
  extras: [string, string][];
  lead: Lead;
};
type SortField = 'data' | 'nome' | 'email' | 'empresa' | 'telefone' | 'interesse' | 'formulario' | 'portal' | 'pagina' | 'tipo' | 'mensagem' | 'extras';
type Filters = { from: string; to: string; busca: string; formulario: string; interesse: string; portal: string };

const EMPTY_FILTERS: Filters = { from: '', to: '', busca: '', formulario: '', interesse: '', portal: '' };
const EMPTY_ROWS: LeadRow[] = [];
const FILTERS_ID = 'adm-ld-filtros';
const DAY_MS = 24 * 60 * 60 * 1000;

/** Todas as colunas exportadas (copiar/CSV/XLS). A tabela mostra só as de VISIBLE. */
const COLUMNS: ReportColumn<LeadRow, SortField>[] = [
  { field: 'data', label: 'Data - Hora', sort: (a, b) => a.ts - b.ts, cell: (r) => r.dataHora },
  { field: 'tipo', label: 'Tipo', sort: (a, b) => byText(a.tipo, b.tipo), cell: (r) => (r.tipo === 'newsletter' ? 'Newsletter' : 'Contato') },
  { field: 'nome', label: 'Nome', sort: (a, b) => byText(a.nome, b.nome), cell: (r) => r.nome },
  { field: 'email', label: 'E-mail', sort: (a, b) => byText(a.email, b.email), cell: (r) => r.email },
  { field: 'empresa', label: 'Empresa', sort: (a, b) => byText(a.empresa, b.empresa), cell: (r) => r.empresa },
  { field: 'telefone', label: 'Telefone', sort: (a, b) => byText(a.telefone, b.telefone), cell: (r) => r.telefone },
  { field: 'interesse', label: 'Interesse', sort: (a, b) => byText(a.interesse, b.interesse), cell: (r) => r.interesse },
  { field: 'formulario', label: 'Formulário', sort: (a, b) => byText(a.formulario, b.formulario), cell: (r) => r.formulario },
  { field: 'portal', label: 'Portal', sort: (a, b) => byText(a.portal, b.portal), cell: (r) => r.portal },
  { field: 'pagina', label: 'Página', sort: (a, b) => byText(a.pagina, b.pagina), cell: (r) => r.pagina },
  { field: 'mensagem', label: 'Mensagem', sort: (a, b) => byText(a.mensagem, b.mensagem), cell: (r) => r.mensagem },
  { field: 'extras', label: 'Dados adicionais', sort: () => 0, cell: (r) => r.extras.map(([k, v]) => `${k}: ${v}`).join(' | ') },
];
/** Telefone e Página ficam no modal de detalhes e nas exportações: com eles a tabela não cabe sem rolagem lateral. */
const VISIBLE: SortField[] = ['data', 'nome', 'email', 'empresa', 'interesse', 'formulario', 'portal'];
const VISIBLE_COLUMNS = VISIBLE.map((f) => COLUMNS.find((c) => c.field === f)!);
/** Colunas que podem quebrar linha (textos longos das landings, "Landing Treinamentos próprios"…). */
const WRAP: SortField[] = ['interesse', 'formulario'];

/** Empate: mais recente primeiro. */
const tieBreak = (a: LeadRow, b: LeadRow) => b.ts - a.ts;

const validate = (f: Filters) => {
  const from = f.from.trim() ? parseDay(f.from) : 0;
  const to = f.to.trim() ? parseDay(f.to) : 0;
  if (from === null || to === null) return 'Informe as datas no formato dd/mm/aaaa.';
  if (from && to && from > to) return 'A data inicial precisa ser anterior à data final.';
  return '';
};

const matches = (r: LeadRow, f: Filters) => {
  const from = f.from.trim() ? parseDay(f.from) : null;
  const to = f.to.trim() ? parseDay(f.to) : null;
  if (from !== null && r.ts < from) return false;
  if (to !== null && r.ts >= to + DAY_MS) return false;
  if (f.formulario && r.formulario !== f.formulario) return false;
  if (f.interesse && r.interesse !== f.interesse) return false;
  if (f.portal && r.portal !== f.portal) return false;
  if (f.busca && !norm(`${r.nome} ${r.email} ${r.empresa} ${r.telefone}`).includes(norm(f.busca.trim()))) return false;
  return true;
};

const describe = (f: Filters) => {
  const parts: string[] = [];
  if (f.from || f.to) parts.push(`Período ${f.from || '…'} até ${f.to || '…'}`);
  if (f.busca) parts.push(`Busca “${f.busca}”`);
  if (f.formulario) parts.push(`Formulário “${f.formulario}”`);
  if (f.interesse) parts.push(`Interesse “${f.interesse}”`);
  if (f.portal) parts.push(`Portal “${f.portal}”`);
  return parts.length ? parts.join(' · ') : 'Sem filtros';
};

function toRow(lead: Lead): LeadRow {
  const d = new Date(lead.criado_em);
  const ts = Number.isNaN(d.getTime()) ? 0 : d.getTime();
  return {
    id: String(lead.id),
    ts,
    dataHora: ts ? stampDateTime(d) : '',
    tipo: lead.tipo,
    nome: lead.nome ?? '',
    email: lead.email ?? '',
    empresa: lead.empresa ?? '',
    telefone: lead.telefone ?? '',
    interesse: interesseLabel(lead.interesse),
    formulario: formularioLabel(lead),
    portal: portalLabel(lead),
    pagina: paginaLabel(lead.pagina),
    mensagem: lead.mensagem ?? '',
    extras: Object.entries(lead.dados ?? {}).map(([k, v]) => [extraLabel(k), extraValue(v)]),
    lead,
  };
}

const PROVIDER_LABEL: Record<LeadsResponse['provider'], string> = { postgres: 'PostgreSQL', supabase: 'Supabase' };

/** Opções de um select de filtro a partir dos valores presentes nos dados. */
const optionsOf = (rows: LeadRow[], pick: (r: LeadRow) => string, allLabel: string) => [
  { value: '', label: allLabel },
  ...[...new Set(rows.map(pick).filter(Boolean))].sort((a, b) => byText(a, b)).map((v) => ({ value: v, label: v })),
];

type LoadState = { status: 'loading' } | { status: 'error'; code: string } | { status: 'ready'; data: LeadsResponse };

export const RelatorioLeads: React.FC<{ onExpired: () => void }> = ({ onExpired }) => {
  const toast = useAdminToast();
  const [load, setLoad] = useState<LoadState>({ status: 'loading' });
  const [refreshing, setRefreshing] = useState(false);
  /** Lead aberto no modal (pelo id: depois de "Atualizar" ou de uma ação, o modal mostra os dados novos). */
  const [detailId, setDetailId] = useState<string | null>(null);
  // O valor do contexto do toast muda a cada aviso: via ref, um aviso não dispara outro carregamento.
  const toastRef = useRef(toast);
  toastRef.current = toast;
  const expiredRef = useRef(onExpired);
  expiredRef.current = onExpired;

  const fetchLeads = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const data = await getLeads();
      setLoad({ status: 'ready', data });
      if (manual) toastRef.current.push(`Dados atualizados (${fmt(data.leads.length)} leads).`);
    } catch (err) {
      const code = err instanceof ApiError ? err.code : 'unknown';
      if (code === 'unauthorized') {
        expiredRef.current();
        return;
      }
      if (manual) toastRef.current.push('Não foi possível atualizar os leads agora.', 'error');
      else setLoad({ status: 'error', code });
    } finally {
      if (manual) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const rows = useMemo(() => (load.status === 'ready' ? load.data.leads.map(toRow) : EMPTY_ROWS), [load]);
  const formularioOptions = useMemo(() => optionsOf(rows, (r) => r.formulario, 'Todos os formulários'), [rows]);
  const interesseOptions = useMemo(() => optionsOf(rows, (r) => r.interesse, 'Todos os interesses'), [rows]);
  const portalOptions = useMemo(() => optionsOf(rows, (r) => r.portal, 'Todas as situações'), [rows]);
  const detail = detailId ? rows.find((r) => r.id === detailId) ?? null : null;

  const rc = useReportController({
    rows,
    emptyFilters: EMPTY_FILTERS,
    matches,
    columns: COLUMNS,
    defaultSort: { field: 'data', asc: false },
    tieBreak,
    validate,
    describe,
    fileBase: 'leads-site',
  });

  const { chrome } = rc;

  const body = () => {
    if (load.status === 'loading') return <LoadingState label="Carregando leads…" />;
    if (load.status === 'error') {
      const notConfigured = load.code === 'db_not_configured';
      return (
        <div className="adm-empty">
          <strong>{notConfigured ? 'Banco de leads não configurado.' : 'Não foi possível carregar os leads.'}</strong>
          <span>
            {notConfigured
              ? 'Defina DATABASE_URL (PostgreSQL / Huawei) ou SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY no servidor e rode db/schema.sql.'
              : load.code === 'network'
                ? 'Sem conexão com o servidor. Verifique a internet e tente de novo.'
                : 'O banco de dados não respondeu. Tente novamente em instantes.'}
          </span>
          <button type="button" className="adm-rc-btn-outline" style={{ marginTop: '1rem' }} onClick={() => { setLoad({ status: 'loading' }); fetchLeads(); }}>
            Tentar de novo
          </button>
        </div>
      );
    }
    if (rc.total === 0) {
      return rows.length === 0 ? (
        <ReportEmpty title="Nenhum lead ainda." text="Os envios dos formulários do site aparecem aqui assim que chegarem." />
      ) : (
        <ReportEmpty title="Nenhum lead encontrado." text="Ajuste os filtros ou limpe-os para ver todos os leads." onClear={rc.clear} />
      );
    }
    return (
      <div className="adm-rc-table-container">
        <table className="adm-rc-table adm-ld-table" aria-label="Leads do site">
          <thead>
            <tr>
              {VISIBLE_COLUMNS.map(({ field, label }) => (
                <SortTh key={field} label={label} active={rc.sortField === field} asc={rc.sortAsc} onSort={() => rc.toggleSort(field)} />
              ))}
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rc.pageRows.map((r) => (
              <tr key={r.id}>
                {VISIBLE.map((f) => {
                  const value = f === 'data' ? r.dataHora : r[f];
                  return (
                    <td key={f} className={WRAP.includes(f) ? 'is-wrap' : undefined}>
                      {value || '—'}
                    </td>
                  );
                })}
                <td>
                  <div className="adm-rc-row-actions">
                    <button type="button" className="adm-rc-pill-btn" onClick={() => setDetailId(r.id)} aria-label={`Ver detalhes do lead ${r.nome || r.email}`}>
                      Detalhes
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const ready = load.status === 'ready';

  return (
    <div className="adm-recomp-page adm-rc-page adm-ld-page" ref={chrome.pageRef}>
      <ReportCrumbBar title="Leads site" canFullscreen={chrome.canFullscreen} isFullscreen={chrome.isFullscreen} onToggleFullscreen={chrome.toggleFullscreen} />

      <ReportToolbar
        filtersId={FILTERS_ID}
        pageSize={rc.pageSize}
        onPageSizeChange={rc.setPageSize}
        format={rc.format}
        onFormatChange={rc.setFormat}
        filtersOpen={rc.filtersOpen}
        onToggleFilters={rc.toggleFilters}
        onOpenExports={rc.openExports}
        noRows={rc.total === 0}
        onCopy={rc.copyRows}
        onCsv={rc.exportCsv}
        onXls={rc.exportXls}
        onPrint={rc.printReport}
        onRefresh={ready ? () => fetchLeads(true) : undefined}
        refreshing={refreshing}
      />

      <ReportFilterCard id={FILTERS_ID} ariaLabel="Filtros dos leads do site" open={rc.filtersOpen} format={rc.format} error={rc.filterError} onSubmit={rc.apply} onClear={rc.clear}>
        <ReportPeriodFilter labelId="ld-periodo" from={rc.draft.from} to={rc.draft.to} onFromChange={(v) => rc.setField('from', v)} onToChange={(v) => rc.setField('to', v)} />
        <ReportTextFilter
          id="ld-busca"
          label="NOME, E-MAIL OU EMPRESA"
          className="adm-rc-field-user adm-rc-field-cap"
          placeholder="Buscar lead"
          icon={FILTER_ICONS.user}
          value={rc.draft.busca}
          onChange={(v) => rc.setField('busca', v)}
        />
        <ReportSelectFilter
          id="ld-formulario"
          label="FORMULÁRIO"
          className="adm-rc-field-wide"
          icon={FILTER_ICONS.tag}
          value={rc.draft.formulario}
          options={formularioOptions}
          onChange={(v) => rc.setField('formulario', v)}
        />
        <ReportSelectFilter
          id="ld-interesse"
          label="INTERESSE"
          className="adm-rc-field-wide"
          icon={FILTER_ICONS.target}
          value={rc.draft.interesse}
          options={interesseOptions}
          onChange={(v) => rc.setField('interesse', v)}
        />
        <ReportSelectFilter
          id="ld-portal"
          label="PORTAL"
          className="adm-rc-field-wide"
          icon={FILTER_ICONS.shield}
          value={rc.draft.portal}
          options={portalOptions}
          onChange={(v) => rc.setField('portal', v)}
        />
      </ReportFilterCard>

      {ready && (
        <p className="adm-ld-source">
          Banco: <strong>{PROVIDER_LABEL[load.data.provider]}</strong> · {fmt(load.data.leads.length)} {load.data.leads.length === 1 ? 'lead' : 'leads'}
          {load.data.truncated && ' (os mais recentes; o limite da tela é 5.000)'}
        </p>
      )}

      <div className="adm-rc-card adm-rc-table-card">
        {body()}

        {ready && rc.total > 0 && (
          <ReportFooter
            shownFrom={rc.shownFrom}
            shownTo={rc.shownTo}
            total={rc.total}
            pageSize={rc.pageSize}
            onPageSizeChange={rc.setPageSize}
            page={rc.page}
            pages={rc.pages}
            onPageChange={rc.setPage}
            perPageId="adm-ld-perpage"
          />
        )}
      </div>

      {rc.exportsOpen && (
        <ExportsModal
          entries={rc.history}
          supported
          describe={(e) => e.filtersText}
          subtitle="Exportações em CSV feitas nesta sessão."
          onClose={rc.closeExports}
          onDownload={rc.redownload}
        />
      )}

      {detail && <LeadDetailModal row={detail} onClose={() => setDetailId(null)} onChanged={() => fetchLeads()} onExpired={onExpired} />}
    </div>
  );
};

/** Telefone BR → link do WhatsApp (10/11 dígitos ganham o 55); outros formatos ficam sem link. */
function whatsappUrl(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10 || digits.length === 11) return `https://wa.me/55${digits}`;
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) return `https://wa.me/${digits}`;
  return null;
}

const PORTAL_ERRORS: Record<string, string> = {
  portal_not_configured: 'A integração com o portal Lector ainda não foi configurada no servidor.',
  user_already_existed: 'Esse e-mail já existia na Lector; nada foi alterado.',
  newsletter_lead: 'Lead de newsletter não gera usuário no portal (só tem e-mail).',
  network: 'Sem conexão com o servidor. Tente de novo.',
};

const LeadDetailModal: React.FC<{ row: LeadRow; onClose: () => void; onChanged: () => void; onExpired: () => void }> = ({ row, onClose, onChanged, onExpired }) => {
  const toast = useAdminToast();
  const { lead } = row;
  const wa = row.telefone ? whatsappUrl(row.telefone) : null;
  const [confirming, setConfirming] = useState(false);
  const [portalBusy, setPortalBusy] = useState(false);

  // Quem já existia na Lector não é alterado; quem esta integração criou pode receber um acesso novo.
  const canPortal = row.tipo === 'contato' && lead.portal_status !== 'ja_existia';
  const resend = lead.portal_status === 'criado';

  const runPortal = async () => {
    setPortalBusy(true);
    try {
      const { result } = await grantPortalAccess(lead.id);
      if (result.status === 'criado') {
        toast.push(result.detalhe ? `Cadastrado no portal, com pendência: ${result.detalhe}` : resend ? 'Acesso reenviado: o lead recebeu uma senha nova.' : 'Usuário cadastrado no portal e e-mail de acesso enviado.', result.detalhe ? 'info' : 'success');
      } else if (result.status === 'ja_existia') {
        toast.push(PORTAL_ERRORS.user_already_existed, 'info');
      } else {
        toast.push(`Não foi possível cadastrar: ${result.detalhe || 'erro desconhecido'}`, 'error');
      }
      onChanged();
    } catch (err) {
      const code = err instanceof ApiError ? err.code : 'unknown';
      if (code === 'unauthorized') {
        onExpired();
        return;
      }
      toast.push(PORTAL_ERRORS[code] ?? 'Não foi possível falar com o portal agora.', 'error');
    } finally {
      setPortalBusy(false);
      setConfirming(false);
    }
  };

  const portalFields: [string, React.ReactNode][] = [
    ['Situação', row.portal || '—'],
    ['Usuário no portal', lead.portal_usuario_id ? `ID ${lead.portal_usuario_id}` : '—'],
    ['Detalhe', lead.portal_detalhe || '—'],
    ['Atualizado em', lead.portal_em ? stampDateTime(new Date(lead.portal_em)) : '—'],
  ];

  const copyEmail = async () => {
    const ok = await copyText(row.email);
    toast.push(ok ? 'E-mail copiado.' : 'Não foi possível copiar o e-mail.', ok ? 'success' : 'error');
  };

  const fields: [string, React.ReactNode][] = [
    ['Data - Hora', row.dataHora || '—'],
    ['Tipo', row.tipo === 'newsletter' ? 'Newsletter' : 'Contato'],
    ['Nome', row.nome || '—'],
    ['E-mail', <a href={`mailto:${row.email}`}>{row.email}</a>],
    ['Empresa', row.empresa || '—'],
    [
      'Telefone',
      row.telefone ? (
        <>
          <a href={`tel:${row.telefone.replace(/[^\d+]/g, '')}`}>{row.telefone}</a>
          {wa && (
            <>
              {' · '}
              <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </>
          )}
        </>
      ) : (
        '—'
      ),
    ],
    ['Interesse', row.interesse || '—'],
    ['Formulário', row.formulario ? `${row.formulario}${lead.origem && lead.origem !== row.formulario ? ` (${lead.origem})` : ''}` : '—'],
    ['Página', lead.pagina ? <a href={lead.pagina} target="_blank" rel="noopener">{row.pagina}</a> : '—'],
  ];

  return (
    <Modal
      title={row.nome || row.email}
      subtitle={`${row.formulario || 'Lead'} · ${row.dataHora}`}
      size="lg"
      onClose={onClose}
      footer={(
        <>
          <button type="button" className="adm-btn is-ghost" onClick={copyEmail}>Copiar e-mail</button>
          <a className="adm-btn is-ghost" href={`mailto:${row.email}`}>Responder por e-mail</a>
          <button type="button" className="adm-btn is-primary" onClick={onClose} data-autofocus>Fechar</button>
        </>
      )}
    >
      <dl className="adm-ld-dl">
        {fields.map(([k, v]) => (
          <div key={k} className="adm-ld-dl-row">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      {row.mensagem && (
        <section className="adm-ld-sec" aria-labelledby="adm-ld-msg">
          <h3 id="adm-ld-msg">Mensagem</h3>
          <p className="adm-ld-msg">{row.mensagem}</p>
        </section>
      )}

      {row.extras.length > 0 && (
        <section className="adm-ld-sec" aria-labelledby="adm-ld-extras">
          <h3 id="adm-ld-extras">Dados adicionais</h3>
          <dl className="adm-ld-dl">
            {row.extras.map(([k, v]) => (
              <div key={k} className="adm-ld-dl-row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {row.tipo === 'contato' && (
        <section className="adm-ld-sec" aria-labelledby="adm-ld-portal">
          <h3 id="adm-ld-portal">Portal Lector</h3>
          <dl className="adm-ld-dl">
            {portalFields.map(([k, v]) => (
              <div key={k} className="adm-ld-dl-row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {canPortal && (
            confirming ? (
              <div className="adm-ld-portal-confirm" role="group" aria-label="Confirmar envio ao portal">
                <p>
                  {resend
                    ? `Uma senha nova será gerada e enviada para ${row.email}. A senha atual deixa de valer.`
                    : `${row.nome || row.email} será cadastrado no portal e receberá em ${row.email} um e-mail com login e senha.`}
                </p>
                <div className="adm-ld-portal-actions">
                  <button type="button" className="adm-btn is-ghost" onClick={() => setConfirming(false)} disabled={portalBusy}>Cancelar</button>
                  <button type="button" className="adm-btn is-primary" onClick={runPortal} disabled={portalBusy}>
                    {portalBusy ? 'Enviando…' : 'Confirmar'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="adm-ld-portal-actions">
                <button type="button" className="adm-btn is-ghost" onClick={() => setConfirming(true)}>
                  {resend ? 'Reenviar acesso' : lead.portal_status === 'erro' ? 'Tentar de novo' : 'Cadastrar no portal'}
                </button>
              </div>
            )
          )}
        </section>
      )}
    </Modal>
  );
};

export default RelatorioLeads;
