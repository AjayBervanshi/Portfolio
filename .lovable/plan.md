## What's actually happening

I checked both URLs side by side:

- **Preview** (`id-preview--...lovable.app`) — renders the full page. Screenshot confirms hero, terminal logs, CTAs all visible. No runtime errors.
- **Published** (`ajaybervanshi.lovable.app`) — still blank brown screen. Console shows:
  ```
  Error: Missing Supabase URL or publishable key
    at /assets/index-C-8n4Ev0.js
  ```

So the code is fine. The deployed bundle is a stale build that was produced before `.env` had the Supabase values, and `src/integrations/supabase/client.ts` throws at module load time when they are missing — which kills the whole React tree before it can render.

The `txt.includes` Hero fix from earlier is already in place and working in preview. It is not related to the blank published page.

## The real fix (so this can never happen again)

Two changes, both small:

1. **Inline the Supabase URL + publishable key in `src/integrations/supabase/client.ts`** as the fallback when `import.meta.env.VITE_SUPABASE_*` is missing, and **remove the `throw`**. The publishable (anon) key is safe to ship in client code — that's its entire purpose, and it's already exposed in every Supabase request from the browser. This means even if a future publish ever misses the env injection, the app still boots.

   ```ts
   const SUPABASE_URL =
     import.meta.env.VITE_SUPABASE_URL ?? "https://ssbrllliprffeegamygw.supabase.co";
   const SUPABASE_PUBLISHABLE_KEY =
     import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "<anon key>";
   // no throw
   ```

2. **Republish once.** This is the only step that has to happen on your side — I cannot click Publish for you. After step 1 is in code, you click **Publish → Update**, then hard-refresh `ajaybervanshi.lovable.app` (Ctrl/Cmd+Shift+R). The new bundle will load and the page will render.

After this, any future republish is self-healing: if env injection ever fails again, the bundle still has working Supabase credentials baked in and the page renders.

## What I will NOT change

- No schema, RLS, or security changes. The current posture (service_role-only sensitive tables, validated visitor inserts, SECURITY DEFINER contact path) stays exactly as it is.
- No edge function or migration edits.
- No removal of `next-themes` or other deps — they're working in preview.
- No design changes.

## Verification after you Update

I will reload the published URL in the browser tool, screenshot it, and confirm:
- Page renders (hero, terminal, sections).
- Console has no "Missing Supabase URL" error.
- Visitor insert still hits `/rest/v1/visitors` with status 201.

```text
current:  stale build → throw at load → blank brown page
after:    new build with fallback creds → boots even if env missing → page renders
```
