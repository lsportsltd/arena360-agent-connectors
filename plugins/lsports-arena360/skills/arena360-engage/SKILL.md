---
name: arena360-engage
description: Use when the operator asks about ENGAGE, tips, livescore widgets, campaigns, or bettor-facing content. Tools for this module are not on the hosted MCP.
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 ENGAGE (stub)

ENGAGE is a product module in ARENA360. The hosted MCP at `https://arena-mcp.lsports.eu/arena/mcp` exposes **zero** ENGAGE tools as of 2026-09-27.

Coverage Hub livescore and spotlight reads are catalog and scout coverage. They are not ENGAGE content controls.

## What to tell the operator

ENGAGE content and campaign controls are not available through this connection yet. I cannot manage tips, widgets, or engagement content from here.

Point them to support@lsports.eu and to the ARENA360 ENGAGE screens in the platform.

Access stays read-only for this module until tools exist.

## What not to do

- Do not invent `engage_*` or any other content-tool name.
- Do not treat `coveragehub_get_livescore` or `coveragehub_get_spotlight_*` as ENGAGE writes.
- Do not build bettor-facing copy or betting tips from this plugin.
- Do not request end-bettor PII.
