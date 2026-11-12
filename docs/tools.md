# Tools

The 20 tools `tools/list` returns, generated from the live server. Each takes the workbook's id where it works on one. Tools marked *read-only* change nothing; the others say what they change and whether it is billed.

## `find_workbooks` — Find workbooks
*read-only*

Finds this account's workbooks. With no arguments, lists every workbook with its title, folder and when it last changed. With `query`, the workbooks whose title, latest prompt or text contain every word. With `describe`, the one workbook your words mean — chosen by meaning, not words — or none.

| Argument | Type | Description |
|---|---|---|
| `describe` | string | Which workbook, in your own words, e.g. 'the Q3 cash model for Sagamore'. Returns at most one. |
| `folder` | string | Only this folder and below it, e.g. Clients/Sagamore; `/` for the top level. |
| `query` | string | Words its title, prompt or text must contain, e.g. 'tea importers'. |

## `read_workbook` — Read a workbook
*read-only*

Reads a workbook. By default the whole current document as markdown, with its tabs. Narrow it with `tab`; a `section` (the prose under a heading, in your own words); a `table` (as data, in your own words); or `outline` for its headings, each with an `address` you can pass back to read just those. `version` reads an earlier version; `schema` returns its data-model rules; `notes` what its runs have learned about this account; `affected_by` every section an edit you describe would change.

| Argument | Type | Description |
|---|---|---|
| `address` | string | An `address` an outline gave: just those sections. |
| `affected_by` | string | An edit, in your own words: answers with every section it would change. |
| `notes` | boolean | true for the notes its runs keep about this account. |
| `outline` | boolean | true for its headings only, each with an address. |
| `schema` | boolean | true for the workbook's schema: the rules every edit must hold. |
| `section` | string | Which section, in your own words. |
| `tab` | string | One tab's id, from `tabs`. |
| `table` | string | Which table, in your own words. |
| `version` | integer | An earlier version to read. |
| `workbook` (required) | string | The workbook id. |

## `create_workbook` — Start a new workbook

Makes a new workbook from EXACTLY ONE of: `instruction` — one sentence the way a person would say it ('find 30 US importers of loose leaf tea and the buyer at each'), which starts a run that researches and writes it, is billed to this account and takes minutes; `document` — markdown you have written, which becomes version 1 at once; or `sheets` — tabs, each {name, markdown}, which become version 1 at once. Writing content yourself runs nothing and costs nothing. Nothing that already exists is changed.

| Argument | Type | Description |
|---|---|---|
| `attachments` | array | Files to attach to the workbook BEFORE the run starts, so it reads and cites them — each {name, content_base64, content_type?}, 32 MB at most. They stay attached for every later run; list_attachments shows them. |
| `document` | string | The first version as markdown, written by you. |
| `folder` | string | A folder to put it in, e.g. 'Outreach'. Made if missing. Omit for the root. |
| `instruction` | string | What the workbook should be, in one sentence. A billed run writes it. |
| `mode` | string | What this workbook's runs are, from now on. `harnessroom` (a new workbook's default): the instruction is a request, and a harness researches and writes the document. `latticeroom`: the instruction is a draft someone already wrote, whole — markdown, its links kept — which comes back exactly as written, with the run's inference beside it (read_workbook's `inference`: each claim cited, self-reported, secondary only, contradicted or with no source, and its sources); each entry under its References or Bibliography heading is looked up in Crossref and on the web and marked found, found with other authors or year, or not found, and a sentence citing it — [3], (Smith et al., 2020) — is read against the work found; attach data files (.json, .csv, .tsv) to settle the draft's own figures. `graphroom`: runs perform the procedure drawn for the workbook in the app, and refuse until one is drawn. `flashroom`, for a workbook made from a spreadsheet or a Word document: the instruction is an edit to its sheet, or to the document's table it is about, planned in seconds and kept in `messages` — each cell's before and after, the rows added and removed — and nothing is written until the next instruction is `yes`, which makes it as a new version. `askroom`: the workbook is asked and never changed — every instruction is a question of the document as it stands, answered in seconds and kept in `messages`; no run writes a version. A mirror's read-only copy is always an askroom. Omit to keep the workbook's current mode. |
| `model` | string | The model its runs think with, as configure_workbook names them — set before the first run. |
| `name` | string | Its name. A name another workbook has is told apart by this one's id. |
| `sealed` | boolean | true seals a harnessroom's runs: each sees the web, the programs and its own /tmp, and nothing an earlier run left — no drive, no attachments, no other workbook. For a measurement that must not be handed earlier research. |
| `sheets` | array | The first version as tabs, in order. |
| `sources_folder` | string | The drive folder you keep this workbook's subject in — `/dropbox/Trevi Therapeutics`. What the run cites is filed there once it delivers, instead of a folder named after the document's title. |
| `time_limit_seconds` | integer | How long its first run may take, for a run a person waits on: stopped there, it delivers the draft it has. Set before the run starts, so one call makes and starts it. |
| `title` | string | What it is shown by, e.g. 'Comps', where the name has to say more. Need not be unique: the name stays its address. |
| `work` | boolean | true when the instruction is work to do and never a question — your own router already said so. The run starts without first being asked whether it is a question. |

