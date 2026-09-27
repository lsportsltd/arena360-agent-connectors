# Contributing

This repo packages the LSports ARENA360 plugin. It does not host server code.

## Before you edit

1. Read `docs/decisions.md` and `plugins/lsports-arena360/skills/arena360-use/references/tool-inventory.md`.
2. Use only tool names from the live inventory. Never invent names.
3. Keep the shared description string identical in every plugin `description` field.
4. Keep every manifest on the same version. The current version is `0.2.0`.
5. Point MCP config at `https://arena-mcp.lsports.eu/arena/mcp` only.

## Shared description

```
Run your whole ARENA360 account in plain language. Manage TRADE ordering and configuration, DEFEND risk controls, ENGAGE content and Coverage Hub, and benchmark coverage, uptime and margin with BOOST. Every change is shown and approved before it is applied. Bundles the hosted LSports ARENA360 MCP server and skills for operator workflows.
```

`server.json` cannot use that full string. The MCP Registry schema caps `description` at 100 characters. See `docs/decisions.md`.

## Local checks

```bash
npm install
npm run validate
```

`scripts/check-version-bump.sh` confirms every version field matches.

## Skills

- Gate skills `arena360-use` and `arena360-changes-apply` stay complete.
- DEFEND and ENGAGE skills state that the hosted MCP exposes no tools for those modules. Do not invent tool names.
- Product skills may cite only inventory tool names.
- Frontmatter needs `name` and `description`. Directory name must match `name`.
- Operator-facing prose: active voice, short sentences. No em dashes. `scripts/validate.mjs` rejects marketing superlatives.

## Manifests

Copy field names from the Cursor schemas in `scripts/schemas/`. Cursor marketplace plugin entries accept only `name`, `source`, `description`, and `minClientVersions`.

## Pull requests

Use a conventional commit subject. Mention inventory or schema conflicts in `docs/decisions.md`.
