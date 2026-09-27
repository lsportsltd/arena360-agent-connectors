---
name: arena360-trading-floor
description: Use when the operator asks what is on the trading floor now, wants fixture markets and lines, or wants to suspend or unsuspend a fixture or market.
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 trading floor

This is the live floor. It is not the operator order book. "What did I order" belongs in `arena360-ordering`.

## Read tools

- `tradingfloor_get_sports`
- `tradingfloor_get_sports_count_in_play`
- `tradingfloor_get_sports_count_pre_match`
- `tradingfloor_get_locations`
- `tradingfloor_get_tournaments`
- `tradingfloor_get_fixtures_in_play`
- `tradingfloor_get_fixtures_pre_match`
- `tradingfloor_get_fixture_metadata_get`
- `tradingfloor_get_fixture_market_get`
- `tradingfloor_get_markets_main`
- `tradingfloor_get_hierarchy_orders_get_in_play`
- `tradingfloor_get_hierarchy_orders_get_pre_match`

Hierarchy-order reads are the grid behind the floor. They are not the customer's subscribed order book.

## Write tools

Load `arena360-changes-apply` first. These change what bettors are offered immediately.

- `tradingfloor_post_fixture_market_suspend`
- `tradingfloor_post_fixture_market_remove_suspension`

## Betting type

Every trading-floor tool needs InPlay or PreMatch. Ask if missing. Never guess. Never sweep both.

If the betting type is not in the package, stop and send the operator to csm@lsports.eu.

## Resolve ids in order

1. `tradingfloor_get_sports`
2. `tradingfloor_get_locations` with sport ids
3. `tradingfloor_get_tournaments` with sport ids (location ids optional)
4. `tradingfloor_get_fixtures_in_play` or `tradingfloor_get_fixtures_pre_match`
5. Fixture metadata, markets, or suspend using a fixture id from that list

## Suspend and unsuspend

1. Read `tradingfloor_get_fixture_market_get` for that fixture and betting type.
2. Pin scope. Fixture id alone is the whole fixture. A market id narrows to one market. Lines narrow further. Never widen what the operator asked.
3. State fixture, market or all markets, and betting type. Then follow `arena360-changes-apply`.
4. On failure, do not retry with a broader target.

## Never

- Never answer "my orders" from this skill.
- Never invent a trading-floor tool.
- Never unsuspend or suspend without explicit approve.
