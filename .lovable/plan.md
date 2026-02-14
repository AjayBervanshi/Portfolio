

## Issues Found and Fixes

### 1. Notification Issue: User not receiving SMS, You not receiving Email

**Root Cause**: After analyzing the notification logs, the `send-notifications` edge function correctly makes 4 separate API calls. However, there's a critical issue in how NotificationAPI works -- when you send with `type: 'portfolio_contact_form_for_user'`, the template on NotificationAPI's dashboard controls which channels are active.

**The problem**: Each `notificationapi.send()` call includes BOTH `email` and `number` fields in the `to` object for the user call (step 1 in old `send-contact-email`). The current `send-notifications` function already splits into 4 calls, BUT:
- The user EMAIL call (step 1) only passes `email` -- this is correct
- The user SMS call (step 2) passes `number` -- this is correct  
- Ajay EMAIL call (step 3) only passes `email` -- correct
- Ajay SMS call (step 4) only passes `number` -- correct

The code logic looks correct. The issue is most likely on your **NotificationAPI dashboard**:
- Template `portfolio_contact_form_for_user` must have **both EMAIL and SMS channels enabled**
- Template `portfolio_contact_form_to_me` must have **both EMAIL and SMS channels enabled**

**Action needed from you**: Check your NotificationAPI dashboard and ensure both templates have both email and SMS channels configured and active.

**Code fix**: I'll also add better error logging and ensure the `send-contact-email` function (which is an older duplicate) is not interfering. I'll update `send-notifications` to add more detailed logging so you can diagnose channel-level failures.

### 2. Background - Already Using Framer Motion

The `ThreeBackground.tsx` component already uses `framer-motion` (Framer's open-source animation library). This is the same animation engine that powers framer.com. The current implementation includes:
- Floating particles with glow effects
- SVG connection lines between nearby nodes
- Mouse parallax interaction
- Ambient glow orbs

The background is consistent across mobile and desktop (same Framer Motion code, just fewer particles on mobile for performance). No changes needed here.

### 3. Console Errors/Warnings Fix

I'll check for and fix:
- Unused imports (`useEffect`, `useState` in ThreeBackground.tsx)
- The `window.innerWidth`/`window.innerHeight` usage at module level in ThreeBackground (can cause SSR issues)
- The `colors` object being recreated every render (should be moved outside component or memoized)

---

## Technical Changes

### File: `supabase/functions/send-notifications/index.ts`
- Add detailed per-channel logging with the notification type and channel being sent
- Add a check: if user has no phone, skip SMS; if no email, skip email (already done, but add explicit logging)
- No structural changes -- the 4-call pattern is correct

### File: `src/components/ThreeBackground.tsx`
- Move `colorMap` and `glowMap` outside the component (they're static, no need to recreate each render)
- Fix `window.innerWidth`/`window.innerHeight` usage -- wrap in a state/effect to avoid issues during SSR or initial render when window may not be available
- Remove unused imports if any

### File: `supabase/functions/send-contact-email/index.ts`
- This is an older duplicate function. I'll update its notification logic to match the 4-call pattern in `send-notifications` for consistency (in case it's ever called directly)

### Important Note for You
To fully fix the SMS/email issue, you **must** verify in your NotificationAPI dashboard:
1. Go to `portfolio_contact_form_for_user` template -- enable both Email AND SMS channels
2. Go to `portfolio_contact_form_to_me` template -- enable both Email AND SMS channels
3. Make sure your SMS provider (Twilio, etc.) is properly connected in NotificationAPI

