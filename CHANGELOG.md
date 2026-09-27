# Changelog

All notable changes to this packaging repo are documented here.
Version `0.2.0` is used in every plugin manifest and in `server.json`.

## 0.2.0 - 2026-09-27

- Adds `arena360-readiness-brief` for a pre-trade check across ordering, package, configuration, the trading floor, alerts, and BOOST when books are named.
- Adds `arena360-incident-investigate` for a read-only match problem review. Fixes still go through approval, one change at a time.
- `arena360-use` routes readiness and incident questions to those skills.

## 0.1.0 - 2026-09-27

Initial public packaging for the LSports ARENA360 plugin and the MCP Registry `server.json`.

- Bundles skills, a safety rule, and a setup command for Cursor, Claude Code, and Codex.
- Points every MCP client at `https://arena-mcp.lsports.eu/arena/mcp` only.
- Documents the live tool inventory from 2026-09-27.
- The tool inventory ships inside `arena360-use` at `references/tool-inventory.md`. The name list is the count.
- Approval is only approve or deny. The operator does not name Production in that same turn.
- `arena360-use` and `arena360-changes-apply` tell the agent to load them before tools or writes. BOOST still asks for books and scope inside the skill.
- Package and premium refusals use support@lsports.eu.
- Validation installs with `npm ci` and runs gitleaks.
- Codex example prompts include a UAT change that waits for approval.
- DEFEND and ENGAGE skills state that the hosted MCP exposes no tools for those modules.
- Codex listing sets the privacy and terms URLs. Support and security contact is support@lsports.eu.
- GitHub repository: https://github.com/lsportsltd/arena360-agent-connectors.
