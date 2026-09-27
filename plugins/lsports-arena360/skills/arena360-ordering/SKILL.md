---
name: arena360-ordering
description: Use when the operator asks what they ordered, wants to add or remove orders, or needs a per-sport, per-country, or per-league subscription breakdown.
license: Apache-2.0
metadata:
  version: "0.2.0"
  author: lsports
---

# ARENA360 ordering (TRADE)

This is the operator's order book. Do not use BOOST or Coverage Hub for "what did I order".

## Read tools

- `ordering_get_sports_filters`
- `ordering_get_sports_orders`
- `ordering_get_sports_csv`
- `ordering_get_locations_filters`
- `ordering_get_locations_orders`
- `ordering_get_locations_csv`
- `ordering_get_tournaments_filters`
- `ordering_get_tournaments_orders`
- `ordering_get_tournaments_all_sports_orders`
- `ordering_get_tournaments_csv`
- `ordering_get_fixtures_orders`
- `ordering_get_fixtures_csv`

## Write tools

Load `arena360-changes-apply` first.

- `ordering_post_orders_add`
- `ordering_post_orders_add_orders`
- `ordering_post_orders_remove`
- `ordering_post_markets_update`
- `ordering_post_markets_remove`
- `ordering_post_templates_update_templates`

Market offered-flag writes also load `arena360-markets`.

## Betting type

Ask InPlay or PreMatch if missing. Required on every ordering call.

## Rollups (never count page rows)

| Question | Tool |
| --- | --- |
| Per sport | `ordering_get_sports_orders` |
| Per country | `ordering_get_locations_orders` |
| Per league, all sports | `ordering_get_tournaments_all_sports_orders` with sport id 0 |
| Per league, one sport | `ordering_get_tournaments_orders` |
| Fixtures | `ordering_get_fixtures_orders` with a non-zero sport id |

State numbers only from `totalCount` or from rollup fields (ordered fixtures, available fixtures, pending count).

Location count and tournament count on a sport row are catalog sizes. Ordered fixtures is the subscription figure.

League status "fully ordered" is not a subscribed-league list. When available fixtures is 0 that filter can return the whole catalog with ordered fixtures 0. Do not page it to count subscribed leagues. Say an exact subscribed-league count is not available. Offer the per-sport ordered-fixtures breakdown instead.

## Fixture list rules

`ordering_get_fixtures_orders` needs `Skip` 0, `Take` 20 (or the operator's page size, max 100), `By` 0, `Ascending` true, a non-zero `SportId`, and package type. Never send sport id 0 on that call, on location filters, or on tournament filters. Sport id 0 is valid only on `ordering_get_tournaments_all_sports_orders`, `ordering_get_fixtures_csv`, `ordering_get_tournaments_csv`, and `ordering_get_tournaments_orders`.

There is no all-sports fixture list. Resolve sport with `ordering_get_sports_filters` when the operator did not name one.

Competition-level ordered fixtures: call `ordering_get_fixtures_orders` with order status 1 and setting level 3. Do not use the tournament list for that. Do not print those codes to the operator.

## Writes

1. Read the matching row.
2. If `canBeOrdered` is false or missing after a successful lookup, refuse and send the operator to support@lsports.eu.
3. Hierarchy payload must include every parent id from that row: sport, location, tournament, fixture as applicable.
4. If the server says the hierarchy is incomplete, fill missing parent ids from the row and retry once. Do not retry the same payload.
5. If the server says a premium subscription is required, stop. Do not retry.

## Output

Say InPlay or PreMatch, sport, and what is ordered versus available. Do not print raw setting-level numbers. Do not name tools.
