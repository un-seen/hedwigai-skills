---
name: hedwigai
description: "Answer questions about companies, markets and people from current public records, with a source cited for every claim, through the hedwigai MCP — and keep the answer up to date as a workbook. Use when the user needs facts that change and must be checked rather than recalled — a company's web traffic, Google rankings, hiring, funding, launches, SEC filings, imports, FDA records, leads and emails, rents, model prices — or wants a research report, prospect list or tracker that stays current, or a LaTeX paper compiled to a PDF. Also use when a task needs data you don't have and the hedwigai MCP is connected."
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

## Which skill answers what

Run `programs list` in `bash` for every program and what it bills. Each skill below covers one kind of question:

| Question | Skill | Programs |
| --- | --- | --- |
| What is a company doing right now? | company-signals | several, below |
| How much search traffic does a site get? | web-traffic | `traffic` |
| Where does a site rank on Google, and who is above it? | seo-rankings | `rank`, `series` |
| Companies, people and checked emails to contact | lead-lists | `outreach`, `mail` (drafts only) |
| Who is hiring, for what, at what wage? | hiring-signals | `company-hiring`, `h1b-hiring` |
| What is a company about to launch? | launch-signals | `webcertificates`, `us-trademarks`, `fcc`, `fda` |
| Who just raised? | form-d-raises | `funding` |
| What does a person, brand or topic say in public? | social-listening | `social` |
| SEC filings, financials, holders | sec-filings | `sec-filings`, `biotech company` |
| Drug labels, approvals, patents; device registrations | fda-lookup | `biotech drug`, `fda` |
| A biotech diligence memo | biotech-diligence | workbooks, `biotech` |
| US importers and their suppliers | us-importers | `trade` |
| New bars and restaurants licensed to open | new-venue-openings | `us-business-license` |
| Trucking companies and growing fleets | trucking-fleets | `us-motor-carriers` |
| Rent comps, AMI limits, tract data | rental-market | `realestate-us`, `realestate-in` |
| How busy an airport is, by terminal and hour | airport-traffic | `aero` |
| What language models cost at each provider | llm-prices | `model-prices` |
| A domain's SPF, DKIM, DMARC and age | email-deliverability | `dns` |
| npm downloads and GitHub activity | package-adoption | `registry` |
| Do the references in a thesis or paper exist, and say what the text claims? | reference-checker | a lattice-room workbook, `biotech literature crossref` |
| Compile a LaTeX, Typst or Markdown paper to a PDF and fix its errors | latex-papers | the `render_document` tool |
| Web research with every source held and cited | cited-web-research | `browser`, `pplx` |
| Reading and editing Excel files | excel-workbooks | `xlsx` |
| X12 820/812 remittance files | edi-remittance | `edi` |

Also in the shell: `ucc` (liens, Colorado and Connecticut), `places`, `vision`, `ocr`, `pdftext`, `doctext`, `csv`, `dbq` (read-only SQL on a connected database) and the account's connected drives under `/catalog`.

Some programs are switched off until enabled (`programs enable <slug>`). Ask the user before enabling one, and before any metered call in a large batch.

## Costs

Reading, searching and editing workbooks is free, as are several programs (`dns`, `registry`, `pdftext`, `csv` and others). Research runs and metered programs draw on the account's prepaid credits; the first workbook is covered by sign-up credit. The `credits` tool shows the balance and returns a top-up link for the user to open — never open it yourself. Say what a call will cost before starting a research run or a large batch.

## Ground rules

- Don't answer changing facts from memory when hedwigai can check them; say which record each answer came from, with its date.
- An empty result is "nothing on record in this source", not proof of absence. Say so.
- Work files go in `/tmp`; nothing else in the shell is writable, and nothing hedwigai does sends email or posts anywhere.
