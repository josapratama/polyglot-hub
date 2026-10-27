#!/usr/bin/env node

/**
 * Polyglot Hub - Build-Time i18n Sync Engine
 * Pulls translations from Polyglot Hub into local project directory before build time.
 * 
 * Usage:
 *   node bin/sync-i18n.js [projectSlug] [outputDir] [polyglotUrl]
 * 
 * Examples:
 *   node bin/sync-i18n.js uploadbox ./src/locales
 *   node bin/sync-i18n.js nexus-chat ./src/locales http://localhost:4000
 */

const fs = require('fs');
const path = require('path');

const PROJECT_SLUG = process.argv[2] || 'common';
const OUTPUT_DIR = path.resolve(process.cwd(), process.argv[3] || './src/locales');
const POLYGLOT_URL = process.argv[4] || process.env.POLYGLOT_HUB_URL || 'http://localhost:4000';

async function syncTranslations() {
  console.log(`\n======================================================`);
  console.log(`🌐 [Polyglot Hub] Build-Time Translation Sync`);
  console.log(`======================================================`);
  console.log(`📦 Project     : "${PROJECT_SLUG}"`);
  console.log(`📡 Server URL  : ${POLYGLOT_URL}`);
  console.log(`📁 Target Dir  : ${OUTPUT_DIR}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    const endpoint = `${POLYGLOT_URL}/api/v1/export/${PROJECT_SLUG}`;
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
    }

    const bundle = await res.json();
    const languages = Object.keys(bundle);

    if (languages.length === 0) {
      console.warn(`⚠️ Warning: No translations found for project "${PROJECT_SLUG}".`);
      return;
    }

    for (const [lang, dict] of Object.entries(bundle)) {
      const filePath = path.join(OUTPUT_DIR, `${lang}.json`);
      fs.writeFileSync(filePath, JSON.stringify(dict, null, 2), 'utf-8');
      const keyCount = Object.keys(dict).length;
      console.log(`  ✓ Synced ${lang}.json (${keyCount} keys)`);
    }

    console.log(`\n✨ Successfully synced ${languages.length} languages! Zero runtime lag.`);
    console.log(`======================================================\n`);
  } catch (err) {
    console.error(`❌ [Polyglot Hub] Sync failed:`, err.message);
    process.exit(1);
  }
}

syncTranslations();
