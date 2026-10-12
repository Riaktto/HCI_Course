# Course Presentation Design Standard & Typography Specification
**Institution:** Mohammed VI Polytechnic University (UM6P)  
**Program:** Master in Computer Science & Human-Centered Computing  
**Course:** Human-Computer Interaction (HCI)  
**Author/Lecturer:** Prof. Yassine Ben-Aboud  
**Status:** PROPOSED STANDARD (Pending Validation Phase 1)  
**Target Viewport Canvas:** 1920 × 1080 px (16:9 Standard Projection Resolution)

---

## 1. Executive Intent & Projection-First Constitution

1. **Classroom Projection Over Laptop Reading**:
   - Every slide is architected for large-hall lecture projection at 1920×1080, where students in row 12+ must be able to read titles, diagrams, labels, and comparisons without straining.
   - Text must never be miniaturized to squeeze bloated content into a slide. If content overflows, split across slides or apply progressive disclosure.

2. **Zero-Pill & Anti-Clutter Discipline**:
   - Avoid generic AI-card templates and endless rounded pill containers.
   - Distinct content requires purpose-built visual architecture: clean comparison columns, directional flow diagrams, data bars, tabular figures, and typographic contrast.

3. **Absolute Protection of Session 1**:
   - Session 1 is the canonical historical reference. It must not be modified or regressed.
   - The design system standardizes the visual language across all sessions (Session 1 identity, Session 2+, Capstone, and Future Sessions).

---

## 2. Typography Hierarchy & Sizing Rules (1920 × 1080 Native Canvas — Enlarged Standard)

All typography targets apply directly at the standard **1920 × 1080 px** canvas. Based on projector feedback, sizing has been elevated by **+10% to +15%**:

| Level / Element | Base Target Size | **Enlarged Target (+10%)** | Font Family | Line Height | Font Weight | Purpose / Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** (Slide 1) | `72 – 96 px` | **`84 – 100 px`** | Fraunces (Serif Display) | `1.05` | Medium (`500`) | Course & Session Hero Titles |
| **Slide Title** | `44 – 56 px` | **`58 – 62 px`** | Fraunces (Serif Display) | `1.08` | Medium (`500`) | Primary slide headline; maximum 2 lines |
| **Section Heading / Subtitle** | `36 – 44 px` | **`42 – 44 px`** | Plus Jakarta Sans | `1.2` | Light / Semibold | Conceptual subhead or category divider |
| **Card / Column Heading** | `26 – 32 px` | **`30 – 34 px`** | Plus Jakarta Sans | `1.3` | Bold (`700`) | Sub-blocks, comparison column headers |
| **Main Body Text** | `28 – 32 px` | **`33 – 35 px`** | Plus Jakarta Sans | `1.42` | Normal (`400`) | Explanatory sentences, core narrative text |
| **Activity Instructions** | `28 – 32 px` | **`32 – 34 px`** | Plus Jakarta Sans | `1.35` | Medium / Semibold | Direct prompts for student exercises |
| **Diagram Labels & Flow Nodes** | `≥ 24 px` | **`26 – 28 px`** | Plus Jakarta Sans / Mono | `1.3` | Bold / Medium | Stage indicators, node titles, inputs |
| **Secondary Text & Notes** | `≥ 20 px` | **`22 – 24 px`** | JetBrains Mono / Sans | `1.4` | Regular / Tabular | Captions, citations, formula derivations |
| **Buttons & Interactive Controls** | `20 – 24 px` | **`24 – 26 px`** | Plus Jakarta Sans / Mono | `1.2` | Semibold (`600`) | Active/hover/pressed states, timers |
| **Institutional Header/Footer** | `14 – 16 px` | **`15 – 17 px`** | JetBrains Mono | `1.0` | Medium / Bold | University branding, slide counter |

### Strict Rule on Overflow & Slide Partitioning:
> **Never solve an overcrowded slide by shrinking text.**  
> When content with enlarged font sizes approaches the 1080p boundary, partition the material across sequential slides:
> - **Slide A (Concepts & Structure):** Hierarchy, explanatory narrative, and two-column comparison.
> - **Slide B (Visual Mechanics & Data):** High-density process flow diagrams and quantitative charts.
> - **Slide C (Application & Activity):** Code implementation and classroom timer/discussion exercise.

---

## 3. UM6P Institutional Palette & Contrast Standards

