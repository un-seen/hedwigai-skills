---
name: sec-filings
description: Read SEC EDGAR filings for a US public company — the text of a 10-K, 10-Q or 8-K, the list of its filings, cash, revenue and runway figures, public float, and who owns it from 13F filings — with the filing cited. Use when the user asks what a company disclosed to the SEC, wants a recent annual or quarterly report, needs a figure or passage from one, or asks which funds hold a stock.
---

# SEC filings

Finds and reads SEC filings through the hedwigai MCP's read-only shell: the `sec-filings` program for a filing's text and its holders, and `biotech company …` studies for any company's filing list and headline figures.

## Before you start

This skill uses the hedwigai MCP's `bash` and `ask` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server. Don't answer filing questions from memory: filings change every quarter.

`sec-filings` may be switched off on the account. If the shell says so, ask the user before running `programs enable sec-filings`: enabling a metered program means its calls are charged. `programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Question | Study |
| --- | --- |
| A company name to its ticker (start here when you have a name) | `sec-filings ticker <name>` |
| The text of a filing | `sec-filings 10k <TICKER> --form 10-Q --filing_index 0` (form defaults to 10-K; index 0 is the most recent) |
| Who owns it, from 13F filings | `sec-filings holders <TICKER>` |
| Its list of filings, optionally one form type | `biotech company filings <NAME or CIK> [FORM]` |
| Cash, revenue, net income, runway | `biotech company financials <NAME or CIK>` (figures only; cite the filing from `company filings`) |
| Shares outstanding and public float | `biotech company marketcap <NAME or CIK>` |
| Name to CIK and ticker | `biotech company resolve <NAME, TICKER or CIK>` |

The `biotech company` studies work for any SEC filer, not only biotech companies.

## Steps

1. Resolve the company to a ticker or CIK.
2. List its filings, or fetch the one the user needs.
3. Extract the figure or passage. `pdftext` reads PDF exhibits in the same shell.
4. Reply with the figure or passage, the form type, the period it covers, the filing date and a link to the filing.

## When to use other tools

- A single factual question can go to `ask`, which cites the run it used.
- A full company report belongs in a workbook: `create_workbook` with a one-sentence instruction. That starts a billed research run; say so first.
- For private companies' raises filed on Form D, use the form-d-raises skill.
