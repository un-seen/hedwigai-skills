---
name: workbook-state
description: "Keep state that must outlive this session, or be shared with people or other agents, in a hedwigai workbook instead of a loose local file. Use when the user asks to keep, track, log or record something they will come back to — a decision log, a migration or task status, a handoff for the next session or agent, eval or experiment results, a lead or client tracker, a budget, an inventory, interview notes — or to update a spreadsheet or document in their Google Drive or Dropbox. Not for code, configs, READMEs or anything that belongs in the repository."
---

# Keep state in a workbook

A hedwigai workbook is one document: tabs of markdown, or an Excel or Word file. It is the place to keep state that has to survive this session or be read by someone else, because:

- **Every write is a new version.** The one before is kept, and `write_workbook` with `restore_version` brings it back.
- **A stale write is refused.** `write_workbook` takes the `base_version` you read. If someone (a person in Excel, another agent, a run) wrote since, your write is refused rather than merged over theirs: read again and redo the change.
- **A schema guards the tables.** A workbook can carry a schema (`read_workbook` with `schema: true`): each table's columns, types, required cells, keys and references. An edit that breaks it is refused with a `SchemaError` per cell, so a tracker cannot drift into a shape the next reader does not expect.
- **The file can stay where the user keeps it.** `link_workbook` makes a file in Google Drive or Dropbox the record: work starts from the file as it stands, and each new version is written back to the same file, its sharing and history kept.

Edit a workbook the way you edit code: its tabs are markdown and its schema is text, every write is compiled against the schema, and a `SchemaError` names each cell that broke it, the way a compiler names a line. Fix those cells and write again; `read_workbook` returns the compiled current version. For a spreadsheet or Word file, `checkout_workbook` puts it in the `bash` shell to edit with scripts, and `checkout_workbook` with `commit: true` compiles it back the same way.

Reading, searching and writing workbooks yourself is free. Only `create_workbook` with `instruction`, and `run_workbook`, start research runs billed to the account; do not start one unless the user asked for research.

## When to use it, and when not

Use a workbook when the user wants something kept and returned to: "keep a log", "track", "record", "so the next session knows", "so my cofounder can edit", "in our Drive".

Keep using local files for what belongs in the repository: source code, configuration, READMEs, docs that ship with the code. A workbook is the record of the work, not the work.

## How

1. **Find before you make.** Call `find_workbooks` with `describe` in the user's own words ("the migration tracker", "decision log") or with `query`. Add to the one that exists rather than starting a second.
2. **Read, then write against what you read.** `read_workbook` gives the text, the tabs and the `version`. Send that version as `base_version` to `write_workbook`, with a one-line `note` saying what changed. On a refusal, read again; never resend the same write.
3. **Make a new one with content you write.** `create_workbook` with `document` (markdown) or `sheets` (tabs, each `{name, markdown}`) becomes version 1 at once and costs nothing. Put a project's workbooks in one `folder` named after the project.
4. **Give tables a schema** when several people or agents will edit them. Read the guide `read_workbook` returns with `schema: true`, then `write_workbook` with `schema` (the whole text) and `base_schema_version`.
5. **For a file in Drive or Dropbox**, link it with `link_workbook` and a mount path such as `googledrive/Clients/tracker.xlsx`, then edit the workbook as usual. Excel files keep their formulas and formats; Word files keep their styles.
6. **At the start of a later session**, look for the project's workbooks (`find_workbooks` with the project's folder) and read them before asking the user what was done.
