# Recruiter-Focused UX Audit: Ajay DBA Portfolio

## Goal
Optimize the first 30 seconds for a technical recruiter. Ensure the presentation is 70% Senior DBA Professional / 30% Futuristic Personality.

## Section Audit

1. **Hero Section (`Hero.tsx`)**
   - **Current State:** Typing logs, glowing tags, "Production Database Operations Commander" title.
   - **Decision: REDESIGN.**
   - **Action:** Change title to a standard industry term ("Senior MS SQL Server DBA"). Ensure clear bullet points or tags immediately show AWS, HA/DR, and Performance Tuning. Tone down the typing logs on the right to be subtle, perhaps rename to "System Status" rather than "SQL_REPL_AGENT".

2. **CyberDBAWorkspace (Interactive Demos)**
   - **Current State:** Highly interactive AlwaysOn simulator, T-SQL console, Dashboard. Labeled with "Interactive Demonstration".
   - **Decision: SIMPLIFY / KEEP.**
   - **Action:** Keep the tools as they demonstrate real knowledge. Soften the border glows. Use professional descriptive labels like "Interactive SQL Server HA Demo" instead of generic mock badges. Make the tabs look more like a standard dashboard than a hacker terminal.

3. **Backgrounds (`MatrixClusterBackground.tsx`)**
   - **Current State:** Animated particle network glowing in the background.
   - **Decision: SIMPLIFY.**
   - **Action:** Substantially reduce opacity. It should feel like a watermark or subtle texture, not a distraction.

4. **Timeline (`FuturisticTimeline.tsx`)**
   - **Current State:** Expanding cards.
   - **Decision: KEEP.**
   - **Action:** Keep, as it holds the resume data. Ensure typography is highly legible (no overly tiny monospace fonts for important paragraphs).

5. **Contact (`Contact.tsx`)**
   - **Current State:** Form with "EXECUTE COMMIT".
   - **Decision: SIMPLIFY.**
   - **Action:** Change button to "Send Message" or "Contact Me". A recruiter wants to send an email, not execute a database transaction to reach him.