## `write_workbook` — Save, restore or re-rule a workbook
*changes or removes data*

Saves, replaces, restores or re-rules a workbook directly — no run, no charge. Save text you edited (`document`, or `sheets`, with the `base_version` you read); restore or undo to an earlier version (`restore_version` alone — no need to read first); or set its schema, the rules every edit must hold (`schema` alone, e.g. dates must be YYYY-MM-DD).

| Argument | Type | Description |
|---|---|---|
| `base_schema_version` | integer | With `schema`: the schema version you read; 0 where it had none. |
| `base_version` | integer | The version you read and changed. |
| `document` | string | The new text of a one-tab workbook. |
| `note` | string | One line on what changed. |
| `restore_version` | integer | An earlier version to make current again, as a new version. |
| `schema` | string | The whole new schema: a ```tables fence of JSON, and optionally a ```tla module. |
| `sheets` | array | Every tab in its new order. Tab ids come from read_workbook's `tabs`. |
| `workbook` (required) | string | The workbook id. |

## `run_workbook` — Change a workbook with a run

Changes what a workbook says by starting a research run: add, update, refresh or rewrite content, in one sentence the way a person would say it ('add a section on Q3 headcount', 'refresh the cash figures from the latest 10-Q'). Billed; returns its run id at once. Also answers the question a workbook is asking (`answer`: yes or no) and stops its live run (`stop`).

| Argument | Type | Description |
|---|---|---|
| `answer` | string | yes or no, to what the workbook is asking. |
| `attachments` | array | Files to attach to the workbook BEFORE the run starts, so it reads and cites them — each {name, content_base64, content_type?}, 32 MB at most. They stay attached for every later run; list_attachments shows them. |
| `instruction` | string | What should change, in one sentence. |
| `mode` | string | What this workbook's runs are, from now on. `harnessroom` (a new workbook's default): the instruction is a request, and a harness researches and writes the document. `latticeroom`: the instruction is a draft someone already wrote, whole — markdown, its links kept — which comes back exactly as written, with the run's inference beside it (read_workbook's `inference`: each claim cited, self-reported, secondary only, contradicted or with no source, and its sources); each entry under its References or Bibliography heading is looked up in Crossref and on the web and marked found, found with other authors or year, or not found, and a sentence citing it — [3], (Smith et al., 2020) — is read against the work found; attach data files (.json, .csv, .tsv) to settle the draft's own figures. `graphroom`: runs perform the procedure drawn for the workbook in the app, and refuse until one is drawn. `flashroom`, for a workbook made from a spreadsheet or a Word document: the instruction is an edit to its sheet, or to the document's table it is about, planned in seconds and kept in `messages` — each cell's before and after, the rows added and removed — and nothing is written until the next instruction is `yes`, which makes it as a new version. `askroom`: the workbook is asked and never changed — every instruction is a question of the document as it stands, answered in seconds and kept in `messages`; no run writes a version. A mirror's read-only copy is always an askroom. Omit to keep the workbook's current mode. |
| `run_id` | string | With `stop`: the run to stop, when not the live one. |
| `sources_folder` | string | The drive folder you keep this workbook's subject in — `/dropbox/Trevi Therapeutics`. What the run cites is filed there once it delivers, instead of a folder named after the document's title. |
| `stop` | boolean | true to stop the run editing the workbook. |
| `work` | boolean | true when the instruction is work to do and never a question — your own router already said so. The run starts without first being asked whether it is a question. |
| `workbook` (required) | string | The workbook id. |

