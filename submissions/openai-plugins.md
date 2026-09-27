# OpenAI plugins checklist

Codex and ChatGPT share the public plugin directory. Manifest: `plugins/lsports-arena360/.codex-plugin/plugin.json`.

- [ ] `interface` uses `websiteURL`, `privacyPolicyURL`, `termsOfServiceURL` (current docs, not Airtable's `websiteUrl`)
- [ ] `longDescription` equals the shared description
- [ ] `capabilities` are Read and Write
- [ ] `brandColor` is candidate `#E2F22D`. TODO(verify) Brand before submit
- [ ] `logo` and `composerIcon` paths exist
- [ ] `screenshots` is empty. TODO(verify) Product: add operator screenshots or confirm empty is accepted
- [ ] Privacy and terms are still `<TERMS_URL>`. Legal must replace them or the form will reject the field
- [ ] Repo marketplace `.agents/plugins/marketplace.json` includes install policy and category Productivity
- [ ] TODO(verify) Engineering: add a portable root `plugin.json` if the form rejects `.codex-plugin` only
- [ ] Product blocker cleared (`docs/decisions.md`)
- [ ] MCP URL is only `https://arena-mcp.lsports.eu/arena/mcp`
