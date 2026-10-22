import type { Lead } from '../../api';

/**
 * Rótulos legíveis para os códigos que os formulários do site gravam em leads_site.
 * Fonte dos códigos: shared/lead-form.js (interesse, origem "modal-lead"), pages/contato (origem
 * "pagina-contato"), landings unimeds e treinamentos-proprios (origem "lp-…") e shared/newsletter.js.
 */

/** <select name="interesse"> do modal e da página Contato. As landings já mandam o texto pronto. */
const INTERESSES: Record<string, string> = {
  diagnostico: 'Diagnóstico gratuito',
  demonstracao: 'Agendar demonstração',
  especialista: 'Falar com especialista',
  conteudo: 'Conteúdo sob demanda',
  nr1: 'Solução NR-1',
  vendas: 'Copiloto de Vendas',
  servicos: 'Serviços Especializados',
  outro: 'Outro assunto',
};

export const interesseLabel = (v: string | null) => (v ? INTERESSES[v] ?? v : '');

/** Formulário de origem (coluna "Formulário"). As landings anexam " · utm_source · utm_campaign" à origem. */
export function formularioLabel(lead: Pick<Lead, 'tipo' | 'origem'>): string {
  const origem = (lead.origem ?? '').trim();
  if (lead.tipo === 'newsletter') {
    if (origem === 'rodape') return 'Newsletter (rodapé)';
    if (origem === 'blog-destaque') return 'Newsletter (blog)';
    return origem && origem !== 'newsletter' ? `Newsletter (${origem})` : 'Newsletter';
  }
  if (origem === 'modal-lead') return 'Modal de contato';
  if (origem === 'pagina-contato') return 'Página Contato';
  if (origem.startsWith('lp-unimeds')) return 'Landing Unimeds';
  if (origem.startsWith('lp-treinamentos-proprios')) return 'Landing Treinamentos próprios';
  return origem;
}

/** Páginas do site (pages/<slug>/index.dc.html ou rota limpa /<slug>, ver vercel.json). */
const PAGINAS: Record<string, string> = {
  home: 'Home',
  blog: 'Blog',
  contato: 'Contato',
  'plataforma-lector': 'Plataforma Lector',
  'copiloto-vendas': 'Copiloto de Vendas',
  'solucao-nr-1': 'Solução NR-1',
  'conteudo-sob-demanda': 'Conteúdo sob demanda',
  'diagnostico-gaps': 'Diagnóstico de gaps',
  'servicos-especializados': 'Serviços especializados',
  clientes: 'Clientes',
  sobre: 'Sobre',
  unimeds: 'Unimeds',
  'unimeds-microlearning': 'Unimeds microlearning',
  'treinamentos-proprios': 'Treinamentos próprios',
};

export function paginaLabel(path: string | null): string {
  const p = (path ?? '').trim();
  if (!p) return '';
  if (p === '/' || p === '/home') return 'Home';
  if (p === '/unimeds/microlearning') return PAGINAS['unimeds-microlearning'];
  const slug = /^\/pages\/([^/]+)\//.exec(p)?.[1] ?? /^\/([^/]+)\/?$/.exec(p)?.[1] ?? '';
  return PAGINAS[slug] ?? p;
}

/** Campos extras (coluna dados) com nome amigável; chaves desconhecidas aparecem como vieram. */
const EXTRAS: Record<string, string> = {
  cargo: 'Cargo',
  plataforma: 'Já utiliza plataforma de aprendizagem',
  desafio: 'Principal desafio atual',
  email_personal: 'E-mail pessoal (qualificar manualmente)',
  segment: 'Segmento',
  lead_source: 'Fonte do lead',
  campaign: 'Campanha',
  creative: 'Criativo',
  landing_page: 'Landing page',
  submitted_at: 'Enviado em (navegador)',
  origin_url: 'URL de origem',
};

export const extraLabel = (key: string) => EXTRAS[key] ?? key;

export const extraValue = (v: string | number | boolean) => (typeof v === 'boolean' ? (v ? 'Sim' : 'Não') : String(v));

/** Coluna "Portal": acesso ao microlearning no portal Lector — só leads da landing Unimeds ("—" nos demais). */
export function portalLabel(lead: Pick<Lead, 'tipo' | 'portal_status' | 'portal_elegivel'>): string {
  if (lead.tipo === 'newsletter') return '';
  if (!lead.portal_elegivel && !lead.portal_status) return '';
  if (lead.portal_status === 'criado') return 'Cadastrado';
  if (lead.portal_status === 'ja_existia') return 'Já existia';
  if (lead.portal_status === 'erro') return 'Erro';
  return 'Não enviado';
}
