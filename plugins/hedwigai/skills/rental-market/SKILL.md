---
name: rental-market
description: "Research rents: rental listings and comparables in a US ZIP code or around a place in an Indian city, asking-rent history by week, HUD maximum rents and income limits by AMI percent, and census tract data with opportunity categories. Use for rent comps, pricing a unit, affordable-housing limits, or how rents in a neighbourhood are moving."
---

# Rental market

Reads rental listings and housing tables through `realestate-us` and `realestate-in` in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## United States: `realestate-us`

| Question | Study |
| --- | --- |
| Listings in one ZIP, merged across sources | `realestate-us search <ZIP>` |
| Everything about one listing | `realestate-us detail <comp_key>` |
| Several ZIPs at once | `realestate-us harvest <zip,zip,…>` |
| Maximum rents by AMI percent and bedrooms | `realestate-us ami-rents <state>` (check `ami-years` first: tables are per state and year) |
| Income limits by AMI percent and household size | `realestate-us ami-income-limits <state>` |
| Which census tract an address is in | `realestate-us resolve "<address>"` |
| ACS estimates and opportunity category for a tract or county | `realestate-us tract <GEOID>`, `tracts <COUNTY_FIPS>` |

A suppressed or top-coded census value comes back null with a flag, never 0. Each value carries its source and vintage.

## India: `realestate-in`

`realestate-in search <city> --locality <name> --radius_km 5`, or `--latitude`/`--longitude` when the geocoder places a neighbourhood wrong. `realestate-in history <city> --locality <name>` gives weekly median asking rents by flat size. History starts the day a place is first searched.

Some Indian listings publish a fill point instead of a location; their coordinates are dropped and `location_approximate_count` says how many.

## Reply

A comps table (address or locality, size, rent, source, date listed) with the median, and the limits or tract data the question needs, each with its vintage.
