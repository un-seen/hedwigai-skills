---
name: edi-remittance
description: Turn X12 EDI payment files into readable CSV — the 820 remittance advice and the 812 credit/debit adjustment — with the reason code on every line. Use when the user has an EDI file from a retailer or payer and wants to see what was paid, what was deducted and why.
---

# EDI remittance

Parses X12 interchanges through the free `edi` program in the hedwigai MCP's shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Steps

1. Find the file on the user's connected drive (`/catalog` searches the drives), or have them attach it.
2. `edi <FILE>` prints CSV; `edi --json <FILE>` prints JSON.
3. Reply with the total paid, then the deductions grouped by reason code with their amounts. Use the `csv` program in the same shell to sum and group.

## Care points

- Only the 820 and 812 transaction sets are covered; say so for any other.
- Reason codes are the payer's; quote them as written alongside any plain-English reading.
