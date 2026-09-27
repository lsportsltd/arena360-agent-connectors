# LSports ARENA360 agent connectors

Run your whole ARENA360 account in plain language. Manage TRADE ordering and configuration, DEFEND risk controls, ENGAGE content and Coverage Hub, and benchmark coverage, uptime and margin with BOOST. Every change is shown and approved before it is applied. Bundles the hosted LSports ARENA360 MCP server and skills for operator workflows.

This repository is **packaging only**. It ships plugin manifests, skills, listing copy, and an MCP Registry `server.json`. It does not ship server code.

Audience: B2B sportsbook operators. This is the control layer for a whole ARENA360 account. It is not a sports-data feed, not bettor-facing, and it does not place bets.

## What you get

| Piece | Purpose |
| --- | --- |
| Hosted MCP | `https://arena-mcp.lsports.eu/arena/mcp` |
| Plugin id | `lsports-arena360` |
| MCP key | `arena360` |
| Skills | 12 operator workflows, including write approval |
| Access | Read and write for modules that expose tools |

DEFEND and ENGAGE appear in product positioning. The hosted MCP currently exposes **zero** tools for those modules. Their skills are stubs. See `docs/tool-inventory.md`.

## Install

Sign in with your ARENA360 credentials. Your CSM confirms when AI access is enabled on the account.

### Cursor

Browse the Cursor Marketplace once the listing is live, or add this repo as a marketplace after it is on GitHub:

```bash
# After Daniel publishes lsportsltd/arena360-agent-connectors
# add the marketplace from the Cursor plugin panel, then install lsports-arena360
```

For a local clone:

```bash
ln -s "$(pwd)/plugins/lsports-arena360" ~/.cursor/plugins/local/lsports-arena360
```

### Claude Code

```bash
/plugin marketplace add lsportsltd/arena360-agent-connectors
/plugin install lsports-arena360@arena360-agent-connectors
```

Local clone:

```bash
/plugin marketplace add /path/to/arena360-agent-connectors
/plugin install lsports-arena360@arena360-agent-connectors
```

### Codex

```bash
codex plugin marketplace add lsportsltd/arena360-agent-connectors
```

Then enable the plugin in the Codex plugins menu, or add:

```toml
[plugins."lsports-arena360@arena360-agent-connectors"]
enabled = true
```

### Manual MCP (any client)

Use only this URL:

```json
{
  "arena360": {
    "url": "https://arena-mcp.lsports.eu/arena/mcp"
  }
}
```

## Writes

Every write uses skill `arena360-changes-apply`: show the change, wait for operator approval, apply, then verify. When the server returns an approval id, the agent also calls `decide_write_approval`.

Public docs at https://docs.lsports.eu/u/getting-started/arena360-ai-access still say write access is coming and name only TRADE and BOOST. The plugin claims read and write for modules that already expose tools. Product must resolve that blocker before catalog submission. See `docs/decisions.md`.

## Layout

```
.
├── server.json                         # MCP Registry (hosted remote)
├── .cursor-plugin/marketplace.json
├── .claude-plugin/marketplace.json
├── .agents/plugins/marketplace.json
└── plugins/lsports-arena360/
    ├── .cursor-plugin/plugin.json
    ├── .claude-plugin/plugin.json
    ├── .codex-plugin/plugin.json
    ├── .mcp.json
    ├── commands/arena360-setup.md
    ├── rules/arena360-safety.mdc
    └── skills/
```

## Validate

```bash
npm install
npm run validate
./scripts/check-version-bump.sh
```

Requires Node 20+.

## Docs

- `docs/listing-copy.md`: catalog copy
- `docs/repo-settings.md`: GitHub repo settings for the public remote
- `docs/tool-inventory.md`: live 110-tool inventory
- `docs/test-prompts.md`: positive and negative prompts
- `docs/decisions.md`: schema and product conflicts
- `docs/links.md`: public links only
- `submissions/`: directory checklists

## Brand

Interim logo is 200x200. Brand must supply `assets/arena360-logo.png` at 1024x1024 and a final `assets/social-preview.png` at 1280x640. Candidate brand color is `#E2F22D` pending Brand confirmation.

## License

Apache-2.0. Copyright LSports Data Ltd. See `LICENSE` and `NOTICE`.

Contact: `<PLUGINS_CONTACT_EMAIL>`.
