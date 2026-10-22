/** Chamadas do admin às funções de api/admin/* (mesma origem; a sessão vai no cookie HttpOnly). */

export interface Lead {
  id: string | number;
  /** ISO 8601 (timestamptz). */
  criado_em: string;
  tipo: 'contato' | 'newsletter';
  nome: string | null;
  empresa: string | null;
  email: string;
  telefone: string | null;
  interesse: string | null;
  mensagem: string | null;
  origem: string | null;
  pagina: string | null;
  /** Campos extras do formulário (cargo, desafio, utm_*…). */
  dados: Record<string, string | number | boolean> | null;
  /** Cadastro no portal Lector: criado | ja_existia | erro | null (não enviado). */
  portal_status: PortalStatus;
  portal_usuario_id: string | number | null;
  portal_detalhe: string | null;
  portal_em: string | null;
}

export type PortalStatus = 'criado' | 'ja_existia' | 'erro' | null;

export interface PortalResult {
  status: PortalStatus;
  userId: number | null;
  detalhe: string | null;
}

export interface LeadsResponse {
  provider: 'postgres' | 'supabase';
  truncated: boolean;
  leads: Lead[];
}

/** Erro da API com o código devolvido pelo servidor (`unauthorized`, `db_not_configured`…). */
export class ApiError extends Error {
  constructor(public code: string, public status: number) {
    super(code);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      credentials: 'same-origin',
      ...init,
      headers: { Accept: 'application/json', ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
    });
  } catch {
    throw new ApiError('network', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new ApiError(data.error || 'unknown', res.status);
  return data as T;
}

export const getSession = () => call<{ email: string }>('/api/admin/session');

export const login = (email: string, password: string) =>
  call<{ email: string }>('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const logout = () => call<{ ok: true }>('/api/admin/logout', { method: 'POST', body: '{}' });

export const getLeads = () => call<LeadsResponse>('/api/admin/leads');

/** Cadastra o lead no portal Lector (ou reenvia o acesso com senha nova). */
export const grantPortalAccess = (id: string | number) =>
  call<{ result: PortalResult }>('/api/admin/portal-access', { method: 'POST', body: JSON.stringify({ id: String(id) }) });
