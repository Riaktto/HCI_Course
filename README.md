# UM6P Human-Computer Interaction (HCI) Course — Session 1

Interactive university lecture laboratory and slide deck for **Session 1: Human-Computer Interaction — Understanding the Interaction Between People and Technology**, designed for **Mohammed VI Polytechnic University (UM6P)**.

---

## 🎨 UM6P Design Identity
- **Canvas & Tone**: Light, warm architectural linen and limestone surfaces (`#F6F4EF`, `#FAF9F6`, `#FFFFFF`) with subtle Moroccan terracotta warmth (`#D7492A`).
- **Typography**:
  - Display Serifs: *Fraunces* for commanding, academic presentation titles.
  - Body & UI: *Plus Jakarta Sans* for high-legibility projector reading.
  - Technical & Code: *JetBrains Mono* for telemetry, SQL commands, and timers.
- **Brand Mark**: Official vector geometric UM6P emblem and wordmark.

---

## 🚀 Publishing to GitHub Pages

This repository is pre-configured for automated deployment to GitHub Pages.

### Method 1: Automated GitHub Actions (Recommended)
1. Push this codebase to your GitHub repository (branch `main` or `master`).
2. In your repository on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build the Vite applet and publish it to `https://<username>.github.io/<repo-name>/`.

### Method 2: Manual Build & Push
```bash
npm install
npm run build
```
The output directory is `dist/`. Because `vite.config.ts` sets `base: './'`, the build works in any subpath on GitHub Pages or custom domain without broken asset links.

---

## 🏛️ Modular 12-Session Architecture

The curriculum is structured into 12 4-hour sessions (48 total academic hours):
1. **Session 01 (Active)**: Foundations & Mental Models (44 slides, 6 interactive labs)
2. **Session 02**: The Human: Biology, Perception & Cognition
3. **Session 03**: User Research & Contextual Inquiry
4. **Session 04**: Requirements Engineering & Personas
5. **Session 05**: Information Architecture & Mental Models
6. **Session 06**: Interaction Design & Norman Principles
7. **Session 07**: UI Design Systems & Ergonomics
8. **Session 08**: Rapid Prototyping & Wireframing
9. **Session 09**: Usability Evaluation & Lab Testing
10. **Session 10**: Accessibility, Inclusivity & Ethics
11. **Session 11**: Advanced Interaction & Emerging Tech
12. **Session 12**: Capstone Demonstrations & Final Exam

### Extending Content:
- Session metadata is defined in `src/data/sessions.ts`.
- Slides are defined in `src/data/slides.ts` with `title`, `subtitle`, `speakerNotes`, `activity`, and `experimentId`.
- Add new session slide arrays or files in `src/data/` to scale to Sessions 2 through 12.

---

## 🕹️ Presentation Controls & Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> | Next Slide |
| <kbd>←</kbd> / <kbd>PageUp</kbd> | Previous Slide |
| <kbd>Home</kbd> / <kbd>End</kbd> | Jump to First / Last Slide |
| <kbd>G</kbd> or <kbd>O</kbd> | Open Visual Slide Navigator Modal |
| <kbd>P</kbd> | Toggle Presenter Notes & Teleprompter Drawer |
| <kbd>T</kbd> | Toggle Interactive Classroom Activity Countdown Timer |
| <kbd>C</kbd> | Open 12-Session Curriculum Architecture Overview |
| <kbd>F</kbd> | Toggle Borderless Fullscreen Projector Mode |
| <kbd>Esc</kbd> | Close any open drawer or modal |

---

## 🧪 Live Interactive Classroom Experiments

- **Experiment 1 (Slide 4)**: *Same Functionality, Different Experience* — Dense Terminal vs Human-Centered Train Booking (Casablanca to Benguerir).
- **Experiment 2 (Slide 14)**: *The Interaction Loop & Broken Feedback* — UM6P Student Bursar payment terminal showing normal, missing, and delayed feedback.
- **Experiment 3 (Slide 24)**: *Context Changes Interaction* — In-vehicle touchscreen simulator under Desk, Night Highway Driving, and Sahara Sun Glare conditions.
- **Experiment 4 (Slide 27)**: *Chamber of Bad Design* — Hostile university course enrollment portal with 45-second session countdown and forensic callouts.
- **Experiment 5 (Slide 33)**: *Empirical Usability Test Bench* — Dual-trial patient intake form logging real-time duration, keystrokes, and validation errors according to ISO 9241-11.
- **Experiment 6 (Slide 41)**: *Cognitive Bandwidth & Visual Saliency* — 3-second flash memory test comparing unstructured vs structured data.
- **Capstone Diagnostic (Slide 42)**: *Hospital Infusion Pump Autopsy* — 3-minute classroom timer analyzing mode errors and decimal suppression in clinical safety.
