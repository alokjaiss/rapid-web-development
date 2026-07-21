# AGENTS.md — AI Assistant Briefing
# Read this file before doing ANYTHING in this project.
# WebDevRef — AlgoMaster.io-Inspired Interactive Knowledge Base Portal

## Project Overview
- **Name:** WebDevRef — Interactive Web Development Knowledge Base Portal
- **Architecture:** Modelled after **AlgoMaster.io** — 3-column workspace portal with interactive tree navigation, live search, scroll-synced TOC, and dynamic progress tracking.
- **Goal:** A scalable developer reference platform covering Pre-Project Setup, GitHub Workflow, CSS Architecture, Performance Optimization, Testing Strategy, API Design, Universal Laws, AI Acceleration, and Active-Recall Quizzes.
- **Type:** Static HTML5 / Vanilla CSS3 / Vanilla JS ES6+ — zero external dependencies, zero build steps.
- **Live Portal:** Open `portal.html` or `index.html` directly in any browser.

---

## Folder Structure
```
Rapid Web Development/
├── index.html          ← Hub Overview & Landing Page with Hero Tracks & Flame Streak
├── portal.html         ← 3-Column AlgoMaster-Style Knowledge Base Portal View
├── AGENTS.md           ← This briefing document — AI instructions
├── README.md           ← Public documentation
├── .gitignore          ← Git ignore rules
│
├── css/
│   └── style.css       ← ALL styles — design tokens, 3-column portal grid, tree accordion & responsive rules
│
├── js/
│   ├── knowledge-data.js ← Central Master Registry of all modules, topics, metadata, outlines & lessons
│   └── script.js       ← Tree accordion, live chapter search, scroll progress sync, notes modal & localStorage completion tracking
│
├── assets/
│   ├── images/         ← Screenshots and visual assets
│   ├── fonts/          ← Self-hosted fonts (Outfit & JetBrains Mono)
│   └── icons/          ← Favicons and graphic tokens
│
└── pages/              ← Active-recall quiz & legacy topic subpages
    ├── quiz.html       ← Active-recall practice suite with recall analytics
    └── ...
```

---

## AlgoMaster-Inspired Design System (DO NOT DEVIATE)
All design tokens are defined in `css/style.css` under `:root`:
- **Backgrounds:** `--bg-primary: #050510`, `--bg-secondary: #0a0a1a`, `--bg-card: rgba(255,255,255,0.04)`
- **Gradients:** `--grad-start: #6366f1` (indigo), `--grad-mid: #8b5cf6` (violet), `--grad-end: #06b6d4` (cyan)
- **Accents:** `--accent-cyan: #06b6d4`, `--accent-green: #10b981`, `--accent-amber: #f59e0b`, `--accent-red: #ef4444`, `--accent-orange: #f97316` (streak flame)
- **Typography:** Google Fonts — **Outfit** (body & headers) + **JetBrains Mono** (code & metadata)
- **Borders & Glassmorphism:** `--border: rgba(255,255,255,0.08)`, `--shadow-glow`, `--shadow-card`

---

## Discoveries & Nuances from AlgoMaster.io Structure

| AlgoMaster Design Element | WebDevRef Implementation | Key Features & Behavior |
| :--- | :--- | :--- |
| **Top Header Bar** | `nav.navbar` in `index.html` & `portal.html` | Logo badge, category links, global command search (`Ctrl+K` / `F`), theme toggle, & flame streak indicator. |
| **Hero Mesh & Gradients** | `.hero-bg` with radial glows | Dark glassmorphism, radial gradient spots, & particle canvas background animation. |
| **3-Column Workspace Portal** | `portal.html` | 320px left tree sidebar, fluid center reader viewport, 260px right table of contents column. |
| **Collapsible Category Accordion** | `.portal-tree-group` | Category titles with topic counters (`0/4`), collapsible chevron toggles, and live search chapter filtering. |
| **Article Header & Badges** | `.portal-reader-header` | Topic title, priority tag (`🔥 High Priority`), read time estimate (`⏱️ 5 min read`), last updated date (`📅 May 2026`). |
| **Audio Overview Bar** | `.portal-audio-bar` | "Listen to this chapter" interactive audio preview placeholder bar. |
| **Editorial Prose Reading View** | `.portal-content` | **Long-form article format** (matching `algomaster.io/learn/system-design/what-is-system-design`). Clear lead paragraphs, numbered section headings (`1.`, `2.`), bullet/numbered lists (`.article-list`), single callout boxes (`.callout`), dark code blocks (`.code-box pre code`). **NO card grids inside article prose**. |
| **Sticky Bottom Action Toolbar** | `.portal-toolbar` | Floating blur bar (`Mark Complete`, `Bookmark`, `Take Notes` popover, `Ask AI` assistant prompt copy, `Prev/Next`). |
| **Scroll-Synced Table of Contents** | `.portal-toc` | Reading progress counter percentage (`0% - 100%`) and active section anchor link highlighting on scroll. |
| **Active-Recall Practice** | `pages/quiz.html` | Topic-filtered recall practice, instant explanation cards, score analytics, and mistakes review filter. |

