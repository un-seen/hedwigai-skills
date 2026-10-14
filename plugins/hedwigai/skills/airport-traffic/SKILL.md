---
name: airport-traffic
description: Get every flight movement at an airport on a given day, about a year back or ninety days ahead, with per-terminal and per-hour rollups. Use when the user asks how busy an airport or terminal is, wants the arrivals or departures demand curve by hour, or plans staffing, retail or transport around flight volumes.
---

# Airport traffic

Reads airport-day flight schedules through the `aero` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Question | Study |
| --- | --- |
| Every movement that day | `aero airport schedule <IATA> <YYYY-MM-DD>` |
| Arrivals and departures per terminal | `aero airport terminals <IATA> <YYYY-MM-DD>` |
| Per terminal per local hour (the demand curve) | `aero airport hourly <IATA> <YYYY-MM-DD>` |

Flags: `--terminal`, `--direction arrival|departure`, `--from` / `--to` (local hours 0–23). Dates are in the airport's local time.

## Reply

Lead with the rollup that answers the question — the busiest hours or terminals — rather than a thousand rows, and give the date and airport.
