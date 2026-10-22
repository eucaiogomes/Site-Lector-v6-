import React, { useId, useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { ApiError, login } from '../../api';
import './login.css';

/** Tela de entrada do /admin. Credenciais conferidas no servidor (api/admin/login.js). */

const MESSAGES: Record<string, string> = {
  invalid_credentials: 'E-mail ou senha incorretos.',
  server_not_configured: 'O login do admin ainda não foi configurado no servidor.',
  rate_limited: 'Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.',
  network: 'Não foi possível falar com o servidor. Verifique a conexão.',
};

export const AdminLogin: React.FC<{ notice?: string; onLogin: (email: string) => void }> = ({ notice, onLogin }) => {
  const id = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!email.trim() || !password) {
      setError('Informe o e-mail e a senha.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const s = await login(email.trim(), password);
      onLogin(s.email);
    } catch (err) {
      const code = err instanceof ApiError ? err.code : '';
      setError(MESSAGES[code] ?? 'Não foi possível entrar agora. Tente novamente.');
      setBusy(false);
    }
  };

  const alert = error || notice;

  return (
    <div className="adm-login-page">
      <img className="adm-login-orbit" src="/assets/brand/orbit.svg" alt="" aria-hidden="true" />

      <main className="adm-login-card">
        <img className="adm-login-logo" src="/assets/brand/logo-lector.svg" alt="Lector" />
        <h1 className="adm-login-title">Painel administrativo</h1>
        <p className="adm-login-sub">Entre com o e-mail e a senha de administrador.</p>

        <form className="adm-login-form" onSubmit={submit} noValidate>
          <div className="adm-login-field">
            <label htmlFor={`${id}-email`}>E-mail</label>
            <div className="adm-login-input">
              <Mail size={17} strokeWidth={1.75} aria-hidden="true" />
              <input
                id={`${id}-email`}
                type="email"
                autoComplete="username"
                placeholder="voce@lectortec.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(error) || undefined}
                autoFocus
              />
            </div>
          </div>

          <div className="adm-login-field">
            <label htmlFor={`${id}-pass`}>Senha</label>
            <div className="adm-login-input">
              <LockKeyhole size={17} strokeWidth={1.75} aria-hidden="true" />
              <input
                id={`${id}-pass`}
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(error) || undefined}
              />
              <button
                type="button"
                className="adm-login-eye"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={showPass}
              >
                {showPass ? <EyeOff size={17} strokeWidth={1.75} aria-hidden="true" /> : <Eye size={17} strokeWidth={1.75} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {alert && (
            <p className="adm-login-alert" role="alert">
              {alert}
            </p>
          )}

          <button type="submit" className="adm-login-submit" disabled={busy}>
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </main>

      <footer className="adm-login-foot">
        <span>Lector Live © 2026 - v2.0</span>
        <a href="/">Voltar ao site</a>
      </footer>
    </div>
  );
};

export default AdminLogin;
