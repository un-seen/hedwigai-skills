# hedwigai plugin

Seven skills and the hedwigai MCP server for research grounded in primary records, with a source cited for every claim:

- **hedwigai** — when to use hedwigai, and which tool or program answers which question
- **company-signals** — what a company is doing now: web traffic, rankings, hiring, raises, new subdomains, trademarks
- **biotech-diligence** — diligence memos on biotech companies: pipeline, lead program data, competitors, standard of care, PTRS and landscape by indication
- **sec-filings** — 10-K, 10-Q, 8-K and S-1 lookups
- **fda-lookup** — approvals, labels, recalls and adverse event reports
- **form-d-raises** — private funding rounds from SEC Form D
- **us-importers** — US importers and their suppliers from customs bills of lading

Install in Claude Code:

```
/plugin marketplace add un-seen/hedwigai-skills
/plugin install hedwigai@hedwigai
```

You'll be asked to sign in to hedwigai the first time a skill calls the MCP. Reading and editing workbooks is free; research runs and metered data programs use your account's credits.

Full documentation: https://github.com/un-seen/hedwigai-skills