---

## Article Presentation Standard (Editorial Prose Layout)
- **Do NOT** format lesson articles inside the portal as card grids (`.cards-grid` / `.info-card`).
- **DO** present all knowledge articles in clean, long-form editorial prose (matching `https://algomaster.io/learn/system-design/what-is-system-design`):
  1. Introductory lead paragraph (`<p class="article-lead">`).
  2. Clear numbered section headings (`<h2 id="...">1. The Core Idea</h2>`).
  3. Well-spaced paragraphs (`<p>`).
  4. Structured ordered lists (`<ol class="article-list">`) and bullet points (`<ul class="article-list">`).
  5. Callout alert blocks (`<div class="callout callout-tip">`).
  6. Dark editor code blocks (`<div class="code-box"><pre><code>...</code></pre></div>`).

---

## Data-Driven Content Registry (`js/knowledge-data.js`)
All course content is stored in `window.KNOWLEDGE_DATA`. The registry structure:
```javascript
window.KNOWLEDGE_DATA = {
  courseTitle: "Web Development Mastery & AI Velocity",
  totalTopics: 37,
  modules: [
    {
      id: "mod-id",
      title: "01. Category Title",
      icon: "⚡",
      topics: [
        {
          id: "topic-unique-id",
          title: "Topic Title",
          priority: "High Priority",
          readTime: "5 min read",
          updated: "May 2026",
          badge: "Essential",
          audioUrl: "#",
          summary: "Short topic description",
          outline: [
            { id: "section-anchor-id", text: "1. Section Heading Text" }
          ],
          content: `HTML formatted article content...`
        }
      ]
    }
  ]
};
```

---

## Interactive Features & Persistence
1. **Completion Tracking:** Clicking `Mark Complete` on the sticky toolbar toggles topic ID in `localStorage` (`webdevref_completed_topics`). Instantly updates progress bars (`X%`) and tree checkmarks.
2. **Bookmarking System:** Toggling `Bookmark` saves topic ID to `localStorage` (`webdevref_bookmarked_topics`).
3. **Personal Notes Pad:** Clicking `Notes` opens a popover text area saving chapter notes per topic ID in `localStorage` (`webdevref_notes_data`).
4. **Ask AI Helper:** Copies a structured pair programming prompt to clipboard for AI assistant discussion.
5. **Live Search:** Typing in `#chapterSearchInput` filters tree topics and auto-expands matching module accordions.

---

## What NOT to Do
- **Do NOT** introduce external JS libraries or build systems (no React, Next.js, Vite, Webpack, Alpine, or jQuery).
- **Do NOT** add external CSS frameworks (no Tailwind, Bootstrap).
- **Do NOT** hardcode static topic articles in HTML files—always add new content to `js/knowledge-data.js`.
- **Do NOT** use card grids inside knowledge articles—always use editorial prose.
- **Do NOT** modify existing `:root` design token names in `css/style.css` (extend them if needed).

---

## Checklist: Adding a New Topic or Module
When expanding the knowledge base with new topics:
1. [ ] Open [js/knowledge-data.js](file:///d:/Rapid%20Web%20Development/js/knowledge-data.js).
2. [ ] Locate the appropriate module in `window.KNOWLEDGE_DATA.modules` or create a new module object.
3. [ ] Add a new topic object with a unique `id`, `title`, `priority`, `readTime`, `updated`, `outline`, and `content`.
4. [ ] Verify the content uses editorial prose (lead paragraph, numbered h2 headings, article-list, callout, code-box) instead of card grid layouts.
5. [ ] Verify the new topic appears in the left sidebar tree in `portal.html`.
6. [ ] Verify live search filtering, reading progress % calculation, section TOC links, and completion tracking.
7. [ ] Commit with conventional format: `feat: add [topic name] knowledge section`.
