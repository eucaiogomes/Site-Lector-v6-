-- ==============================================================================
-- LEADS DO SITE • LECTOR
-- Tabela única com tudo o que os formulários do site enviam (api/contact.js e
-- api/newsletter.js). Lida pelo admin em /admin › Relatórios › Leads site.
--
-- Roda igual nos dois bancos (PostgreSQL 12+):
--   • Huawei Cloud (RDS for PostgreSQL) → psql "$DATABASE_URL" -f db/schema.sql
--   • Supabase → SQL Editor: cole este arquivo e depois db/supabase-rls.sql
-- Idempotente: pode rodar de novo sem perder dados.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.leads_site (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    criado_em  TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- 'contato' = modal "Falar com especialista", página Contato e landings;
    -- 'newsletter' = inscrições de e-mail (rodapé e destaque do blog)
    tipo       TEXT NOT NULL CHECK (tipo IN ('contato', 'newsletter')),
    nome       TEXT,
    empresa    TEXT,
    email      TEXT NOT NULL,
    telefone   TEXT,
    interesse  TEXT,
    mensagem   TEXT,
    -- formulário de origem: modal-lead, pagina-contato, lp-unimeds, rodape…
    origem     TEXT,
    -- caminho da página onde o formulário foi enviado
    pagina     TEXT,
    -- campos extras de cada formulário (cargo, desafio, utm_*, campanha…)
    dados      JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS leads_site_criado_em_idx ON public.leads_site (criado_em DESC);
CREATE INDEX IF NOT EXISTS leads_site_email_idx ON public.leads_site (lower(email));
