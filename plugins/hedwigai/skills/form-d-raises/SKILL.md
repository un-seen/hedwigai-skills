---
name: form-d-raises
description: "Find private funding rounds disclosed in SEC Form D filings — which companies raised, how much, when, under which exemption and with which officers named — including this month's new filings. Use when the user asks who just raised money, wants recent raises in a sector or state, or wants to check a private company's reported fundraising."
---

# Form D raises

Searches SEC Form D notices of exempt offerings through the `funding` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If it isn't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, this plugin already declares the server.

Some programs are metered against the account's prepaid credits. `programs list` shows what each one bills.

## Steps

1. Run `funding --help` with the `bash` tool to see the current options. Don't guess flags.
2. For this month's new filings, use `funding recent`. For a specific company, search by name.
3. Filter to what the user asked for — industry group, state, offering size, date range.
4. Reply with a short table: company, amount sold (and total offering, if different), filing date, industry, state, and a link to each filing.

## Care points

- A Form D is a notice, not a press release: the amount is what the company reported as sold, and later amendments can change it. Prefer the latest amendment.
- Not every private raise files a Form D, so an empty result doesn't prove a company hasn't raised.
- To turn a list of raises into an outreach list, `outreach` in the same shell finds who holds a role at a company. Ask the user before running it, since it may be metered.
