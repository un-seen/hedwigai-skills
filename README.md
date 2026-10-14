# hedwigai skills

[![skills.sh](https://skills.sh/b/un-seen/hedwigai-skills)](https://skills.sh/un-seen/hedwigai-skills)

Skills for AI agents that turn questions about companies into answers grounded in primary records — web traffic and rankings, hiring, Form D raises, new subdomains, trademarks, SEC filings, FDA records, ClinicalTrials.gov, PubMed, US customs shipments — with a source cited for every claim.

They run on the [hedwigai MCP](https://claude.ai/directory/hedwigai). Larger jobs become **workbooks**: living documents that a research run writes, cites and keeps current, and that tell you when a cited source changes.

## Skills

| Skill | Use it for | Runs on |
| --- | --- | --- |
| [hedwigai](plugins/hedwigai/skills/hedwigai/SKILL.md) | When to reach for hedwigai at all, and which tool or program answers which question | all tools |
| [company-signals](plugins/hedwigai/skills/company-signals/SKILL.md) | What a company is doing now: web traffic, Google rankings, sponsored hiring, raises, new subdomains, trademarks — competitor teardowns and account research | `traffic`, `rank`, `h1b-hiring`, `funding`, `webcertificates`, `us-trademarks` programs |
| [biotech-diligence](plugins/hedwigai/skills/biotech-diligence/SKILL.md) | Diligence memos on biotech companies: pipeline, lead program data, competitors, standard of care, PTRS and landscape by indication | `create_workbook`, `ask` |
| [sec-filings](plugins/hedwigai/skills/sec-filings/SKILL.md) | 10-K, 10-Q, 8-K and S-1 lookups, with figures and passages cited to the filing | `sec-filings` program |
| [fda-lookup](plugins/hedwigai/skills/fda-lookup/SKILL.md) | Approvals, labels, recalls and adverse event reports for drugs and devices | `fda` program |
| [form-d-raises](plugins/hedwigai/skills/form-d-raises/SKILL.md) | Private funding rounds from SEC Form D, including this month's filings | `funding` program |
| [us-importers](plugins/hedwigai/skills/us-importers/SKILL.md) | US importers and their overseas suppliers from customs bills of lading | `trade` program |

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
