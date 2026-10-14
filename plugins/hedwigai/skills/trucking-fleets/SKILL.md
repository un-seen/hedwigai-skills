---
name: trucking-fleets
description: "Look up US motor carriers from the federal census — a carrier's fleet size, drivers, address and registration date; every trucking company that registered since a date; and carriers whose fleet just changed size. Use when the user sells to trucking companies, wants new fleets in a state, is vetting a carrier, or wants fleets that are growing."
---

# Trucking fleets

Reads a weekly mirror of the federal motor carrier census through the `us-motor-carriers` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`us-motor-carriers` may be switched off on the account. If the shell says so, ask the user before running `programs enable us-motor-carriers`: enabling a metered program means its calls are charged. `programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Question | Study |
| --- | --- |
| One carrier: fleet, drivers, address, registration | `us-motor-carriers search <name>` (or `--dot_number`; `--state`, `--min_power_units`) |
| Every fleet that registered since a date | `us-motor-carriers list <YYYY-MM-DD>` (`--state`, `--min_power_units 5` skips owner-operators) |
| Carriers whose fleet changed size | `us-motor-carriers changed` (run it alone to see its options) |

## Read it right

- Every answer carries `mirrored_at`. "No new carriers" from an old mirror is a different claim; give the date.
- Fleet counts are self-reported. Implausible ones come back with `counts_implausible: true` and sort last. Don't rank on `power_units` without reading that field.
- `changed` is only answerable because hedwigai keeps the history; the census itself keeps none.
