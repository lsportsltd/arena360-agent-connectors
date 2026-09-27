# Cursor Marketplace checklist

Submit at https://cursor.com/marketplace/publish after the public GitHub repo exists. Do not submit from this draft.

- [ ] Repo is public: `lsportsltd/arena360-agent-connectors`
- [ ] `.cursor-plugin/marketplace.json` validates (`npm run validate`)
- [ ] Plugin `.cursor-plugin/plugin.json` name is `lsports-arena360`, version `0.1.0`, license `Apache-2.0`
- [ ] Logo path `assets/logo.png` exists in the plugin
- [ ] TODO(verify) Brand: replace logo with 1024x1024 before review if Cursor rejects 200x200
- [ ] README install steps match the public repo
- [ ] Product blocker cleared: public AI-access docs still say write is coming (`docs/decisions.md`)
- [ ] Legal replaced `<TERMS_URL>` if the form asks for terms
- [ ] No internal hosts in the diff
