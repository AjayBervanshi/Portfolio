## 2026-10-25 - Accessibility: Form Fields
**Learning:** Found that custom `Label` and `Input`/`Textarea` components in forms were lacking the standard HTML linking via `htmlFor` and `id`. This impacts screen reader accessibility and prevents users from focusing inputs by clicking on labels.
**Action:** Always ensure that form `Label`s are mapped to their respective inputs using `htmlFor` and `id` when creating or auditing forms.

## 2026-10-25 - Dynamic ARIA States on Icon Buttons
**Learning:** Found that custom navigation controls (like mute buttons and mobile menus) often omit dynamic accessibility attributes (`aria-pressed`, `aria-expanded`). This causes screen readers to announce them as generic buttons without their current state (e.g. knowing if the menu is actually open or closed).
**Action:** Always include dynamic ARIA states (`aria-expanded={isOpen}`, `aria-pressed={isActive}`) on custom toggle buttons, alongside `aria-label` for icon-only elements.

## 2026-10-27 - Accessibility: Window Management Controls
**Learning:** Found that custom window management controls (minimize, maximize, close) in simulated desktop environments often lack `aria-label` attributes. This causes screen readers to announce them as generic buttons, making it difficult for visually impaired users to manage the simulated windows.
**Action:** Always include `aria-label` attributes on icon-only buttons, especially in complex UI components like simulated desktops.

## 2026-10-27 - Accessibility: Custom Modal Dialogs
**Learning:** Found that custom modal implementations (e.g., using `framer-motion`) often lack the necessary ARIA attributes to be recognized as dialogs by screen readers. This prevents users from understanding they are in a dialog context and navigating it properly.
**Action:** Always include `role="dialog"`, `aria-modal="true"`, and an appropriate `aria-label` (or `aria-labelledby`) on the primary container element of custom modals to ensure screen readers announce them correctly.
## 2026-10-31 - Enhanced Contact Form Accessibility
**Learning:** While React state handles form validation visually, screen readers rely on explicit `aria-invalid` and `aria-describedby` attributes to announce errors contextually with their associated input fields.
**Action:** Always ensure that form inputs have their required states explicitly set and that error messages are properly linked via ARIA attributes in custom form components.
