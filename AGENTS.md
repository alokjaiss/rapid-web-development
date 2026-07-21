# AGENTS.md — AI Assistant Briefing

Welcome! To keep this workspace organized and prevent duplicate documentation, you must refer to the specialized repository guide files already present on disk:

---

## 📖 1. Reference Guides & Templates

Always read and follow the templates and guidelines at these paths:

* **Development Workflow & Process:** Read [WORKFLOW.md](file:///d:/Rapid%20Web%20Development/WORKFLOW.md) for branch naming conventions, draft PR flows, board statuses, and project links.
* **PR Implementation Plans:** Use [plan.md](file:///d:/Rapid%20Web%20Development/.github/plan.md) as the exact structure for writing plans inside your Draft Pull Request descriptions.
* **Bug Reports & Feature Requests:** Refer to [.github/ISSUE_TEMPLATE/](file:///d:/Rapid%20Web%20Development/.github/ISSUE_TEMPLATE/) for the required fields and acceptance criteria.
* **Versioning & Releases:** Use [.github/RELEASE_TEMPLATE/release_template.md](file:///d:/Rapid%20Web%20Development/.github/RELEASE_TEMPLATE/release_template.md) for Semantic Versioning (SemVer) rules and release notes templates.

---

## 🔒 2. Critical Non-Negotiable Rules

| Rule | Description | Reference |
| :--- | :--- | :--- |
| **Issue First** | Never write code or make changes without a corresponding GitHub issue created first. | [WORKFLOW.md](file:///d:/Rapid%20Web%20Development/WORKFLOW.md#key-rules) |
| **Plan in PR** | Implementation plans must be written inside the PR description, not in separate `.md` files. | [WORKFLOW.md](file:///d:/Rapid%20Web%20Development/WORKFLOW.md#key-rules) |
| **Token Security** | Never check in personal access tokens (PAT) or share them in chat. Store in `.env.local` as `GH_TOKEN=your_token`. | [WORKFLOW.md](file:///d:/Rapid%20Web%20Development/WORKFLOW.md#key-rules) |
| **Local Validation** | Run `npm run build` locally and ensure **0 warnings and 0 errors** before requesting a review. | [WORKFLOW.md](file:///d:/Rapid%20Web%20Development/WORKFLOW.md#4-implement) |
| **Commit Format** | Always prefix messages with conventional commit tags and reference the issue (e.g. `feat: closes #XX - description`). | [WORKFLOW.md](file:///d:/Rapid%20Web%20Development/WORKFLOW.md#key-rules) |
| **Merge Target** | All Pull Requests must target the `main` branch. | [WORKFLOW.md](file:///d:/Rapid%20Web%20Development/WORKFLOW.md#key-rules) |
