# GitHub repo settings

Apply these on `lsportsltd/arena360-agent-connectors` when Daniel creates the public remote. Do not create that remote from this draft.

## Repository

| Setting | Value |
| --- | --- |
| Owner | `lsportsltd` |
| Name | `arena360-agent-connectors` |
| Visibility | Public |
| Default branch | `main` |
| Description | Run your whole ARENA360 account in plain language. Manage TRADE ordering and configuration, DEFEND risk controls, ENGAGE content and Coverage Hub, and benchmark coverage, uptime and margin with BOOST. Every change is shown and approved before it is applied. Bundles the hosted LSports ARENA360 MCP server and skills for operator workflows. |
| Website | https://www.lsports.eu/arena360/ |
| License | Apache-2.0 (`LICENSE`) |
| Topics | `arena360`, `lsports`, `mcp`, `sportsbook`, `cursor-plugin`, `claude-plugin`, `codex-plugin` |

The description is the shared string (339 characters). GitHub allows 350.

## Features

- Enable Issues for packaging bugs. Security reports go to `<SECURITY_CONTACT>`, not Issues. See `SECURITY.md`.
- Enable Discussions only if Product wants a public operator forum. Default off until `<PRODUCT_OWNER_HANDLE>` confirms.
- Disable Wikis. Docs live in `docs/`.
- Disable Projects unless Engineering asks.

## Access

- CODEOWNERS: replace `<PRODUCT_OWNER_HANDLE>` and `<ENG_OWNER_HANDLE>` before branch protection is turned on. Placeholder handles will not resolve.
- Require pull request review from code owners on `main`.
- Require the Validate workflow to pass.
- Do not store secrets, OAuth client ids, or IdP tenant ids in Actions variables.

## Releases

`package-skills.yml` publishes a dated zip of the marketplace catalogs and `plugins/` on push to `main`. Confirm Actions have `contents: write` before the first push to the public repo.

## Contacts

| Role | Placeholder |
| --- | --- |
| Product owner | `<PRODUCT_OWNER_HANDLE>` |
| Engineering owner | `<ENG_OWNER_HANDLE>` |
| Plugins contact | `<PLUGINS_CONTACT_EMAIL>` |
| Security contact | `<SECURITY_CONTACT>` |
| Terms and privacy | `<TERMS_URL>` |
