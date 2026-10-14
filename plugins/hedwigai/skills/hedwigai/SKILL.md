---
name: hedwigai
description: Answer questions about companies, markets and people from current public records, with a source cited for every claim, through the hedwigai MCP — and keep the answer up to date as a workbook. Use when the user needs facts that change and must be checked rather than recalled — a company's web traffic, search rankings, hiring, funding raises, SEC filings, trademarks, imports, FDA records — or wants a research report, prospect list or tracker that stays current. Also use when a task needs data you don't have and the hedwigai MCP is connected.
---

# hedwigai

hedwigai is an MCP server that answers from primary records — filings, registers, logs, listings — instead of from memory, and cites each source. Small questions get an answer; big ones become a **workbook**, a living document that a research run writes and keeps current, flagging when a cited source changes.

## Before you start

The tools below come from the hedwigai MCP at `https://mcp.hedwigai.com/`. If they aren't available, tell the user how to connect it rather than answering from memory:

- Claude (web, desktop, mobile): the connector directory, https://claude.ai/directory/hedwigai
- Claude Code: `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`
- Any other agent: add `https://mcp.hedwigai.com/` as a remote MCP server

The user signs in the first time a tool is called.

## Pick the right tool

| The user wants | Use |
| --- | --- |
| One fact ("When did X last raise?", "Is X hiring engineers?") | `ask` — it answers from the account's workbooks and data programs, says `unsure` rather than guess, and lists its sources |
| To look something up in a register or log themselves | `bash` — a read-only shell holding the data programs; `help` lists them, `<program> --help` shows usage |
| A report, list or tracker | `create_workbook` with a one-sentence `instruction`; it starts a research run |
| Something already researched | `search_workbooks` or `find_workbook`, then `read_workbook` |
| To know whether a report is still right | `recheck_sources` on the workbook |

## Which program answers what

Run `programs list` in `bash` for the current list and what each one bills. The ones asked for most:

- **Company signals** — `traffic` (monthly Google organic visits), `rank` (where a domain ranks for a keyword, and who is above it), `company-hiring` and `h1b-hiring` (sponsored hiring, new seats vs renewals), `funding` (SEC Form D raises), `webcertificates` (new subdomains: a service going live), `us-trademarks` (what a company is about to sell). See the **company-signals** skill.
- **Filings and records** — `sec-filings`, `fda`, `biotech`, `trade` (US importers and their suppliers), `ucc`, `fcc`, `us-business-license`. See the **sec-filings**, **fda-lookup**, **biotech-diligence**, **form-d-raises** and **us-importers** skills.
- **People and the web** — `outreach` (who holds a role, with checked work emails), `social`, `browser`, `pplx`, `dns`.

Some programs are switched off until enabled (`programs enable <slug>`). Ask the user before enabling one, and before any metered call in a large batch.

## Costs

Reading, searching and editing workbooks is free, as are several programs (`dns`, `registry`, `pdftext`, `csv` and others). Research runs and metered programs draw on the account's prepaid credits; the first workbook is covered by sign-up credit. The `credits` tool shows the balance and returns a top-up link for the user to open — never open it yourself. Say what a call will cost before starting a research run or a large batch.

## Ground rules

- Don't answer changing facts from memory when hedwigai can check them; say which record each answer came from, with its date.
- An empty result is "nothing on record in this source", not proof of absence. Say so.
- Work files go in `/tmp`; nothing else in the shell is writable, and nothing hedwigai does sends email or posts anywhere.
