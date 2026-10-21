# Content Gaps Report

1. **Resume File Missing**:
   - The command palette references downloading a resume (`/resume-ajay-bervanshi.pdf`).
   - `public/resume-ajay-bervanshi.pdf` does NOT exist in the repository.
   - You must upload an actual resume PDF to the `public/` directory for this download to work.

2. **Certifications & PerformanceWins Not Displayed**:
   - The components `Certifications.tsx` and `PerformanceWins.tsx` contain data but are currently not imported or rendered on the main landing page (`src/pages/Index.tsx`). If you want this data presented, it should either be integrated into the landing page or added as additional routes.

3. **External Links Needed**:
   - The "LinkedIn Profile" link opens `https://linkedin.com/in/ajaybervanshi`. Ensure this URL is correct and active.
