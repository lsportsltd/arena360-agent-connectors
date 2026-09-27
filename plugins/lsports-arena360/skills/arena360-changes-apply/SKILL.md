---
name: arena360-changes-apply
description: "MANDATORY prerequisite. You MUST load this skill before any ARENA360 write, including orders, market settings, templates, provider lists, odds ladders, alerts, distribution, package updates, and trading-floor suspend or unsuspend."
license: Apache-2.0
metadata:
  version: "0.2.0"
  author: lsports
---

# ARENA360 changes apply (write gate)

Every write follows show, approve, apply, verify. There is no silent write.

## Write tools (exact names)

Configuration:

- `configuration_post_alerts_update_alert_settings`
- `configuration_post_customer_package_update`
- `configuration_post_distribution_update`
- `configuration_post_markets_upsert_display_infos`
- `configuration_post_odds_ladder_create`
- `configuration_post_odds_ladder_delete`
- `configuration_post_odds_ladder_update`
- `configuration_post_providers_settings_create`
- `configuration_post_providers_settings_delete`
- `configuration_post_providers_settings_update`
- `configuration_post_providers_settings_update_default_list`
- `configuration_post_templates_create_template_market_settings`
- `configuration_post_templates_delete_template`
- `configuration_post_templates_update_template_market_settings`

Ordering:

- `ordering_post_markets_remove`
- `ordering_post_markets_update`
- `ordering_post_orders_add`
- `ordering_post_orders_add_orders`
- `ordering_post_orders_remove`
- `ordering_post_templates_update_templates`

Trading floor:

- `tradingfloor_post_fixture_market_suspend`
- `tradingfloor_post_fixture_market_remove_suspension`

Approval companion:

- `decide_write_approval`

If a name is not in this list, it is not a write in the live inventory. Do not invent a write.

## Protocol

### 1. Show

Read current state with the matching `*_get_*` tool first.

State in plain language:

- What will change
- Which fixtures, markets, templates, or lists
- How many items
- InPlay or PreMatch
- Target package if the account has more than one

For suspend and unsuspend, read `tradingfloor_get_fixture_market_get` first. Name the fixture, the market or "all markets", and the betting type.

Do not widen scope. If a specific market cannot be resolved, ask. Do not fall back to a fixture-wide suspend.

### 2. Approve

Ask the operator to reply **approve** or **deny**.

Do not apply yet.

Do not send the operator to a browser approval page. Do not ask them to copy a resume token. Do not show tool names, approval ids, JSON, or parameter names in the ask.

### 3. Server approval id

If a write tool returns that approval is required and includes an approval id:

1. Keep that id for yourself.
2. Explain the action in plain language and ask approve or deny.
3. On **approve**: call `decide_write_approval` with that approval id and decision approve. Then retry the **same** write tool with the **same** arguments.
4. On **deny**: call `decide_write_approval` with decision deny. Stop.

Never invent an approval id. Never skip `decide_write_approval` when the server returned one.

### 4. Apply

Call only the write the operator approved. Same arguments. Same scope.

On failure, do not retry with a broader target.

### 5. Verify

Read the same records you intended to change. Confirm the new state in plain language.

If verify does not match the approval, say so and stop. Do not keep writing.

## Preflight that can block a write

Load the matching product skill and honor its preflight. If preflight fails, do not ask for approval and do not call the write.

Ordering subscription writes:

1. Read the matching `ordering_get_*_orders` row.
2. If `canBeOrdered` is false or missing after a successful lookup, refuse. Refer the operator to support@lsports.eu.
3. `isPremium` alone is not the decision.

Hierarchy writes need every parent id: sport, then location, then tournament, then fixture. Copy ids from the order row. Never send sport plus fixture alone.

Market offered-flag writes: follow `arena360-markets`. Partial row lists do not turn omitted markets off. Build the full diff. Single-provider markets may not take a multi-provider list.

Template create: every requested market must exist in the default catalog for that sport and betting type. If any market is missing, list unsupported versus available names and stop.

Trading-floor suspend: live impact. Confirm fixture, market or all markets, and betting type before the approve ask.

Deletes, order removals, and suspends are destructive. Say that in the show step.

## Package and environment

If the account has several packages, name the target (QA, UAT, or Production) in the show step, before the approval ask. If the operator did not name one, ask in that earlier turn and wait. Do not ask them to name Production, QA, or UAT in the same turn as approve or deny. After the target is known, the approval reply is only approve or deny.

Prefer rehearsal on QA or UAT when the operator wants a production change. Say that preference in the show step, not in the approval ask.

## Never

- Never write without an explicit approve in this chat.
- Never treat "looks good", "go ahead and check", or a new unrelated message as approval.
- Never apply a different payload than the one you showed.
- Never invent DEFEND or ENGAGE writes.
- Never bypass risk, fraud, or regulation controls.
- Never expose approval ids, tool names, or traces in the operator reply.
- Never retry a premium refusal or a package-not-available error with a different tool.
