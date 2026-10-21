# Product and Design Decisions

1. **Hero Component (`Hero.tsx`)**
   - **Status**: Improve
<<<<<<< Updated upstream
   - **Reasoning**: The layout is good (text left, logs right) but can feel slightly cluttered. The "boot log" simulation is fun but doesn't clearly say it's simulated, which is a key requirement.
=======
   - **Reasoning**: The layout is good (text left, logs right) but can feel slightly cluttered. The "boot log" simulation is fun but doesn't clearly say it's simulated, which is a key requirement.
>>>>>>> Stashed changes
   - **Action**: Add explicit "(Simulated System Log)" to the terminal header. Refine spacing and reduce any overly bright glows that compete with readable text.

2. **CyberDBAWorkspace / Tabs (`CyberDBAWorkspace.tsx`, `SQLTerminal.tsx`, `DBADashboard.tsx`)**
   - **Status**: Improve
   - **Reasoning**: The tools (SQL Terminal, AlwaysOn simulator, DB Incident Dashboard) are very impressive. However, the user explicitly asked to "Clearly label simulations. Do not invent achievements, metrics, resume files, or production integrations." The current dashboard invents incidents and telemetry.
<<<<<<< Updated upstream
   - **Action**: Add explicit sub-headers or badges to `AlwaysOnSimulator`, `SQLTerminal`, and `DBADashboard` declaring them as "Interactive Demonstrations". Ensure fake telemetry clearly says "Mock Metric".
=======
   - **Action**: Add explicit sub-headers or badges to `AlwaysOnSimulator`, `SQLTerminal`, and `DBADashboard` declaring them as "Interactive Demonstrations". Ensure fake telemetry clearly says "Mock Metric".
>>>>>>> Stashed changes

3. **FuturisticTimeline (`FuturisticTimeline.tsx`)**
   - **Status**: Improve
   - **Reasoning**: It holds the resume data but can be dense. Expanding/collapsing is good. Needs slightly better typography hierarchy.
   - **Action**: Increase line height and font contrast for job descriptions. Ensure "metrics" icons aren't overwhelming.

4. **Backgrounds / Matrix Rain / 3D Space**
   - **Status**: Keep / Refine
   - **Reasoning**: The user asked to "Use animation selectively. More glow, particles, and typing effects do not automatically mean better design."
   - **Action**: Reduce opacity/density of background particle effects so the content stands out more clearly.

5. **Contact (`Contact.tsx`)**
   - **Status**: Improve
<<<<<<< Updated upstream
   - **Reasoning**: Standard form, fits the theme.
   - **Action**: Keep as is but ensure form error states and successful states are polished and accessible.
=======
   - **Reasoning**: Standard form, fits the theme.
   - **Action**: Keep as is but ensure form error states and successful states are polished and accessible.
>>>>>>> Stashed changes

6. **Global ESLint Rules (`eslint.config.js`)**
   - **Status**: Fix
   - **Reasoning**: The prompt says "Do not silence lint rules merely to produce a clean result."
   - **Action**: Re-enable the rules previously disabled (`@typescript-eslint/no-explicit-any`, `react-hooks/exhaustive-deps`, etc.) and manually fix the typing and dependency arrays across the components.
