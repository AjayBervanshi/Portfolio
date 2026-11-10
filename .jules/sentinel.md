## 2025-05-24 - Prevent Information Leakage in Form Errors
**Vulnerability:** Information Disclosure via Error Messages
**Learning:** The fallback error handler in `src/components/Contact.tsx` was directly exposing the raw error message to the client (`fallbackErr.message`) using `toast.error()`. Exposing stack traces or specific API failure reasons can reveal system internals to end users.
**Prevention:** Replace raw error exposure with secure, generic messages like "Unable to process your request at this time." Keep system internals obfuscated on the client-side.
## 2026-11-10 - Prevent DoS via Input Length Constraints
**Vulnerability:** Missing Input Length Validation
**Learning:** The form in `src/components/Contact.tsx` lacked input length constraints both on the client-side validation logic and HTML level. This could allow maliciously large inputs that might cause a denial-of-service or database insertion failures.
**Prevention:** Added `maxLength` properties to form inputs (name, email, phone, subject, and message) and synchronized these limits with the component's `validate` function.
