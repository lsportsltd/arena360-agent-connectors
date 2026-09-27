# ARENA360 tool inventory

Source: live hosted MCP discovery on 2026-09-27 at `https://arena-mcp.lsports.eu/arena/mcp`.
Count: **110**. Do not add names that are not in this file.

Discovery returned full schemas and no MCP `title`, `readOnlyHint`, `destructiveHint`, or `openWorldHint`. Access and destructive labels below are inferred from the tool name and confirmed write prefixes. They are not server annotations.

## Server gaps

- **DEFEND:** zero tools. No `defend_*` name exists. Skill `arena360-defend` is a stub.
- **ENGAGE:** zero tools. No `engage_*` name exists. Skill `arena360-engage` is a stub.
- **Annotations missing:** no `title`, `readOnlyHint`, `destructiveHint`, or `openWorldHint` on any tool. Clients cannot rely on hints to separate reads from writes.
- **Public docs:** https://docs.lsports.eu/u/getting-started/arena360-ai-access describes write access as not yet available and names TRADE and BOOST. This inventory lists the tools the hosted MCP exposed on 2026-09-27, including Configuration, Ordering, and Trading floor writes.

## Access summary

| Group | Tools | Reads | Writes |
| --- | ---: | ---: | ---: |
| Session | 1 | 1 | 0 |
| Write approval | 1 | 0 | 1 |
| BOOST | 33 | 33 | 0 |
| Configuration (TRADE) | 31 | 17 | 14 |
| Coverage Hub | 12 | 12 | 0 |
| Ordering (TRADE) | 18 | 12 | 6 |
| Trading floor | 14 | 12 | 2 |
| **Total** | **110** | **87** | **23** |

Write prefixes: `configuration_post_*`, `ordering_post_*`, `tradingfloor_post_fixture_market_suspend`, `tradingfloor_post_fixture_market_remove_suspension`, and `decide_write_approval`.

## Destructive inference

The server does not send `destructiveHint`. Treat these as destructive because the name deletes, removes orders or market settings, or suspends a live offer:

- `configuration_post_odds_ladder_delete`: destructive: delete. Removes an odds ladder.
- `configuration_post_providers_settings_delete`: destructive: delete. Removes a provider list.
- `configuration_post_templates_delete_template`: destructive: delete. Removes a template.
- `ordering_post_markets_remove`: destructive: remove market settings from an order.
- `ordering_post_orders_remove`: destructive: remove orders. Drops subscription.
- `tradingfloor_post_fixture_market_suspend`: destructive: suspend. Takes markets off the live offer immediately.

`tradingfloor_post_fixture_market_remove_suspension` is a live-offer write. It is not labeled destructive because it restores markets rather than deleting them. It still requires `arena360-changes-apply`.

## By area

### Session

- `get_session_identity` (read)

### Write approval

- `decide_write_approval` (write) Records the operator decision for a pending server approval. Not a data delete. Required whenever a write returns an approval id.

### BOOST

- `boost_get_api_bets_margin_competition_inplay` (read)
- `boost_get_api_bets_margin_competition_prematch` (read)
- `boost_get_api_bets_margin_performance_matrix_inplay` (read)
- `boost_get_api_bets_margin_performance_matrix_prematch` (read)
- `boost_get_api_fixture_market_uptime_inplay` (read)
- `boost_get_api_fixture_market_uptime_prematch` (read)
- `boost_get_api_fixtures_comparison_retro_inplay` (read)
- `boost_get_api_fixtures_comparison_retro_prematch` (read)
- `boost_get_api_fixtures_coverage_inplay` (read)
- `boost_get_api_fixtures_coverage_prematch` (read)
- `boost_get_api_fixtures_incidents` (read)
- `boost_get_api_leagues` (read)
- `boost_get_api_locations_inplay` (read)
- `boost_get_api_locations_prematch` (read)
- `boost_get_api_markets` (read)
- `boost_get_api_markets_comparison_retro_inplay` (read)
- `boost_get_api_markets_comparison_retro_prematch` (read)
- `boost_get_api_markets_coverage_inplay` (read)
- `boost_get_api_markets_coverage_prematch` (read)
- `boost_get_api_performance_matrix_inplay` (read)
- `boost_get_api_performance_matrix_prematch` (read)
- `boost_get_api_providers_inplay` (read)
- `boost_get_api_providers_prematch` (read)
- `boost_get_api_retroanalysis_notifications_alerts` (read)
- `boost_get_api_retroanalysis_notifications_rules` (read)
- `boost_get_api_sports_comparison_retro_inplay` (read)
- `boost_get_api_sports_comparison_retro_prematch` (read)
- `boost_get_api_sports_fixture_level_analysis_inplay` (read)
- `boost_get_api_sports_fixture_level_analysis_prematch` (read)
- `boost_get_api_sports_inplay` (read)
- `boost_get_api_sports_prematch` (read)
- `boost_get_api_total_markets_uptime_inplay` (read)
- `boost_get_api_total_markets_uptime_prematch` (read)

