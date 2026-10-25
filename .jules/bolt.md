## 2026-10-25 - Throttled scroll listeners with requestAnimationFrame
**Learning:** Attaching expensive operations (DOM querying and state updates) directly to the scroll event can cause severe layout thrashing and main thread blocking, as scroll events can fire much faster than the browser's refresh rate.
**Action:** Always wrap scroll event listeners that trigger state updates or DOM reads with `requestAnimationFrame` throttling and use `{ passive: true }` to enable smoother scrolling.
