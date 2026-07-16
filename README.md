# ⬡ WebDevRef — Universal Laws of Web Development

> A personal reference guide covering universal laws of web app development, proven workflow models, critical knowledge gaps, and how AI agents like Antigravity accelerate development 1000×.

---

## 🎯 Project Goal

**Problem it solves:** Developers constantly forget foundational principles, skip process steps, or underestimate knowledge gaps — especially when moving fast. This reference site consolidates everything into one beautiful, always-accessible guide.

**Target audience:** Web developers of all levels — from beginners learning the fundamentals to seniors who need a quick-reference cheat sheet.

**Design style:** Dark mode, glassmorphism, vibrant indigo/violet/cyan gradient palette.

---

## ✨ Features

- **Pre-Project Setup Checklist** — 8 essential steps before writing a single line of code
- **12 Universal Laws** — Framework-agnostic principles that apply to every web project
- **7-Phase Workflow** — A repeatable, battle-tested development process
- **Knowledge Gaps** — Critical blind spots organised by category and priority level
- **AI Acceleration** — How AI agents compress weeks of work into hours
- **Antigravity Guide** — How to get the most out of the Antigravity AI coding assistant
- **Developer Cheat Sheet** — Performance, security, accessibility & CSS quick reference
- Animated particle canvas hero
- Scroll-reveal animations
- Active nav highlighting
- Fully responsive (mobile-first)

---

## 🗂️ Project Structure

```
Rapid Web Development/
│
├── index.html          # Main (and only) HTML page
├── README.md           # This file
├── .gitignore          # Git ignore rules
│
├── css/
│   └── style.css       # All styles — design tokens, components, layout
│
├── js/
│   └── script.js       # Scroll effects, particles, animations
│
├── assets/
│   ├── images/         # Project screenshots & images
│   ├── fonts/          # Self-hosted fonts (if any)
│   └── icons/          # Favicon and icon assets
│
└── pages/              # Additional HTML pages (future expansion)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (custom properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+, IntersectionObserver, Canvas API) |
| Fonts | Google Fonts — Outfit + JetBrains Mono |
| Build | None — pure static, no build step required |
| AI Assistant | Antigravity (Google DeepMind) |

---

## 🚀 How to Run Locally

No build step required. Simply open the file in any modern browser:

```bash
# Option 1 — Open directly
start index.html

# Option 2 — Use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option 3 — Use Python's built-in server
python -m http.server 8000
# Then visit: http://localhost:8000
```

---

## 📐 Design System

All design tokens are defined as CSS custom properties in `css/style.css`:

```css
:root {
  --bg-primary: #050510;
  --grad-start: #6366f1;   /* indigo */
  --grad-mid:   #8b5cf6;   /* violet */
  --grad-end:   #06b6d4;   /* cyan */
  --text-primary: #f1f5f9;
  --radius-lg: 20px;
  /* ...and more */
}
```

---

## ✅ Pre-Project Checklist Status

- [x] 01 — Folder structure organised
- [x] 02 — README.md created (you're reading it!)
- [x] 03 — Project goal defined
- [x] 04 — Design system (CSS tokens) set up
- [x] 05 — Google Fonts imported
- [x] 06 — HTML boilerplate with SEO meta tags
- [x] 07 — Git initialised with .gitignore
- [x] 08 — Layout wireframed and built

---

## 🤖 Built With

Built with the help of **Antigravity** — a powerful agentic AI coding assistant by Google DeepMind.

---

*A living reference. Update it as you learn.*
