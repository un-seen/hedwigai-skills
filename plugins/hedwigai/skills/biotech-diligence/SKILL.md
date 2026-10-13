---
name: biotech-diligence
description: Biotech and biopharma due diligence with a cited source for every claim. Use when the user asks for a diligence memo, investment memo or deep dive on a biotech company, its pipeline, lead program, clinical trials, competitors or standard of care, or for a PTRS / probability-of-success or landscape analysis by program and indication.
---

# Biotech diligence

Produces a diligence memo on a biotech company as a hedwigai **workbook**: a living document a research run writes from primary sources, with a citation on every claim, that flags when a cited source changes.

## Before you start

This skill uses the hedwigai MCP tools (`create_workbook`, `ask`, `read_workbook`, `workbook_sources`, `recheck_sources`). If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, this plugin already declares the server and asks them to sign in on first use. Don't fall back to writing the memo from memory.

Workbook runs are billed to the user's hedwigai account (the first workbook is covered by sign-up credit). Reading, searching and editing workbooks is free. Say so before starting a run.

## Quick factual questions

For a single fact — "What is X's lead program?", "Is X a biotech with public float above $5B?", "Which phase is X's lead asset in?" — call `ask` with the question. It answers from the account's workbooks and data programs, returns `unsure` instead of guessing, and lists its sources. Give the company's ticker when you know it so `ask` can tell two similarly named companies apart.

## A full diligence memo

1. Check whether a workbook already exists: `search_workbooks` with the company name. If one does, `read_workbook` it and offer to update it rather than starting over.
2. Otherwise call `create_workbook` with a one-sentence `instruction`, for example:
   `Diligence memo on Alterity Therapeutics (NASDAQ:ATHE): pipeline and programs table, lead program clinical data, competitors and standard of care per indication, cash runway, key risks.`
   Put it in a folder such as `Diligence`. Attach any data-room files the user gives you with `attachments` so the run reads and cites them.
3. The run collects the standard source set: investor presentations; literature and posters linked from the company site; 10-K and 10-Q filings; prescribing information for the company's approved drugs and for competitor and standard-of-care drugs; PubMed and Google Scholar results on the same indication and mechanism; ClinicalTrials.gov entries.
4. Runs take minutes. When it finishes, `read_workbook` and summarise the findings for the user, quoting the memo's own citations. Use `workbook_sources` if they want the source list.
5. Later, `recheck_sources` reports which cited sources have moved since the memo was written.

## PTRS and landscape

Once a company memo has a programs table, offer one workbook per program × indication for PTRS (probability of technical and regulatory success) and one per indication for the competitive landscape. Create each with `create_workbook`, naming the program, indication and company in the instruction, in folders `PTRS` and `Landscape Analysis`.

## Ground rules

- Every number and claim in your reply should trace to a citation in the workbook. If the workbook doesn't support something, say so.
- This is research support, not investment advice.
