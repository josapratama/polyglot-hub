import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Language {
  code: string;
  name: string;
  isDefault?: boolean;
}

export interface TranslationItem {
  id: string;
  projectId: string;
  key: string;
  namespace?: string;
  context?: string;
  translations: Record<string, string>; // { "en": "Save", "id": "Simpan" }
  createdAt: string;
  updatedAt: string;
}

export interface PolyglotSchema {
  projects: Project[];
  languages: Language[];
  translations: TranslationItem[];
}

function getDatabaseFilePath(): string {
  if (process.env.POLYGLOT_DB_FILE) {
    return path.resolve(process.env.POLYGLOT_DB_FILE);
  }
  // 1. Direct sibling of dist/src: backend/data/polyglot-store.json
  const candidate1 = path.resolve(__dirname, "..", "data", "polyglot-store.json");
  if (fs.existsSync(candidate1)) return candidate1;

  // 2. process.cwd() / backend / data
  const candidate2 = path.resolve(process.cwd(), "backend", "data", "polyglot-store.json");
  if (fs.existsSync(candidate2)) return candidate2;

  // 3. process.cwd() / data
  const candidate3 = path.resolve(process.cwd(), "data", "polyglot-store.json");
  if (fs.existsSync(candidate3)) return candidate3;

  return candidate1;
}

const DB_FILE = getDatabaseFilePath();

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