## `workbook_runs` — A workbook's runs
*read-only*

A workbook's runs, newest first: when each ran, how it ended and what it cost. With `run_id`, that run's full trace — every model call, program and edit, in order.

| Argument | Type | Description |
|---|---|---|
| `limit` | integer | How many runs. Default 20. |
| `run_id` | string | One run, for its full trace. |
| `workbook` (required) | string | The workbook id. |

## `configure_workbook` — See or change a workbook's settings
*changes or removes data*

Renames, retitles or moves a workbook to another folder (`folder`), sets who its members are, and changes how its runs work (mode, model, harness, time limit). To email or share it, or save its sources, use share_workbook. A workbook's settings, and changes to them: its `name`; its `title` — what it is shown by, where that is shorter than its name; its `mode` — `harnessroom`, `latticeroom`, `graphroom`, `flashroom` or `askroom` (a harnessroom researches and writes; a latticeroom is handed a draft and marks each claim with its sources, and each reference with whether the work exists, leaving the words as written; a graphroom performs the procedure drawn for it in the app; a flashroom plans an edit to its spreadsheet and makes it on `yes`; an askroom answers questions of the document and never changes it); for a harnessroom, the `model` its runs think with (one of the `nodes` this answers with), the `harness` that drives it, the time a run gets — `time_limit_minutes`, or `time_limit_seconds` for a run someone waits on — and its `economy`; the `members` it belongs to; and the `storage` its runs file sources into. Send only what should change — the rest stays. With nothing to change it only reads. Changes apply from the next run.

| Argument | Type | Description |
|---|---|---|
| `economy` | string | How a harnessroom run keeps its transcript small: compaction (the default), steering, delegation, or unbounded. |
| `folder` | string | Move it to this folder; empty for the top level. |
| `harness` | string | The coding harness that drives a harnessroom run. |
| `members` | array | Every member's email, the whole list: who the workbook is shared with and who its email goes to. |
| `mode` | string | What this workbook's runs are, from now on. `harnessroom` (a new workbook's default): the instruction is a request, and a harness researches and writes the document. `latticeroom`: the instruction is a draft someone already wrote, whole — markdown, its links kept — which comes back exactly as written, with the run's inference beside it (read_workbook's `inference`: each claim cited, self-reported, secondary only, contradicted or with no source, and its sources); each entry under its References or Bibliography heading is looked up in Crossref and on the web and marked found, found with other authors or year, or not found, and a sentence citing it — [3], (Smith et al., 2020) — is read against the work found; attach data files (.json, .csv, .tsv) to settle the draft's own figures. `graphroom`: runs perform the procedure drawn for the workbook in the app, and refuse until one is drawn. `flashroom`, for a workbook made from a spreadsheet or a Word document: the instruction is an edit to its sheet, or to the document's table it is about, planned in seconds and kept in `messages` — each cell's before and after, the rows added and removed — and nothing is written until the next instruction is `yes`, which makes it as a new version. `askroom`: the workbook is asked and never changed — every instruction is a question of the document as it stands, answered in seconds and kept in `messages`; no run writes a version. A mirror's read-only copy is always an askroom. Omit to keep the workbook's current mode. |
| `model` | string | The model a harnessroom's runs think with: a `node` from this tool's answer. |
| `name` | string | A new name for the workbook. |
| `sealed` | boolean | true seals a harnessroom's runs: each sees the web, the programs and its own /tmp, and nothing an earlier run left — no drive, no attachments, no other workbook. For a measurement that must not be handed earlier research. |
| `storage` | string | Where runs file the sources they save: a connected drive, or auto (the first connected). |
| `time_limit_minutes` | integer | How long a harnessroom run may take before it is stopped. |
| `time_limit_seconds` | integer | The same in seconds, for a run a person waits on: stopped there, it delivers the draft it has written. Give this or time_limit_minutes, not both. |
| `title` | string | What it is shown by, over its name. Need not be unique. An empty string clears it. |
| `workbook` (required) | string | The workbook id. |

