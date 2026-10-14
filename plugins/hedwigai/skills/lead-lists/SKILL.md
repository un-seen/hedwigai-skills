---
name: lead-lists
description: Build a list of companies and people to contact: companies matching a description of a market, who holds a role at each, their work email addresses checked against the mail server, and email drafts that are never sent. Use when the user wants leads, prospects, a target account list, a decision-maker's email, to find candidates or experts by title, or to check whether an address is real.
---

# Lead lists

Builds prospect lists through the `outreach` program in the hedwigai MCP's read-only shell, and writes drafts with `mail`, which never sends.

## Before you start

This skill uses the hedwigai MCP's `bash` and `create_workbook` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Step | Study |
| --- | --- |
| Companies matching a description, each checked to exist, with its mail domain | `outreach companies find "<description>"` |
| Who holds a role at a company now, from public profile pages | `outreach people role <company>` |
| People who describe themselves by a title, skills or place, no company named | `outreach people find "<titles>"` |
| Every address a company has published, with positions and its email format | `outreach email list <company>` |
| One named person's address | `outreach email search <company> "<name>"` |
| Colleagues at a company, addresses derived and checked against the mail server | `outreach contacts expand <company>` |
| Whether one address you already have reaches a mailbox | `outreach email verify <email>` |

A company name works; a domain is surer; one address you already have at the company is surest.

## A list in four steps

1. `companies find` with a plain description: "independent coffee roasters in Oregon that sell wholesale". It reports how many names were proposed before checking; if most were dropped, the description is wrong, not the market empty.
2. `people role` for the role the user sells to at each company.
3. `email search` for each person. Read `risk`: confirmed, published, format, unchecked or guess. Treat `guess` as no address.
4. Reply with a table: company, domain, person, role, email, `risk`, and the page each person came from.

To time the outreach, combine with the company-signals, hiring-signals or form-d-raises skills: a company that just raised or is hiring is a better first call.

## Drafts, never sends

`mail draft --to <address> --subject "<subject>" --body "<text>"` writes a draft the account keeps, and into its connected Gmail or Outlook Drafts. There is no send: a person reads and sends it. Show the user the drafts before writing many.

## A list that keeps itself current

For a list the user will work through — "40 Series A fintechs in New York with the head of finance's email" — use `create_workbook` with that sentence as the instruction. It starts a billed research run; say so first.

## Care points

- A confidence is not a delivery check; only `contacts expand` and `email verify` open a mailbox. A domain that accepts any address comes back `accept_all`.
- Role addresses (info@, sales@) are marked, not dropped. They are wrong for personal outreach.
- `outreach` calls are metered per lookup; say roughly how many lookups a list will take before a large batch.
