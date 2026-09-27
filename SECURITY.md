# Security

Report vulnerabilities in this packaging repo through private GitHub vulnerability reporting on `lsportsltd/arena360-agent-connectors`.

Do not file public GitHub issues for security findings.

## Scope

This repository ships plugin manifests, skills, and listing copy only. It does not contain MCP server source.

The only supported MCP URL is `https://arena-mcp.lsports.eu/arena/mcp`.

Sessions authenticate with the operator's ARENA360 credentials. The plugin does not store secrets, OAuth client IDs, or IdP tenants.

## Write access

Every write goes through skill `arena360-changes-apply`. The agent shows the change, waits for operator approval, applies it, then verifies. When the hosted server returns an approval id, the agent also uses `decide_write_approval`.

## What not to send

Do not include end-bettor PII, betting history, or production secrets in issues, pull requests, or skill examples.

Integrity signals stay with the operator integrity team. Do not analyze them casually in this repo or in agent transcripts meant for general trading.
