# WebDevRef — Development Workflow

This document describes the end-to-end development process followed for all changes to this project.

---

## The Cycle

```
Request → Issue → Branch → PR (Plan) → Implement → Merge → Done
```

---

## Step-by-Step

### 1. 📋 Create a GitHub Issue

Every bug, feature, or enhancement gets an issue **before any code is written**.

- Issue contains: problem description + acceptance criteria
- Issue is added to the [Development Tracker](https://github.com/users/alokjaiss/projects/1) board with **Status**, **Priority**, and **Size**
- New issues default to **Backlog** or **Ready**

**Labels used:**
| Label | When to use |
|---|---|
| `bug` | Something is broken or behaving incorrectly |
| `enhancement` | Improving an existing feature |
| `feat` | A brand new feature |

---

### 2. 🌿 Create a Branch

Branch off `main` using the issue number and a short slug:

```
fix/34-library-song-data
feat/35-fullscreen-player
bug/39-bottom-nav-position
```

---

### 3. 📝 Open a Pull Request

Open a PR as soon as the branch is created. It is **highly recommended to open it as a Draft Pull Request** first (`gh pr create --draft`) while planning and implementation are in progress.

**PR description must include:**
- `closes #XX` — links and auto-closes the issue on merge
- **Implementation plan** — what files will change, what approach will be taken
- **Acceptance criteria** — copied or referenced from the issue

Issue status moves to **In Progress** on the board.

---

### 4. 🔨 Implement

- Make all code changes on the feature branch.
- Verify with `npm run build` locally — zero TypeScript/build errors before merging.
- **GitHub Actions (CI)** will automatically run build verification checks on every push to the PR branch. Ensure all status checks pass.

---

### 5. ✅ Merge PR → `main`

- Update the PR description with a **walkthrough** (what changed, how to test). Include the **Vercel Deploy Preview URL** if verifying visual UI updates.
- Merge the PR into `main`.
- Issue **auto-closes** via `closes #XX`.
- Issue moves to **Done** on the board.
- Vercel (or CI/CD) picks up the push and deploys automatically.

---

## Key Rules

| Rule | Detail |
|---|---|
| **Issue first** | Never start coding without a linked issue |
| **One branch per issue** | Keeps changes isolated and reviewable |
| **Plan in PR** | Implementation plan lives in the PR description, not in separate `.md` files |
| **`closes #XX`** | Always include in the PR body — auto-closes the issue on merge |
| **Commit messages** | Reference the issue: `fix: closes #39 — short description` |
| **Merge target** | Always `main` (a `develop` buffer will be added in a future phase) |
| **Token security** | Never share PATs in chat — store in `.env.local` as `GH_TOKEN=your_token` |

---

## Board Status Flow

```
Backlog → Ready → In Progress → In Review → Done
```

| Status | Meaning |
|---|---|
| **Backlog** | Created, not yet prioritised or started |
| **Ready** | Prioritised — next to be picked up |
| **In Progress** | Branch created, actively being worked on |
| **In Review** | PR open, awaiting review or testing |
| **Done** | PR merged, issue closed |

---

## Priority & Size Guide

**Priority:**
| Label | Meaning |
|---|---|
| P0 | Critical — blocks the app or users |
| P1 | High — important UX or functionality gap |
| P2 | Normal — enhancement or low-impact fix |

**Size:**
| Label | Effort estimate |
|---|---|
| XS | < 30 min |
| S | ~1 hour |
| M | Half a day |
| L | Full day or more |
| XL | Multi-day / complex |

---

## GitHub Links

- **Repository:** https://github.com/alokjaiss/rapid-web-development
- **Project Board:** https://github.com/users/alokjaiss/projects/1
- **Issues:** https://github.com/alokjaiss/rapid-web-development/issues
