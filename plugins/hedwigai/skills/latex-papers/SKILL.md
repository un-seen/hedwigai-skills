---
name: latex-papers
description: "Compile a LaTeX, Typst or Markdown document to a PDF from inside the agent, fix its compile errors without the user pasting them back, and hand over a link to the PDF — through the hedwigai MCP's render_document tool. Real TeX (Tectonic, XeTeX underneath): journal and conference classes such as IEEEtran, acmart, elsarticle and NeurIPS or ICML styles, BibTeX bibliographies, multi-file projects with chapters and figures. Use when the user is writing or editing a paper, thesis, report or letter and wants the PDF, asks to compile or build LaTeX, gets a compile error, or would otherwise copy the source into Overleaf."
---

# LaTeX, Typst and Markdown to PDF

`render_document` compiles a document you wrote and returns either a link to the PDF, kept in the user's own hedwigai storage for about six days, or the compiler's error cut to the line that failed. Compiling is free; it draws no credit.

## Before you start

This skill uses the hedwigai MCP's `render_document` tool. If it isn't available, tell the user to connect hedwigai: in Claude, from https://claude.ai/directory/hedwigai or Settings, Connectors, Add custom connector with `https://mcp.hedwigai.com`; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; in Codex, `codex mcp add hedwigai --url https://mcp.hedwigai.com`; in Hermes Agent, a `hedwigai` entry under `mcp_servers` in `~/.hermes/config.yaml` with `url: "https://mcp.hedwigai.com"` and `auth: oauth`; anywhere else, add `https://mcp.hedwigai.com` as a remote MCP server.

If the tool offers only `typst` and `markdown` formats, the client is holding an old copy of the tool list: ask the user to reconnect hedwigai.

## Pick the format

| The document | `format` |
| --- | --- |
| A `.tex` paper, thesis or letter, or anything with `\documentclass` | `latex` |
| A Typst document | `typst` |
| Notes or a report in Markdown, with maths in `$…$` | `markdown` |

Write a new paper in LaTeX when the venue gives a LaTeX template, which most do; Typst when the user has no template and wants it to compile fast.

## Send the whole project

- `source` is the main `.tex` file; it is compiled as `main.tex`.
- Everything else goes in `files`, each with the relative path the source uses: `{path: "refs.bib", text: "…"}`, `{path: "chapters/intro.tex", text: "…"}`, the venue's `.cls` or `.sty` if it is not in TeX Live, and images as `{path: "figures/plot.png", base64: "…"}`.
- Images already online can go in `assets` instead, as `{url, path}`: public https URLs only.
- `name` sets the PDF's file name, e.g. `thesis-chapter-2`.

Keep the project as the user has it: same file names, same `\input` and `\includegraphics` paths.

## The compile loop

1. Call `render_document`.
2. If it returns a `url`, the document compiled: give the user the link.
3. If it says the document did not compile, read the error: the file and line (`main.tex:42:` or `main.bbl:24:`), TeX's own message, and the lines around it. Fix that cause in the source, not the symptom, and call again.
4. Stop after five attempts on the same error and show the user the error and what you tried.

Common causes:

| Error says | Usually |
| --- | --- |
| `Undefined control sequence` | A macro from a package that isn't loaded, or a typo |
| `File '…' not found` | A file missing from `files`, or a path that differs from the source's |
| `Something's wrong--perhaps a missing \item` in `main.bbl` | An empty bibliography: the `.bib` was not sent, or nothing is cited |
| `Missing $ inserted` | Maths outside a maths environment, often `_` or `^` in text |
| A message about `minted` or shell escape | Shell escape is off: switch to `listings` |
| A message about `biber` | Biber is not available: use `\usepackage[backend=bibtex]{biblatex}` or plain BibTeX |

The first compile of a rarely used package can take a minute while the server fetches it. Say so if the user is waiting.

## What it does not do

- No live co-editing, track changes or history. Keep the source in the user's own files, Git or Overleaf.
- No shell escape (`minted`), no biber, no LuaLaTeX. The engine is XeTeX, which compiles pdfLaTeX and XeLaTeX documents. The package set is TeX Live 2022's.

## Then offer the checks

A paper that compiles can still cite a work that does not exist. Once it compiles, offer the **reference-checker** skill: every reference looked up in Crossref and on the web, and each citing sentence read against the work it cites. That is a billed run, so say so and get a yes first.

## Ground rules

- Never claim a document compiled until a `url` came back.
- Don't change the user's prose, citations or layout to make an error go away; fix the cause, and say what you changed.
- Give the PDF link once, with what the document is, not the whole link text in a sentence.
