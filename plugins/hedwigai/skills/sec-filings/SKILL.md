---
name: sec-filings
description: Look up SEC EDGAR filings for a US public company — 10-K, 10-Q, 8-K, S-1, proxy statements — and pull figures or passages from them with the filing cited. Use when the user asks what a company disclosed to the SEC, wants a recent filing, or needs revenue, cash, risk factors or other figures from an annual or quarterly report.
---

# SEC filings

Finds and reads SEC filings through the `sec-filings` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` and `ask` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, this plugin already declares the server. Don't answer filing questions from memory: filings change every quarter.

Some programs are metered against the account's prepaid credits. `programs list` shows what each one bills; check before running large batches.

## Steps

1. Run `sec-filings --help` with the `bash` tool to see the current options. Don't guess flags.
2. Look up the company by ticker or name and list its recent filings, filtered to the form type the user needs (10-K, 10-Q, 8-K, S-1, DEF 14A).
3. For figures or passages inside a filing, fetch the document and extract the relevant section (`pdftext` is available in the same shell for PDF exhibits). Work in `/tmp`; nothing else is writable.
4. Reply with the figure or passage, the form type, the period it covers, the filing date and a link to the filing.

## When to use other tools

- A single factual question ("What was X's cash at the end of Q2?") can go to `ask`, which cites the program run it used.
- A full company report belongs in a workbook: `create_workbook` with a one-sentence instruction. That starts a billed research run; say so first.
- For private-company raises filed on Form D, use the form-d-raises skill instead.
