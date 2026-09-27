# Anthropic plugin directory checklist

Claude Code plugin directory. Marketplace id is `arena360-agent-connectors`. Plugin id is `lsports-arena360`.

- [ ] Public GitHub repo exists and default branch is `main`
- [ ] `.claude-plugin/marketplace.json` source is `./plugins/lsports-arena360`
- [ ] `.claude-plugin/plugin.json` version `0.1.0`, license `Apache-2.0`, shared description unchanged
- [ ] `.mcp.json` uses the `mcpServers` wrapper and the only URL `https://arena-mcp.lsports.eu/arena/mcp`
- [ ] `claude plugin validate plugins/lsports-arena360` passes on a maintainer machine. TODO(verify) Engineering: this environment does not ship the Claude CLI
- [ ] Skills have `name` and `description` frontmatter. Directory name matches `name`
- [ ] DEFEND and ENGAGE skills state that tools are not on the hosted MCP
- [ ] Product blocker cleared before submit (`docs/decisions.md`)
- [ ] Support contact `<PLUGINS_CONTACT_EMAIL>` replaced
