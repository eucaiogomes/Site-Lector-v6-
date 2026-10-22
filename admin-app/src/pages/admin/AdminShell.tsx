import React, { useEffect, useState } from 'react';
import './admin.css';
import { AdminTopbar } from './AdminTopbar';
import { AdminBanner } from './AdminBanner';
import { AdminToastProvider } from './adminUi';
import { AdminSidebar } from './AdminSidebar';
import { RelatorioLeads } from './RelatorioLeads';

/**
 * Shell do admin — copiado de Tela-Recompensas-2.0 (src/pages/admin/AdminShell.tsx): topbar, banner,
 * sidebar e área de conteúdo, com rota por hash. Por enquanto uma seção só: Relatórios › Leads site.
 * Para uma seção nova: inclua em SECTIONS, no menu de AdminSidebar e no switch do <main>.
 */

interface AdminSection {
  id: string;
  label: string;
}

const SECTIONS: AdminSection[] = [{ id: 'leads-site', label: 'Leads site' }];

const DEFAULT_ID = 'leads-site';
const readRoute = (): string => {
  const id = window.location.hash.replace('#', '').split('/')[0];
  return SECTIONS.some((s) => s.id === id) ? id : DEFAULT_ID;
};

export interface AdminShellProps {
  email: string;
  onLogout: () => void;
  /** Uma chamada voltou 401: volta para o login. */
  onExpired: () => void;
}

export const AdminShell: React.FC<AdminShellProps> = ({ email, onLogout, onExpired }) => {
  const [activeId, setActiveId] = useState(readRoute);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setActiveId(readRoute());
      setMenuOpen(false);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className="adm-root">
      <AdminTopbar email={email} onLogout={onLogout} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} />

      <AdminBanner />

      <div className="adm-body">
        <AdminSidebar activeId={activeId} open={menuOpen} />
        <button
          type="button"
          className={`adm-backdrop${menuOpen ? ' is-open' : ''}`}
          aria-label="Fechar menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />
        <main className="adm-main is-gray">
          <AdminToastProvider>
            {activeId === 'leads-site' && <RelatorioLeads onExpired={onExpired} />}
          </AdminToastProvider>
        </main>
      </div>
    </div>
  );
};

export default AdminShell;
