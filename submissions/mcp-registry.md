# MCP Registry checklist

Publish `server.json` to the official MCP Registry. Schema: `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`.

- [ ] `name` is `eu.lsports/arena360`
- [ ] `version` is `0.1.0` and matches plugin manifests
- [ ] `description` is at most 100 characters (schema cap). It is not the shared 339-character string. See `docs/decisions.md`
- [ ] `remotes[0]` is `streamable-http` at `https://arena-mcp.lsports.eu/arena/mcp`
- [ ] No `packages` entry. This repo does not ship a server binary
- [ ] Repository URL will be `https://github.com/lsportsltd/arena360-agent-connectors` after Daniel creates it
- [ ] Namespace proof for `eu.lsports` completed by whoever owns the LSports domain. TODO(verify) Engineering
- [ ] Icons omitted until a public HTTPS icon URL exists. TODO(verify) Brand
- [ ] Product blocker cleared before publish (`docs/decisions.md`)
- [ ] Validate locally with `npm run validate`. Registry CLI validate is a follow-up on a maintainer machine
