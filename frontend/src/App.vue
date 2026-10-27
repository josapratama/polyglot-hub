<template>
  <div class="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
    <!-- Ambient Background Glow Gradients -->
    <div class="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none"></div>
    <div class="fixed top-1/3 -right-40 w-96 h-96 rounded-full bg-violet-600/15 blur-[140px] pointer-events-none"></div>

    <!-- Top Navigation Header -->
    <header class="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090d16]/85 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      <!-- Brand Logo -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-lg font-extrabold tracking-tight text-white">Polyglot<span class="text-indigo-400">Hub</span></h1>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Enterprise TMS
            </span>
          </div>
          <p class="text-[11px] text-slate-400">Build-Time Translation Engine for All Projects</p>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Target Language Switcher -->
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
          <span class="text-slate-400">Target:</span>
          <select
            v-model="activeTargetLang"
            class="bg-transparent font-bold text-indigo-400 focus:outline-none cursor-pointer"
          >
            <option v-for="l in languages" :key="l.code" :value="l.code" class="bg-slate-900 text-white">
              {{ l.name }} ({{ l.code.toUpperCase() }})
            </option>
          </select>
          <button
            @click="showAddLangModal = true"
            class="text-slate-400 hover:text-white ml-1 font-bold"
            title="Add new language"
          >
            +
          </button>
        </div>

        <!-- CLI Sync Help -->
        <button
          @click="showCliModal = true"
          class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors"
        >
          <svg class="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <span>CLI Build Sync</span>
        </button>

        <!-- Import / Export Menu -->
        <button
          @click="showImportModal = true"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors"
        >
          <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span class="hidden sm:inline">Import JSON</span>
        </button>

        <!-- Add Key CTA -->
        <button
          @click="showAddKeyModal = true"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all transform active:scale-95"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Key</span>
        </button>
      </div>
    </header>

    <!-- Main Workspace -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <!-- Project Selector Ribbon -->
      <div class="flex items-center justify-between gap-4 overflow-x-auto pb-2">
        <div class="flex items-center gap-2.5">
          <button
            v-for="p in projects"
            :key="p.id"
            @click="selectProject(p)"
            class="px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 shrink-0"
            :class="
              selectedProject?.id === p.id
                ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                : 'glass-card border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            "
          >
            <span class="text-base">{{ p.icon || '📁' }}</span>
            <span>{{ p.name }}</span>
            <span
              v-if="p.completeness && p.completeness[activeTargetLang]"
              class="px-2 py-0.5 rounded-full text-[10px] font-bold"
              :class="
                p.completeness[activeTargetLang].percent === 100
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/20 text-amber-400'
              "
            >
              {{ p.completeness[activeTargetLang].percent }}%
            </span>
          </button>

          <!-- New Project Button -->
          <button
            @click="showNewProjModal = true"
            class="px-3.5 py-2.5 rounded-2xl border border-dashed border-slate-700 hover:border-indigo-500 hover:text-indigo-400 text-slate-400 text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>+ New Project</span>
          </button>
        </div>

        <!-- Clean Export Direct Button -->
        <div class="shrink-0">
          <button
            @click="downloadProjectJson"
            class="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5"
            title="Download clean JSON for this project"
          >
            <svg class="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export ({{ activeTargetLang.toUpperCase() }})</span>
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Search Input -->
        <div class="relative w-full sm:w-80">
          <svg class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search key or text..."
            class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700/80 bg-slate-900 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <!-- Filter Missing Only Toggle -->
          <label class="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300 select-none">
            <input
              type="checkbox"
              v-model="filterMissingOnly"
              class="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-500/20 border-slate-700 bg-slate-800"
            />
            <span>Show Missing Only ({{ missingCount }})</span>
          </label>

          <!-- Auto-Translate All Missing Button -->
          <button
            v-if="missingCount > 0"
            @click="autoTranslateAllMissing"
            :disabled="autoTranslatingAll"
            class="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span v-if="autoTranslatingAll" class="w-3 h-3 border-2 border-amber-400/20 border-t-amber-400 rounded-full animate-spin"></span>
            <span>✨ Auto-Translate All Missing ({{ missingCount }})</span>
          </button>
        </div>
      </div>

      <!-- Translation Keys Table / Grid -->
      <div class="glass-card rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th class="py-3.5 px-4 sm:px-6 w-1/3">Key & Namespace</th>
                <th class="py-3.5 px-4 w-1/3">English (Source)</th>
                <th class="py-3.5 px-4 w-1/3">
                  {{ getLangName(activeTargetLang) }} (Target)
                </th>
                <th class="py-3.5 px-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-xs sm:text-sm">
              <tr
                v-for="item in filteredTranslations"
                :key="item.id"
                class="hover:bg-slate-800/40 transition-colors group"
              >
                <!-- Key Column -->
                <td class="py-4 px-4 sm:px-6 align-top">
                  <div class="flex items-center gap-2">
                    <code class="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                      {{ item.key }}
                    </code>
                    <button
                      @click="copyKey(item.key)"
                      class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity"
                      title="Copy Key"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                  <span v-if="item.namespace" class="text-[10px] text-slate-500 block mt-1 font-mono">
                    ns: {{ item.namespace }}
                  </span>
                </td>

                <!-- English Source -->
                <td class="py-4 px-4 align-top text-slate-300">
                  {{ item.translations['en'] || '—' }}
                </td>

                <!-- Target Language Editable -->
                <td class="py-4 px-4 align-top">
                  <div class="relative">
                    <textarea
                      v-model="item.translations[activeTargetLang]"
                      @blur="updateTranslationItem(item)"
                      rows="2"
                      placeholder="Click to type translation..."
                      class="w-full px-3 py-2 rounded-xl border border-slate-700/60 bg-slate-900/80 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-y"
                    ></textarea>

                    <!-- Auto-translate button badge -->
                    <button
                      v-if="!item.translations[activeTargetLang] && item.translations['en']"
                      @click="autoTranslateSingle(item)"
                      class="absolute right-2 bottom-3 px-2 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-[10px] font-bold transition-colors flex items-center gap-1"
                    >
                      <span>✨ Auto</span>
                    </button>
                  </div>
                </td>

                <!-- Actions -->
                <td class="py-4 px-4 text-right align-top">
                  <button
                    @click="deleteTranslationKey(item.id)"
                    class="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete key"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3,6 5,6 21,6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="filteredTranslations.length === 0">
                <td colspan="4" class="py-16 text-center text-slate-400">
                  <svg class="w-12 h-12 mx-auto text-slate-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                  <p class="font-bold text-slate-300">No translation keys match your filter</p>
                  <p class="text-xs text-slate-500 mt-1">Add a key or import a JSON dictionary to begin.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modals -->

    <!-- Add Translation Key Modal -->
    <div v-if="showAddKeyModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showAddKeyModal = false"></div>
      <div class="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl z-10 space-y-4">
        <h3 class="text-base font-bold text-white">Add Translation Key</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Key Name (dot notation)</label>
            <input
              v-model="newKeyForm.key"
              type="text"
              placeholder="e.g. actions.download, hero.subtitle"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">English Text</label>
            <textarea
              v-model="newKeyForm.en"
              rows="2"
              placeholder="Source english text..."
              class="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">
              {{ getLangName(activeTargetLang) }} Translation (Optional)
            </label>
            <textarea
              v-model="newKeyForm.target"
              rows="2"
              placeholder="Translated text (or leave blank to auto-translate)..."
              class="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="showAddKeyModal = false"
            class="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            @click="submitCreateKey"
            class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25"
          >
            Create Key
          </button>
        </div>
      </div>
    </div>

    <!-- CLI Build Sync Guidance Modal -->
    <div v-if="showCliModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCliModal = false"></div>
      <div class="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl z-10 space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Google-Style Build-Time Translation Sync</h3>
              <p class="text-xs text-slate-400">Zero client latency: Sync JSON directly before building</p>
            </div>
          </div>
          <button @click="showCliModal = false" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <div class="space-y-4 text-xs text-slate-300">
          <p>
            In your project (e.g. <code>uploadbox-main/frontend</code> or <code>nexus-chat</code>), run this single command to pull the latest translations into your <code>src/locales/</code> folder before building:
          </p>

          <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-emerald-400 flex items-center justify-between gap-3">
            <code class="break-all">{{ cliSyncCommand }}</code>
            <button
              @click="copyCliCommand"
              class="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold shrink-0"
            >
              Copy
            </button>
          </div>

          <p class="text-slate-400">
            Or add it to your project's <code>package.json</code>:
          </p>

          <pre class="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-slate-300 overflow-x-auto"><code>"scripts": {
  "prebuild": "node ./bin/sync-i18n.js {{ selectedProject?.slug || 'uploadbox' }} ./src/locales",
  "build": "vite build"
}</code></pre>
        </div>
      </div>
    </div>

    <!-- Import JSON Modal -->
    <div v-if="showImportModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showImportModal = false"></div>
      <div class="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl z-10 space-y-4">
        <h3 class="text-base font-bold text-white">Import Existing JSON Dictionary</h3>
        <p class="text-xs text-slate-400">Paste your existing <code>id.json</code> or <code>en.json</code> content below:</p>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1">Language of Imported Content</label>
          <select
            v-model="importLangCode"
            class="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-semibold"
          >
            <option v-for="l in languages" :key="l.code" :value="l.code">
              {{ l.name }} ({{ l.code }})
            </option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1">JSON Content</label>
          <textarea
            v-model="importJsonText"
            rows="8"
            placeholder='{ "auth": { "login": "Masuk", "register": "Daftar" } }'
            class="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button @click="showImportModal = false" class="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold">
            Cancel
          </button>
          <button
            @click="submitImportJson"
            class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
          >
            Import Into {{ selectedProject?.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add Project Modal -->
    <div v-if="showNewProjModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showNewProjModal = false"></div>
      <div class="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl z-10 space-y-4">
        <h3 class="text-base font-bold text-white">Create Project</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Project Name</label>
            <input
              v-model="newProjForm.name"
              type="text"
              placeholder="e.g. WA Bridge, Portfolio Web"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Slug (identifier)</label>
            <input
              v-model="newProjForm.slug"
              type="text"
              placeholder="e.g. wabridge, portfolio"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Icon / Emoji</label>
            <input
              v-model="newProjForm.icon"
              type="text"
              placeholder="e.g. 📱, 📊, 🚀"
              class="w-20 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-center text-sm"
            />
          </div>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button @click="showNewProjModal = false" class="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold">
            Cancel
          </button>
          <button @click="submitCreateProject" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold">
            Create Project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const API_BASE = "/api";

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  totalKeys?: number;
  completeness?: Record<string, { count: number; percent: number }>;
}

interface Language {
  code: string;
  name: string;
  isDefault?: boolean;
}

interface TranslationItem {
  id: string;
  projectId: string;
  key: string;
  namespace?: string;
  translations: Record<string, string>;
}

const projects = ref<Project[]>([]);
const languages = ref<Language[]>([
  { code: "en", name: "English" },
  { code: "id", name: "Bahasa Indonesia" },
]);
const selectedProject = ref<Project | null>(null);
const translations = ref<TranslationItem[]>([]);
const activeTargetLang = ref("id");

const searchQuery = ref("");
const filterMissingOnly = ref(false);
const autoTranslatingAll = ref(false);

// Modals
const showAddKeyModal = ref(false);
const showCliModal = ref(false);
const showImportModal = ref(false);
const showNewProjModal = ref(false);
const showAddLangModal = ref(false);

const newKeyForm = ref({ key: "", en: "", target: "" });
const newProjForm = ref({ name: "", slug: "", icon: "📁" });
const importLangCode = ref("id");
const importJsonText = ref("");

onMounted(async () => {
  await fetchProjects();
  if (projects.value.length > 0) {
    selectProject(projects.value[0]);
  }
});

async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await res.json();
    projects.value = data.projects || [];
    languages.value = data.languages || [];
  } catch (err) {
    console.error("Failed to load projects", err);
  }
}

