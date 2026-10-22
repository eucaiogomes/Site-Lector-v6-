import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Topbar do admin — copiada de Tela-Recompensas-2.0 (faixa azul-marinho fina, tudo à direita).
 * No admin do site o dropdown do usuário mostra a conta logada e as ações "Ver o site" e "Sair";
 * os atalhos do LMS (Minha Área, portais, pontos, LivIA) ficaram de fora porque não existem aqui.
 */

const USER_ROLE = 'Administrador';

const Svg: React.FC<{ className?: string; sw?: number; children: React.ReactNode }> = ({ className, sw = 2, children }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

/** "admin@lectortec.com" → "Admin". */
const nameFromEmail = (email: string) => {
  const local = email.split('@')[0] || email;
  return local.charAt(0).toUpperCase() + local.slice(1);
};

export interface AdminTopbarProps {
  email: string;
  onLogout: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ email, onLogout, menuOpen, onToggleMenu }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const userName = nameFromEmail(email);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) btnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <header className="adm-top">
      <div className="adm-top-inner">
        <button
          type="button"
          className="adm-tb-btn adm-burger"
          aria-label="Abrir menu do admin"
          title="Menu"
          aria-expanded={menuOpen}
          aria-controls="adm-side"
          onClick={onToggleMenu}
        >
          <Svg><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></Svg>
        </button>

        <div className="adm-top-right">
          <div className="adm-user-wrap" ref={wrapRef}>
            <button
              ref={btnRef}
              type="button"
              className="adm-user-btn"
              title="Menu do usuário"
              aria-haspopup="true"
              aria-expanded={open}
              aria-controls="adm-user-dropdown"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="adm-user-text">
                <span className="adm-user-name">{userName}</span>
                <span className="adm-user-role">{USER_ROLE}</span>
              </span>
              <span className="adm-sr-only">, abrir menu do usuário</span>
              <span className="adm-avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="9" r="4.2" /><path d="M4.5 20.2c.9-3.6 4-5.7 7.5-5.7s6.6 2.1 7.5 5.7a1 1 0 0 1-1 1.3h-13a1 1 0 0 1-1-1.3z" /></svg>
              </span>
            </button>
            <div className={`adm-user-dropdown${open ? ' is-open' : ''}`} id="adm-user-dropdown" role="menu" aria-label="Menu do usuário">
              <div className="adm-ud-head">
                <div className="n">{userName}</div>
                <div className="e">{email}</div>
                <div className="role">{USER_ROLE}</div>
              </div>

              <a role="menuitem" className="adm-ud-action" href="/" target="_blank" rel="noopener">
                <Svg><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></Svg>
                Ver o site
              </a>
              <button
                type="button"
                role="menuitem"
                className="adm-ud-action is-danger"
                onClick={() => {
                  close();
                  onLogout();
                }}
              >
                <Svg><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></Svg>
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
