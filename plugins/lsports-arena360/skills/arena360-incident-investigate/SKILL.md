---
name: arena360-incident-investigate
description: "Use when the operator reports an in-match or pre-match problem on a fixture: markets suspended, a feed or score gap, missing markets, stale or odd odds, a provider dropping out, or asks what happened on a match. Load arena360-use first."
license: Apache-2.0
metadata:
  version: "0.2.0"
  author: lsports
---

# ARENA360 incident investigation

Load `arena360-use` first. This is a read of what the account shows, then optional fixes. Follow `arena360-trading-floor`, `arena360-ordering`, `arena360-markets`, `arena360-configuration`, and `arena360-boost`. Do not duplicate their rules.

If the operator asks whether a line was fixed, or describes match-fixing, suspicious betting, fraud, or an insider signal, stop. Load `arena360-integrity`. Surface what they said. Route them to the operator integrity team and to support@lsports.eu. Do not investigate that as an operations incident. Never state or imply that an integrity issue occurred.

## Inputs

If any of these are missing, ask for all of them in one message.

- Fixture: teams and date, or the competition
- Approximate time of the incident
- InPlay or PreMatch
- The symptom
- Target package, when the account has more than one

Do not guess the fixture, the betting type, or the package.

## Reads

Reads only until the operator picks a remediation.

1. Resolve the fixture through `arena360-trading-floor`. Use the sport, location, tournament, then fixture list for the chosen betting type. If more than one match fits, show the candidates in plain language and wait for the operator to confirm. Do not pick one.
2. Current markets. Read `tradingfloor_get_fixture_market_get` for that fixture and betting type. Say which markets are suspended or open, and whether lines are present.
3. Ordering. Through `arena360-ordering`, say whether the fixture and the affected markets are ordered for this betting type. Counts come from totals or rollup fields, not from paging rows.
4. Configuration. Through `arena360-markets` and `arena360-configuration`, read the provider list and the template on the affected markets. Note single-provider exposure. Use `configuration_get_markets_get` and `configuration_get_providers_settings_get`.
5. BOOST fixture-level market uptime for the providers on that list, around the incident time. Follow `arena360-boost`. The hosted tools for this are `boost_get_api_sports_fixture_level_analysis_inplay`, `boost_get_api_sports_fixture_level_analysis_prematch`, `boost_get_api_fixture_market_uptime_inplay`, and `boost_get_api_fixture_market_uptime_prematch`. Use the InPlay or PreMatch pair that matches the incident. Do not add books that are not on the list. If the list has more than five providers, ask which five. `boost_get_api_fixtures_incidents` is a performance read for fixture incidents. It is not an alert history and it is not an integrity finding.
6. Alerts. Read `configuration_get_alerts_get_alert_settings`. The hosted MCP has no tool that lists alerts that fired for a fixture. Say that. Do not treat `boost_get_api_retroanalysis_notifications_alerts` as the operator's alert log.

A score or feed timeline is not on the hosted MCP. Fixture metadata is the current state, not a history of the score. If the symptom is a score gap, say the score history is not available.

## Output

Plain language. Do not name tools or hosts. Fixture identifiers stay out of this reply, except inside the support note below.

1. Summary. Two sentences.
2. Timeline. What the data shows, in time order. Name the source domain for each point: trading floor, ordering, configuration, BOOST, or alerts.
3. Affected markets.
4. Likely cause. Ranked. Each cause has the evidence. Label anything inferred as inferred. Use only these candidates when the evidence fits: provider feed gap, market not ordered, operator or manual suspension, single-provider exposure, configuration change. If the data cannot explain it, say so. Do not fill the gap with a guess.
5. Remediation options. Examples: unsuspend, add a provider to the list, or adjust alerts. Each option is a proposal. Say that nothing will change until they approve one.
6. When to contact LSports support. If the cause points to LSports data or delivery, give a ready-to-send note to support@lsports.eu. The note covers the fixture, the time window, the betting type, the affected markets, and what was observed. This note is the one place fixture identifiers may appear.

## Applying a fix

Load `arena360-changes-apply`. One change set at a time. Unsuspend is a live-offer write: `tradingfloor_post_fixture_market_remove_suspension`. Name the fixture, the market, and the betting type before you ask for approval. Provider-list and alert changes use `configuration_post_providers_settings_update` and `configuration_post_alerts_update_alert_settings`. Market offered flags use `ordering_post_markets_update` and follow `arena360-markets`.

## Never

- Never conclude that an integrity issue occurred.
- Never analyze a "was it fixed" question. Load `arena360-integrity` instead.
- Never invent a score timeline or an alert-fire log.
- Never unsuspend, edit a provider list, or change alerts without `arena360-changes-apply`.
- Never widen a suspend or unsuspend beyond the market the operator named.
- Never place a bet or pull end-bettor history.