### Configuration (TRADE)

- `configuration_get_alerts_get_alert_settings` (read)
- `configuration_get_customer_package_get` (read)
- `configuration_get_customer_package_get_packages_data` (read)
- `configuration_get_distribution_get` (read)
- `configuration_get_markets_get` (read)
- `configuration_get_markets_get_display_infos` (read)
- `configuration_get_odds_ladder_get` (read)
- `configuration_get_odds_ladder_is_applied` (read)
- `configuration_get_providers_settings_get` (read)
- `configuration_get_providers_settings_get_providers` (read)
- `configuration_get_templates_get_default_template_settings` (read)
- `configuration_get_templates_get_default_templates_sports_list` (read)
- `configuration_get_templates_get_sport_templates_list` (read)
- `configuration_get_templates_get_sports_filter` (read)
- `configuration_get_templates_get_sports_list` (read)
- `configuration_get_templates_get_template_settings` (read)
- `configuration_get_templates_get_templates_list` (read)
- `configuration_post_alerts_update_alert_settings` (write)
- `configuration_post_customer_package_update` (write)
- `configuration_post_distribution_update` (write)
- `configuration_post_markets_upsert_display_infos` (write)
- `configuration_post_odds_ladder_create` (write)
- `configuration_post_odds_ladder_delete` (write) destructive: delete. Removes a ladder, provider list, or template.
- `configuration_post_odds_ladder_update` (write)
- `configuration_post_providers_settings_create` (write)
- `configuration_post_providers_settings_delete` (write) destructive: delete. Removes a ladder, provider list, or template.
- `configuration_post_providers_settings_update` (write)
- `configuration_post_providers_settings_update_default_list` (write)
- `configuration_post_templates_create_template_market_settings` (write)
- `configuration_post_templates_delete_template` (write) destructive: delete. Removes a ladder, provider list, or template.
- `configuration_post_templates_update_template_market_settings` (write)

### Coverage Hub

- `coveragehub_get_livescore` (read)
- `coveragehub_get_livescore_hierarchies` (read)
- `coveragehub_get_provider_coverage_competition` (read)
- `coveragehub_get_provider_coverage_location` (read)
- `coveragehub_get_provider_coverage_market` (read)
- `coveragehub_get_provider_coverage_market_coverage` (read)
- `coveragehub_get_provider_coverage_sport` (read)
- `coveragehub_get_provider_coverage_sports` (read)
- `coveragehub_get_settlement` (read)
- `coveragehub_get_settlement_hierarchies` (read)
- `coveragehub_get_spotlight_insights` (read)
- `coveragehub_get_spotlight_notifications` (read)

### Ordering (TRADE)

- `ordering_get_fixtures_csv` (read)
- `ordering_get_fixtures_orders` (read)
- `ordering_get_locations_csv` (read)
- `ordering_get_locations_filters` (read)
- `ordering_get_locations_orders` (read)
- `ordering_get_sports_csv` (read)
- `ordering_get_sports_filters` (read)
- `ordering_get_sports_orders` (read)
- `ordering_get_tournaments_all_sports_orders` (read)
- `ordering_get_tournaments_csv` (read)
- `ordering_get_tournaments_filters` (read)
- `ordering_get_tournaments_orders` (read)
- `ordering_post_markets_remove` (write) destructive: remove market settings from an order.
- `ordering_post_markets_update` (write)
- `ordering_post_orders_add` (write)
- `ordering_post_orders_add_orders` (write)
- `ordering_post_orders_remove` (write) destructive: remove orders. Drops subscription.
- `ordering_post_templates_update_templates` (write)

### Trading floor

- `tradingfloor_get_fixture_market_get` (read)
- `tradingfloor_get_fixture_metadata_get` (read)
- `tradingfloor_get_fixtures_in_play` (read)
- `tradingfloor_get_fixtures_pre_match` (read)
- `tradingfloor_get_hierarchy_orders_get_in_play` (read)
- `tradingfloor_get_hierarchy_orders_get_pre_match` (read)
- `tradingfloor_get_locations` (read)
- `tradingfloor_get_markets_main` (read)
- `tradingfloor_get_sports` (read)
- `tradingfloor_get_sports_count_in_play` (read)
- `tradingfloor_get_sports_count_pre_match` (read)
- `tradingfloor_get_tournaments` (read)
- `tradingfloor_post_fixture_market_remove_suspension` (write) live impact: unsuspend. Puts markets back on offer. Not a delete.
- `tradingfloor_post_fixture_market_suspend` (write) destructive: suspend. Takes markets off the live offer immediately.

