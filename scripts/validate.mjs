#!/usr/bin/env node
/**
 * Packaging checks for arena360-agent-connectors.
 * Node 20+. Schemas under scripts/schemas/ are vendored from cursor/plugins (MIT).
 */
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { dirname, join, relative, resolve } from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function readJSON(path) {
  try {
    return JSON.parse(read(path));
  } catch (err) {
    fail(`${path} is not valid JSON: ${err.message}`);
    return null;
  }
}

const REQUIRED = [
  "README.md",
  "LICENSE",
  "NOTICE",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  ".gitignore",
  "server.json",
  "package.json",
  ".cursor-plugin/marketplace.json",
  ".claude-plugin/marketplace.json",
  ".agents/plugins/marketplace.json",
  "assets/arena360-logo.png",
  "assets/arena360-logo.svg",
  "assets/social-preview.png",
  "docs/repo-settings.md",
  "docs/listing-copy.md",
  "docs/test-prompts.md",
  "docs/tool-inventory.md",
  "docs/decisions.md",
  "docs/links.md",
  "scripts/validate.mjs",
  "scripts/check-version-bump.sh",
  "scripts/schemas/README.md",
  "scripts/schemas/plugin.schema.json",
  "scripts/schemas/marketplace.schema.json",
  ".github/workflows/validate.yml",
  ".github/workflows/package-skills.yml",
  "plugins/lsports-arena360/.cursor-plugin/plugin.json",
  "plugins/lsports-arena360/.claude-plugin/plugin.json",
  "plugins/lsports-arena360/.codex-plugin/plugin.json",
  "plugins/lsports-arena360/.mcp.json",
  "plugins/lsports-arena360/assets/logo.png",
  "plugins/lsports-arena360/assets/icon.svg",
  "plugins/lsports-arena360/commands/arena360-setup.md",
  "plugins/lsports-arena360/rules/arena360-safety.mdc",
  "submissions/anthropic-connectors-directory.md",
  "submissions/anthropic-plugin-directory.md",
  "submissions/cursor-marketplace.md",
  "submissions/openai-plugins.md",
  "submissions/mcp-registry.md",
];

for (const path of REQUIRED) {
  if (!existsSync(join(root, path))) fail(`missing ${path}`);
}

const SKILLS = [
  "arena360-use",
  "arena360-changes-apply",
  "arena360-session",
  "arena360-ordering",
  "arena360-configuration",
  "arena360-markets",
  "arena360-trading-floor",
  "arena360-boost",
  "arena360-coverage-hub",
  "arena360-defend",
  "arena360-engage",
  "arena360-integrity",
];

const skillsDir = join(root, "plugins/lsports-arena360/skills");
const foundSkills = existsSync(skillsDir)
  ? readdirSync(skillsDir).filter((name) => statSync(join(skillsDir, name)).isDirectory())
  : [];
if (foundSkills.length !== SKILLS.length) {
  fail(`expected ${SKILLS.length} skills, found ${foundSkills.length}: ${foundSkills.join(", ")}`);
}
for (const name of SKILLS) {
  if (!foundSkills.includes(name)) fail(`missing skill ${name}`);
}

const listing = existsSync(join(root, "docs/listing-copy.md")) ? read("docs/listing-copy.md") : "";
const sharedMatch = listing.match(/```text\n([\s\S]*?)\n```/);
const SHARED = sharedMatch ? sharedMatch[1] : "";
if (!SHARED.startsWith("Run your whole ARENA360 account in plain language.")) {
  fail("docs/listing-copy.md is missing the shared description fence");
}

const MCP_URL = "https://arena-mcp.lsports.eu/arena/mcp";
const VERSION = "0.1.0";

function expectShared(label, value) {
  if (value !== SHARED) fail(`${label} description does not match the shared string`);
}

const cursorPlugin = readJSON("plugins/lsports-arena360/.cursor-plugin/plugin.json");
const claudePlugin = readJSON("plugins/lsports-arena360/.claude-plugin/plugin.json");
const codexPlugin = readJSON("plugins/lsports-arena360/.codex-plugin/plugin.json");
const cursorMarket = readJSON(".cursor-plugin/marketplace.json");
const claudeMarket = readJSON(".claude-plugin/marketplace.json");
const agentsMarket = readJSON(".agents/plugins/marketplace.json");
const server = readJSON("server.json");
const pkg = readJSON("package.json");
const mcp = readJSON("plugins/lsports-arena360/.mcp.json");

