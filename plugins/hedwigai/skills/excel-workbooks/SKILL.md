---
name: excel-workbooks
description: Read and edit Excel workbooks the way Excel does — values and formulas, inserting and deleting rows and columns with every reference following, formats, named ranges and pivots, with formulas recalculated on save — on files in the user's connected Dropbox or Google Drive. Use when the user wants to read, fix, trace or update a spreadsheet, find errors like #REF!, or see which cells a formula depends on.
---

# Excel workbooks

Reads and edits spreadsheets through the free `xlsx` program in the hedwigai MCP's shell, alongside the account's connected drives.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Read

`xlsx FILE sheets`, `structure`, `get RANGE [--as csv|json|formulas]`, `find TEXT`, `errors`, `deps CELL` (what a formula reads), `trace CELL` (what reads a cell), `calc 'EXPR'`, `names`, `pivots`. These change nothing and also read .xls, .xlsb and .ods.

## Edit

`set`, `clear`, `fill`, `copy`, `insert-rows`, `delete-rows`, `insert-cols`, `delete-cols`, sheet operations, `name`, `fmt`, `width`, `height`. Chain commands with ` + ` to save once. Every reference follows an inserted or deleted row, as in Excel.

## Where the file lives

Connected drives such as `/dropbox` and `/googledrive` are read-only. Copy the file into `/tmp`, edit it there with `-o /tmp/out.xlsx`, and give the user the result. Say plainly that the original on their drive was not changed.

## Care points

- `--keep-structure` refuses any change to headings, labels, columns or sheets: use it when the user wants data updated and nothing else.
- Run `errors` after an edit and report any new ones.
