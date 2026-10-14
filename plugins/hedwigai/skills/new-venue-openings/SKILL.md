---
name: new-venue-openings
description: Find businesses newly licensed to open — bars, restaurants and food shops with a new liquor licence or retail food permit — in Chicago, New York, Colorado and Missouri. Use when the user sells to restaurants or bars, wants new openings in a city, or is looking for venues that have signed a lease but don't have suppliers yet.
---

# New venue openings

Lists newly licensed premises through the `us-business-license` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` and `create_workbook` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Steps

1. `us-business-license list <jurisdiction>`, where the jurisdiction is `chicago`, `ny`, `co` or `mo`. Run `us-business-license list` alone to see the filters.
2. Reply with a table: business name, address, licence type, issue date.

## Read it right

- Only those four registers are covered. Any other place is refused by name, which is honest: say so rather than implying nothing opened there.
- Renewals are excluded by default, because they outnumber openings about three to one. Where a register can't tell the two apart, `new_only_honoured` comes back false: say the list may include renewals.
- Chicago's register is the richest and the only one that marks a new licence directly.

## Next steps

To reach the owners, use the lead-lists skill. For a list that refreshes, `create_workbook` with "new liquor licences in Chicago this month, with the owner's contact" as the instruction starts a billed research run; say so first.
