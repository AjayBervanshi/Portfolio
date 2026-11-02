## 2025-05-24 - Prevent Information Leakage in Form Errors
**Vulnerability:** Information Disclosure via Error Messages
**Learning:** The fallback error handler in `src/components/Contact.tsx` was directly exposing the raw error message to the client (`fallbackErr.message`) using `toast.error()`. Exposing stack traces or specific API failure reasons can reveal system internals to end users.
**Prevention:** Replace raw error exposure with secure, generic messages like "Unable to process your request at this time." Keep system internals obfuscated on the client-side.
