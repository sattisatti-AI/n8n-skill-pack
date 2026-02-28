#!/usr/bin/env node
/**
 * n8n workflow JSON validator (pragmatic, not a full schema validator).
 */
const fs = require("fs");
const path = require("path");

const REQUIRED_TOP = ["name", "nodes", "connections", "active", "settings", "versionId"];
const REQUIRED_NODE = ["id", "name", "type", "typeVersion", "position", "parameters"];

const SECRET_PATTERNS = [
  /sk-[A-Za-z0-9]{20,}/g,
  /AIza[0-9A-Za-z\-_]{30,}/g,
  /xox[baprs]-[0-9A-Za-z-]{10,}/g,
  /-----BEGIN (?:RSA|EC|OPENSSH) PRIVATE KEY-----/g,
  /(?<![A-Za-z])Bearer\s+[A-Za-z0-9\.\-_]{15,}/g,
  /"apiKey"\s*:\s*".+?"/gi,
  /"token"\s*:\s*".+?"/gi,
  /"password"\s*:\s*".+?"/gi,
];

function readJson(file) {
  const raw = fs.readFileSync(file, "utf8");
  try { return { ok: true, data: JSON.parse(raw), raw }; }
  catch (e) { return { ok: false, error: e.message, raw }; }
}

function isDir(p) { try { return fs.statSync(p).isDirectory(); } catch { return false; } }

function listJsonFiles(p) {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (entry.toLowerCase().endsWith(".json")) out.push(full);
    }
  };
  walk(p);
  return out;
}

function hasTriggerNode(nodes) {
  return nodes.some(n => {
    const t = String(n.type || "").toLowerCase();
    return t.includes("trigger") || t.includes("webhook") || t.includes("schedule") || t.includes("manualtrigger") || t.includes("errortrigger");
  });
}

function isErrorWorkflow(nodes) {
  return nodes.some(n => String(n.type || "").toLowerCase().includes("errortrigger"));
}

function flattenConnections(connections) {
  const targets = [];
  if (!connections || typeof connections !== "object") return targets;
  for (const [srcName, outputs] of Object.entries(connections)) {
    if (!outputs || typeof outputs !== "object") continue;
    for (const chanArr of Object.values(outputs)) {
      if (!Array.isArray(chanArr)) continue;
      for (const list of chanArr) {
        if (!Array.isArray(list)) continue;
        for (const item of list) {
          if (item && typeof item === "object" && typeof item.node === "string") {
            targets.push({ srcName, target: item.node });
          }
        }
      }
    }
  }
  return targets;
}

function validateWorkflow(obj, raw, fileLabel) {
  const errors = [];
  const warnings = [];

  for (const key of REQUIRED_TOP) if (!(key in obj)) errors.push(`Missing top-level key: ${key}`);
  if (!Array.isArray(obj.nodes) || obj.nodes.length === 0) errors.push("nodes must be a non-empty array");
  if (typeof obj.connections !== "object") errors.push("connections must be an object");
  if (typeof obj.settings !== "object") errors.push("settings must be an object");

  for (const re of SECRET_PATTERNS) if (re.test(raw)) warnings.push(`Possible secret detected by pattern: ${re}`);

  const ids = new Set(), names = new Set(), nodeNames = new Set();
  if (Array.isArray(obj.nodes)) {
    for (const [i, n] of obj.nodes.entries()) {
      if (!n || typeof n !== "object") { errors.push(`Node[${i}] is not an object`); continue; }
      for (const k of REQUIRED_NODE) if (!(k in n)) errors.push(`Node "${n.name || `#${i}`}" missing: ${k}`);
      if (typeof n.id === "string") { if (ids.has(n.id)) errors.push(`Duplicate node id: ${n.id}`); ids.add(n.id); }
      if (typeof n.name === "string") { if (names.has(n.name)) errors.push(`Duplicate node name: ${n.name}`); names.add(n.name); nodeNames.add(n.name); }
      if (n.position && (!Array.isArray(n.position) || n.position.length !== 2)) errors.push(`Node "${n.name}" position must be [x,y]`);
    }
  }

  if (Array.isArray(obj.nodes)) {
    const trigger = hasTriggerNode(obj.nodes);
    if (!trigger) errors.push("No trigger-like node found (workflow needs a start trigger)");
    if (isErrorWorkflow(obj.nodes)) {
      const hasErr = obj.nodes.some(n => String(n.type || "").toLowerCase().includes("errortrigger"));
      if (!hasErr) errors.push("Error workflow must include Error Trigger node");
    }
  }

  for (const r of flattenConnections(obj.connections)) {
    if (!nodeNames.has(r.target)) errors.push(`Connection references missing target node name: "${r.target}" (from "${r.srcName}")`);
  }

  if (obj.active === true) warnings.push("Workflow active:true (consider defaulting to false for safety)");

  const ok = errors.length === 0;
  console.log(`\n[${ok ? "OK" : "FAIL"}] ${fileLabel}`);
  for (const e of errors) console.log(`  ERROR: ${e}`);
  for (const w of warnings) console.log(`  WARN:  ${w}`);
  return ok;
}

function main() {
  const target = process.argv[2];
  if (!target) { console.error("Usage: node scripts/validate_workflow_json.js <workflow.json | folder>"); process.exit(2); }
  const abs = path.resolve(process.cwd(), target);
  const files = isDir(abs) ? listJsonFiles(abs) : [abs];
  if (files.length === 0) { console.error("No .json files found."); process.exit(2); }

  let allOk = true;
  for (const f of files) {
    if (!fs.existsSync(f)) { console.error(`Missing file: ${f}`); allOk = false; continue; }
    const { ok, data, error, raw } = readJson(f);
    if (!ok) { console.log(`\n[FAIL] ${f}\n  ERROR: JSON parse error: ${error}`); allOk = false; continue; }
    if (!validateWorkflow(data, raw, f)) allOk = false;
  }
  process.exit(allOk ? 0 : 1);
}
main();
