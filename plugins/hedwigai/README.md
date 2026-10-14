# hedwigai plugin

23 skills and the hedwigai MCP server for research grounded in primary records, with a source cited for every claim:

- **hedwigai** — When to reach for hedwigai, and which skill answers which question
- **company-signals** — What a company is doing now — traffic, rankings, hiring, raises, launches, liens — for competitor teardowns and account research
- **web-traffic** — Estimated monthly Google organic visits for up to 1,000 domains at once
- **seo-rankings** — Where a site ranks on Google for each keyword, who is above it, and the history
- **lead-lists** — Companies matching a description, who holds a role, checked work emails, and drafts that are never sent
- **hiring-signals** — Live job posts for a role this month, and sponsored-hiring filings with wages and new seats
- **launch-signals** — New subdomains, trademark applications, FCC and FDA device registrations — launches before they're announced
- **form-d-raises** — Private funding rounds from SEC Form D, including this month's filings
- **social-listening** — Posts, profiles, comments and search on X, LinkedIn, Instagram and YouTube
- **sec-filings** — 10-K, 10-Q and 8-K text, filing lists, financials, public float and 13F holders
- **fda-lookup** — Drug labels, approvals and patents; medical device establishment registrations
- **biotech-diligence** — Diligence memos on biotech companies: pipeline, lead program data, competitors, PTRS and landscape
- **us-importers** — US importers, their overseas suppliers and shipments from customs bills of lading
- **new-venue-openings** — Bars, restaurants and food shops newly licensed to open in Chicago, New York, Colorado and Missouri
- **trucking-fleets** — US motor carriers, new fleets since a date, and fleets that changed size
- **rental-market** — Rent comps in a US ZIP or Indian city, rent history, HUD AMI limits and census tract data
- **airport-traffic** — Every flight movement at an airport on a day, by terminal and hour
- **llm-prices** — What every provider charges for current language models, cheapest first
- **email-deliverability** — A domain's SPF, DKIM, DMARC policy, MX and registration age
- **package-adoption** — npm downloads and GitHub stars, issues and last push
- **cited-web-research** — Web search and reading with every cited page and PDF held under its own link
- **excel-workbooks** — Read and edit Excel files with formulas recalculated and references kept
- **edi-remittance** — X12 820 remittance and 812 adjustment files as CSV with reason codes

Install in Claude Code:

```
/plugin marketplace add un-seen/hedwigai-skills
/plugin install hedwigai@hedwigai
```

You'll be asked to sign in to hedwigai the first time a skill calls the MCP. Reading and editing workbooks is free; research runs and metered data programs use your account's credits.

Full documentation: https://github.com/un-seen/hedwigai-skills
