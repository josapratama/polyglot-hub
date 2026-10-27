import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { db } from "./db.js";
import { autoTranslateText } from "./services/translator.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Serve built frontend if exists
const FRONTEND_DIST = path.resolve(process.cwd(), "../frontend/dist");
if (fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));
}

// ─── Health ──────────────────────────────────────────────────
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "Polyglot Hub Translation Engine",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ─── Projects ────────────────────────────────────────────────
app.get("/api/projects", (_req: Request, res: Response) => {
  const projects = db.getProjects();
  const languages = db.getLanguages();
  const allTranslations = db.getTranslations();

  // Compute completeness statistics
  const result = projects.map((proj) => {
    const projTranslations = allTranslations.filter(
      (t) => t.projectId === proj.id
    );
    const totalKeys = projTranslations.length;

    const completeness: Record<string, { count: number; percent: number }> = {};
    for (const lang of languages) {
      const translatedCount = projTranslations.filter(
        (t) => t.translations[lang.code] && t.translations[lang.code].trim().length > 0
      ).length;
      completeness[lang.code] = {
        count: translatedCount,
        percent: totalKeys > 0 ? Math.round((translatedCount / totalKeys) * 100) : 100,
      };
    }

    return {
      ...proj,
      totalKeys,
      completeness,
    };
  });

  res.json({ projects: result, languages });
});

app.post("/api/projects", (req: Request, res: Response) => {
  const { name, slug, description, icon } = req.body;
  if (!name || !slug) {
    return res.status(400).json({ error: "Name and slug are required" });
  }

  const existing = db.getProjectBySlug(slug);
  if (existing) {
    return res.status(409).json({ error: "Project slug already exists" });
  }

  const project = db.createProject(name, slug, description || "", icon);
  res.status(201).json({ project });
});

app.delete("/api/projects/:id", (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (id === "proj_common") {
    return res.status(403).json({ error: "Cannot delete default common project" });
  }
  const deleted = db.deleteProject(id);
  if (!deleted) return res.status(404).json({ error: "Project not found" });
  res.json({ success: true, message: "Project and keys deleted" });
});

// ─── Languages ───────────────────────────────────────────────
app.get("/api/languages", (_req: Request, res: Response) => {
  res.json({ languages: db.getLanguages() });
});

app.post("/api/languages", (req: Request, res: Response) => {
  const { code, name } = req.body;
  if (!code || !name) {
    return res.status(400).json({ error: "Language code and name are required" });
  }
  const lang = db.addLanguage(code, name);
  res.status(201).json({ language: lang });
});

// ─── Translations ────────────────────────────────────────────
app.get("/api/translations/:projectIdOrSlug", (req: Request, res: Response) => {
  const projectIdOrSlug = String(req.params.projectIdOrSlug);
  const project =
    db.getProjectById(projectIdOrSlug) || db.getProjectBySlug(projectIdOrSlug);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  const translations = db.getTranslations(project.id);
  res.json({ project, translations, languages: db.getLanguages() });
});

app.post("/api/translations", (req: Request, res: Response) => {
  const { projectId, key, translations, namespace, context } = req.body;
  if (!projectId || !key || !translations) {
    return res.status(400).json({ error: "projectId, key, and translations are required" });
  }

  const item = db.setTranslation(projectId, key, translations, namespace, context);
  res.json({ translation: item });
});

app.delete("/api/translations/:id", (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = db.deleteTranslation(id);
  if (!deleted) return res.status(404).json({ error: "Translation not found" });
  res.json({ success: true });
});

// ─── Auto Translation ────────────────────────────────────────
app.post("/api/translations/auto-translate", async (req: Request, res: Response) => {
  const { text, fromLang = "en", toLang } = req.body;
  if (!text || !toLang) {
    return res.status(400).json({ error: "Text and toLang are required" });
  }

  try {
    const translated = await autoTranslateText(text, fromLang, toLang);
    res.json({ original: text, translated, fromLang, toLang });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Auto-translation failed" });
  }
});

