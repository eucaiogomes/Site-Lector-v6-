-- ==============================================================================
-- SUPABASE: rode DEPOIS de db/schema.sql (só no Supabase, não na Huawei).
--
-- Liga o Row Level Security sem nenhuma política: as chaves públicas
-- (anon / publishable) não leem nem gravam a tabela. Só o servidor do site,
-- com a SUPABASE_SERVICE_ROLE_KEY (ou a secret key sb_secret_…), acessa os leads.
-- ==============================================================================

ALTER TABLE public.leads_site ENABLE ROW LEVEL SECURITY;