## `link_workbook` — Link a workbook to a drive file

Makes a Google Drive or Dropbox file the document of record for a workbook, so each version is written back to it. `unlink` stops that; `pull` brings the file's latest in now.

| Argument | Type | Description |
|---|---|---|
| `path` | string | The file on a mount, as the shell names it: `googledrive/Sites/339 15th St/Rent Builder.xlsx` or `dropbox/memo.docx`. |
| `pull` | boolean | true to read the linked file now and write it as a version. |
| `unlink` | boolean | true to stop syncing with the linked file. |
| `workbook` (required) | string | The workbook id. |

## `checkout_workbook` — Edit a workbook in the shell

Writes the workbook into your shell session's /tmp to edit with bash; with `commit`, reads the checkout back and saves it as a new version.

| Argument | Type | Description |
|---|---|---|
| `base_version` | integer | With `commit`: the version the checkout reported. |
| `commit` | boolean | true to save the checkout as a new version. |
| `note` | string | With `commit`: one line on what changed. |
| `session` | string | Optional: another shell's id, what `session id` prints inside it. Omit for this connection's shell. |
| `workbook` (required) | string | The workbook id. |

## `share_workbook` — Send or share a workbook

Sends or shares a workbook: email it to its members or named people (`email`, `send_to`); show, create or rotate its share link (`link`); or copy every web source it cites into the connected drive (`save_sources`).

| Argument | Type | Description |
|---|---|---|
| `email` | boolean | true to email it to its members (or `send_to`). |
| `link` | string | show, create or rotate the share link. Default show. |
| `preview` | boolean | With `email`: only say who it would go to. |
| `save_sources` | boolean | true to copy every web source it cites into the drive. |
| `send_to` | array | Members' emails to send to. Omit for all of them. An address that is not a member is not mailed. |
| `visibility` | string | Who may read the link. |
| `workbook` (required) | string | The workbook id. |

## `attachments` — A workbook's attached files

The files attached to a workbook for its runs to read and cite. Lists them; `add_name` with `add_content_base64` attaches one; `remove` takes one off.

| Argument | Type | Description |
|---|---|---|
| `add_content_base64` | string | Its bytes, base64, no `data:` prefix. |
| `add_content_type` | string | Its MIME type. Optional. |
| `add_name` | string | The name of a file to attach, e.g. 'Q3 board pack.pdf'. |
| `remove` | string | The name of an attached file to take off. |
| `workbook` (required) | string | The workbook id. |

## `upload` — Upload a large file

Uploads a file too large to send inline (over a few MB) into a workbook's attachments or a drive: returns a link to PUT the file to; then call again with `upload_id` to file it.

| Argument | Type | Description |
|---|---|---|
| `path` | string | Where the file goes: /attachments/<workbook>/<name>, /googledrive/<folders>/<name> or /dropbox/<folders>/<name>. |
| `size` | integer | The file's size in bytes, when known: one over the limit is refused before uploading. |
| `upload_id` | string | Once the file is PUT: the upload_id the link came with. |

## `folders` — Workbook folders
*read-only*

Lists the account's workbook folders (read-only), each with how many workbooks it holds; with `describe`, the one folder your words mean. To create, rename or delete one, use edit_folders.

| Argument | Type | Description |
|---|---|---|
| `describe` | string | Which folder, in your own words. |
| `parent` | string | With `describe`: where to look; `/` for the top level. |

