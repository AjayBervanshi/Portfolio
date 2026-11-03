## 2026-10-25 - Throttled scroll listeners with requestAnimationFrame
**Learning:** Attaching expensive operations (DOM querying and state updates) directly to the scroll event can cause severe layout thrashing and main thread blocking, as scroll events can fire much faster than the browser's refresh rate.
**Action:** Always wrap scroll event listeners that trigger state updates or DOM reads with `requestAnimationFrame` throttling and use `{ passive: true }` to enable smoother scrolling.

## 2024-10-27 - Throttled mousemove listeners with requestAnimationFrame
**Learning:** Attaching expensive operations directly to the mousemove event (such as `useMotionValue` sets that trigger layout recalcs) can cause severe layout thrashing and main thread blocking, as mousemove events fire very frequently.
**Action:** Always wrap mousemove event listeners that trigger state updates or framer-motion value changes with `requestAnimationFrame` throttling to enable smoother animations and reduce unneeded work.

## 2023-10-29 - Prevent 10Hz re-renders in CyberDBAWorkspace
**Learning:** Having a fast-updating state (like a live telemetry SLA ticker using `setInterval` every 100ms) at the top-level of a large React component containing unmemoized heavy child components causes the entire subtree to re-render 10 times a second, creating massive render churn.
**Action:** Extract the fast-changing state and its directly associated UI (e.g. `LiveMetrics`) into a separate sub-component so that state updates are isolated, preventing unnecessary re-renders of the parent and sibling components.
## 2026-11-03 - Throttle `mousemove` interactions to unblock Main Thread
**Learning:** Attaching heavily-computing functions or `getBoundingClientRect()` reads directly on `mousemove` handlers blocks the main thread because the browser tries to fire them up to 60+ times a second, which causes jank when state mutations or calculations take too long. Using a bare `mousemove` also violates performance best practices in React components with large render trees.
**Action:** Always wrap intense logical updates inside a `mousemove` (especially when checking bounding rects or setting refs) with `requestAnimationFrame` so calculations align smoothly with the browser’s render cycle. Also apply `{ passive: true }` where possible on event listeners so that scrolling or native UI actions are not unnecessarily delayed waiting on JavaScript execution.
