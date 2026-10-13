---
name: fda-lookup
description: Look up US FDA records for a drug, device or company — approvals, labels and prescribing information, recalls, adverse event reports, establishment registrations — with the FDA record cited. Use when the user asks whether something is FDA approved, what a drug's label says, about recalls or warning signals, or which products a company has cleared.
---

# FDA lookup

Queries FDA records through the `fda` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` and `ask` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, this plugin already declares the server. Don't answer approval or label questions from memory: labels, recalls and approvals change.

Some programs are metered against the account's prepaid credits. `programs list` shows what each one bills.

## Steps

1. Run `fda --help` with the `bash` tool to see which record types and filters are available. Don't guess flags.
2. Search by the most specific identifier you have: brand or generic drug name, application number, device name, or company.
3. Pull the records that answer the question — approval status and date, label sections (indications, boxed warnings, dosing), recall class and reason, or adverse event counts.
4. Reply with the answer, the record type, its date and a link or identifier for the FDA record.

## Care points

- Adverse event reports are unverified reports, not proof a product caused an event. Say so when you report counts.
- Label text is for information, not medical advice.
- For a company-level view of a biotech's pipeline and competitors, use the biotech-diligence skill.
