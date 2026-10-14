---
name: us-importers
description: Find US importers and their overseas suppliers from customs bill-of-lading records — who ships to an importer, who an exporter sells to in the US, and each company's shipments by date and HS code. Use when the user wants US buyers for a product, a company's suppliers or customers, shipment history, or a list of importers to sell to.
---

# US importers

Reads US customs bills of lading through the `trade` program in the hedwigai MCP's read-only shell, following links from an importer to its suppliers or from an exporter to its US customers.

## Before you start

This skill uses the hedwigai MCP's `bash` and `create_workbook` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Question | Study |
| --- | --- |
| Find a company and see what is already held for it | `trade search companies <QUERY>` (matches company names; add `--refresh` to fetch, which runs a browser) |
| Who ships to this importer | `trade company suppliers <SLUG>` |
| An importer's bills of lading | `trade company shipments <SLUG>` |
| Who this exporter ships to in the US | `trade supplier customers <SLUG>` |
| An exporter's bills of lading | `trade supplier shipments <SLUG>` |

Filters: `--hs <CODE>` (a prefix: `84` is the whole chapter), `--from` / `--to` (YYYY-MM-DD), `--limit`.

## Finding buyers for a product

Search matches company names, not products. To find who imports a product, start from an exporter that makes it — a competitor, or a known overseas maker — and run `supplier customers` on it: those are the US firms already buying what the user sells. Narrow with `--hs` to the product's HS code.

## Cost and timing

Each study drives a browser against the vendor: about 15 seconds for a search and 50 for a capture, and each command line is stopped at 300 seconds. Run one study per command rather than chaining several with `;`. If an answer has `complete: false`, `failed` says which part didn't read, and asking again with other flags won't change it.

## Turning it into a lead list

For a list the user will work through — "find 30 US importers of loose leaf tea and the buyer at each" — use `create_workbook` with that sentence as the `instruction`. It starts a billed research run; say so before starting. The lead-lists skill finds the people and addresses.

## Care points

- Some importers file under a customs broker's or a logistics company's name, so a missing company isn't proof it doesn't import.
- Product descriptions are free text written by the filer; check a few records before trusting them.
