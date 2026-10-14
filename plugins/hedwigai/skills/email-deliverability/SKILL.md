---
name: email-deliverability
description: Check a domain's email authentication and registration — SPF, DKIM, DMARC policy, MX and nameservers, and how old the domain is. Use when emails are landing in spam, before a cold outreach campaign, when vetting a supplier or a lead's domain, or to check whether a domain is new.
---

# Email deliverability

Reads a domain's DNS through the free `dns` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Steps

1. `dns records <domain>`.
2. Reply with: MX provider, SPF (and whether it ends in `-all` or `~all`), the DKIM selectors found, the DMARC policy, nameservers, and registration date.

## Read it right

- Read the DMARC policy, not its presence. `p=none` asks receivers to do nothing about a failure; only `quarantine` or `reject` protects the domain.
- DKIM can't be listed. The check probes the selectors common providers use and says which it tried; a miss is inconclusive, not a failure.
- A domain registered in the last few weeks is a reason for caution with an unknown supplier or sender.