if (cursorPlugin) expectShared("cursor plugin", cursorPlugin.description);
if (claudePlugin) expectShared("claude plugin", claudePlugin.description);
if (codexPlugin) expectShared("codex plugin", codexPlugin.description);
if (codexPlugin?.interface) expectShared("codex longDescription", codexPlugin.interface.longDescription);
if (pkg) expectShared("package.json", pkg.description);
if (cursorMarket?.plugins?.[0]) expectShared("cursor marketplace", cursorMarket.plugins[0].description);
if (claudeMarket?.plugins?.[0]) expectShared("claude marketplace", claudeMarket.plugins[0].description);
if (agentsMarket?.plugins?.[0]) expectShared("codex marketplace", agentsMarket.plugins[0].description);

for (const path of ["README.md", "CONTRIBUTING.md", "docs/repo-settings.md"]) {
  if (existsSync(join(root, path)) && !read(path).includes(SHARED)) {
    fail(`${path} does not include the shared description`);
  }
}

for (const [label, json] of [
  ["cursor plugin", cursorPlugin],
  ["claude plugin", claudePlugin],
  ["codex plugin", codexPlugin],
  ["server.json", server],
  ["package.json", pkg],
]) {
  if (json && json.version !== VERSION) fail(`${label} version is ${json.version}, expected ${VERSION}`);
  if (json && json.license && json.license !== "Apache-2.0") fail(`${label} license is ${json.license}`);
}

for (const path of ["SECURITY.md", "docs/listing-copy.md", "README.md"]) {
  if (existsSync(join(root, path)) && !read(path).includes("supports@lsports.eu")) {
    fail(`${path} must name supports@lsports.eu`);
  }
}

if (cursorPlugin) {
  if (cursorPlugin.name !== "lsports-arena360") fail("cursor plugin name");
  if (cursorPlugin.category !== "productivity") fail("cursor plugin category must be productivity");
  if (cursorPlugin.mcpServers !== "./.mcp.json") fail("cursor plugin mcpServers path");
  const authorKeys = Object.keys(cursorPlugin.author || {});
  for (const key of authorKeys) {
    if (key !== "name" && key !== "email") fail(`cursor author has unsupported key ${key}`);
  }
}

if (codexPlugin?.interface) {
  const iface = codexPlugin.interface;
  if (!("websiteURL" in iface)) fail("codex interface must use websiteURL (current OpenAI docs)");
  if ("websiteUrl" in iface) fail("codex interface still uses Airtable websiteUrl casing");
  if (iface.privacyPolicyURL !== "https://www.lsports.eu/privacy-policy/") {
    fail("codex privacyPolicyURL");
  }
  if (iface.termsOfServiceURL !== "https://www.lsports.eu/terms-conditions/") {
    fail("codex termsOfServiceURL");
  }
  if (iface.brandColor !== "#E2F22D") fail("codex brandColor must be #E2F22D");
}

if (cursorMarket?.plugins?.[0]) {
  const keys = Object.keys(cursorMarket.plugins[0]);
  const allowed = new Set(["name", "source", "description", "minClientVersions"]);
  for (const key of keys) {
    if (!allowed.has(key)) fail(`cursor marketplace entry has disallowed key ${key}`);
  }
  if (cursorMarket.plugins[0].source !== "plugins/lsports-arena360") {
    fail("cursor marketplace source path");
  }
}

if (agentsMarket?.plugins?.[0]) {
  const entry = agentsMarket.plugins[0];
  if (entry.policy?.installation !== "AVAILABLE" || entry.policy?.authentication !== "ON_INSTALL") {
    fail("codex marketplace policy is incomplete");
  }
  if (entry.source?.path !== "./plugins/lsports-arena360") fail("codex marketplace source path");
}

if (mcp?.mcpServers?.arena360?.url !== MCP_URL) fail(".mcp.json arena360 url");
if (mcp && Object.keys(mcp.mcpServers || {}).length !== 1) fail(".mcp.json must declare only arena360");
if (mcp?.mcpServers?.arena360?.type !== "http") fail(".mcp.json transport type must be http");