## `edit_folders` — Create, rename or delete folders
*changes or removes data*

Creates, renames or deletes workbook folders: `make` a folder; `rename_from` to `rename_to`; or `remove` (delete) one with the folders under it.

| Argument | Type | Description |
|---|---|---|
| `make` | string | A folder path to create, e.g. Clients/Sagamore. |
| `remove` | string | A folder to delete, with the folders under it. |
| `rename_from` | string | The folder as it is now. |
| `rename_to` | string | What it should be called. |

## `mirror_workbook` — Mirror a workbook into another account
*changes or removes data*

Puts a read-only copy of `workbook` in ANOTHER hedwigai account, named by its id (`account`, e.g. megacabs.com), and keeps it current: each version the owner writes arrives in the copy as its next version. The copy is there at once — nobody in that account is asked — filed under `mirror/` at the folder path the workbook has here. A workbook has one owner, the account that hosts it, and only the owner changes it; it mirrors into one account at a time. The copy is an askroom: update_workbook on it answers a question of the document and changes nothing, and write_workbook, commit_workbook and restore_version are refused there. Only the document travels: its tabs and the spreadsheet or Word file it is made of. Sources, attachments, notes and run history stay with the owner.

With `account`, mirrors into it. Confirm the account id with the user first: the whole document becomes readable there. Without `account`, `action`:
- `show` (the default): whether `workbook` is mirrored, with whom, whether this account owns it (`you_own`) or reads it, and `last_error`.
- `sync`: bring the copy up to the owner's now, from either side.
- `stop`: end the mirror, from either side. Nothing is deleted; the copy stays, as its account's own workbook.

| Argument | Type | Description |
|---|---|---|
| `account` | string | The id of the account that is to read a copy, e.g. megacabs.com. |
| `action` | string | What to do when no `account` is given. Default show. |
| `workbook` (required) | string | The workbook id. |

## `ask` — Ask a short question
*read-only*

A question whose answer is a word or a value, answered from this account's workbooks and programs without starting a run: 'Is Moderna NASDAQ:MRNA a biotech company with public float above $5B?', 'What is Alterity Therapeutics' lead program?'. `answer` is yes, no, unsure, invalid_premise (what the question names is not there: no such company, or a name and ticker that are two different companies) or the value asked for. Amounts are compared in code against the figure a program returned (`claims` says which, as of when); `sources` cites each program run and workbook section the answer rests on. It answers `unsure` rather than guess when the evidence does not settle it. Give `context` to have it answer from your own text instead, among `options` if you pass them. Reads only; programs it runs are billed to this account.

| Argument | Type | Description |
|---|---|---|
| `options` | array | The answers you take, e.g. ["yes", "no", "maybe"]: `answer` is one of them, or `unsure` when ask is not sure enough of any; `probabilities` gives each. Only with `context`. |
| `question` (required) | string | The question, in your own words. |
| `skip_cache` | boolean | Read the workbooks, outlines and programs afresh for this question, setting aside what ask has kept for this account — for just after a workbook or an outline changed. Off by default. |

## `bash` — Run a command in your shell

Runs a bash command in this account's jailed, read-only shell, which holds live data programs as well as files. SEO and AI-search visibility: `aeo` (what ChatGPT, Perplexity, Gemini, Google AI Mode and AI Overviews answer to a question, and which sites they cite), `rank` (Google position for a keyword), `keywords` (monthly search volume, related phrases), `traffic` (organic visits per domain), `trends`, `search-index`. Public records: `funding` (SEC Form D raises, `funding recent` for this month's), `company-hiring` (open roles from company job boards), `h1b-hiring`, `ucc`, `fcc`, `fda`, `us-trademarks`, `us-business-license`, `us-motor-carriers`, `sec-filings`, `webcertificates`. People and companies: `outreach` (who holds a role, work emails checked against the mail server), `social`, `dns`, `trade` (importers and shipments), `pplx`. Plus `realestate-us`, `places`, `model-prices`, `ocr`, `xlsx`, `pdftext`, `browser`.

