---
name: company-signals
description: "Find out what a company is doing right now from public signals, each cited and dated — its web traffic, Google rankings and who outranks it, sponsored hiring and new seats, recent Form D raises, new subdomains going live, and trademarks it has filed for products not yet launched. Use for competitor research and teardowns, comparing websites' traffic, SEO gaps, account research before a sales call, spotting companies that just raised or are hiring, or watching a market for launches."
---

# Company signals

Reads a company's recent moves from public records through the hedwigai MCP's read-only shell. Each signal comes from a different register, so together they show what a company is building, spending on and launching — usually before it announces anything.

## Before you start

This skill uses the hedwigai MCP's `bash`, `ask` and `create_workbook` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server. Don't estimate traffic, rankings or hiring from memory.

Most of these programs are metered against the account's prepaid credits; `programs list` shows what each bills. `traffic` and `social` may be switched off: ask the user before running `programs enable <slug>`.

## Which signal answers what

| Question | Program | Read it as |
| --- | --- | --- |
| How much search traffic does a site get? Who's bigger? | `traffic estimate <domains>` | Estimated monthly Google organic visits, up to 1,000 domains at once, with the month and source. Organic search only, not total traffic |
| Where does a site rank for a keyword, and who's above it? | `rank keywords <domain> <queries>` | Google positions. A null position plus the hosts that took the keyword is often the most useful row |
| Is the company hiring, and for what? | `h1b-hiring search <company>` | Sponsored roles with title, wage and worksite. Keep NEW positions; continuations are renewals, not growth. No filings means no *sponsored* hiring on record, not no hiring |
| Who is hiring for a role, or in a place or field? | `company-hiring openings <role>` / `company-hiring search <since>` | Live posts on Greenhouse, Lever and Ashby this month; or employers ranked by new sponsored seats, wages annualised |
| Did it just raise money? Who raised lately in a sector? | `funding search <company>` / `funding recent <industry>` | SEC Form D, with the filing date and amount sold. No filing means nothing on record of that kind, not "never raised" |
| What is it about to launch? | `webcertificates search <domain>` | Certificates for new names under the domain, newest first: a new `api.`, `checkout.` or `status.` is something going live this week |
| What will it sell next? | `us-trademarks search <company>` | Applications matched on the applicant; read the goods and services. An *intent to use* filing means nothing is on sale yet |
| Who lent it money? | `ucc search <company>` | UCC-1 liens with the secured party. Colorado and Connecticut only, so an empty answer elsewhere means nothing |

Run `<program> --help` before the first call to each; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`.

## A competitor teardown

1. Confirm the companies and their domains with the user.
2. `traffic estimate` for all of their domains in one call, then `rank keywords` for the user's domain on the 5–10 queries that matter to them.
3. For each competitor: `funding search`, `h1b-hiring search` (new positions only), `webcertificates search`, and `us-trademarks search` if a launch is the question.
4. Reply with one table — company, organic visits a month, rank on the key queries, last raise and date, new sponsored seats, newest subdomains — then the two or three moves that stand out, each with its source and date.

## Keeping watch

For a list the user will come back to — "track these 12 competitors' traffic, raises and launches every week", "every fintech in Austin that raised this quarter and is hiring engineers" — use `create_workbook` with that sentence as the `instruction`. It starts a billed research run that builds the table and keeps it current; say so before starting. A single fact can go to `ask`, which cites the program run it used.

## Care points

- For depth on one signal, use the web-traffic, seo-rankings, hiring-signals, launch-signals or form-d-raises skills.

- Each source covers part of the picture: organic search rather than all traffic, sponsored hiring rather than all hiring, Form D raises rather than every round. Name the source next to every number.
- Give every signal its date; a signal's value is that it is recent.
- To reach someone at a company afterwards, `outreach` finds who holds a role and checks work emails. It is metered, and nothing it does sends mail; ask before running it.
