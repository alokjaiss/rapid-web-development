---
name: sync_chat_history
description: Extract and format the complete prompt-and-response history of the current chat session from the local transcript log into the workspace's conversation_history.md file.
---

# Skill: Sync Chat History

When the user asks to save, log, copy, or update the chat history, follow this process to export the current conversation transcript into the workspace.

## Reference Paths
- **Logs Directory:** `C:\Users\rahul\.gemini\antigravity-ide\brain\<conversation-id>\.system_generated\logs\`
- **Target Transcript File:** `transcript_full.jsonl`
- **Output File:** `<workspace-root>/conversation_history.md`

## Instructions

1. **Locate the Log File:**
   Identify the current `conversation-id` from the context or file paths. Find `transcript_full.jsonl` in the corresponding logs directory.

2. **Generate Parser Script:**
   Write a temporary PowerShell script to parse the JSON Lines file. The script must:
   - Read `transcript_full.jsonl` using UTF-8 encoding.
   - Filter and process each line.
   - Parse `USER_INPUT` actions and extract the `<USER_REQUEST>` block content.
   - Parse `PLANNER_RESPONSE` actions and extract the text `content`.
   - **Important:** Redact any active personal access tokens (using regex `ghp_[a-zA-Z0-9]{36}`) to satisfy push protection rules.
   - **Important:** Do NOT output the raw internal thought process tags (`thinking` JSON field). Synthesize a short 1-2 sentence high-level summary of the reasoning for that step instead to align with security guidelines.
   - Write the formatted markdown text to `<workspace-root>/conversation_history.md` in UTF-8.

3. **Execute & Clean Up:**
   Run the PowerShell script. After execution completes successfully, delete the script from the scratch folder to keep the workspace clean.

4. **Git Sync:**
   Commit the updated `conversation_history.md` file with a descriptive message (`docs: sync complete unedited conversation log`) and push it to the remote repository. Ensure the changes are merged and synced across the default developer and release branches (e.g., `main`, `develop`, `release`).
