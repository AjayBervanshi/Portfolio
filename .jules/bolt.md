## 2026-10-25 - Throttled scroll listeners with requestAnimationFrame
**Learning:** Attaching expensive operations (DOM querying and state updates) directly to the scroll event can cause severe layout thrashing and main thread blocking, as scroll events can fire much faster than the browser's refresh rate.
**Action:** Always wrap scroll event listeners that trigger state updates or DOM reads with `requestAnimationFrame` throttling and use `{ passive: true }` to enable smoother scrolling.

## 2024-10-27 - Throttled mousemove listeners with requestAnimationFrame
**Learning:** Attaching expensive operations directly to the mousemove event (such as `useMotionValue` sets that trigger layout recalcs) can cause severe layout thrashing and main thread blocking, as mousemove events fire very frequently.
**Action:** Always wrap mousemove event listeners that trigger state updates or framer-motion value changes with `requestAnimationFrame` throttling to enable smoother animations and reduce unneeded work.

## 2023-10-29 - Prevent 10Hz re-renders in CyberDBAWorkspace
**Learning:** Having a fast-updating state (like a live telemetry SLA ticker using `setInterval` every 100ms) at the top-level of a large React component containing unmemoized heavy child components causes the entire subtree to re-render 10 times a second, creating massive render churn.
**Action:** Extract the fast-changing state and its directly associated UI (e.g. `LiveMetrics`) into a separate sub-component so that state updates are isolated, preventing unnecessary re-renders of the parent and sibling components.
