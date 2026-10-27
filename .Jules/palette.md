## 2026-10-25 - Accessibility: Form Fields
**Learning:** Found that custom `Label` and `Input`/`Textarea` components in forms were lacking the standard HTML linking via `htmlFor` and `id`. This impacts screen reader accessibility and prevents users from focusing inputs by clicking on labels.
**Action:** Always ensure that form `Label`s are mapped to their respective inputs using `htmlFor` and `id` when creating or auditing forms.

## 2026-10-25 - Dynamic ARIA States on Icon Buttons
**Learning:** Found that custom navigation controls (like mute buttons and mobile menus) often omit dynamic accessibility attributes (`aria-pressed`, `aria-expanded`). This causes screen readers to announce them as generic buttons without their current state (e.g. knowing if the menu is actually open or closed).
**Action:** Always include dynamic ARIA states (`aria-expanded={isOpen}`, `aria-pressed={isActive}`) on custom toggle buttons, alongside `aria-label` for icon-only elements.
