---
name: cited-web-research
description: Research a question on the web and keep the original of every page and PDF you cite — ranked search results, the passages of pages that bear on a question, archived originals with a citable link, and a live browser for pages that need clicks. Use when the user needs sources, not just an answer, or a report whose every claim links to a held copy of its source.
---

# Cited web research

Searches and reads the web through `browser` and `pplx` in the hedwigai MCP's read-only shell, filing each original under its own URL so the citation and the copy match.

## Before you start

This skill uses the hedwigai MCP's `bash` and `create_workbook` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`browser` may be switched off on the account. If the shell says so, ask the user before running `programs enable browser`: enabling a metered program means its calls are charged. `programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Step | Study |
| --- | --- |
| Ranked results for a question (titles, URLs, dates; Google operators work) | `browser search "<query>"` or `pplx search web "<query>"` (`--recency-filter week`, `--domains`, `--country`) |
| The passages of pages that bear on the question, each page held first | `pplx content snippets "<query>" <url> [url…]` |
| The original document, held under its URL | `browser asset <URL>`, then read it with `pdftext <URL>`, `doctext` or `xlsx` |
| A page that needs clicks or a login | `browser session open <URL>`, `session act …`, then `session save` to make the page citable |

## Ground rules

- Search results carry no quoted text. Open a page with `browser asset` or quote it with `pplx content snippets` before using what it says.
- Cite the held original. A session's `read` and `screenshot` land in `/tmp` and are not citable; `session save` is.
- If `browser` is switched off, say the web couldn't be reached and what that prevented, rather than answering from what else is readable.

## A report

For a question that needs many sources and a write-up kept current, `create_workbook` with a one-sentence instruction starts a billed research run that cites every claim; say so first.
