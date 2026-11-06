-- Rode UMA vez no SQL Editor do Supabase, depois da primeira execução da app
-- (as tabelas só existem depois que o Spring as cria).
--
-- O Supabase expõe o schema "public" pela Data API (REST). Tabelas criadas por SQL/JDBC
-- nascem SEM Row Level Security, então "usuarios" (hash de senha + token) poderia ser lida
-- por quem tiver a anon key. Com RLS ligado e sem policies, a Data API não enxerga nada.
-- A app Spring conecta como "postgres" (dono das tabelas), que ignora RLS: nada muda pra ela.

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cotacoes ENABLE ROW LEVEL SECURITY;

-- conferir (rowsecurity deve ser true nas duas):
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('usuarios', 'cotacoes');
