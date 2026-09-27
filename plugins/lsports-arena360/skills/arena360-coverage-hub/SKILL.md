---
name: arena360-coverage-hub
description: Use when the operator asks which providers, sports, locations, competitions, or markets LSports covers, wants a provider ranking, or asks about livescore, settlement, or spotlight coverage.
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 Coverage Hub

Coverage Hub is inventory and scout coverage. BOOST is performance versus named books. If the operator did not name books and wants "best" or "all providers", stay here.

## Tools (all reads)

Provider coverage:

- `coveragehub_get_provider_coverage_sports`
- `coveragehub_get_provider_coverage_sport`
- `coveragehub_get_provider_coverage_location`
- `coveragehub_get_provider_coverage_competition`
- `coveragehub_get_provider_coverage_market`
- `coveragehub_get_provider_coverage_market_coverage`

Livescore:

- `coveragehub_get_livescore`
- `coveragehub_get_livescore_hierarchies`

Settlement:

- `coveragehub_get_settlement`
- `coveragehub_get_settlement_hierarchies`

Spotlight:

- `coveragehub_get_spotlight_insights`
- `coveragehub_get_spotlight_notifications`

## Provider ranking

1. Ask once if InPlay versus PreMatch or the time frame is missing. Do not invent them.
2. Map the window to 1 month, 3 months, 6 months, or 13 months. Last 7 days maps to 1 month. Say you used the nearest month.
3. Call `coveragehub_get_provider_coverage_sports` for that period.
4. Call `coveragehub_get_provider_coverage_sport` with the same period and market type 0 for PreMatch or 1 for InPlay.
5. Page size 100. Keep paging until every provider row is in. Do not rank the first page of 30.
6. Rank by covered fixtures.

Do not ask the operator to name providers they do not know.

## Livescore and settlement

These reads describe scout and settlement coverage. They are not ENGAGE widgets and not TRADE orders.

## Spotlight

If spotlight text looks like an integrity signal, load `arena360-integrity`. Surface and route. Do not analyze casually.

## Never

- Never start a ranking on BOOST.
- Never invent a Coverage Hub tool.
- Never treat a missing BOOST sport as "LSports has no coverage".
- Never write. There are no Coverage Hub write tools in the live inventory.
