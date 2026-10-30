## 2024-10-30 - Remove Hardcoded Secrets

**Vulnerability**: Hardcoded `SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_URL` as string fallbacks in `src/integrations/supabase/client.ts`. This would expose the secrets in the frontend bundle and the public repository.
**Learning**: Development convenience (providing a fallback URL and key) should never trump security. Hardcoding secrets in source code is an anti-pattern.
**Prevention**: Strictly rely on environment variables (`import.meta.env`) and throw clear errors during runtime if they are missing to alert developers. Ensure secrets are documented in `.env.example` but not present in the code itself.
