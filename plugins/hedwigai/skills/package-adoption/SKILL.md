---
name: package-adoption
description: "Measure how much an open-source package or repository is actually used — npm weekly and monthly downloads, latest version and last publish date, and GitHub stars, forks, open issues and last push. Use when comparing libraries, judging whether a project is maintained, or tracking a developer tool's adoption."
---

# Package adoption

Reads npm and GitHub metadata through the free `registry` program in the hedwigai MCP's read-only shell.

## Before you start

This skill uses the hedwigai MCP's `bash` tool. If they aren't available, tell the user to connect hedwigai — in Claude, from https://claude.ai/directory/hedwigai; in Claude Code, `/plugin marketplace add un-seen/hedwigai-skills` then `/plugin install hedwigai@hedwigai`; anywhere else, add `https://mcp.hedwigai.com/` as a remote MCP server.

`programs list` shows what each program bills. Run a study with no arguments, or `<program> --help`, before the first call; don't guess flags. Output is JSON: use `jq` in the same shell, and keep work in `/tmp`, the only writable place.

## Studies

| Question | Study |
| --- | --- |
| Downloads last week and month, latest version, last publish | `registry npm <package>` |
| Stars, forks, subscribers, open issues, last push, archived | `registry github <owner/repo>` |

## Read it right

- Lead with downloads, not stars: a download is use, a star is a gesture.
- Downloads aren't people; build servers reinstall on every run. Compare packages against each other.
- GitHub allows 60 unauthenticated requests an hour, shared. If the answer says the limit is hit, it isn't "no such repository"; say so and try later.
- A last push or publish more than six months ago is worth flagging; an archived repo is unmaintained.
