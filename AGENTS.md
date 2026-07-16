# AGENTS.md — AI Assistant Briefing
# Read this file before doing ANYTHING in this project.
# This is the WebDev Reference project — a static educational website.

## Project Overview
- **Name:** WebDevRef — Universal Laws of Web Development
- **Goal:** A personal reference guide covering pre-project setup, GitHub workflow, AI context management, universal dev laws, workflow phases, knowledge gaps, and AI acceleration
- **Type:** Static HTML/CSS/JS — no framework, no build step
- **Status:** Active — continuously expanding with new sections
- **Live:** Open index.html directly in any browser (no server needed)

## Tech Stack
- **Structure:** HTML5 (semantic elements, single-page with anchor sections)
- **Styling:** Vanilla CSS with CSS custom properties (design tokens in :root)
- **Logic:** Vanilla JavaScript ES6+ (IntersectionObserver, Canvas API, no libraries)
- **Fonts:** Google Fonts — Outfit (body) + JetBrains Mono (code)
- **Icons:** Emoji only (no icon library)
- **Build:** None — pure static files

## Folder Structure
```
Rapid Web Development/
├── index.html          ← Single HTML file, ALL sections here
├── README.md           ← Public project documentation
├── AGENTS.md           ← This file — AI briefing
├── .gitignore          ← Git ignore rules
│
├── css/
│   └── style.css       ← ALL styles — design tokens + every section's CSS
│
├── js/
│   └── script.js       ← Scroll effects, particles, nav, reveal animations
│
├── assets/
│   ├── images/         ← Screenshots and images
│   ├── fonts/          ← Self-hosted fonts (none yet)
│   └── icons/          ← Favicon etc (none yet)
│
└── pages/              ← Future additional HTML pages (empty for now)
```

## Design System — CSS Variables (DO NOT DEVIATE)
All design tokens are in `css/style.css` under `:root`. Always use these:
- **Background:** `--bg-primary: #050510`, `--bg-secondary: #0a0a1a`, `--bg-card`
- **Gradient:** `--grad-start: #6366f1` (indigo), `--grad-mid: #8b5cf6` (violet), `--grad-end: #06b6d4` (cyan)
- **Accents:** `--accent-primary`, `--accent-secondary`, `--accent-cyan`, `--accent-green`, `--accent-amber`, `--accent-red`
- **Text:** `--text-primary`, `--text-secondary`, `--text-muted`
- **Radius:** `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-lg: 20px`, `--radius-xl: 32px`
- **Shadows:** `--shadow-glow`, `--shadow-card`

## Coding Standards
- **CSS class naming:** BEM-inspired, section-prefixed (e.g., `.gh-block`, `.aic-rule-card`, `.pp-card`)
- **Each new section** gets its own CSS block in style.css with a clear comment header
- **Scroll reveal:** Add new card elements to the `revealTargets` selector in script.js
- **No inline styles** — all styles go in css/style.css
- **No external JS libraries** — vanilla JS only
- **Hover effects** on every interactive card element (translateY + border-color)
- **Code blocks** use `rgba(0,0,0,0.45)` background + `rgba(99,102,241,0.2)` border
- **Monospace text** always uses JetBrains Mono, color: `var(--accent-cyan)`

## Section Structure Pattern
Every section follows this pattern:
```html
<section class="section [section-alt?]" id="sectionid">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Category Label</span>
      <h2 class="section-title">Title<br/><span class="gradient-text">Subtitle</span></h2>
      <p class="section-subtitle">Description...</p>
    </div>
    <!-- section content -->
  </div>
</section>
```
- `.section` = white/dark bg, `.section-alt` = `var(--bg-secondary)` bg, alternating
- Always add nav link AND footer link when adding a new section

## Current Sections (in order)
1. `#hero` — Hero with particle canvas
2. `#preproject` — Pre-Project Setup Checklist (8 steps)
3. `#github` — GitHub Setup & Workflow (6 blocks)
4. `#aicontext` — AI Context Files & Knowledge Management (5 blocks)
5. `#prelaunch` — Pre-Launch Checklist (6 categories)
6. `#cssarch` — CSS Architecture & Responsive Design (8 cards)
7. `#performance` — Performance Optimization Guide (metrics + cards)
8. `#testing` — Testing Strategy (Pyramid + Rules)
9. `#debugging` — Debugging Toolkit (6 cards)
10. `#apidesign` — API Design Best Practices (REST, Status codes, auth, etc.)
11. `#deployment` — Deployment Guide (flow + platform cards + rules)
12. `#devtools` — Developer Tools & Workflow (Extensions + productivity cards)
13. `#laws` — 12 Universal Laws of Web Development
14. `#workflow` — 7-Phase Development Workflow
15. `#gaps` — Knowledge Gaps by category
16. `#ai` — AI Acceleration section
17. `#antigravity` — Mastering Antigravity AI
18. `#cheatsheet` — Developer Cheat Sheet

## Git Workflow
- **Branch naming:** `feature/`, `fix/`, `chore/`, `docs/`
- **Commit style:** Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `chore:`)
- **Branch from:** `main` (small project, no develop branch needed)
- **Never** force-push to main

## What NOT to Do
- Do NOT add external CSS frameworks (no Tailwind, no Bootstrap)
- Do NOT add JavaScript libraries (no jQuery, no Alpine.js)
- Do NOT add a build system (no Webpack, no Vite) — keep it zero-dependency
- Do NOT use inline styles in HTML
- Do NOT change the :root CSS variables — extend them if needed
- Do NOT split into multiple HTML files without discussing first
- Do NOT add new Google Fonts without checking they match the existing Outfit + JetBrains Mono pair

## Adding a New Section — Checklist
When asked to add a new section:
1. [ ] Add nav `<li>` link in the `#navLinks` `<ul>`
2. [ ] Add section HTML between the correct sections (maintain logical flow)
3. [ ] Add CSS in `css/style.css` with a clearly labelled comment block
4. [ ] Add new card elements to `revealTargets` in `js/script.js`
5. [ ] Add footer link in `.footer-links`
6. [ ] Commit with `feat: add [section name] section`
