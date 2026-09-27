# Listing copy

Use this file for Cursor, Claude, Codex, OpenAI plugins, and the MCP Registry short fields that can hold the text. Do not paraphrase the shared description.

## Shared description

```text
Run your whole ARENA360 account in plain language. Manage TRADE ordering and configuration, DEFEND risk controls, ENGAGE content and Coverage Hub, and benchmark coverage, uptime and margin with BOOST. Every change is shown and approved before it is applied. Bundles the hosted LSports ARENA360 MCP server and skills for operator workflows.
```

`<LONG_DESCRIPTION>` is this shared description. It is already copied into the Codex `interface.longDescription`.

## Identity

| Field | Value |
| --- | --- |
| Product | ARENA360 |
| Plugin name | `lsports-arena360` |
| Display name | LSports ARENA360 |
| Developer | LSports Data Ltd. |
| MCP key | `arena360` |
| MCP URL | `https://arena-mcp.lsports.eu/arena/mcp` |
| Version | 0.1.0 |
| License | Apache-2.0 |
| Category | Productivity |
| Homepage | https://www.lsports.eu/arena360/ |
| Terms | `<TERMS_URL>` |
| Privacy | `<TERMS_URL>` |
| Support | `<PLUGINS_CONTACT_EMAIL>` |
| Brand color | `#E2F22D` candidate for `<BRAND_HEX>`. TODO(verify) Brand. |

## Short description

Run your whole ARENA360 account in plain language.

Codex `shortDescription` uses that sentence. The MCP Registry `description` cannot use the shared description. The schema caps it at 100 characters. Registry text:

```text
Run your ARENA360 account in plain language. Writes are shown and approved first.
```

## Audience

B2B sportsbook operators. This is the control layer for a whole ARENA360 account. It is not a sports-data feed. It is not bettor-facing. It does not place bets.

## Modules named in listing copy

TRADE, DEFEND, BOOST, ENGAGE, and Coverage Hub. Managed trading is LTS.

DEFEND and ENGAGE stay in this positioning because they are ARENA360 modules. The hosted MCP does not expose tools for them yet. Skills say so. Do not drop the module names from this listing copy.

## Access

Read and write, for modules that have tools. Every change is shown and approved before it is applied.

## Default prompts

- Show which sports I am ordering InPlay and how many fixtures sit under each.
- Compare BOOST fixture coverage for my named providers last 7 days.
- Who am I signed in as on this ARENA360 account?

## Do not write

- Do not say the connection places bets or serves bettors.
- Do not use retired product names. `scripts/validate.mjs` rejects them.
- Do not claim DEFEND or ENGAGE tools exist.
- Do not use marketing superlatives. `scripts/validate.mjs` holds the blocked word list.
- Do not use an em dash or a spaced double hyphen.
- Do not say you are excited, pleased, or proud to announce.

## Assets

- Logo: `plugins/lsports-arena360/assets/logo.png` (interim 200x200). TODO(verify) Brand: replace `assets/arena360-logo.png` with 1024x1024.
- Icon: `plugins/lsports-arena360/assets/icon.svg`. Aria label is LSports ARENA360. TODO(verify) Brand: regenerate without the embedded 200x200 bitmap if a true vector is required.
- Social preview: `assets/social-preview.png` is an interim 1280x640 frame. TODO(verify) Brand: replace with a designed 1280x640 preview.
- Screenshots: none. TODO(verify) Product.

## Submission blocker

Public docs still say write access is coming and name only TRADE and BOOST: https://docs.lsports.eu/u/getting-started/arena360-ai-access

Do not submit catalogs until Product updates that page or explicitly accepts the mismatch. See `docs/decisions.md`.