async function selectProject(p: Project) {
  selectedProject.value = p;
  await fetchTranslations(p.id);
}

async function fetchTranslations(projectId: string) {
  try {
    const res = await fetch(`${API_BASE}/translations/${projectId}`);
    const data = await res.json();
    translations.value = data.translations || [];
  } catch (err) {
    console.error("Failed to load translations", err);
  }
}

const filteredTranslations = computed(() => {
  let list = translations.value;

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (item) =>
        item.key.toLowerCase().includes(q) ||
        (item.translations["en"] && item.translations["en"].toLowerCase().includes(q)) ||
        (item.translations[activeTargetLang.value] &&
          item.translations[activeTargetLang.value].toLowerCase().includes(q))
    );
  }

  if (filterMissingOnly.value) {
    list = list.filter(
      (item) =>
        !item.translations[activeTargetLang.value] ||
        item.translations[activeTargetLang.value].trim() === ""
    );
  }

  return list;
});

const missingCount = computed(() => {
  return translations.value.filter(
    (item) =>
      !item.translations[activeTargetLang.value] ||
      item.translations[activeTargetLang.value].trim() === ""
  ).length;
});

function getLangName(code: string): string {
  const l = languages.value.find((x) => x.code === code);
  return l ? l.name : code.toUpperCase();
}

