# WebDevRef Release Notes Guideline & Template

This document provides the industry-standard Semantic Versioning rules, release notes drafting guidelines, and a reusable Markdown template for all future releases of the WebDevRef platform.

---

## 📐 Semantic Versioning (SemVer) Rules for WebDevRef

Ensure version names follow the standard format: `v[MAJOR].[MINOR].[PATCH]` (e.g., `v3.0.0`).

| Version Tier | When to Increment | Examples for WebDevRef |
| :--- | :--- | :--- |
| **MAJOR (`X.0.0`)** | Breaking changes, core layout overhauls, or massive architecture restructures. | Moving from single-page scroll to the 3-column AlgoMaster-style portal. |
| **MINOR (`x.Y.0`)** | Backward-compatible features, new guides, new quiz options, or significant tool integrations. | Adding the "Listen to this Chapter" TTS engine, expanding the quiz questions pool. |
| **PATCH (`x.y.Z`)** | Minor styling fixes, grammar/typo corrections in lessons, or minor visual adjustments. | Fixing responsive sidebar spacing on specific mobile screens, correcting class names. |

---

## 📝 Best Practices for Writing Release Notes

1. **Focus on User Value:** Don't just list commits (e.g., "modified script.js"). Explain the *feature* and its *benefit* (e.g., "Added browser speech synthesis to read chapters aloud, helping developers learn on the go").
2. **Exclude Sensitive Keys:** Never write raw credentials, tokens, or personal paths in the notes.
3. **Categorize Changes:** Use distinct bullet points grouped under standardized section headers.
4. **Traceability:** Always reference the issue number fixed or pull request merged (e.g., `fixes #18` or `PR #12`).
5. **Interactive Previews:** Highlight visual changes or UI states using mockups or simple summaries.

---

## 📄 Reusable Release Notes Template

Copy and paste the template below when drafting a new release on GitHub.

```markdown
# v[VERSION] - [Short, Catchy Feature Summary Title]

[A brief 1-2 sentence lead paragraph explaining the main value/goal of this release.]

## What's Changed

### 🚀 New Features
- **[Feature Title]**: [Description of feature and why it matters] (fixes #[Issue])
- **[Feature Title]**: [Description of feature and why it matters] (fixes #[Issue])

### 🐛 Bug Fixes & Refactoring
- **[Fix Title]**: [What bug was resolved] (fixes #[Issue])

### ⚡ Performance & UX Polish
- **[Polish Title]**: [Visual or loading optimization details] (fixes #[Issue])

### 📖 Documentation & Workspace Customization
- **[Doc Title]**: [Typos, manuals, or custom agent skill additions]

---

## 📦 Deployment Details
- **Live Link:** [URL to hosted GitHub Pages]
- **Source Branch:** `release`
- **Release Tag:** `v[VERSION]`
```

---

## 💡 Practical Example: Draft Release Notes for `v3.0.0`

Below is how the release notes for the current release (`v3.0.0`) should be structured under the new guidelines:

```markdown
# v3.0.0 - 3-Column AlgoMaster Portal Redesign & Web Speech TTS Player

This release marks a massive evolution of the WebDevRef platform, transitioning from a single-page reference guide to a modular 3-column workspace layout with completion tracking, active-recall quiz suite, and a client-side Text-to-Speech audio assistant.

## What's Changed

### 🚀 New Features
- **AlgoMaster Portal Redesign**: Refactored the monolithic site structure into a 3-column portal containing an interactive tree sidebar, progress bar, scroll-synced TOC, and localStorage-backed completion and bookmark trackers.
- **Listen to this Chapter (TTS)**: Integrated browser native `SpeechSynthesis` allowing users to listen to lessons. Automatically filters out code blocks (`<pre>`) to deliver a smooth, natural-sounding audio experience.
- **Active-Recall practice Suite**: Integrated a modular quiz engine with randomized question lists, instant correct/incorrect color indicators, and detailed explanation cards.

### 🐛 Bug Fixes & Refactoring
- **Token Leak Prevention**: Redacted active and legacy GitHub tokens from workspace logs and guides, satisfying secret scanning requirements.
- **Auto-Cancellation of Speech**: Resolved a bug where switching pages left the voice reader talking. Navigation changes now trigger speech cancellation instantly.

### ⚡ Performance & UX Polish
- **Pulsing Audio Visualizer**: Added dynamic CSS visualizers and glowing border states to `.portal-audio-bar` that bounce during playback and freeze when paused.
- **Scroll Reveal animations**: Configured stagger animations on learning track cards to make the hub interface feel responsive and fluid.

### 📖 Documentation & Workspace Customization
- **AGENTS.md Overhaul**: Refined the AI instruction briefing to enforce zero-dependency vanilla guidelines.
- **Sync Chat History Skill**: Created a custom agent skill under `.agents/skills/sync_chat_history/` to synchronize transcripts dynamically.

---

## 📦 Deployment Details
- **Live Link:** https://alokjaiss.github.io/rapid-web-development/
- **Source Branch:** `release`
- **Release Tag:** `v3.0.0`
```
