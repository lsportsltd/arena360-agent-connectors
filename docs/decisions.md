# Decisions

Recorded 2026-09-27. Docs and schemas win on format. The build brief wins on product scope. Conflicts are listed here instead of being smoothed over.

## Shared description vs MCP Registry length

The brief requires one description string in every listing field. `server.schema.json` dated 2025-12-11 sets `description.maxLength` to 100. The shared string is 339 characters.

Choice: plugin descriptions, marketplace entries, Codex `longDescription`, `package.json`, the README lead, and `docs/listing-copy.md` use the shared string. `server.json` uses a shorter sentence that keeps the same claim (plain language, approval before writes). CI checks the shared string everywhere except `server.json`, and checks that the registry description is at most 100 characters.

## server.json schema URL

Figma's guide still pins `https://static.modelcontextprotocol.io/schemas/2025-09-29/server.schema.json`. The registry quickstart current on this date pins `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`.

Choice: 2025-12-11. Server name is `eu.lsports/arena360` (reverse DNS of lsports.eu). Transport is `remotes[].type` `streamable-http`. No npm package. No icons: icon `src` must be an HTTPS URL of at most 255 characters, and this repo is not public yet.

## Codex interface casing

Current OpenAI plugin docs use `websiteURL`, `privacyPolicyURL`, and `termsOfServiceURL` inside `interface`. Airtable's shipping plugin uses `websiteUrl`, `privacyPolicyUrl`, and `termsOfServiceUrl`.

Choice: current OpenAI docs (`websiteURL` and the matching URL suffixes). Airtable remains the template for manifest layout, not for this casing.

## Codex marketplace entry

Current Codex docs require `policy.installation`, `policy.authentication`, and `category`, and prefer `source` as an object with `path`. Airtable's `.agents/plugins/marketplace.json` uses a string `source` and omits policy.

Choice: follow current Codex docs in `.agents/plugins/marketplace.json`. `source.source` is `local` and `path` is `./plugins/lsports-arena360`, which matches a repo marketplace. `interface.displayName` stays, matching Airtable.

## Cursor marketplace entry fields

Vendored `marketplace.schema.json` sets `additionalProperties: false` on plugin entries. Allowed keys are `name`, `source`, `description`, and `minClientVersions`. Airtable's Cursor marketplace also sends `category` and `logo`, which fail that schema.

Choice: schema. `.cursor-plugin/marketplace.json` omits category and logo. Category `productivity` lives on the plugin manifest, where the plugin schema allows it.

## Cursor category

The brief said to use `data-analytics` if valid, otherwise `productivity`. The vendored plugin schema types `category` as a free string. Cursor's public docs do not list an enum. Airtable uses `productivity`.

Choice: `productivity`, so we do not invent a category the marketplace might reject.

## .mcp.json shape

The brief asks for a Claude `.mcp.json` with an `mcpServers` wrapper, which is Figma's file and Airtable's repo-root file. Airtable's plugin file is a flat server map.

Choice: `plugins/lsports-arena360/.mcp.json` uses the wrapper. Cursor and Codex `mcpServers` point at `./.mcp.json`, the same pattern as Figma's plugin manifest. Claude also auto-loads `.mcp.json`. One URL only: `https://arena-mcp.lsports.eu/arena/mcp`. Key: `arena360`.

No root `plugin.json`. The brief tree and the Airtable template use per-client manifests. Current Codex docs also describe a portable root `plugin.json`. TODO(verify) Engineering: add a root manifest if the OpenAI submission form rejects the `.codex-plugin` layout.

## Skill set

The brief requires 12 skills and names the two gates in full: `arena360-use` and `arena360-changes-apply`. It does not list the other file names. The other ten are `arena360-session`, `arena360-ordering`, `arena360-configuration`, `arena360-markets`, `arena360-trading-floor`, `arena360-boost`, `arena360-coverage-hub`, `arena360-defend`, `arena360-engage`, and `arena360-integrity`.

Integrity is its own skill because integrity signals must be surfaced and routed, not analyzed in a trading skill. Markets is its own skill because offered-flag writes are partial and single-provider markets need a preflight.

## DEFEND and ENGAGE

Listing copy names DEFEND and ENGAGE because they are ARENA360 modules. Live discovery on 2026-09-27 returned 110 tools and zero `defend_*` or `engage_*` tools.

Choice: keep the modules in the shared description. Ship stub skills `arena360-defend` and `arena360-engage` that say tools are not on the hosted MCP. Do not invent tool names. Access for those modules stays read until tools exist. TODO(verify) Product and Engineering when tools ship.

## Public docs blocker

https://docs.lsports.eu/u/getting-started/arena360-ai-access (read 2026-09-27) says:

- Write access is coming.
- MCP coverage is TRADE plus BOOST.
- Sessions are read-only.

This plugin claims read and write for modules that already expose tools (Configuration, Ordering, Trading floor) and also documents Coverage Hub reads.

Choice: do not submit Cursor, Claude, OpenAI, or MCP Registry listings until Product either updates that page or accepts the mismatch in writing. Owner: Product. This is a catalog blocker.

## Brand

`lsportsltd/trd-queen-arena-mcp-server` could not be cloned (no credentials). Uploaded logo files were copied instead.

| Asset | State | Owner |
| --- | --- | --- |
| `assets/arena360-logo.png` | Interim 200x200, not 1024x1024 | Brand TODO(verify) |
| `plugins/lsports-arena360/assets/logo.png` | Same interim file | Brand TODO(verify) |
| `assets/arena360-logo.svg` and `icon.svg` | Uploaded SVG with aria label set to LSports ARENA360. Bitmap is still embedded. | Brand TODO(verify) |
| `assets/social-preview.png` | Interim 1280x640 generated from the 200x200 logo on a dark field. Not a designed preview. | Brand TODO(verify) |
| `<BRAND_HEX>` | Candidate `#E2F22D` from prior plugin `primaryColor`. Used as Codex `brandColor` because a color field cannot hold the angle-bracket token. | Brand TODO(verify) |

## Placeholders left as tokens

| Token | Where | Owner |
| --- | --- | --- |
| `<TERMS_URL>` | Codex privacy and terms URLs, listing copy, repo settings | Legal |
| `<PLUGINS_CONTACT_EMAIL>` | README, CONTRIBUTING, repo settings, SECURITY-adjacent listings | Product |
| `<SECURITY_CONTACT>` | SECURITY.md, repo settings | Legal / Security |
| `<PRODUCT_OWNER_HANDLE>` | CODEOWNERS, repo settings | Product |
| `<ENG_OWNER_HANDLE>` | CODEOWNERS, repo settings | Engineering |
| `<BRAND_HEX>` | This file and listing copy. JSON uses the candidate hex. | Brand |
| `<LONG_DESCRIPTION>` | Resolved. Codex long description is the shared string. | Product |

## Terms URL is not a URI yet

Codex `privacyPolicyURL` and `termsOfServiceURL` are the token `<TERMS_URL>`. Submission forms that require a real HTTPS URL will reject it. Legal must replace the token before those forms are sent.

## package.json

The brief tree does not list `package.json`. It is included so `npm run validate` and CI install the same Ajv version. It is private and not an MCP package.

## Writing rules

Operator-facing prose is active, short, and free of the banned word list in `docs/listing-copy.md`. Vendored schema files under `scripts/schemas/` keep upstream wording, including em dashes. CI does not apply the prose rules to those files.
