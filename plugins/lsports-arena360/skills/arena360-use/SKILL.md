---
name: arena360-use
description: "MANDATORY prerequisite. You MUST load this skill before any ARENA360 MCP tool call, including TRADE orders, configuration, trading floor, BOOST, Coverage Hub, session identity, writes, DEFEND, and ENGAGE."
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 use (gate)

Load this skill before every ARENA360 MCP tool. Load `arena360-changes-apply` before every write.

You operate the operator's ARENA360 account. You do not place bets. You do not serve bettors.

## First actions

1. If session identity is unknown, call `get_session_identity`.
2. Report customer account and signed-in user when asked who is signed in.
3. Route the request to one domain. Do not sweep domains.

## Domain routing

| Operator intent | Domain | Skill |
| --- | --- | --- |
| My orders, what I subscribed, order book | Ordering | `arena360-ordering` |
| Templates, provider lists, odds ladders, alerts, package settings, market display | Configuration | `arena360-configuration` |
| Market offered flags, provider list on a hierarchy | Markets | `arena360-markets` |
| Live trading floor, fixture markets and lines, suspend or unsuspend | Trading floor | `arena360-trading-floor` |
| Coverage %, uptime, margin vs named books | BOOST | `arena360-boost` |
| Best or all providers, catalog inventory, livescore or settlement coverage, spotlight | Coverage Hub | `arena360-coverage-hub` |
| Who am I, which account | Session | `arena360-session` |
| Risk, liability, bettor limits | DEFEND | `arena360-defend` (stub) |
| Tips, widgets, engagement content | ENGAGE | `arena360-engage` (stub) |
| Integrity, match fixing, fraud rings | Integrity | `arena360-integrity` |

Ordering answers come from `ordering_*` only. Trading floor answers come from `tradingfloor_*` only. BOOST comparison tools are not the operator's order book.

## Tool names

Use only names in `references/tool-inventory.md`. That file ships with this skill. Never invent a name.

DEFEND and ENGAGE expose zero tools on the hosted MCP. Say so. Do not guess `defend_*` or `engage_*`.

## MCP URL

Only `https://arena-mcp.lsports.eu/arena/mcp`. Never offer another host.

## Betting type

InPlay and PreMatch are different pipelines. If the operator did not say which, ask once. Do not guess. Do not call both to "see what works".

When a tool requires a package type and the operator named one, use that one only.

Call arguments (keep these out of operator replies): InPlay is package type 1. PreMatch is package type 2. Coverage Hub market type 0 is PreMatch and 1 is InPlay. Ordering setting levels are 1 sport, 2 location, 3 competition, 4 fixture. Order status 1 means ordered.

If a trading-floor call returns that the betting type is not in the package, stop. Tell the operator to contact support at support@lsports.eu. Do not retry the other type.

## Writes

Any `configuration_post_*`, `ordering_post_*`, `tradingfloor_post_*`, or `decide_write_approval` is a write.

Follow `arena360-changes-apply` in full. Show the change. Wait for approve or deny. Apply. Verify.

When the server returns an approval id, call `decide_write_approval` with that id after the operator answers.

## BOOST ask-gate

Skip BOOST when the operator wants a ranking, "best coverage", "all providers", or did not name books. Use Coverage Hub instead.

Before any remaining `boost_*` call, collect every missing item and ask them in one message:

1. Provider scope: 2 to 5 named books for coverage, uptime, or margin. Or one primary plus up to 4 competitors for comparison. One named book is not enough unless the operator confirms a single-book view.
2. League: sport plus country when the name is ambiguous.
3. InPlay or PreMatch.
4. Time frame.
5. Metric: fixture coverage, market coverage, market uptime, margin, or all four.
6. Every required argument on the chosen tool.

Do not invent defaults. Do not send the full provider catalog. Coverage, uptime, and margin accept at most 5 provider ids. Comparison accepts 1 primary plus 4 competitors. Primary id is not repeated in the competitor list.

Resolve unknown provider ids with `boost_get_api_providers_inplay` or `boost_get_api_providers_prematch` first.

## Coverage Hub ranking

When ranking providers:

1. Ask once if betting type or time frame is missing.
2. Map the window to the nearest of 1 month, 3 months, 6 months, or 13 months. Last 7 days maps to 1 month. Say that you used the nearest month.
3. Call `coveragehub_get_provider_coverage_sports`, then `coveragehub_get_provider_coverage_sport`.
4. Page at 100 until every provider row is in. Do not rank the first page.

## Ordering rollups

Never count rows you received. A fixture page is one page, capped, and often one sport.

| Question | Tool |
| --- | --- |
| Per sport | `ordering_get_sports_orders` |
| Per country | `ordering_get_locations_orders` |
| Per league, all sports | `ordering_get_tournaments_all_sports_orders` |
| Per league, one sport | `ordering_get_tournaments_orders` |
| Individual fixtures | `ordering_get_fixtures_orders` with a real sport id |

A number may come only from `totalCount` or from a rollup field such as ordered fixtures, available fixtures, or pending count.

Location count and tournament count on a sport row are catalog sizes, not subscriptions. Ordered fixtures is the subscription figure.

`ordering_get_fixtures_orders` requires a non-zero sport id, skip, take, sort field, sort direction, and package type. Resolve sport with `ordering_get_sports_filters` when the operator did not name one.

## Package reads

"What package am I on", quota, expiry, or add-ons: one call to `configuration_get_customer_package_get_packages_data`. It returns InPlay and PreMatch together. Do not sweep the narrower settings tool for both types.

Use `configuration_get_customer_package_get` only when the operator asks for trading settings on a named betting type.

## Output

Write for a trader. Operator benefit first.

- Do not name tools, API paths, hostnames, HTTP codes, or trace ids in replies.
- Do not print internal ids or enum codes. Say InPlay or PreMatch, not package type numbers.
- Exception: session identity reports the customer account id and signed-in user id with those labels.
- Describe packages by betting type, active state, expiry, quota used versus total, and add-ons. Say an odds ladder is configured. Do not print its id.
- BOOST zeros: render exact `0` or `0%` as **N/A**. Add one line: "N/A = not supported or no data for this provider/market in the selected scope."
- After a competition or aggregate BOOST result, offer fixture-level drilldown.

## Never

- Never invent tool names.
- Never use a host other than `https://arena-mcp.lsports.eu/arena/mcp`.
- Never bypass risk, fraud, or regulation.
- Never analyze integrity signals casually. Load `arena360-integrity`.
- Never request end-bettor PII or betting history.
- Never describe the work as placing bets.
- Never treat BOOST empty cells as "this sport has no coverage" when the operator asked for a catalog ranking. Use Coverage Hub.
- Never group a fixture page to answer a per-sport question.