// ─── Bulk JSON Import (Flattens nested JSON e.g. { auth: { login: "..." } }) ──
app.post("/api/translations/import", (req: Request, res: Response) => {
  const { projectId, langCode, data } = req.body;
  if (!projectId || !langCode || !data || typeof data !== "object") {
    return res.status(400).json({ error: "projectId, langCode, and json data object required" });
  }

  const project = db.getProjectById(projectId) || db.getProjectBySlug(projectId);
  if (!project) return res.status(404).json({ error: "Project not found" });

  // Flatten nested dictionary
  const flat: Record<string, string> = {};
  function flatten(obj: Record<string, any>, prefix = "") {
    for (const [k, v] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${k}` : k;
      if (v !== null && typeof v === "object" && !Array.isArray(v)) {
        flatten(v, fullKey);
      } else {
        flat[fullKey] = String(v);
      }
    }
  }
  flatten(data);

  let importedCount = 0;
  for (const [key, value] of Object.entries(flat)) {
    db.setTranslation(project.id, key, { [langCode]: value });
    importedCount++;
  }

  res.json({
    success: true,
    importedKeys: importedCount,
    projectId: project.id,
    language: langCode,
  });
});

// ─── Clean Export & Distribution API (The Google Build-Time Approach) ──
app.get("/api/v1/export/:projectSlug/:lang", (req: Request, res: Response) => {
  const projectSlug = String(req.params.projectSlug);
  const lang = String(req.params.lang);
  const includeCommon = req.query.common !== "false";
  const format = req.query.format || "nested"; // "nested" or "flat"

  const dict =
    format === "flat"
      ? db.exportFlatDictionary(projectSlug, lang, includeCommon)
      : db.exportDictionary(projectSlug, lang, includeCommon);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=60"); // 1 min cache for build scripts
  res.send(JSON.stringify(dict, null, 2));
});

// Export all languages bundle for a project
app.get("/api/v1/export/:projectSlug", (req: Request, res: Response) => {
  const projectSlug = String(req.params.projectSlug);
  const includeCommon = req.query.common !== "false";
  const languages = db.getLanguages();

  const bundle: Record<string, any> = {};
  for (const lang of languages) {
    bundle[lang.code] = db.exportDictionary(projectSlug, lang.code, includeCommon);
  }

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(bundle, null, 2));
});

// ─── CLI Sync Script Generator ───────────────────────────────
app.get("/api/v1/sync-script", (req: Request, res: Response) => {
  const host = `${req.protocol}://${req.get("host")}`;
  const scriptContent = `/**
 * Polyglot Hub - Build-Time i18n Sync Engine (Google Enterprise Architecture)
 * Run this before "npm run build" to pull latest translations with zero client runtime lag!
 * 
 * Usage:
 *   node sync-i18n.js [projectSlug] [outputDir]
 * 
 * Example:
 *   node sync-i18n.js uploadbox ./src/locales
 */

const fs = require('fs');
const path = require('path');

const POLYGLOT_URL = process.env.POLYGLOT_HUB_URL || '${host}';
const PROJECT_SLUG = process.argv[2] || 'common';
const OUTPUT_DIR = path.resolve(process.cwd(), process.argv[3] || './src/locales');

async function syncTranslations() {
  console.log(\`🌐 [Polyglot Hub] Syncing translations for project: "\${PROJECT_SLUG}"...\`);
  console.log(\`📡 Source: \${POLYGLOT_URL}\`);
  console.log(\`📁 Target: \${OUTPUT_DIR}\`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    const res = await fetch(\`\${POLYGLOT_URL}/api/v1/export/\${PROJECT_SLUG}\`);
    if (!res.ok) {
      throw new Error(\`Failed to fetch translations: HTTP \${res.status} \${res.statusText}\`);
    }

    const bundle = await res.json();
    for (const [lang, dict] of Object.entries(bundle)) {
      const filePath = path.join(OUTPUT_DIR, \`\${lang}.json\`);
      fs.writeFileSync(filePath, JSON.stringify(dict, null, 2), 'utf-8');
      const keyCount = Object.keys(dict).length;
      console.log(\`  ✓ Saved \${lang}.json (\${keyCount} keys)\`);
    }

    console.log(\`✨ [Polyglot Hub] All languages synced successfully! Ready for build.\`);
  } catch (err) {
    console.error(\`❌ [Polyglot Hub] Sync failed:\`, err.message);
    process.exit(1);
  }
}

syncTranslations();
`;

  res.setHeader("Content-Type", "application/javascript");
  res.send(scriptContent);
});

// SPA catch-all fallback
if (fs.existsSync(FRONTEND_DIST)) {
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(FRONTEND_DIST, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 [Polyglot Hub] Translation engine running on http://localhost:${PORT}`);
});
