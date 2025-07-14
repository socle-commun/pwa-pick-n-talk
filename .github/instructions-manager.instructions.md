---
applyTo: '.github/*.instructions.md'
---

# Instructions manager Instructions

## Guidelines

### Special Rule: pocs/

All folders under `pocs/` are proof of concept only:
- Never use them as a direct base for the main project.
- Use them for inspiration, extract ideas, and refactor before integrating.
- No copy-paste, no structural dependency.

Brütalcode, not BrütalCopy.

1. **Consistency**: Ensure all instruction files follow a clear and consistent format, including headers, bullet points, and code blocks where appropriate.
2. **Clarity**: Write instructions in clear, concise English. Avoid ambiguity and provide examples if necessary.
3. **Updates**: When modifying instructions, document the changes and update the version or date if applicable.
4. **Scope**: Only include rules and guidelines relevant to the project or repository. Remove outdated or irrelevant instructions.
5. **Review**: All changes to instruction files should be reviewed by at least one other team member before merging.
6. **File Naming**: Use descriptive and meaningful file names for new instruction files.

## Add instruction file

To add a new instruction file:

1. Create a new Markdown file in the `.github/` directory.
2. Begin the file with a YAML front matter section specifying the `applyTo` pattern for the target files.
3. Add a clear title and relevant sections using Markdown headers.
4. Write concise, actionable instructions following the guidelines above.
5. Include examples or code blocks where helpful.
6. Use a descriptive file name that reflects the purpose of the instructions.
7. Document the addition in the repository changelog or commit message.
8. Request a review from at least one team member before merging.

**example:**
```markdown

---
applyTo: '*.py'
---

# Python Coding Instructions

[...]
```