if (server) {
  if (server.$schema !== "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json") {
    fail("server.json schema URL");
  }
  if (server.name !== "eu.lsports/arena360") fail("server.json name");
  if (!server.description || server.description.length > 100) {
    fail(`server.json description length ${server.description?.length ?? 0} exceeds 100`);
  }
  if (server.description === SHARED) fail("server.json cannot use the 339-character shared description");
  const remote = server.remotes?.[0];
  if (remote?.type !== "streamable-http" || remote?.url !== MCP_URL) fail("server.json remote");
  if (server.packages) fail("server.json must not publish a package");
}

const inventoryText = existsSync(join(root, "docs/tool-inventory.md")) ? read("docs/tool-inventory.md") : "";
const inventoryBlock = inventoryText.match(/```text\n([\s\S]*?)\n```/);
const inventory = inventoryBlock ? inventoryBlock[1].split("\n").filter(Boolean) : [];
if (inventory.length !== 110) fail(`tool inventory count is ${inventory.length}, expected 110`);
if (new Set(inventory).size !== inventory.length) fail("tool inventory has duplicate names");

const writes = inventory.filter((name) => name.includes("_post_") || name === "decide_write_approval");
const changes = existsSync(join(root, "plugins/lsports-arena360/skills/arena360-changes-apply/SKILL.md"))
  ? read("plugins/lsports-arena360/skills/arena360-changes-apply/SKILL.md")
  : "";
for (const name of writes) {
  if (!changes.includes(name)) fail(`arena360-changes-apply is missing write tool ${name}`);
}
if (!changes.includes("decide_write_approval")) fail("write protocol missing decide_write_approval");
if (!/approve/i.test(changes) || !changes.includes("deny")) fail("write protocol must ask approve or deny");

for (const stub of ["arena360-defend", "arena360-engage"]) {
  const body = read(`plugins/lsports-arena360/skills/${stub}/SKILL.md`);
  if (!body.includes("zero") || !body.includes("hosted MCP")) {
    fail(`${stub} must say the hosted MCP exposes zero tools`);
  }
  if (body.includes("TODO")) fail(`${stub} must not contain task markers`);
  if (new RegExp(`${stub.includes("defend") ? "defend" : "engage"}_[a-z]`).test(body)) {
    fail(`${stub} invents a concrete tool name`);
  }
}

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return data;
}

for (const name of foundSkills) {
  const path = `plugins/lsports-arena360/skills/${name}/SKILL.md`;
  if (!existsSync(join(root, path))) {
    fail(`missing ${path}`);
    continue;
  }
  const text = read(path);
  const fm = frontmatter(text);
  if (!fm) {
    fail(`${path} missing frontmatter`);
    continue;
  }
  if (fm.name !== name) fail(`${path} name ${fm.name} does not match directory`);
  if (!fm.description || fm.description.length < 20) fail(`${path} description is missing or too short`);
  if ((fm.description || "").length > 1024) fail(`${path} description exceeds 1024 characters`);
  if (fm.name?.includes("--")) fail(`${path} name has consecutive hyphens`);
  if (fm.version && fm.version !== VERSION) fail(`${path} metadata version`);
}

const command = existsSync(join(root, "plugins/lsports-arena360/commands/arena360-setup.md"))
  ? read("plugins/lsports-arena360/commands/arena360-setup.md")
  : "";
const commandFm = frontmatter(command);
if (!commandFm?.name || !commandFm?.description) fail("arena360-setup command frontmatter");

const rule = existsSync(join(root, "plugins/lsports-arena360/rules/arena360-safety.mdc"))
  ? read("plugins/lsports-arena360/rules/arena360-safety.mdc")
  : "";
const ruleFm = frontmatter(rule);
if (ruleFm?.alwaysApply !== "true") fail("arena360-safety must set alwaysApply: true");
if (!ruleFm?.description) fail("arena360-safety missing description");