const INITIAL_DATA: PolyglotSchema = {
  projects: [
    {
      id: "proj_common",
      name: "Common & Universal",
      slug: "common",
      description: "Shared verbs, buttons, statuses, and generic UI components across all apps",
      icon: "🌐",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "proj_uploadbox",
      name: "UploadBox CDN",
      slug: "uploadbox",
      description: "Cloud storage, media delivery, image transformations, and file manager",
      icon: "📦",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "proj_nexus",
      name: "Nexus Chat",
      slug: "nexus-chat",
      description: "Real-time communication, messaging rooms, and user presence",
      icon: "💬",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "proj_minihost",
      name: "Mini VPS Panel",
      slug: "minihost",
      description: "Server administration, container management, and resource monitoring",
      icon: "⚡",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  languages: [
    { code: "en", name: "English", isDefault: true },
    { code: "id", name: "Bahasa Indonesia", isDefault: false },
    { code: "ja", name: "Japanese", isDefault: false },
  ],
  translations: [
    // Common Actions
    {
      id: "t_com_1",
      projectId: "proj_common",
      key: "actions.save",
      namespace: "actions",
      translations: { en: "Save", id: "Simpan", ja: "保存" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "t_com_2",
      projectId: "proj_common",
      key: "actions.cancel",
      namespace: "actions",
      translations: { en: "Cancel", id: "Batal", ja: "キャンセル" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "t_com_3",
      projectId: "proj_common",
      key: "actions.delete",
      namespace: "actions",
      translations: { en: "Delete", id: "Hapus", ja: "削除" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "t_com_4",
      projectId: "proj_common",
      key: "actions.confirm",
      namespace: "actions",
      translations: { en: "Confirm", id: "Konfirmasi", ja: "確認" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "t_com_5",
      projectId: "proj_common",
      key: "auth.login",
      namespace: "auth",
      translations: { en: "Sign In", id: "Masuk", ja: "ログイン" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "t_com_6",
      projectId: "proj_common",
      key: "auth.register",
      namespace: "auth",
      translations: { en: "Create Account", id: "Buat Akun", ja: "アカウント作成" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "t_com_7",
      projectId: "proj_common",
      key: "status.loading",
      namespace: "status",
      translations: { en: "Loading...", id: "Memuat...", ja: "読み込み中..." },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // UploadBox Keys
    {
      id: "t_ub_1",
      projectId: "proj_uploadbox",
      key: "hero.title",
      namespace: "hero",
      translations: {
        en: "Modern File Infrastructure & Smart CDN Delivery",
        id: "Infrastruktur File Modern & Pengiriman CDN Cerdas",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "t_ub_2",
      projectId: "proj_uploadbox",
      key: "upload.drag_drop",
      namespace: "upload",
      translations: {
        en: "Drag & drop files here, or click to browse",
        id: "Tarik & lepas file di sini, atau klik untuk memilih",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "t_ub_3",
      projectId: "proj_uploadbox",
      key: "editor.title",
      namespace: "editor",
      translations: {
        en: "Image Studio Editor",
        id: "Studio Editor Gambar",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

class PolyglotDatabase {
  private data: PolyglotSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): PolyglotSchema {
    ensureDirectoryExistence(DB_FILE);
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
      return INITIAL_DATA;
    }
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    } catch {
      return INITIAL_DATA;
    }
  }

  public save(): void {
    ensureDirectoryExistence(DB_FILE);
    fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf-8");
  }

  public reload(): void {
    this.data = this.loadData();
  }

  // Projects
  public getProjects(): Project[] {
    this.reload();
    return this.data.projects;
  }

  public getProjectBySlug(slug: string): Project | undefined {
    this.reload();
    return this.data.projects.find((p) => p.slug === slug);
  }

  public getProjectById(id: string): Project | undefined {
    this.reload();
    return this.data.projects.find((p) => p.id === id);
  }

  public createProject(name: string, slug: string, description: string, icon?: string): Project {
    this.reload();
    const newProj: Project = {
      id: "proj_" + crypto.randomUUID().slice(0, 8),
      name,
      slug: slug.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
      description,
      icon: icon || "📁",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.projects.push(newProj);
    this.save();
    return newProj;
  }

  public deleteProject(id: string): boolean {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.data.projects.splice(idx, 1);
    this.data.translations = this.data.translations.filter((t) => t.projectId !== id);
    this.save();
    return true;
  }

  // Languages
  public getLanguages(): Language[] {
    this.reload();
    return this.data.languages;
  }

  public addLanguage(code: string, name: string): Language {
    this.reload();
    const existing = this.data.languages.find((l) => l.code === code);
    if (existing) return existing;
    const newLang: Language = { code: code.toLowerCase(), name };
    this.data.languages.push(newLang);
    this.save();
    return newLang;
  }

  // Translations
  public getTranslations(projectId?: string): TranslationItem[] {
    this.reload();
    if (projectId) {
      return this.data.translations.filter((t) => t.projectId === projectId);
    }
    return this.data.translations;
  }

  public setTranslation(
    projectId: string,
    key: string,
    translations: Record<string, string>,
    namespace?: string,
    context?: string
  ): TranslationItem {
    const existing = this.data.translations.find(
      (t) => t.projectId === projectId && t.key === key
    );

    if (existing) {
      existing.translations = { ...existing.translations, ...translations };
      if (namespace) existing.namespace = namespace;
      if (context) existing.context = context;
      existing.updatedAt = new Date().toISOString();
      this.save();
      return existing;
    }

    const newItem: TranslationItem = {
      id: "t_" + crypto.randomUUID().slice(0, 8),
      projectId,
      key,
      namespace: namespace || key.split(".")[0] || "general",
      context,
      translations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.translations.push(newItem);
    this.save();
    return newItem;
  }

  public deleteTranslation(id: string): boolean {
    const idx = this.data.translations.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.data.translations.splice(idx, 1);
    this.save();
    return true;
  }

  // Clean export for specific project and language
  public exportDictionary(projectSlug: string, langCode: string, includeCommon = true): Record<string, any> {
    const result: Record<string, any> = {};
    const project = this.getProjectBySlug(projectSlug);
    if (!project) return result;

    const items = this.data.translations.filter(
      (t) => t.projectId === project.id || (includeCommon && t.projectId === "proj_common")
    );

    for (const item of items) {
      const val = item.translations[langCode] || item.translations["en"] || "";
      this.setDeepValue(result, item.key, val);
    }

    return result;
  }

  // Flat key-value dictionary export
  public exportFlatDictionary(projectSlug: string, langCode: string, includeCommon = true): Record<string, string> {
    const result: Record<string, string> = {};
    const project = this.getProjectBySlug(projectSlug);
    if (!project) return result;

    const items = this.data.translations.filter(
      (t) => t.projectId === project.id || (includeCommon && t.projectId === "proj_common")
    );

    for (const item of items) {
      result[item.key] = item.translations[langCode] || item.translations["en"] || "";
    }

    return result;
  }

  private setDeepValue(obj: Record<string, any>, pathStr: string, value: string) {
    const parts = pathStr.split(".");
    let curr = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (!curr[p] || typeof curr[p] !== "object") {
        curr[p] = {};
      }
      curr = curr[p];
    }
    curr[parts[parts.length - 1]] = value;
  }
}

export const db = new PolyglotDatabase();
