## 2026-10-25 - Throttled scroll listeners with requestAnimationFrame
**Learning:** Attaching expensive operations (DOM querying and state updates) directly to the scroll event can cause severe layout thrashing and main thread blocking, as scroll events can fire much faster than the browser's refresh rate.
**Action:** Always wrap scroll event listeners that trigger state updates or DOM reads with `requestAnimationFrame` throttling and use `{ passive: true }` to enable smoother scrolling.

## 2024-10-27 - Throttled mousemove listeners with requestAnimationFrame
**Learning:** Attaching expensive operations directly to the mousemove event (such as `useMotionValue` sets that trigger layout recalcs) can cause severe layout thrashing and main thread blocking, as mousemove events fire very frequently.
**Action:** Always wrap mousemove event listeners that trigger state updates or framer-motion value changes with `requestAnimationFrame` throttling to enable smoother animations and reduce unneeded work.