const TOOL_PREFIX = /^(boost|configuration|coveragehub|ordering|tradingfloor)_([a-z0-9_]+)$/;
const agentFiles = [];
function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (/\.(md|mdc)$/.test(entry.name)) agentFiles.push(path);
  }
}
walk(join(root, "plugins/lsports-arena360"));
for (const file of agentFiles) {
  const text = readFileSync(file, "utf8");
  const ticks = text.matchAll(/`([^`]+)`/g);
  for (const tick of ticks) {
    const token = tick[1];
    if (token.includes("*")) continue;
    if (token === "decide_write_approval" || token === "get_session_identity" || TOOL_PREFIX.test(token)) {
      if (!inventory.includes(token)) {
        fail(`${relative(root, file)} references unknown tool ${token}`);
      }
    }
  }
}

function walkRepo(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", "uploads", "agent-tools"].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walkRepo(path, acc);
    else acc.push(path);
  }
  return acc;
}

const BANNED = [
  "robust",
  "seamlessly",
  "seamless",
  "leverages",
  "leverage",
  "cutting-edge",
  "innovative",
  "best-in-class",
  "comprehensive",
  "industry-leading",
  "transformative",
  "state-of-the-art",
  "next-generation",
];
const bannedRe = new RegExp(`\\b(${BANNED.join("|")})\\b`, "i");
const allowedHosts = new Set([
  "arena-mcp.lsports.eu",
  "www.lsports.eu",
  "docs.lsports.eu",
  "lsports.eu",
]);

for (const file of walkRepo(root)) {
  const rel = relative(root, file);
  if (rel.startsWith("scripts/schemas/") || rel === "scripts/validate.mjs" || rel === "LICENSE") continue;
  const text = readFileSync(file, "utf8");
  if (rel.endsWith(".md") || rel.endsWith(".mdc")) {
    if (text.includes("—") || text.includes("–")) fail(`${rel} contains an em or en dash`);
    if (text.includes(" -- ")) fail(`${rel} contains ' -- '`);
    if (bannedRe.test(text)) fail(`${rel} contains banned wording: ${text.match(bannedRe)[0]}`);
    if (/^[-*] \[[ xX]\]/m.test(text)) fail(`${rel} contains a task checkbox`);
  }
  if (/\bTODO\b|\bFIXME\b/.test(text)) fail(`${rel} contains a task marker`);
  if (/<[A-Z][A-Z0-9_]{2,}>/.test(text)) fail(`${rel} contains an angle-bracket placeholder`);
  if (/TRADE360/.test(text) || /\bMTS\b/.test(text)) fail(`${rel} uses TRADE360 or MTS`);
  if (/lsports-gcp|qa-trd|prod-trd/.test(text)) fail(`${rel} contains an internal host marker`);
  for (const match of text.matchAll(/[a-z0-9.-]*lsports\.eu/g)) {
    const host = match[0].replace(/^[^a-z0-9]+/, "");
    if (!allowedHosts.has(host)) fail(`${rel} has disallowed host ${host}`);
  }
  if (/BEGIN PRIVATE KEY|client_secret|AKIA[0-9A-Z]{16}/.test(text)) {
    fail(`${rel} looks like it contains a secret`);
  }
}

const repoText = walkRepo(root)
  .filter((file) => !relative(root, file).startsWith("scripts/schemas/"))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");
if ((repoText.match(new RegExp(MCP_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length < 1) {
  fail("MCP URL missing");
}

const license = existsSync(join(root, "LICENSE")) ? read("LICENSE") : "";
if (!license.includes("Apache License") || !license.includes("Version 2.0")) fail("LICENSE is not Apache-2.0");
if (!license.includes("Copyright 2026 LSports Data Ltd.")) fail("LICENSE missing copyright");

function pngSize(path) {
  const buf = readFileSync(join(root, path));
  if (buf.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}
const logo = pngSize("assets/arena360-logo.png");
if (!logo) fail("assets/arena360-logo.png is not a PNG");
const social = pngSize("assets/social-preview.png");
if (social && (social.width !== 1280 || social.height !== 640)) {
  fail(`social-preview.png is ${social.width}x${social.height}, expected 1280x640`);
}

if (existsSync(join(root, "scripts/schemas/plugin.schema.json"))) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validatePlugin = ajv.compile(readJSON("scripts/schemas/plugin.schema.json"));
  const validateMarket = ajv.compile(readJSON("scripts/schemas/marketplace.schema.json"));
  if (cursorPlugin && !validatePlugin(cursorPlugin)) {
    for (const err of validatePlugin.errors) {
      fail(`cursor plugin.json ${err.instancePath || "/"} ${err.message}`);
    }
  }
  if (cursorMarket && !validateMarket(cursorMarket)) {
    for (const err of validateMarket.errors) {
      fail(`cursor marketplace.json ${err.instancePath || "/"} ${err.message}`);
    }
  }
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}
console.log("Validation passed.");
