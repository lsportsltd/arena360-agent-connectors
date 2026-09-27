---
name: arena360-configuration
description: Use when the operator asks about packages, templates, provider lists, odds ladders, alerts, distribution, or market display settings.
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 configuration (TRADE)

## Package reads

Quota, expiry, add-ons, or "what package am I on":

- `configuration_get_customer_package_get_packages_data`

One call. It returns InPlay and PreMatch together. Do not sweep the narrower tool.

Trading settings for a named betting type (odds formats, rounding, suspension range, default provider list, line caps):

- `configuration_get_customer_package_get`

If that narrower call fails because a default provider list is missing, do not retry it. Answer from the packages-data call. Say the detailed trading settings could not be read because no default provider list is configured.

Package write:

- `configuration_post_customer_package_update`

Load `arena360-changes-apply` first.

## Alerts

- `configuration_get_alerts_get_alert_settings`
- `configuration_post_alerts_update_alert_settings`

## Distribution

- `configuration_get_distribution_get`
- `configuration_post_distribution_update`

## Market display

- `configuration_get_markets_get_display_infos`
- `configuration_post_markets_upsert_display_infos`

Offered-flag and provider-list assignment on a hierarchy belong in `arena360-markets` (`configuration_get_markets_get` plus ordering market writes).

## Odds ladders

- `configuration_get_odds_ladder_get`
- `configuration_get_odds_ladder_is_applied`
- `configuration_post_odds_ladder_create`
- `configuration_post_odds_ladder_update`
- `configuration_post_odds_ladder_delete`

Delete is destructive. Say that in the show step.

## Provider lists

- `configuration_get_providers_settings_get`
- `configuration_get_providers_settings_get_providers`
- `configuration_post_providers_settings_create`
- `configuration_post_providers_settings_update`
- `configuration_post_providers_settings_update_default_list`
- `configuration_post_providers_settings_delete`

Delete is destructive.

## Templates

- `configuration_get_templates_get_templates_list`
- `configuration_get_templates_get_sport_templates_list`
- `configuration_get_templates_get_sports_list`
- `configuration_get_templates_get_sports_filter`
- `configuration_get_templates_get_default_templates_sports_list`
- `configuration_get_templates_get_default_template_settings`
- `configuration_get_templates_get_template_settings`
- `configuration_post_templates_create_template_market_settings`
- `configuration_post_templates_update_template_market_settings`
- `configuration_post_templates_delete_template`

Template create preflight:

1. Resolve a non-zero sport id and InPlay or PreMatch.
2. Read `configuration_get_templates_get_default_template_settings` for that pair. Page with the returned cursor while more results exist.
3. Match every requested market by exact name or id. `Under/Over` is not `Under/Over - Home Team`.
4. If any requested market is missing, list unsupported versus available. Do not write. Do not ask for approval.
5. Send only the requested rows. Each row needs the catalog market id. Do not copy the rest of the default list into create.

Include provider lists on the default-settings read only when the operator asks which providers a default market uses.

## Package answers

Describe betting type, active state, expiry, quota used versus total, and add-ons. Say whether an odds ladder is configured. Do not print package ids, ladder ids, or method codes.

## Never

- Never invent configuration tool names.
- Never treat this skill as DEFEND or ENGAGE.
- Never write without `arena360-changes-apply`.
