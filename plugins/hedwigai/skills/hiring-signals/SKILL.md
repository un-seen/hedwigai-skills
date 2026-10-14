---
name: hiring-signals
description: Find who is hiring and for what — live job posts for a role this month from Greenhouse, Lever and Ashby boards, and US sponsored-hiring filings with one employer's job titles, wages offered and worksites, or every employer adding new positions in a place or discipline. Use when the user asks whether a company is hiring, what it pays, where it is growing, or wants companies hiring engineers, nurses or analysts in a city as prospects.
---

# Hiring signals

Reads live job posts and US labour condition applications — the filings an employer makes before sponsoring an H-1B, H-1B1 or E-3 worker — through two programs in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Question | Study |
| --- | --- |
| Who is hiring for a role this month | `company-hiring openings <role>` — live posts on Greenhouse, Lever and Ashby boards, each with its date and link |
| Which employers are adding sponsored positions in a place or discipline, above a wage | `company-hiring search <since>` (run it alone to see its filters) |
| What has this employer filed to sponsor: titles, wages, worksites | `h1b-hiring search <company>` |

Job posts are current; the labour filings run about a quarter late but carry wages and new-versus-renewal. Use both when the question is "is this company growing".

## Read it right

- Job posts cover companies that use Greenhouse, Lever or Ashby; a company on another board won't appear.
- Sponsored hiring is a subset of hiring. A company can hire a thousand people without filing once, so an empty answer means no sponsored hiring on record, never "not hiring".
- A continuation is a visa being renewed, not a new seat. Keep `new_only` positions when the question is growth. `company-hiring` already ranks employers by new positions: a staffing firm that renews hundreds of visas has added nobody.
- Wages are annualised, because the filed rate may be hourly or yearly in the same field.

## Reply

A table: employer, job title, where, date posted or filed, link; for filings add the wage and whether the position is new. Lead with the newest.
