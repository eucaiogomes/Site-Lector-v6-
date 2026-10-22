import React, { useEffect, useState } from 'react';
import { ApiError, getSession, logout } from '../api';
import { AdminShell } from './admin/AdminShell';
import { AdminLogin } from './admin/AdminLogin';

/**
 * Entrada do /admin: confere a sessão (cookie HttpOnly) e mostra o login ou o painel.
 * Sessão vencida durante o uso (401 numa chamada) volta para o login via onExpired.
 */
type State = { status: 'checking' } | { status: 'out'; notice?: string } | { status: 'in'; email: string };

export const AdminApp: React.FC = () => {
  const [state, setState] = useState<State>({ status: 'checking' });

  useEffect(() => {
    let alive = true;
    getSession()
      .then((s) => alive && setState({ status: 'in', email: s.email }))
      .catch((err) => {
        if (!alive) return;
        const notice = err instanceof ApiError && err.code === 'network' ? 'Não foi possível falar com o servidor. Tente novamente.' : undefined;
        setState({ status: 'out', notice });
      });
    return () => {
      alive = false;
    };
  }, []);

  if (state.status === 'checking') {
    return (
      <div className="adm-login-page" role="status" aria-live="polite">
        <span className="adm-sr-only">Carregando…</span>
      </div>
    );
  }

  if (state.status === 'out') {
    return <AdminLogin notice={state.notice} onLogin={(email) => setState({ status: 'in', email })} />;
  }

  const signOut = async () => {
    await logout().catch(() => {}); // cookie já inválido/rede fora: sai do painel do mesmo jeito
    setState({ status: 'out' });
  };

  return (
    <AdminShell
      email={state.email}
      onLogout={signOut}
      onExpired={() => setState({ status: 'out', notice: 'Sua sessão expirou. Entre novamente.' })}
    />
  );
};

export default AdminApp;