| Token | Hex Code | Tailwind Role | Usage Guideline |
| :--- | :--- | :--- | :--- |
| **UM6P Terracotta** | `#E5391C` | `text-[#E5391C]`, `bg-[#E5391C]` | Primary institutional accent, active states, key takeaway badges |
| **Terracotta Dark** | `#C92B10` | `hover:bg-[#C92B10]` | Button hover and pressed active states |
| **Terracotta Subtle** | `#FDF5F3` | `bg-[#FDF5F3]`, `border-[#FAD6CF]` | Callout container backgrounds, active tabs |
| **Canvas Stone** | `#FAF9F6` | `bg-[#FAF9F6]` | Standard slide canvas background |
| **Primary Charcoal** | `#222222` / `#2D2D2E` | `text-[#222222]` | Primary headings, prominent body copy (high projection contrast) |
| **Secondary Charcoal** | `#525254` / `#5F5E61` | `text-[#525254]` | Secondary body descriptions, subtitles |
| **Muted Metadata** | `#6E6D70` | `text-[#6E6D70]` | Institutional captions, slide counter, timestamps |
| **Structural Border** | `#E8E2D9` | `border-[#E8E2D9]` | Clean architectural hairline dividers and borders |
| **Emerald Verification** | `#059669` / `#065F46` | `text-emerald-800`, `bg-emerald-50` | Positive comparison, empirical law confirmation |
| **Amber Warning** | `#D97706` / `#92400E` | `text-amber-800`, `bg-amber-50` | Gulfs of execution, friction warnings, timers |

---

## 4. Header & Footer Structural Blueprint

Every standard slide must maintain an identical, rock-solid frame:

```
+-------------------------------------------------------------------------------------------------------+
|  [UM6P Logo Compact] | [ACT 1 · THE HUMAN MACHINE]                             Slide 04 / 42         |  <- Header (Hairline border-b #E8E2D9, h-12)
+-------------------------------------------------------------------------------------------------------+
|                                                                                                       |
|  [SLIDE TITLE: 48-56px Fraunces Serif]                                                                |
|  [SUBTITLE / SECTION HEADING: 32-36px Light]                                                         |
|                                                                                                       |
|  [MAIN CONTENT AREA: 1920x1080 Viewport]                                                              |
|   - Multi-column comparison OR                                                                        |
|   - Visual diagram flow with arrows OR                                                                |
|   - Quantitative data chart with legible figures OR                                                   |
|   - Interactive lab experiment container                                                             |
|                                                                                                       |
|  [TAKEAWAY / SYNTHESIS BANNER: 22-26px Fraunces or Mono]                                              |
|                                                                                                       |
+-------------------------------------------------------------------------------------------------------+
|  Mohammed VI Polytechnic University · HCI Master Course                           Prof. Y. Ben-Aboud  |  <- Footer (Hairline border-t #E8E2D9, h-10)
+-------------------------------------------------------------------------------------------------------+
```

---

## 5. Visual Cases & Complex Content Guidelines

1. **Title & Hierarchy**:
   - Use `font-serif-display` (`Fraunces`) for the primary title.
   - Use high-contrast charcoal `#2D2D2E` so projection light bleed does not wash out letterforms.

2. **Diagrams & Flow Nodes**:
   - Minimum label font size: **24px**.
   - Connecting arrows must be at least `2.5px` thick with visible heads (`#E5391C` or `#222222`).
   - Node backgrounds must have solid fills (`#FFFFFF` with `#E8E2D9` border or subtle `#FDF5F3` tint).

3. **Two-Column Comparisons**:
   - Side-by-side columns must have equal visual weight.
   - Use contrasting semantic headers (e.g., *Physical Affordance* vs *Perceived Signifier*).
   - Key difference callouts at the bottom of each column with distinct status indicators.

4. **Data Visualizations & Quantitative Metrics**:
   - Bar and scatter charts must feature direct, inline text labels (minimum **20–24px**).
   - Axis labels must be high-contrast monospace (JetBrains Mono).
   - Never rely on mouse hover tooltips for primary presentation data; projection audiences cannot hover.

5. **Code & Technical Content**:
   - Monospace font: `JetBrains Mono` with tabular numbers.
   - Syntax highlighting with high-contrast background (`#1F2421` dark slate or `#F4F0E8` warm parchment).
   - Minimum code font size: **20–22px**.

6. **Classroom Instructions & Interactive Activities**:
   - Step numbers must be prominent badges (`32px` badge diameter).
   - Instructions written in imperative sentences at **28–32px**.
   - Prominent countdown timer or active toggle with distinct states (Normal, Hover, Selected, Reset).

7. **Captions & Annotations**:
   - Positioned beneath visuals with an italicized or monospace prefix (e.g., `SOURCE:`, `OBSERVATION:`).
   - Minimum font size: **20px**.

---

## 6. Implementation Strategy for Rollout

1. **Validation Gate (Phase 1)**: Single isolated demo slide (`SlideDemoControlSample.tsx`) placed in an isolated preview mode for explicit user sign-off.
2. **Phase 2 (Session 2 Standard Alignment)**: Apply validated standard to Session 2 slides.
3. **Phase 3 (Universal Template Architecture)**: Establish reusable slide primitive components (`SlideFrame`, `ComparisonColumns`, `DiagramFlow`, `MetricBar`, `ActivityBlock`).
