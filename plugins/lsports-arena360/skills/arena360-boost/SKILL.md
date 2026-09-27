---
name: arena360-boost
description: "Use for BOOST fixture coverage, market coverage, market uptime, or margin, including where margin trails. If books, sport, league, or time frame are missing, ask inside this skill. All-provider rankings belong to Coverage Hub."
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 BOOST

BOOST is performance versus named books. It is not the provider catalog. Rankings and "all providers" go to `arena360-coverage-hub`.

## Ask-gate (all six, one message)

Do not call a `boost_*` tool until every check passes. Ask every miss together.

1. Providers: 2 to 5 named books for coverage, uptime, or margin. Or 1 primary plus up to 4 competitors for comparison. One book needs an explicit "just this book" confirm.
2. Scope: sport plus country when a league name is ambiguous. If there is no sport, location, or league at all, ask. Do not default to football worldwide.
3. InPlay or PreMatch.
4. Time frame.
5. Metric: fixture coverage, market coverage, market uptime, margin, or all four.
6. Required arguments on the chosen tool. Do not invent them.

Skip this skill entirely when the operator did not name books and wants a ranking.

## Read tools

Providers and catalog helpers:

- `boost_get_api_providers_inplay`
- `boost_get_api_providers_prematch`
- `boost_get_api_sports_inplay`
- `boost_get_api_sports_prematch`
- `boost_get_api_locations_inplay`
- `boost_get_api_locations_prematch`
- `boost_get_api_leagues`
- `boost_get_api_markets`

Coverage:

- `boost_get_api_fixtures_coverage_inplay`
- `boost_get_api_fixtures_coverage_prematch`
- `boost_get_api_markets_coverage_inplay`
- `boost_get_api_markets_coverage_prematch`

Uptime:

- `boost_get_api_total_markets_uptime_inplay`
- `boost_get_api_total_markets_uptime_prematch`
- `boost_get_api_performance_matrix_inplay`
- `boost_get_api_performance_matrix_prematch`
- `boost_get_api_fixture_market_uptime_inplay`
- `boost_get_api_fixture_market_uptime_prematch`

Margin:

- `boost_get_api_bets_margin_competition_inplay`
- `boost_get_api_bets_margin_competition_prematch`
- `boost_get_api_bets_margin_performance_matrix_inplay`
- `boost_get_api_bets_margin_performance_matrix_prematch`

Retro comparison (use these for live or historical missing fixtures and markets):

- `boost_get_api_sports_comparison_retro_inplay`
- `boost_get_api_sports_comparison_retro_prematch`
- `boost_get_api_fixtures_comparison_retro_inplay`
- `boost_get_api_fixtures_comparison_retro_prematch`
- `boost_get_api_markets_comparison_retro_inplay`
- `boost_get_api_markets_comparison_retro_prematch`

Fixture-level:

- `boost_get_api_sports_fixture_level_analysis_inplay`
- `boost_get_api_sports_fixture_level_analysis_prematch`

Other:

- `boost_get_api_fixtures_incidents`
- `boost_get_api_retroanalysis_notifications_alerts`
- `boost_get_api_retroanalysis_notifications_rules`

There are no BOOST write tools in the live inventory.

## How to call

- Resolve provider ids from the provider list tools first. Do not hardcode ids. Dev and QA lists differ from production.
- Coverage, uptime, and margin: at most 5 provider ids, including the primary.
- Comparison: primary is the reference. Competitor list does not repeat the primary. At most 4 competitors.
- Date fields: coverage, uptime, and margin use from/to dates. Retro comparison uses a point-in-time from/to. Do not swap those conventions.
- Live missing fixtures or markets: set both point-in-time fields to now (same UTC timestamp).
- Historical window: point-in-time from is before point-in-time to.
- Keep interval buckets under 400 points. For about 7 days use day, not minute.
- Date to must not be in the future.
- Omit optional sort and paging unless the operator asked.
- Empty KPI (every cell 0): stop retrying BOOST. If they wanted a ranking, switch to Coverage Hub.

## Output

Title the table with metric, betting type, scope, and period.

Render exact `0` or `0%` as **N/A**. Add: "N/A = not supported or no data for this provider/market in the selected scope."

After a competition or aggregate result, offer fixture-level drilldown for the same betting type, scope, and period.

- Margin: fixture-level analysis with margin, then the margin performance matrix.
- Market uptime: fixture-level analysis with market uptime, then the performance matrix or fixture-market uptime tool.
- Coverage: retro fixture or market comparison.

## Never

- Never send the full catalog or batch around the 5-id cap.
- Never say a sport has no PreMatch or InPlay coverage because it is missing from BOOST sports. BOOST is a KPI catalog, not LSports inventory.
- Never use BOOST to list the operator's orders.
- Never invent a BOOST tool name.
