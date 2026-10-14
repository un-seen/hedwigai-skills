---
name: seo-rankings
description: Check where a website ranks on Google for each of a list of keywords, and which sites rank above it, with the history of past checks. Use for SEO audits, keyword gap analysis, checking whether a page ranks, finding who outranks a site, or asking whether AI agents that search Google will find it.
---

# SEO rankings

Reads Google positions through the `rank` program in the hedwigai MCP's read-only shell, and their history through `series`.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Question | Study |
| --- | --- |
| Where does a domain rank for each keyword, and who is above it | `rank keywords <domain> <queries>` |
| What does Google return for a query | `rank search <query>` |
| How has a measurement moved over time | `series` (run it alone to see its studies) |

`rank keywords` options: `--depth` (10–100, how deep to look), `--above` (0–10, how many hosts above to name), `--date_restrict` (`h`, `d`, `w`, `m`, `y`, with an optional count such as `d7`).

## Steps

1. Agree the domain and 5–20 queries a customer would actually type, including the ones the site should win.
2. Run `rank keywords` once for all of them.
3. Reply with a table: query, position (or "not in the top N"), and the hosts above. The rows where the site doesn't rank, with the sites that took the keyword, are usually the most useful; lead with them.
4. If the user asks whether rankings are improving, read `series`. It only holds points from earlier runs, and a single point is not a trend; say so.

## Read it right

- Positions are Google's. Gemini searches Google, Copilot searches Bing and Claude searches Brave, so a Google position is a leading signal for agents that use Google, not for ChatGPT or Perplexity, which use their own indexes.
- For how much traffic those rankings bring, use the web-traffic skill.
