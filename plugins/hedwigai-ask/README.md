# hedwigai-ask for Claude Code

Who should answer this prompt: Claude, or hedwigai?

When you ask Claude Code a question that hedwigai can answer from public
records, this plugin asks you who should answer it. hedwigai decides which
prompts those are: a question whose answer is a fact or a figure, from data its
programs hold (SEC filings, funding rounds, hiring, trademarks, FDA, real
estate, search data, companies and people). Questions about your code,
opinions and writing go straight to Claude, and you are not asked.

Choose **Claude Code** and the session goes on as usual. Choose **HedwigAI**
and the prompt goes to hedwigai instead. It answers from your workbooks and
its research programs, and cites each source. The answer appears in the
transcript, and Claude reads it too, so you can follow up on it.

## Install

```
/plugin marketplace add un-seen/hedwigai-skills
/plugin install hedwigai-ask@hedwigai
```

It works alongside the `hedwigai` plugin or on its own. It uses the hedwigai
MCP server (`https://mcp.hedwigai.com/`), and if you have connected it already
the plugin uses that connection. Otherwise run `/mcp`, choose `hedwigai` and
sign in. Until you do, the plugin stays silent.

## Settings

Open `/plugin`, choose hedwigai-ask, and set **When to offer HedwigAI**:

- `ask` (the default): you are asked when hedwigai judges it can answer from public records.
- `prefix`: no question, and nothing is judged. A prompt that starts with `@hedwig` goes to hedwigai.
- `off`: the plugin does nothing.

Start any prompt with `@hedwig` to send it to hedwigai without being asked.
Slash commands, prompts with images and prompts sent while Claude is working
always go to Claude. So do one- or two-word replies, long pastes and anything
with a code block.

## How a prompt is judged

In `ask` mode, each prompt that is not filtered out above is sent to
hedwigai's `ask` tool as text, with the question "is this verifiable and
answerable from public data?". Judging runs no programs and looks nothing up.
If hedwigai is at least 80% sure, you are asked. If it is less sure, or takes
longer than 2.5 seconds, the prompt goes to Claude.

## Privacy

In `ask` mode, the text of the prompts that pass the filters goes to hedwigai
to be judged, under your own hedwigai account. If you'd rather nothing is sent
until you choose, use `prefix` mode. See https://hedwigai.com/privacy.

## Tests

```
claude plugin test plugins/hedwigai-ask
```
