---
name: arena360-markets
description: Use when the operator wants to see or change which markets are offered on a sport, country, league, or fixture, or to assign a provider list on those markets.
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 market settings

## Tools

- `configuration_get_markets_get`
- `ordering_post_markets_update`
- `ordering_post_markets_remove`
- `ordering_post_orders_add` when the order payload includes market settings
- `configuration_get_providers_settings_get`

Writes go through `arena360-changes-apply`.

## Read

`configuration_get_markets_get` needs a non-zero sport id and InPlay or PreMatch. Ask if either is missing. Never send sport id 0.

## Replace versus merge

Changed market settings are a **partial write at the row level**. A market left out of the array stays as it was. It is not turned off by omission.

Inside a row you do send, every field matters. `offered` and `id` are required on every row. Omitting `offered` turns that market off. A wrong `id` updates the wrong setting.

When the operator wants **only** a named set of markets on a hierarchy:

1. Read every currently offered market and its setting id.
2. Build the full diff:
   - one row per requested market with offered true (existing id, or 0 if new)
   - one row per currently offered market that is not in the requested list, with offered false and its existing id
3. Send that full list in one write.
4. In the show step, name the markets you will turn off.

## Single-provider markets

Before any write that sets a provider list:

1. Read `configuration_get_markets_get` for that hierarchy.
2. Note every target market marked restricted to a single provider.
3. Read `configuration_get_providers_settings_get` for the chosen list. Check whether it is a single-provider list and how many providers it has.
4. If any target market is single-provider restricted and the list is not a single-provider list (or has more than one provider), **do not write**. Name the restricted markets. Ask the operator to pick a valid single-provider list or to exclude those markets.

If a write still returns restricted single-provider market names, treat that as a failed assignment, not success.

## Never

- Never send only the new markets and assume the rest turn off.
- Never omit `offered` or `id` on a row you send.
- Never invent a markets tool name.
