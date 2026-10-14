---
name: social-listening
description: Read what a person, company or topic says in public on X, LinkedIn, Instagram and YouTube — profiles, posts, replies, comments, reactions, followers and keyword search. Use when the user wants a company's or founder's recent posts, what people say about a brand or topic, a LinkedIn company page from a domain, a YouTube channel's videos and statistics, or who engages with an account.
---

# Social listening

Reads public posts and profiles through the `social` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`social` may be switched off on the account. If the shell says so, ask the user before running `programs enable social`: enabling a metered program means its calls are charged. `programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Network | Studies |
| --- | --- |
| X | `x profile`, `x posts`, `x replies` (by username); `x comments` (by post id); `x search` (the whole network) |
| LinkedIn | `linkedin company-by-domain <domain>` (the join you usually have), `company-by-url`, `member-profile`, `profile-posts`, `profile-comments`, `profile-reactions`, `post-comments`, `search-posts-member`, `search-posts-company`, `search-posts-keyword` |
| Instagram | `instagram profile`, `posts`, `followers`, `following`, `post-comments` |
| YouTube | `youtube search`, `video`, `channel`, `channel-videos`, `comments` |

Call them as `social <network> <study> <argument>`, for example `social linkedin company-by-domain stripe.com`.

## Cost

Each network is billed at its own rate, and LinkedIn costs about twenty times what X does. Start with the cheapest study that answers the question, and say what a large batch will cost before running it.

## Reply

Quote posts briefly with their date and a link, and summarise patterns across many rather than pasting them. Say which network and which window you read.