`help` lists what is on; `programs list` shows every program and what it bills; `programs enable SLUG` turns one on. `<program> --help` gives its usage. Metered programs draw on the account's prepaid credits (see the credits tool).

Also the account's connected drives (/dropbox, /googledrive …) and `/catalog` to search them. Nothing can be written except `/tmp`, which is this session's own scratch.

ONE SHELL PER SESSION. Its cwd and /tmp persist across calls, and it is the same shell checkout_workbook writes a workbook into — so check a workbook out, edit it here, and commit_workbook it, with no session id to pass between them.

| Argument | Type | Description |
|---|---|---|
| `command` (required) | string | A bash command line. Pipelines, globs and control flow work; a redirect anywhere but /tmp is refused. |

## `research_agent_tools` — Research which tools agents use
*read-only*

Shows which tools AI agents use for one job — web scraping, web search, social media data, lead generation, browser automation — as four platforms that run or route agent tools count it: Apify (runs in 30 days), Monid (calls in a week, and the accounts making them), Smithery (uses of each MCP server) and Docker (pulls of each MCP server image). The answer is drawn as a card with a tab per source.

Each source counts only its own platform and in its own unit: compare them side by side, never add them up, and never call a figure a market share. Free; needs the agentrank program on (`programs enable agentrank` in the shell). To ask ChatGPT, Gemini and other assistants what THEY recommend, use `agentrank answers` in the shell (billed).

| Argument | Type | Description |
|---|---|---|
| `limit` | integer | Rows per source, 3 to 20. Default 10. |
| `topic` (required) | string | The job, in a few words: 'web scraping', 'web search', 'instagram', 'lead generation', 'browser'. |

## `credits` — Check credits and get a top-up link
*read-only*

Shows this account's prepaid credit balance in US dollars, and returns a checkout link the user can open to add more. Use it before a large job, or when a call is refused for credit. Credits are prepaid and used per call; there are no seats or subscriptions.

The link is for the USER to open in a browser and pay; do not open it yourself.

| Argument | Type | Description |
|---|---|---|
| `top_up_usd` | number | The amount the checkout link buys, in dollars, 5 to 1000. Default 25. |

## `render_document` — Render a document to PDF

Compiles a document you wrote — LaTeX, Typst or Markdown — to a PDF, files it in this account's own storage, and returns a link the user can open (it lasts about six days).

`latex` is real TeX (Tectonic, XeTeX underneath): journal and conference classes such as IEEEtran, acmart and elsarticle set the page as they would on the author's machine, and BibTeX bibliographies are built. The source is the main .tex; put the rest of the project — chapters, a refs.bib, a .cls — in `files`, and images either as base64 in `files` or as `assets` URLs. Shell escape is off, so minted does not run (use listings); biber is not available (use BibTeX). The first compile of a rarely used package can take a minute while it is fetched.

`typst` is a complete Typst document; packages from Typst Universe (`#import "@preview/…"`) work. `markdown` is set in a clean report style, with LaTeX maths in `$…$` and `$$…$$`.

If the source does not compile, the compiler's own message comes back — for LaTeX, the line that failed: fix the source and call again.

| Argument | Type | Description |
|---|---|---|
| `assets` | array | Files the source refers to by relative path, fetched before compiling (latex or typst). Each {url, path}: a public https URL and the path the source uses, e.g. {"url": "https://example.org/plot.png", "path": "figures/plot.png"}. |
| `files` | array | LaTeX only: the rest of the project beside the main file. Each {path, text} for a .tex, .bib, .cls or .sty, or {path, base64} for an image or other binary file. Paths are relative, as the source refers to them, e.g. chapters/intro.tex or figures/plot.png. |
| `format` (required) | string | latex, typst or markdown. |
| `name` | string | A file name for the PDF, without extension, e.g. 'thesis-chapter-2'. Optional. |
| `source` (required) | string | The whole document, as text — for latex, the main .tex file. |
