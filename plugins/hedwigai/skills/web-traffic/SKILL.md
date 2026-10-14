---
name: web-traffic
description: "Estimate and compare websites' monthly visits from Google organic search, for one domain or up to 1,000 at once, with the month and source stated. Use when the user asks how much traffic a site gets, which competitor is biggest, how a market's sites compare, or wants traffic figures for a list of companies."
---

# Web traffic

Estimates monthly Google organic visits per domain through the `traffic` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server. Don't estimate traffic from memory.

`traffic` may be switched off on the account. If the shell says so, ask the user before running `programs enable traffic`: enabling a metered program means its calls are charged. `programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Steps

1. Collect every domain the user cares about first. One call takes up to 1,000 domains or URLs and costs far less than one call per domain: `traffic estimate stripe.com,adyen.com,checkout.com`.
2. The default market is the United States. Add `--location_code 2826` for the United Kingdom or `2356` for India.
3. Reply with a table sorted by visits: domain, estimated monthly organic visits, the month, and the source the answer names.

## Read it right

- It is a model of Google organic search traffic in one market, not a visit counter. It ranks sites against each other well and says nothing about direct, paid, social or app traffic. Say "estimated organic search visits" next to every number.
- A null means there is no estimate, almost always because the site is very small. It is not zero.
- To see why a site gets its traffic, use the seo-rankings skill for its keyword positions.

## Keeping watch

For a recurring comparison — "track these 20 competitors' organic traffic every month" — use `create_workbook` with that sentence as the instruction. It starts a billed research run; say so first.
