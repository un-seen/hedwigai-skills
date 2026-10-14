# hedwigai skills

[![skills.sh](https://skills.sh/b/un-seen/hedwigai-skills)](https://skills.sh/un-seen/hedwigai-skills)

Skills for AI agents that turn questions about companies, markets and people into answers grounded in primary records — web traffic and Google rankings, leads and checked emails, hiring, raises, launches, social posts, SEC filings, FDA records, US customs shipments, rents, model prices — with a source cited for every claim.

They run on the [hedwigai MCP](https://claude.ai/directory/hedwigai). Larger jobs become **workbooks**: living documents that a research run writes, cites and keeps current, and that tell you when a cited source changes.

## Skills

| Skill | Use it for |
| --- | --- |
| [hedwigai](plugins/hedwigai/skills/hedwigai/SKILL.md) | When to reach for hedwigai, and which skill answers which question |
| [company-signals](plugins/hedwigai/skills/company-signals/SKILL.md) | What a company is doing now — traffic, rankings, hiring, raises, launches, liens — for competitor teardowns and account research |
| [web-traffic](plugins/hedwigai/skills/web-traffic/SKILL.md) | Estimated monthly Google organic visits for up to 1,000 domains at once |
| [seo-rankings](plugins/hedwigai/skills/seo-rankings/SKILL.md) | Where a site ranks on Google for each keyword, who is above it, and the history |
| [lead-lists](plugins/hedwigai/skills/lead-lists/SKILL.md) | Companies matching a description, who holds a role, checked work emails, and drafts that are never sent |
| [hiring-signals](plugins/hedwigai/skills/hiring-signals/SKILL.md) | Live job posts for a role this month, and sponsored-hiring filings with wages and new seats |
| [launch-signals](plugins/hedwigai/skills/launch-signals/SKILL.md) | New subdomains, trademark applications, FCC and FDA device registrations — launches before they're announced |
| [form-d-raises](plugins/hedwigai/skills/form-d-raises/SKILL.md) | Private funding rounds from SEC Form D, including this month's filings |
| [social-listening](plugins/hedwigai/skills/social-listening/SKILL.md) | Posts, profiles, comments and search on X, LinkedIn, Instagram and YouTube |
| [sec-filings](plugins/hedwigai/skills/sec-filings/SKILL.md) | 10-K, 10-Q and 8-K text, filing lists, financials, public float and 13F holders |
| [fda-lookup](plugins/hedwigai/skills/fda-lookup/SKILL.md) | Drug labels, approvals and patents; medical device establishment registrations |
| [biotech-diligence](plugins/hedwigai/skills/biotech-diligence/SKILL.md) | Diligence memos on biotech companies: pipeline, lead program data, competitors, PTRS and landscape |
| [us-importers](plugins/hedwigai/skills/us-importers/SKILL.md) | US importers, their overseas suppliers and shipments from customs bills of lading |
| [new-venue-openings](plugins/hedwigai/skills/new-venue-openings/SKILL.md) | Bars, restaurants and food shops newly licensed to open in Chicago, New York, Colorado and Missouri |
| [trucking-fleets](plugins/hedwigai/skills/trucking-fleets/SKILL.md) | US motor carriers, new fleets since a date, and fleets that changed size |
| [rental-market](plugins/hedwigai/skills/rental-market/SKILL.md) | Rent comps in a US ZIP or Indian city, rent history, HUD AMI limits and census tract data |
| [airport-traffic](plugins/hedwigai/skills/airport-traffic/SKILL.md) | Every flight movement at an airport on a day, by terminal and hour |
| [llm-prices](plugins/hedwigai/skills/llm-prices/SKILL.md) | What every provider charges for current language models, cheapest first |
| [email-deliverability](plugins/hedwigai/skills/email-deliverability/SKILL.md) | A domain's SPF, DKIM, DMARC policy, MX and registration age |
| [package-adoption](plugins/hedwigai/skills/package-adoption/SKILL.md) | npm downloads and GitHub stars, issues and last push |
| [cited-web-research](plugins/hedwigai/skills/cited-web-research/SKILL.md) | Web search and reading with every cited page and PDF held under its own link |
| [excel-workbooks](plugins/hedwigai/skills/excel-workbooks/SKILL.md) | Read and edit Excel files with formulas recalculated and references kept |
| [edi-remittance](plugins/hedwigai/skills/edi-remittance/SKILL.md) | X12 820 remittance and 812 adjustment files as CSV with reason codes |

## Install

**Claude Code** — adds the skills and the hedwigai MCP together:

```
/plugin marketplace add un-seen/hedwigai-skills
/plugin install hedwigai@hedwigai
```

You'll be asked to sign in to hedwigai the first time a skill calls the MCP.

**Claude (web, desktop, mobile)** — connect hedwigai from the [connector directory](https://claude.ai/directory/hedwigai), then ask for what you need, for example *"Write a diligence memo on Alterity Therapeutics"* or *"Compare the organic traffic and recent raises of these five competitors"*.

**Codex, Cursor and other agents** — install the skills with the [skills CLI](https://skills.sh):

```
npx skills add un-seen/hedwigai-skills
```

then add `https://mcp.hedwigai.com/` as a remote MCP server in that agent. To install one skill, add `--skill company-signals` (or any name from the table).

**Any other MCP client** — add `https://mcp.hedwigai.com/` as a remote MCP server. The `SKILL.md` files are plain Markdown and work as instructions for any agent.

## What it costs

Reading, searching and editing workbooks is free. Research runs and metered data programs draw on your hedwigai account's credits; your first workbook is covered by sign-up credit. See [hedwigai.com](https://hedwigai.com).

## See it work

- [Biotech diligence source-set benchmark](https://hedwigai.com/blog/biotech-diligence) — how completely the diligence run collects the documents an analyst needs, across 11 companies.

## Contributing

Issues and pull requests are welcome. Each skill is one folder under `plugins/hedwigai/skills/` holding a `SKILL.md`. Keep descriptions specific about when the skill applies, and have skills look things up through the MCP rather than answer from memory.

## License

MIT
