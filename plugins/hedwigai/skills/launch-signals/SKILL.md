---
name: launch-signals
description: Spot what a company is about to launch before it announces it — new subdomains going live (api., checkout., status.), trademark applications for products not yet on sale, FCC radio equipment registrations, and FDA medical device establishment registrations. Use for competitor watch, product intelligence, or finding companies mid-build to sell to.
---

# Launch signals

Reads the public registers a company has to file in before it ships, through programs in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Which register says what

| Signal | Study | Read it as |
| --- | --- | --- |
| A new subdomain went live | `webcertificates search <domain>` | Certificates for names at or under the domain, newest first. A new `api.`, `checkout.` or `status.` is something going live this week. Also answers "who just joined" a platform with per-customer subdomains, such as `myshopify.com` |
| A product name and what it will sell | `us-trademarks search <company>` | Applications matched on who filed. Read the goods and services; an "intent to use" filing means nothing is on sale yet. Needs a free USPTO key on the account, and says so if missing |
| Hardware that transmits | `fcc search <company>` | A grantee code means the company has committed to shipping a radio device. `fcc ids` is in preview and doesn't currently return |
| A medical device | `fda search <company>` | Device establishment registrations, filed before a device can be sold in the US |

## Steps

1. Get the company's name and main domain.
2. Run the studies that fit the company: software → `webcertificates`, `us-trademarks`; hardware → add `fcc`; medtech → add `fda`.
3. Reply with the newest signals first: what, where it was filed, and its date. Say what each one implies, and that it is a filing, not an announcement.

## Care points

- A lookalike domain is not a match; `webcertificates` keeps to the real domain and its subdomains.
- Every signal's value is its date. Lead with it.
- For traffic, hiring and raises alongside launches, use the company-signals skill.
