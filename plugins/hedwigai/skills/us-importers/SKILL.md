---
name: us-importers
description: Find US importers and their overseas suppliers from customs bill-of-lading records — who imports a product, from whom, how often and through which ports. Use when the user wants buyers for a product in the US, a company's suppliers, shipment history for an importer, or a list of importers to sell to.
---

# US importers

Searches US customs shipment records (bills of lading) through the `trade` program in the hedwigai MCP's read-only shell, and can follow links from a buyer to its suppliers or from a supplier to its buyers.

## Before you start

This skill uses the hedwigai MCP's `bash` and `create_workbook` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, this plugin already declares the server.

Some programs are metered against the account's prepaid credits. `programs list` shows what each one bills.

## Steps

1. Run `trade --help` with the `bash` tool to see the current options. Don't guess flags.
2. Search by product description or HS code to find importers, or by company name to see one importer's shipments.
3. For a chosen company, list its suppliers (or a supplier's US buyers) with shipment counts and the most recent shipment date.
4. Reply with a short table: company, location, counterparties, shipment count, last shipment, and the product description as filed.

## Turning it into a lead list

For a list the user will work through — "find 30 US importers of loose leaf tea and the buyer at each" — use `create_workbook` with that sentence as the `instruction`. It starts a billed research run that builds the table and keeps it current; say so before starting.

## Care points

- Some importers file under a customs broker's or logistics company's name, so a missing company isn't proof it doesn't import.
- Product descriptions are free text written by the filer; check a few records before trusting a keyword search.
