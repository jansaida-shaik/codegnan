---
description: How to safely switch branches without losing changes
---
Follow these steps to ensure your current work is saved before switching to another branch.

// turbo
1. Check for unsaved changes: `git status`

2. If there are changes, save them to a temporary stash: `git stash`

// turbo
3. Switch to the desired branch: `git checkout <branch-name>`

4. Verify the new branch contents: `ls -R`

5. (Optional) If you want to bring your saved changes to the new branch: `git stash pop`
