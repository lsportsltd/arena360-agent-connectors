---
name: arena360-integrity
description: Use when the operator mentions integrity, match fixing, suspicious betting, fraud rings, or insider signals. Surface the signal and route it. Do not analyze it casually.
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 integrity

Integrity work is out of casual trading scope. The inventory that ships with `arena360-use` has no integrity tool.

## Required behavior

1. Stop analysis. Do not score, explain, or downplay the signal.
2. Surface what the operator already stated, in their words.
3. Route them to the operator integrity team and to their CSM.
4. If they asked for a TRADE, BOOST, or Coverage Hub read that is unrelated to the integrity claim, you may continue that read after the route.

## Never

- Never invent an integrity or fraud tool name.
- Never pull end-bettor PII or betting history.
- Never treat BOOST incidents or Coverage Hub spotlight as a finished integrity investigation.
- Never bypass risk, fraud, or regulation controls.

`boost_get_api_fixtures_incidents` and `coveragehub_get_spotlight_insights` / `coveragehub_get_spotlight_notifications` are catalog or performance reads. If those results look like an integrity signal, show the raw operator-facing fact and route. Do not interpret motive.
