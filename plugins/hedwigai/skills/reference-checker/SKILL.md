---
name: reference-checker
description: "Check every reference in a thesis, dissertation, paper, grant proposal or report: each entry under References or Bibliography is looked up in Crossref and on the web and marked found, found with different authors or year, or not found, and each sentence that cites it — [3], (Smith et al., 2020), Smith (2020), a footnote — is read against the work it cites. Use when the user asks to check references or citations, verify a bibliography, find citations that don't exist or don't say what the text claims, or check an AI-written draft before submitting it."
---

# Reference checker

Hands a whole draft to a hedwigai **lattice room**, which leaves the words exactly as written and returns a verdict beside each reference and each citing sentence, with the record or passage that settles it.

## Before you start

This skill uses the hedwigai MCP's `create_workbook`, `read_workbook` and `bash` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

A check is a billed run. Each reference costs a Crossref lookup and, when the work is found, the filing of its record as a citable source; a long thesis with 80 references comes to a few dollars. Say so and get a yes before starting. `credits` shows the balance.

## Get the draft into markdown

The run reads markdown. Keep the whole document — body and bibliography — in one piece:

- **Word (.docx), Google Docs, PDF:** convert to markdown, keeping headings, paragraphs and links. In the hedwigai shell, `doctext` and `pdftext` read these files.
- **LaTeX:** render `\cite{key}` as the numbers or author–year text the compiled PDF would show, and turn the `.bib` file or `\bibitem` list into a formatted reference list (APA, IEEE or Vancouver), one entry per line.
- The bibliography must sit under a heading such as `## References`, `## Bibliography` or `## Works cited`, with one entry per line or list item. Keep each entry's DOI if it has one.
- Don't fix, reorder or reformat entries before the check. The point is to check what the author wrote.

## Run the check

1. `create_workbook` with `instruction` set to the whole markdown draft and `mode: "latticeroom"`. If the tool has no `mode` parameter, the connection is out of date: ask the user to reconnect hedwigai rather than starting a research run, which would rewrite the draft.
2. Poll `read_workbook` every minute or so until `live_run` is empty. A thesis takes several minutes.
3. Read `inference` from `read_workbook`. It is JSON lines, one span per checked sentence or reference: `text` (as written), `verdict`, `url` (the record), `quote` (the passage that settles it) and `note`.

## Read the verdicts

For a **reference**:

| `verdict` | Meaning |
| --- | --- |
| `cited` | Found: a Crossref record with this title, a matching first author and year (±1), or the title on a scholarly site such as arXiv or PubMed. `url` is the record. |
| `secondary` | Found only on a page that isn't a scholarly record. Worth a look. |
| `contradicted` | Found, but the note says what differs — "Crossref has it, but it was published in 2023", or other authors. Usually a typo or a different edition; sometimes a real paper with an invented author list. |
| `unsourced` | Not found in Crossref or on the web. The author must check that it exists as written. |

For a **sentence that cites a reference**: `cited` means the work it cites states it; `contradicted` means a source states otherwise (`quote` says what); `unsourced` means nothing read states it, and the note says when the reference it cites was itself not found; `secondary` means only a page reporting someone else's finding states it.

## Report back

Lead with the counts: references found, found with differences, not found. Then list every reference that was not found or differs, with the entry as written and the note. Then list citing sentences that are contradicted or unsourced, quoting the sentence and the source passage.

## Ground rules

- Never call a reference fabricated or fake. "Not found in Crossref or on the web" is the finding; books, theses, reports and very new or non-English works are often missing from Crossref.
- Don't rewrite the draft or replace references yourself unless the user asks. If they do, take replacements from a record the check found, never from memory.
- For one or two references, skip the run: `biotech literature crossref "<DOI or exact title>"` in the hedwigai `bash` tool returns the registered record. It is metered; `programs list` shows the price.
