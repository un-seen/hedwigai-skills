---
name: llm-prices
description: Compare what every provider charges for current language models, per million input and output tokens, with cache prices, speed tiers, quantization, context length and uptime. Use when the user asks which model or provider is cheapest, what a model costs, what the newest version of a model family is, or wants to estimate an LLM bill.
---

# LLM prices

Reads current models and every provider's price through the `model-prices` program in the hedwigai MCP's read-only shell. Prices are at most an hour old.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server. Don't quote model prices from memory; they change weekly.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Question | Study |
| --- | --- |
| The newest model of every current family, with its listed price | `model-prices frontier <query>` |
| Every provider serving one model, cheapest first | `model-prices providers <model>` |

## Read it right

- The price `frontier` lists is one provider's, not the lowest. Use `providers` for the cheapest.
- An open-weight model can sell at prices twenty times apart. Check `quantization` before calling one the best deal: fp4 costs less than fp8 and can answer worse.
- Closed models cost the same everywhere and sell by speed: `flex` is about half price and slower, `priority` costs more. Only standard offers count as cheapest; `cheapest_flex` is the price if waiting is fine.
- `blended` is three parts input to one part output. A `long_prompt` price applies above `above_tokens`.

## Reply

A table: model, provider, input and output price per million tokens, cache price, speed, quantization, context. Name the sources and when they were read.
