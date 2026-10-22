import React, { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';

/** Componentes reutilizáveis do admin de recompensas: modal acessível, confirmação, toast e upload de imagem. */

// ── Toast ─────────────────────────────────────────────────────────────
type ToastKind = 'success' | 'error' | 'info';
interface ToastCtx { push: (msg: string, kind?: ToastKind) => void }
const ToastContext = createContext<ToastCtx>({ push: () => {} });
export const useAdminToast = () => useContext(ToastContext);

export const AdminToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ msg: string; kind: ToastKind; id: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const push = useCallback((msg: string, kind: ToastKind = 'success') => {
    window.clearTimeout(timer.current);
    setToast({ msg, kind, id: Date.now() });
    timer.current = window.setTimeout(() => setToast(null), 4000);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="adm-ui-toast-host" role="status" aria-live="polite">
        {toast && (
          <div key={toast.id} className={`adm-ui-toast is-${toast.kind}`}>
            <span className="adm-ui-toast-msg">{toast.msg}</span>
            <button
              type="button"
              className="adm-ui-toast-close"
              onClick={() => setToast(null)}
              aria-label="Fechar aviso"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

// ── Modal ─────────────────────────────────────────────────────────────
const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Último botão/link clicado: no Safari o clique não foca o botão, então o retorno do foco usa isto. */
let lastTrigger: HTMLElement | null = null;
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const t = (e.target as Element | null)?.closest?.('button, a');
    if (t) lastTrigger = t as HTMLElement;
  }, true);
}

export interface ModalProps {
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Classe extra no painel (variação visual de uma tela). */
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/** Diálogo modal: role=dialog, aria-modal, foco inicial, trap de Tab, ESC e retorno do foco ao abridor. */
export const Modal: React.FC<ModalProps> = ({ title, subtitle, size = 'md', className, onClose, children, footer }) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(document.activeElement && document.activeElement !== document.body ? (document.activeElement as HTMLElement) : lastTrigger);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Campo com popup próprio aberto (ex.: lista de um combobox) trata o Esc antes do modal.
        if ((e.target as Element | null)?.closest?.('[data-modal-esc="local"]')) return;
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const f = Array.from<HTMLElement>(panel.querySelectorAll<HTMLElement>(FOCUSABLE) as unknown as ArrayLike<HTMLElement>).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const a = f[0];
      const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const o = opener.current;
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prevOverflow;
      if (o && document.contains(o)) o.focus();
    };
  }, []);

  return (
    <div className="adm-modal">
      <div className="adm-modal-backdrop" onClick={onClose} />
      <div className={`adm-modal-panel is-${size}${className ? ` ${className}` : ''}`} role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef}>
        <div className="adm-modal-head">
          <div>
            <h2 id={titleId}>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
        <div className="adm-modal-body">{children}</div>
        {footer && <div className="adm-modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

export interface ConfirmProps {
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmProps> = ({ title, message, confirmLabel = 'Confirmar', danger, onConfirm, onCancel }) => (
  <Modal
    title={title}
    size="sm"
    onClose={onCancel}
    footer={(
      <>
        <button type="button" className="adm-btn is-ghost" onClick={onCancel}>Cancelar</button>
        <button type="button" className={`adm-btn ${danger ? 'is-danger' : 'is-primary'}`} onClick={onConfirm} data-autofocus>{confirmLabel}</button>
      </>
    )}
  >
    <p className="adm-confirm-msg">{message}</p>
  </Modal>
);

// ── Imagem ────────────────────────────────────────────────────────────
/** Só aceita data:image/*, http(s) ou caminho absoluto; o resto vira placeholder (sem 404 em cascata). */
export const isSafeImageSrc = (src: unknown): src is string =>
  typeof src === 'string' && /^(data:image\/(png|jpe?g|gif|webp);base64,|https?:\/\/|\/(?!\/))/i.test(src);

export const NoImage: React.FC<{ small?: boolean }> = ({ small }) => (
  <div className={`adm-noimg${small ? ' is-small' : ''}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="m9 9 6 6M15 9l-6 6" /></svg>
    <span>Sem imagem</span>
  </div>
);

/** <img> com src validado e fallback "Sem imagem" (inclusive se o arquivo não carregar). */
export const SafeImg: React.FC<{ src?: unknown; alt: string; small?: boolean; fit?: 'contain' | 'cover' }> = ({ src, alt, small, fit = 'contain' }) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!isSafeImageSrc(src) || failed) return <NoImage small={small} />;
  return <img className="adm-img" style={{ objectFit: fit }} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
};

export const MAX_IMAGE_BYTES = 300 * 1024;
const dataUrlBytes = (u: string) => Math.ceil(((u.split(',')[1] || '').length * 3) / 4);

/** Lê uma imagem, valida o tipo e a reduz (canvas) até caber em maxBytes (padrão 300 KB). Rejeita com mensagem em pt-BR. */
export function prepareImage(file: File, maxSide = 800, maxBytes = MAX_IMAGE_BYTES): Promise<string> {
  const limitKb = Math.round(maxBytes / 1024);
  return new Promise((resolve, reject) => {
    if (!/^image\/(png|jpe?g|gif|webp)$/i.test(file.type)) {
      reject(new Error('Formato inválido. Use PNG, JPG, GIF ou WebP.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.'));
    reader.onload = () => {
      const original = String(reader.result);
      if (file.type === 'image/gif' || dataUrlBytes(original) <= maxBytes / 2) {
        if (dataUrlBytes(original) > maxBytes) { reject(new Error(`Imagem acima de ${limitKb} KB. Escolha um arquivo menor.`)); return; }
        resolve(original);
        return;
      }
      const img = new Image();
      img.onerror = () => reject(new Error('Arquivo de imagem inválido.'));
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Não foi possível processar a imagem.')); return; }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const keepPng = file.type === 'image/png';
        let out = canvas.toDataURL(keepPng ? 'image/png' : 'image/jpeg', 0.85);
        for (let q = 0.8; dataUrlBytes(out) > maxBytes && q > 0.3; q -= 0.1) out = canvas.toDataURL('image/jpeg', q);
        if (dataUrlBytes(out) > maxBytes) { reject(new Error(`Imagem acima de ${limitKb} KB mesmo após reduzir.`)); return; }
        resolve(out);
      };
      img.src = original;
    };
    reader.readAsDataURL(file);
  });
}

export interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  /** Conteúdo extra no preview (ex.: emoji). */
  emoji?: string;
  contain?: boolean;
}

/** Campo de upload com preview, trocar/remover e validação. */
export const ImageField: React.FC<ImageFieldProps> = ({ label, value, onChange, emoji, contain }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const id = useId();
  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    setBusy(true);
    setError('');
    try {
      onChange(await prepareImage(f));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar a imagem.');
    } finally {
      setBusy(false);
    }
  };
  const hasImage = isSafeImageSrc(value);
  return (
    <div className="adm-field">
      <span className="adm-label" id={`${id}-l`}>{label}</span>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp" className="adm-sr-only" onChange={pick} tabIndex={-1} aria-labelledby={`${id}-l`} />
      <button type="button" className="adm-upload" onClick={() => inputRef.current?.click()} aria-describedby={`${id}-h`}>
        {hasImage ? (
          <SafeImg src={value} alt="Pré-visualização" fit={contain ? 'contain' : 'cover'} />
        ) : emoji ? (
          <span className="adm-upload-emoji" aria-hidden="true">{emoji}</span>
        ) : (
          <span className="adm-upload-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
            <span>{busy ? 'Processando…' : 'Clique para selecionar'}</span>
          </span>
        )}
      </button>
      <span className="adm-hint" id={`${id}-h`}>PNG, JPG, GIF ou WebP, até 300 KB (reduzimos automaticamente).</span>
      {(hasImage || emoji) && (
        <div className="adm-upload-actions">
          <button type="button" className="adm-btn is-ghost is-sm" onClick={() => inputRef.current?.click()}>Alterar imagem</button>
          {hasImage && <button type="button" className="adm-btn is-ghost is-sm is-danger-text" onClick={() => { onChange(''); setError(''); }}>Remover</button>}
        </div>
      )}
      {error && <span className="adm-error" role="alert">{error}</span>}
    </div>
  );
};

export const fmt = (n: unknown) => (Number(n) || 0).toLocaleString('pt-BR');
