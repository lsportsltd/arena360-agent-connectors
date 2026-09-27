# Decisions

Format follows the plugin schemas. Product scope follows ARENA360: TRADE, DEFEND, BOOST, ENGAGE, and Coverage Hub, for sportsbook operators.

## Shared description and the registry cap

Plugin descriptions, marketplace entries, the Codex long description, and the README lead use one shared string (339 characters). See `docs/listing-copy.md`.

The MCP Registry schema dated 2025-12-11 limits `description` to 100 characters. `server.json` uses a shorter sentence with the same claim: plain language, and approval before writes.

## server.json

Schema URL: `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`.

Name: `eu.lsports/arena360`.

Remote: `streamable-http` at `https://arena-mcp.lsports.eu/arena/mcp`.

There is no package entry. This repository does not ship a server binary. Icons are the files in the repo. The registry icon field requires an HTTPS URL, so `server.json` omits icons.

## Codex listing fields

OpenAI plugin docs name `websiteURL`, `privacyPolicyURL`, and `termsOfServiceURL`. This repo sets all three. Terms are https://www.lsports.eu/terms-conditions/. Privacy is https://www.lsports.eu/privacy-policy/. Support and security contact is support@lsports.eu.

The Codex marketplace entry includes `policy.installation`, `policy.authentication`, and `category`, and a local `source` path of `./plugins/lsports-arena360`.

## Cursor marketplace entry

The Cursor marketplace schema allows `name`, `source`, `description`, and `minClientVersions` on each plugin entry. Category `productivity` is set on the plugin manifest.

## MCP config

`plugins/lsports-arena360/.mcp.json` wraps the server under `mcpServers`. The key is `arena360`. The URL is `https://arena-mcp.lsports.eu/arena/mcp`.

Manifests are per client (`.cursor-plugin`, `.claude-plugin`, `.codex-plugin`), matching the Airtable plugin layout.

## DEFEND and ENGAGE

Live discovery on 2026-09-27 returned 110 tools and no DEFEND or ENGAGE tools. Listing copy still names both modules. Skills `arena360-defend` and `arena360-engage` say the hosted MCP does not expose tools for them, and they do not invent tool names.

## Public docs

https://docs.lsports.eu/u/getting-started/arena360-ai-access describes write access as not yet available and names TRADE and BOOST.

This plugin follows the hosted server. Configuration, Ordering, and Trading floor include writes. Coverage Hub and BOOST are reads. Every write goes through `arena360-changes-apply`.

## Brand color

Codex `brandColor` is `#E2F22D`.

## Prose

Operator-facing prose is active and short. Vendored schema files under `scripts/schemas/` keep their upstream wording.
