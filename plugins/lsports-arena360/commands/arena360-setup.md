---
name: arena360-setup
description: Connect the operator to the hosted ARENA360 MCP and confirm session identity before any account work.
---

# ARENA360 setup

Use this command when the operator needs to connect or confirm the hosted MCP session.

## Steps

1. Confirm the only MCP URL in use is `https://arena-mcp.lsports.eu/arena/mcp`.
2. Tell the operator to sign in with ARENA360 credentials. Do not collect passwords, tokens, or tenant ids in chat.
3. Load skill `arena360-use`, then call `get_session_identity`.
4. Report customer account and signed-in user in plain language.
5. If identity fails, stop. Ask the operator to reconnect and contact their CSM. Do not guess a fallback host.
6. Remind the operator that writes go through skill `arena360-changes-apply`.

## Never

- Never suggest a staging or internal host.
- Never store secrets in the plugin or in chat.
- Never invent DEFEND or ENGAGE tools.
- Never describe this connection as bettor-facing or as placing bets.
