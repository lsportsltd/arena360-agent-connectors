---
name: arena360-readiness-brief
description: "Use when the operator wants to know if they are ready to trade a set of fixtures, a competition, or a time window (for example tonight's Premier League, this weekend's tennis, or a derby), or asks for a readiness check, pre-match check, or InPlay readiness brief. Load arena360-use first."
license: Apache-2.0
metadata:
  version: "0.2.0"
  author: lsports
---

# ARENA360 readiness brief

Load `arena360-use` first. This skill orchestrates a pre-trade check. It does not replace the domain skills. Follow `arena360-ordering`, `arena360-configuration`, `arena360-markets`, `arena360-trading-floor`, and, when books were named, `arena360-boost`.

Do not place bets. Do not serve bettors.

## Inputs

If any of these are missing, ask for all of them in one message. Do not start the checks first.

- Competitions or fixtures
- Time window
- InPlay or PreMatch
- Target package, when the account has more than one
- Books to benchmark, or an explicit skip

If the operator names no books, skip BOOST and say so in the brief. Never guess books. Never default a league, a sport, or a country. If a competition name is used in more than one sport or country, ask which sport and country in that same message.

Ask for the uptime threshold once. Offer 95% as a starting point the operator can change. Use the number they accept. Do not invent a second threshold.

## Checks

Run these per competition, in this order. A number comes only from a total or a rollup field. Never count fixture-page rows. Follow `arena360-ordering` for that rule.

1. Ordering. Is the competition ordered for the chosen betting type, and are the fixtures in the window ordered? Use `arena360-ordering`. Competition-level ordered fixtures come from the fixture order read with the ordered status at competition level. Do not treat a league catalog row as a subscription.
2. Package. One call, through `arena360-configuration`: `configuration_get_customer_package_get_packages_data`. Say whether the chosen betting type is in the package, whether it is active, and whether quota remains. Do not print package ids.
3. Configuration. Through `arena360-configuration` and `arena360-markets`, read the template and the provider list that apply. Read `configuration_get_markets_get` and `configuration_get_providers_settings_get`. Note an empty provider list, and note a key market that has a single provider. Key markets are the main markets from `arena360-trading-floor` (`tradingfloor_get_markets_main`).
4. Trading floor. Through `arena360-trading-floor`, list fixtures in the window that are already on the floor, and any markets currently suspended. Read fixture markets before you call a market suspended.
5. Alerts. Read `configuration_get_alerts_get_alert_settings` through `arena360-configuration`. The hosted MCP has no tool that filters alerts by competition or that lists alerts which fired. If the settings do not show coverage for this competition, mark alerts Amber. Do not invent a coverage result.
6. BOOST, only when the operator named books. Recent market uptime and fixture coverage for those books on this competition. Follow the `arena360-boost` ask-gate. Do not call BOOST until that gate passes. Exact 0 or 0% is N/A, and N/A is missing data (Amber), not a pass.

## RAG

- Red: a blocker. The competition or a fixture in the window is not ordered, the betting type is not in the package, a key market is suspended, or the provider list is empty.
- Amber: degraded or unknown. Uptime is below the operator's threshold, a key market has a single provider, no alerts cover the competition, or a check has no data.
- Green: every check that ran passes. A skipped BOOST column is not a failure. Say "skipped" in that cell.

One Red check makes the row Red. Otherwise one Amber check makes the row Amber.

## Output

One screen. Plain language. Do not name tools, hosts, or raw ids.

Header line: window, betting type, package.

Then a table:

| Competition | RAG | Ordering | Configuration | Live status | Alerts | BOOST |
| --- | --- | --- | --- | --- | --- | --- |

Then a numbered fix list. Each item is one concrete change and the domain skill that would make it (`arena360-ordering`, `arena360-markets`, `arena360-configuration`, `arena360-trading-floor`, or `arena360-boost`).

End with this sentence: "Reply with the numbers you want applied. Each change goes through approval, and I recommend UAT first."

## Applying a fix

Do not apply anything from the fix list until the operator replies with numbers.

Load `arena360-changes-apply` for each change set. One change set at a time. Show, wait for approve or deny, apply, verify. Do not ask them to name Production in that approval turn. The target package was already named in this brief.

If they send several numbers, finish the first approval before you show the next.

Writes stay on the domain skill's tools, for example `ordering_post_orders_add`, `ordering_post_markets_update`, `configuration_post_alerts_update_alert_settings`, `configuration_post_providers_settings_update`, and `tradingfloor_post_fixture_market_remove_suspension`. Unsuspend is a live-offer write. Name the fixture, the market, and the betting type in the show step.

## Never

- Never guess books, a sport, or a competition.
- Never count rows from a fixture page.
- Never call BOOST when no books were named.
- Never treat N/A uptime as a green score.
- Never invent an alerts-by-competition tool. That read is not on the hosted MCP.
- Never apply a fix without `arena360-changes-apply`.
- Never apply every fix because the operator said "fix everything".
- Never place a bet or bypass risk controls.