## Full list

```text
boost_get_api_bets_margin_competition_inplay
boost_get_api_bets_margin_competition_prematch
boost_get_api_bets_margin_performance_matrix_inplay
boost_get_api_bets_margin_performance_matrix_prematch
boost_get_api_fixture_market_uptime_inplay
boost_get_api_fixture_market_uptime_prematch
boost_get_api_fixtures_comparison_retro_inplay
boost_get_api_fixtures_comparison_retro_prematch
boost_get_api_fixtures_coverage_inplay
boost_get_api_fixtures_coverage_prematch
boost_get_api_fixtures_incidents
boost_get_api_leagues
boost_get_api_locations_inplay
boost_get_api_locations_prematch
boost_get_api_markets
boost_get_api_markets_comparison_retro_inplay
boost_get_api_markets_comparison_retro_prematch
boost_get_api_markets_coverage_inplay
boost_get_api_markets_coverage_prematch
boost_get_api_performance_matrix_inplay
boost_get_api_performance_matrix_prematch
boost_get_api_providers_inplay
boost_get_api_providers_prematch
boost_get_api_retroanalysis_notifications_alerts
boost_get_api_retroanalysis_notifications_rules
boost_get_api_sports_comparison_retro_inplay
boost_get_api_sports_comparison_retro_prematch
boost_get_api_sports_fixture_level_analysis_inplay
boost_get_api_sports_fixture_level_analysis_prematch
boost_get_api_sports_inplay
boost_get_api_sports_prematch
boost_get_api_total_markets_uptime_inplay
boost_get_api_total_markets_uptime_prematch
configuration_get_alerts_get_alert_settings
configuration_get_customer_package_get
configuration_get_customer_package_get_packages_data
configuration_get_distribution_get
configuration_get_markets_get
configuration_get_markets_get_display_infos
configuration_get_odds_ladder_get
configuration_get_odds_ladder_is_applied
configuration_get_providers_settings_get
configuration_get_providers_settings_get_providers
configuration_get_templates_get_default_template_settings
configuration_get_templates_get_default_templates_sports_list
configuration_get_templates_get_sport_templates_list
configuration_get_templates_get_sports_filter
configuration_get_templates_get_sports_list
configuration_get_templates_get_template_settings
configuration_get_templates_get_templates_list
configuration_post_alerts_update_alert_settings
configuration_post_customer_package_update
configuration_post_distribution_update
configuration_post_markets_upsert_display_infos
configuration_post_odds_ladder_create
configuration_post_odds_ladder_delete
configuration_post_odds_ladder_update
configuration_post_providers_settings_create
configuration_post_providers_settings_delete
configuration_post_providers_settings_update
configuration_post_providers_settings_update_default_list
configuration_post_templates_create_template_market_settings
configuration_post_templates_delete_template
configuration_post_templates_update_template_market_settings
coveragehub_get_livescore
coveragehub_get_livescore_hierarchies
coveragehub_get_provider_coverage_competition
coveragehub_get_provider_coverage_location
coveragehub_get_provider_coverage_market
coveragehub_get_provider_coverage_market_coverage
coveragehub_get_provider_coverage_sport
coveragehub_get_provider_coverage_sports
coveragehub_get_settlement
coveragehub_get_settlement_hierarchies
coveragehub_get_spotlight_insights
coveragehub_get_spotlight_notifications
decide_write_approval
get_session_identity
ordering_get_fixtures_csv
ordering_get_fixtures_orders
ordering_get_locations_csv
ordering_get_locations_filters
ordering_get_locations_orders
ordering_get_sports_csv
ordering_get_sports_filters
ordering_get_sports_orders
ordering_get_tournaments_all_sports_orders
ordering_get_tournaments_csv
ordering_get_tournaments_filters
ordering_get_tournaments_orders
ordering_post_markets_remove
ordering_post_markets_update
ordering_post_orders_add
ordering_post_orders_add_orders
ordering_post_orders_remove
ordering_post_templates_update_templates
tradingfloor_get_fixture_market_get
tradingfloor_get_fixture_metadata_get
tradingfloor_get_fixtures_in_play
tradingfloor_get_fixtures_pre_match
tradingfloor_get_hierarchy_orders_get_in_play
tradingfloor_get_hierarchy_orders_get_pre_match
tradingfloor_get_locations
tradingfloor_get_markets_main
tradingfloor_get_sports
tradingfloor_get_sports_count_in_play
tradingfloor_get_sports_count_pre_match
tradingfloor_get_tournaments
tradingfloor_post_fixture_market_remove_suspension
tradingfloor_post_fixture_market_suspend
```
