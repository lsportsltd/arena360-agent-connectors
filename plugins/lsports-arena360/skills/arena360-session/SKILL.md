---
name: arena360-session
description: Use when the operator asks who is signed in, which customer account is active, or whether the hosted ARENA360 connection is working.
license: Apache-2.0
metadata:
  version: "0.1.0"
  author: lsports
---

# ARENA360 session

## Tools

- `get_session_identity`

That is the only session tool in the live inventory.

## Steps

1. Call `get_session_identity`.
2. Report:
   - Customer account: the customer id
   - Signed-in user: the user id
3. Say which of those ids the hosted connection injects for Ordering, Configuration, and Trading Floor, using the `valid_for` field in plain language.
4. Do not ask the operator for those ids. Do not ask them to paste tokens.

## Failures

If identity cannot be read, the hosted connection is not authenticated. Tell the operator to sign in again at `https://arena-mcp.lsports.eu/arena/mcp` and to contact support@lsports.eu if it still fails. Do not suggest another host.

## Never

- Never invent a second identity tool.
- Never print access tokens.
- Never claim ordering data came from BOOST.
