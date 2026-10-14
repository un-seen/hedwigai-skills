---
name: fda-lookup
description: "Look up US FDA records with the record cited — a drug's approved label (indications, boxed warning, route), every FDA application for a molecule and when it was first approved, Orange Book patent expiries, and medical device establishment registrations. Use when the user asks whether a drug is FDA approved, what its label says, when its patents expire, who holds the application, or which companies have registered to make a medical device."
---

# FDA lookup

Reads FDA records through two programs in the hedwigai MCP's read-only shell: `biotech drug …` for drugs, and `fda` for medical device establishments.

## Before you start

This skill uses the hedwigai MCP's `bash` and `ask` tools. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server. Don't answer approval or label questions from memory: labels and approvals change.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Drugs: `biotech drug`

| Question | Study |
| --- | --- |
| What does the label say? Boxed warning, indications, route | `biotech drug label <NAME>` |
| Every FDA application for the molecule, originator vs generic, first approval date | `biotech drug approvals <NAME>` |
| Patent expiries, use codes, who holds the application today | `biotech drug patents <NAME or APPLICATION-NO>` |
| Every name the molecule goes by (code, USAN, brand, RxCUI, UNII) | `biotech drug identifiers <NAME>` |
| Structure and formula | `biotech drug chemistry <NAME>` |

The answer sits under `data`, for example `biotech drug label clopidogrel | jq -r '.data.boxed_warning'`. For many drugs at once, `biotech drug label --each "clopidogrel|prasugrel|ticagrelor"` costs about what one does; separate names with `|`, never a comma. If a brand name finds nothing, run `identifiers` first and retry with the generic name.

## Medical devices: `fda`

`fda search <company>` returns the company's device establishment registrations: the device, its product code, and the establishment's role (manufacturer, contract sterilizer, repackager). A company must register before it can sell a device in the US, so a registration often comes months before the product ships. An empty answer means no device establishment on record; it says nothing about the company's drugs.

## Reply

Give the answer, the record type, its date, and the identifier (application number, SPL set id, product code) or the link the answer cites.

## Not covered here

Recalls and adverse event reports are not among these studies. Say so rather than answering from memory; `browser search` can find the FDA's own pages if the account has `browser` on. For a company's whole pipeline, trials and competitors, use the biotech-diligence skill.

## Care points

- Label text is for information, not medical advice.
- `approvals` separates originators from generics; read it before saying "approved since".
- `patents` names who holds the application today, which may not be the company that developed the drug.
