import React from 'react';

/**
 * Esqueleto das telas do admin de recompensas: breadcrumb no topo e UM painel branco grande
 * (título da página + conteúdo). Seções internas usam <SectionTitle>.
 */
export const PageShell: React.FC<{ group: React.ReactNode; section: string; title: string; actions?: React.ReactNode; children?: React.ReactNode }> = ({ group, section, title, actions, children }) => (
  <div className="adm-page">
    <div className="adm-breadcrumb">
      {group} &nbsp;/&nbsp; <span>{section}</span>
    </div>
    <section className="adm-panel">
      <header className="adm-panel-head">
        <h1 className="adm-page-title">{title}</h1>
        {actions && <div className="adm-page-actions">{actions}</div>}
      </header>
      {children}
    </section>
  </div>
);

/** Título de seção: pequeno, caixa alta, negrito, azul-marinho (+ ações à direita e texto auxiliar). */
export const SectionTitle: React.FC<{ id?: string; title: string; hint?: React.ReactNode; actions?: React.ReactNode }> = ({ id, title, hint, actions }) => (
  <div className="adm-sec-head">
    <div>
      <h2 className="adm-sec-title" id={id}>{title}</h2>
      {hint && <p className="adm-sec-hint">{hint}</p>}
    </div>
    {actions && <div className="adm-sec-actions">{actions}</div>}
  </div>
);

/** Aviso quando o módulo da loja não carregou. */
export const ModuleError: React.FC<{ message: string }> = ({ message }) => (
  <div className="adm-alert" role="alert">{message}</div>
);

export const EmptyState: React.FC<{ title: string; text?: string }> = ({ title, text }) => (
  <div className="adm-empty">
    <strong>{title}</strong>
    {text && <span>{text}</span>}
  </div>
);

/** Skeleton de carregamento (mesmo padrão em todas as telas). */
export const LoadingState: React.FC<{ label?: string }> = ({ label = 'Carregando…' }) => (
  <div className="adm-loading" role="status" aria-live="polite">
    <span className="adm-skel" /><span className="adm-skel" /><span className="adm-skel is-short" />
    <span className="adm-sr-only">{label}</span>
  </div>
);
