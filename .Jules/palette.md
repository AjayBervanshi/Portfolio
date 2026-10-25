## 2026-10-25 - Accessibility: Form Fields
**Learning:** Found that custom `Label` and `Input`/`Textarea` components in forms were lacking the standard HTML linking via `htmlFor` and `id`. This impacts screen reader accessibility and prevents users from focusing inputs by clicking on labels.
**Action:** Always ensure that form `Label`s are mapped to their respective inputs using `htmlFor` and `id` when creating or auditing forms.