async function updateTranslationItem(item: TranslationItem) {
  try {
    await fetch(`${API_BASE}/translations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: item.projectId,
        key: item.key,
        translations: item.translations,
        namespace: item.namespace,
      }),
    });
    await fetchProjects(); // refresh completeness
  } catch (err) {
    console.error("Failed to update translation", err);
  }
}

async function autoTranslateSingle(item: TranslationItem) {
  const sourceText = item.translations["en"];
  if (!sourceText) return;

  try {
    const res = await fetch(`${API_BASE}/translations/auto-translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: sourceText,
        fromLang: "en",
        toLang: activeTargetLang.value,
      }),
    });
    const data = await res.json();
    if (data.translated) {
      item.translations[activeTargetLang.value] = data.translated;
      await updateTranslationItem(item);
    }
  } catch (err) {
    console.error("Auto-translation failed", err);
  }
}

async function autoTranslateAllMissing() {
  autoTranslatingAll.value = true;
  const missingItems = translations.value.filter(
    (item) =>
      !item.translations[activeTargetLang.value] ||
      item.translations[activeTargetLang.value].trim() === ""
  );

  for (const item of missingItems) {
    await autoTranslateSingle(item);
  }
  autoTranslatingAll.value = false;
}

async function submitCreateKey() {
  if (!newKeyForm.value.key || !selectedProject.value) return;

  const t: Record<string, string> = { en: newKeyForm.value.en };
  if (newKeyForm.value.target) {
    t[activeTargetLang.value] = newKeyForm.value.target;
  }

  try {
    await fetch(`${API_BASE}/translations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: selectedProject.value.id,
        key: newKeyForm.value.key,
        translations: t,
      }),
    });

    showAddKeyModal.value = false;
    newKeyForm.value = { key: "", en: "", target: "" };
    await fetchTranslations(selectedProject.value.id);
    await fetchProjects();
  } catch (err) {
    console.error("Failed to create key", err);
  }
}

async function deleteTranslationKey(id: string) {
  if (!confirm("Are you sure you want to delete this translation key?")) return;
  try {
    await fetch(`${API_BASE}/translations/${id}`, { method: "DELETE" });
    if (selectedProject.value) {
      await fetchTranslations(selectedProject.value.id);
      await fetchProjects();
    }
  } catch (err) {
    console.error("Failed to delete key", err);
  }
}

async function submitCreateProject() {
  if (!newProjForm.value.name || !newProjForm.value.slug) return;
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProjForm.value),
    });
    const data = await res.json();
    showNewProjModal.value = false;
    newProjForm.value = { name: "", slug: "", icon: "📁" };
    await fetchProjects();
    if (data.project) {
      selectProject(data.project);
    }
  } catch (err) {
    console.error("Failed to create project", err);
  }
}

async function submitImportJson() {
  if (!importJsonText.value || !selectedProject.value) return;
  try {
    const parsed = JSON.parse(importJsonText.value);
    await fetch(`${API_BASE}/translations/import`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: selectedProject.value.id,
        langCode: importLangCode.value,
        data: parsed,
      }),
    });

    showImportModal.value = false;
    importJsonText.value = "";
    await fetchTranslations(selectedProject.value.id);
    await fetchProjects();
    alert("Dictionary successfully imported!");
  } catch {
    alert("Invalid JSON format. Please check your syntax.");
  }
}

function downloadProjectJson() {
  if (!selectedProject.value) return;
  window.open(
    `${API_BASE}/v1/export/${selectedProject.value.slug}/${activeTargetLang.value}`,
    "_blank"
  );
}

function copyKey(key: string) {
  navigator.clipboard.writeText(key);
}

const cliSyncCommand = computed(() => {
  const slug = selectedProject.value?.slug || "uploadbox";
  return `node ./bin/sync-i18n.js ${slug} ./src/locales`;
});

function copyCliCommand() {
  navigator.clipboard.writeText(cliSyncCommand.value);
  alert("Command copied to clipboard!");
}
</script>
