import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { db } from "./db.js";

async function main() {
  console.log("🚀 [Polyglot Hub] Starting Master Workspace Key Ingest & Migration...\n");

  // 1. Ensure all 9 Workspace Projects exist in database
  const projectsMeta = [
    { slug: "common", name: "Common & Universal", desc: "Shared actions, auth, dialogs, validation, nav, and common widgets", icon: "🌐" },
    { slug: "minihost", name: "Mini VPS Panel", desc: "Container orchestrator, edge cluster, metrics, domains, SSL, terminal", icon: "⚡" },
    { slug: "uploadbox", name: "UploadBox CDN", desc: "Edge storage vault, dropzone, analytics, media delivery, image studio", icon: "📦" },
    { slug: "nexus-chat", name: "Nexus Chat", desc: "Real-time channels, DM, AI assistant, vector docs, prompt library", icon: "💬" },
    { slug: "wabridge", name: "WA Bridge Gateway", desc: "WhatsApp API bridge, QR scan, broadcast campaigns, auto-reply bot", icon: "📱" },
    { slug: "arsip-digital", name: "Arsip Digital", desc: "Document indexation, mail tracking, disposition, OCR, retention", icon: "📑" },
    { slug: "portfolio", name: "Portfolio Web", desc: "Personal showcase, skills, experience, project showcase, contact", icon: "🚀" },
    { slug: "uml-flow", name: "UML Flow Studio", desc: "Interactive architecture diagramming and vector modeling canvas", icon: "📐" },
    { slug: "irma-iryani", name: "Irma Iryani Web", desc: "Creative brand consulting, consultation booking, thought leadership", icon: "✨" },
  ];

  for (const p of projectsMeta) {
    if (!db.getProjectBySlug(p.slug)) {
      db.createProject(p.name, p.slug, p.desc, p.icon);
      console.log(`  + Created project: ${p.name} (${p.slug})`);
    }
  }

  const projCommon = db.getProjectBySlug("common")!;
  const projMinihost = db.getProjectBySlug("minihost")!;
  const projUploadbox = db.getProjectBySlug("uploadbox")!;
  const projNexus = db.getProjectBySlug("nexus-chat")!;
  const projWabridge = db.getProjectBySlug("wabridge")!;
  const projArsip = db.getProjectBySlug("arsip-digital")!;
  const projPortfolio = db.getProjectBySlug("portfolio")!;
  const projUml = db.getProjectBySlug("uml-flow")!;
  const projIrma = db.getProjectBySlug("irma-iryani")!;

  let totalSeeded = 0;

  // Helper to register translation item
  function registerKey(projectId: string, key: string, en: string, id: string, ja?: string, namespace?: string) {
    const ns = namespace || key.split(".")[0] || "general";
    const translations: Record<string, string> = { en, id };
    if (ja) translations.ja = ja;
    db.setTranslation(projectId, key, translations, ns);
    totalSeeded++;
  }

  // ─────────────────────────────────────────────────────────────
  // PART 1: Ingest Minihost (1,634 real production keys)
  // Shared keys (nav, common, auth) go to `common` so all projects inherit!
  // App-specific keys (dashboard, data, services, admin) go to `minihost`
  // ─────────────────────────────────────────────────────────────
  console.log("📦 Ingesting keys from Minihost production i18n...");
  const minihostDir = "D:/coding/raspberry pi/apps/frontend/src/lib/i18n";
  const minihostFiles = ["nav", "common", "auth", "dashboard", "data", "services", "admin"];

  for (const f of minihostFiles) {
    const fullPath = path.join(minihostDir, f + ".ts");
    if (!fs.existsSync(fullPath)) continue;

    const fileUrl = pathToFileURL(fullPath).href;
    const mod = await import(fileUrl);
    const obj = mod[f];
    const idMap: Record<string, string> = obj.id || {};
    const enMap: Record<string, string> = obj.en || {};

    const allKeys = new Set([...Object.keys(idMap), ...Object.keys(enMap)]);
    let fileCount = 0;

    for (const key of allKeys) {
      const idVal = idMap[key] || enMap[key] || key;
      const enVal = enMap[key] || idMap[key] || key;

      // Determine destination project:
      // Global shared verbs belong in "common" so every app in the workspace gets them
      let targetProjId = projMinihost.id;
      if (f === "common" || f === "nav" || f === "auth") {
        targetProjId = projCommon.id;
      }

      registerKey(targetProjId, key, enVal, idVal, undefined, f);
      fileCount++;
    }

    console.log(`  ✓ Ingested ${fileCount} keys from ${f}.ts (target: ${f === "common" || f === "nav" || f === "auth" ? "common" : "minihost"})`);
  }

  // ─────────────────────────────────────────────────────────────
  // PART 2: Ingest Arsip Digital (105 production keys)
  // ─────────────────────────────────────────────────────────────
  console.log("\n📑 Ingesting keys from Arsip Digital i18n.js...");
  const arsipI18nPath = "D:/coding/raspberry pi/project/arsip_digital/resources/js/i18n.js";
  if (fs.existsSync(arsipI18nPath)) {
    const fileContent = fs.readFileSync(arsipI18nPath, "utf-8");
    const match = fileContent.match(/const messages = (\{[\s\S]*?\});\s*\n\s*\/\/ t\(\)/);
    if (match) {
      const fn = new Function(`return ${match[1]}`);
      const messages = fn();

      function flatten(obj: any, prefix = ""): Record<string, string> {
        const res: Record<string, string> = {};
        for (const k in obj) {
          const key = prefix ? `${prefix}.${k}` : k;
          if (typeof obj[k] === "object" && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(res, flatten(obj[k], key));
          } else if (typeof obj[k] === "string") {
            res[key] = obj[k];
          }
        }
        return res;
      }

      const idFlat = flatten(messages.id || {});
      const enFlat = flatten(messages.en || {});
      const arsipKeys = new Set([...Object.keys(idFlat), ...Object.keys(enFlat)]);
      let arsipCount = 0;

      for (const key of arsipKeys) {
        const idVal = idFlat[key] || enFlat[key] || key;
        const enVal = enFlat[key] || idFlat[key] || key;
        registerKey(projArsip.id, key, enVal, idVal);
        arsipCount++;
      }
      console.log(`  ✓ Ingested ${arsipCount} keys from Arsip Digital`);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // PART 3: Ingest UploadBox (All 13 Views & Components)
  // ─────────────────────────────────────────────────────────────
  console.log("\n📦 Ingesting comprehensive keys for UploadBox...");
  const uploadboxKeys: Array<{ key: string; en: string; id: string; ja?: string; ns?: string }> = [
    // Landing & Brand
    { key: "landing.hero_badge", en: "v2.0 CDN Active", id: "v2.0 CDN Aktif", ja: "v2.0 CDN稼働中" },
    { key: "landing.hero_title", en: "Modern File Infrastructure & Smart CDN Delivery", id: "Infrastruktur File Modern & Pengiriman CDN Cerdas", ja: "モダンなファイル基盤とスマートCDN配信" },
    { key: "landing.hero_desc", en: "Upload, transform, and deliver assets globally in sub-milliseconds with built-in image studio and edge caching.", id: "Unggah, transformasi, dan kirim aset secara global dalam sub-milidetik dengan studio gambar bawaan dan caching edge.", ja: "組み込みの画像スタジオとエッジキャッシュにより、世界中にサブミリ秒でアセットを配信。" },
    { key: "landing.interactive_demo", en: "Interactive Demo", id: "Demo Interaktif", ja: "インタラクティブデモ" },
    { key: "landing.developer_api", en: "Developer API", id: "API Pengembang", ja: "開発者API" },
    { key: "landing.console_btn", en: "Go to Console", id: "Buka Konsol", ja: "コンソールを開く" },
    { key: "landing.get_started_free", en: "Get Started Free", id: "Mulai Gratis", ja: "無料で始める" },

    // Dashboard
    { key: "dashboard.hero_headline", en: "Deliver assets at lightspeed.", id: "Kirim aset dengan kecepatan kilat.", ja: "超高速でアセットを配信。" },
    { key: "dashboard.hero_subtext", en: "Upload files, generate CDN links with 1-click, and manage media assets across all projects.", id: "Unggah berkas, buat tautan CDN dengan 1-klik, dan kelola aset media di seluruh proyek.", ja: "ファイルをアップロードし、1クリックでCDNリンクを生成、全プロジェクトのメディアを一元管理。" },
    { key: "dashboard.upload_new_btn", en: "Upload New Files", id: "Unggah Berkas Baru", ja: "新規ファイルアップロード" },
    { key: "dashboard.browse_library_btn", en: "Browse Library", id: "Jelajahi Pustaka", ja: "ライブラリを見る" },
    { key: "dashboard.total_files", en: "Total Files", id: "Total Berkas", ja: "総ファイル数" },
    { key: "dashboard.storage_used", en: "Storage Used", id: "Kapasitas Terpakai", ja: "使用ストレージ" },
    { key: "dashboard.images_count", en: "Images", id: "Gambar", ja: "画像" },
    { key: "dashboard.videos_count", en: "Videos", id: "Video", ja: "動画" },
    { key: "dashboard.storage_breakdown", en: "Storage Breakdown", id: "Rincian Kapasitas", ja: "ストレージの内訳" },
    { key: "dashboard.recent_uploads", en: "Recent Uploads", id: "Unggahan Terbaru", ja: "最近のアップロード" },

    // Files Library
    { key: "files.title", en: "File Library", id: "Pustaka Berkas", ja: "ファイルライブラリ" },
    { key: "files.subtitle", en: "Search, preview, organize, and copy direct CDN links for your assets", id: "Cari, pratinjau, atur, dan salin tautan langsung CDN untuk aset Anda", ja: "アセットの検索・プレビュー・整理・ダイレクトCDNリンクのコピー" },
    { key: "files.grid_view", en: "Grid View", id: "Tampilan Grid", ja: "グリッド表示" },
    { key: "files.list_view", en: "List View", id: "Tampilan Daftar", ja: "リスト表示" },
    { key: "files.search_placeholder", en: "Search files by name or tag...", id: "Cari berkas berdasarkan nama atau tag...", ja: "ファイル名やタグで検索..." },
    { key: "files.filter_all", en: "All Assets", id: "Semua Aset", ja: "すべてのアセット" },
    { key: "files.filter_images", en: "Images", id: "Gambar", ja: "画像" },
    { key: "files.filter_videos", en: "Videos", id: "Video", ja: "動画" },
    { key: "files.filter_docs", en: "Documents", id: "Dokumen", ja: "文書" },
    { key: "files.filter_archives", en: "Archives", id: "Arsip", ja: "アーカイブ" },
    { key: "files.new_folder", en: "New Folder", id: "Folder Baru", ja: "新規フォルダ" },
    { key: "files.copy_cdn_link", en: "Copy CDN Link", id: "Salin Link CDN", ja: "CDNリンクをコピー" },
    { key: "files.copy_markdown", en: "Copy Markdown", id: "Salin Format Markdown", ja: "Markdownをコピー" },
    { key: "files.edit_in_studio", en: "Edit in Studio", id: "Edit di Studio", ja: "スタジオで編集" },
    { key: "files.move_to_trash", en: "Move to Trash", id: "Pindahkan ke Sampah", ja: "ゴミ箱へ移動" },
    { key: "files.batch_download", en: "Download Selected", id: "Unduh Terpilih", ja: "選択項目をダウンロード" },
    { key: "files.batch_delete", en: "Delete Selected", id: "Hapus Terpilih", ja: "選択項目を削除" },

    // Analytics View
    { key: "analytics.title", en: "Usage & Analytics", id: "Penggunaan & Analitik", ja: "利用統計と分析" },
    { key: "analytics.subtitle", en: "Real-time storage insights, upload trends, and distribution", id: "Wawasan penyimpanan real-time, tren unggahan, dan distribusi data", ja: "リアルタイムのストレージ状況、アップロード推移、配信統計" },
    { key: "analytics.live_metrics", en: "Live Metrics", id: "Metrik Langsung", ja: "ライブメトリクス" },
    { key: "analytics.total_assets", en: "Total Assets", id: "Total Aset", ja: "総アセット数" },
    { key: "analytics.storage_used", en: "Storage Used", id: "Kapasitas Terpakai", ja: "使用ストレージ容量" },
    { key: "analytics.bandwidth", en: "CDN Bandwidth Consumed", id: "Bandwidth CDN Terpakai", ja: "消費CDN帯域幅" },
    { key: "analytics.downloads", en: "Monthly Downloads", id: "Unduhan Bulanan", ja: "月間ダウンロード数" },
    { key: "analytics.file_type_breakdown", en: "Storage by File Type", id: "Penyimpanan per Tipe Berkas", ja: "ファイル形式別ストレージ" },
    { key: "analytics.upload_trends", en: "Upload Activity Trends", id: "Tren Aktivitas Unggahan", ja: "アップロード推移グラフ" },

    // Projects & Workspaces
    { key: "projects.title", en: "Projects & Workspaces", id: "Proyek & Ruang Kerja", ja: "プロジェクトとワークスペース" },
    { key: "projects.subtitle", en: "Separate environments, generate project-scoped API keys, and manage storage quotas.", id: "Pisahkan environment, buat API key khusus proyek, dan kelola kuota penyimpanan.", ja: "環境の分離、プロジェクト固有APIキーの発行、ストレージクォータの管理。" },
    { key: "projects.new_project", en: "New Project", id: "Proyek Baru", ja: "新規プロジェクト" },
    { key: "projects.current_active", en: "Current Active", id: "Sedang Aktif", ja: "現在アクティブ" },
    { key: "projects.switch_project", en: "Switch Project", id: "Pindah Proyek", ja: "プロジェクトを切り替え" },
    { key: "projects.quota_storage", en: "Storage Quota", id: "Kuota Penyimpanan", ja: "ストレージ容量制限" },

    // Image Studio
    { key: "editor.title", en: "Image Studio Editor", id: "Studio Editor Gambar", ja: "画像スタジオエディタ" },
    { key: "editor.crop", en: "Crop & Aspect Ratio", id: "Potong & Rasio Aspek", ja: "切り抜き・縦横比" },
    { key: "editor.rotate_left", en: "Rotate Left", id: "Putar Kiri", ja: "左に回転" },
    { key: "editor.rotate_right", en: "Rotate Right", id: "Putar Kanan", ja: "右に回転" },
    { key: "editor.brightness", en: "Brightness", id: "Kecerahan", ja: "明るさ" },
    { key: "editor.contrast", en: "Contrast", id: "Kontras", ja: "コントラスト" },
    { key: "editor.saturation", en: "Saturation", id: "Saturasi", ja: "彩度" },
    { key: "editor.watermark", en: "Watermark Overlay", id: "Tanda Air (Watermark)", ja: "透かしオーバーレイ" },
    { key: "editor.save_as_new", en: "Save as New Copy", id: "Simpan Salinan Baru", ja: "新しいコピーとして保存" },

    // Groups & Collaboration
    { key: "groups.title", en: "Shared Spaces & Workspaces", id: "Ruang Bersama & Kolaborasi", ja: "共有スペース・ワークスペース" },
    { key: "groups.create_space", en: "Create Shared Space", id: "Buat Ruang Bersama", ja: "共有スペースを作成" },
    { key: "groups.invite_email", en: "Invite collaborator by email...", id: "Undang rekan via email...", ja: "メールでメンバーを招待..." },
    { key: "groups.role_admin", en: "Administrator", id: "Administrator", ja: "管理者" },
    { key: "groups.role_editor", en: "Editor (Upload & Delete)", id: "Editor (Unggah & Hapus)", ja: "編集者" },
    { key: "groups.role_viewer", en: "Viewer (Read Only)", id: "Pelihat (Hanya Baca)", ja: "閲覧者" },

    // Settings & Integrations
    { key: "settings.title", en: "Settings & Integrations", id: "Pengaturan & Integrasi", ja: "設定と外部連携" },
    { key: "settings.tab_account", en: "Account & Profile", id: "Akun & Profil", ja: "アカウントとプロフィール" },
    { key: "settings.tab_security", en: "Security & Passwords", id: "Keamanan & Kata Sandi", ja: "セキュリティ・パスワード" },
    { key: "settings.tab_apikeys", en: "API Keys & Access Tokens", id: "API Key & Token Akses", ja: "APIキーとアクセストークン" },
    { key: "settings.tab_webhooks", en: "Webhook Notifications", id: "Notifikasi Webhook", ja: "Webhook通知" },
    { key: "settings.tab_domains", en: "Custom CDN Domains", id: "Domain CDN Kustom", ja: "カスタムCDNドメイン" },
    { key: "settings.create_apikey", en: "Generate New API Key", id: "Buat API Key Baru", ja: "新規APIキーを生成" },
    { key: "settings.revoke_key", en: "Revoke Key", id: "Cabut Akses Kunci", ja: "キーを失効" },

    // Recycle Bin
    { key: "trash.title", en: "Recycle Bin", id: "Tempat Sampah", ja: "ゴミ箱" },
    { key: "trash.notice", en: "Deleted files are permanently removed after 30 days.", id: "Berkas yang dihapus akan dimusnahkan permanen setelah 30 hari.", ja: "削除されたファイルは30日後に完全に消去されます。" },
    { key: "trash.empty_trash", en: "Empty Recycle Bin", id: "Kosongkan Tempat Sampah", ja: "ゴミ箱を空にする" },
    { key: "trash.restore_file", en: "Restore Asset", id: "Pulihkan Aset", ja: "復元する" },
    { key: "trash.delete_permanent", en: "Delete Permanently", id: "Hapus Permanen", ja: "完全に削除" },

    // Public Share
    { key: "share.title", en: "Public File Share", id: "Berbagi Berkas Publik", ja: "パブリックファイル共有" },
    { key: "share.copy_link", en: "Copy Shareable Link", id: "Salin Tautan Berbagi", ja: "共有リンクをコピー" },
    { key: "share.password_protect", en: "Password Protected", id: "Dilindungi Kata Sandi", ja: "パスワード保護" },
    { key: "share.expires_in", en: "Link Expiration", id: "Masa Berlaku Tautan", ja: "リンク有効期限" },
    { key: "share.download_all", en: "Download All (.ZIP)", id: "Unduh Semua (.ZIP)", ja: "ZIPで一括ダウンロード" }
  ];

  for (const item of uploadboxKeys) {
    registerKey(projUploadbox.id, item.key, item.en, item.id, item.ja, item.ns);
  }
  console.log(`  ✓ Ingested ${uploadboxKeys.length} specialized keys for UploadBox`);

  // ─────────────────────────────────────────────────────────────
  // PART 4: Ingest Nexus Chat (Channels, AI Docs, Model Selector, Prompts)
  // ─────────────────────────────────────────────────────────────
  console.log("\n💬 Ingesting comprehensive keys for Nexus Chat...");
  const nexusKeys: Array<{ key: string; en: string; id: string; ja?: string; ns?: string }> = [
    { key: "chat.new_chat", en: "New Conversation", id: "Percakapan Baru", ja: "新しいチャット" },
    { key: "chat.search_history", en: "Search history...", id: "Cari riwayat percakapan...", ja: "履歴を検索..." },
    { key: "chat.channels", en: "Channels & Rooms", id: "Kanal & Obrolan Grup", ja: "チャンネル一覧" },
    { key: "chat.direct_messages", en: "Direct Messages", id: "Pesan Langsung", ja: "ダイレクトメッセージ" },
    { key: "chat.create_channel", en: "Create Channel", id: "Buat Kanal", ja: "チャンネル作成" },
    { key: "chat.type_message", en: "Type your message or press / for AI commands...", id: "Ketik pesan Anda atau tekan / untuk perintah AI...", ja: "メッセージを入力、または / でAIコマンド..." },
    { key: "chat.send_message", en: "Send Message", id: "Kirim Pesan", ja: "メッセージ送信" },
    { key: "chat.record_voice", en: "Record Voice Note", id: "Rekam Pesan Suara", ja: "音声メッセージ録音" },
    { key: "chat.recording_active", en: "Recording voice...", id: "Sedang merekam suara...", ja: "録音中..." },
    { key: "chat.attach_files", en: "Attach Media or Documents", id: "Lampirkan Media atau Dokumen", ja: "メディアやファイルを添付" },
    { key: "chat.reply_thread", en: "Reply in Thread", id: "Balas di Thread", ja: "スレッドで返信" },
    { key: "chat.pin_message", en: "Pin Message", id: "Sematkan Pesan", ja: "メッセージをピン留め" },
    { key: "chat.pinned_items", en: "Pinned Messages", id: "Pesan Disematkan", ja: "ピン留めメッセージ" },
    { key: "chat.export_markdown", en: "Export as Markdown", id: "Ekspor sebagai Markdown", ja: "Markdownとしてエクスポート" },
    { key: "chat.export_json", en: "Export as JSON", id: "Ekspor sebagai JSON", ja: "JSONとしてエクスポート" },
    { key: "chat.delete_conversation", en: "Delete Conversation", id: "Hapus Percakapan", ja: "会話を削除" },
    { key: "chat.typing_indicator", en: "{user} is typing...", id: "{user} sedang mengetik...", ja: "{user}が入力中..." },

    // Model & AI Provider Selector
    { key: "ai.select_model", en: "Select AI Model", id: "Pilih Model AI", ja: "AIモデルを選択" },
    { key: "ai.provider", en: "AI Provider", id: "Penyedia Layanan AI", ja: "AIプロバイダー" },
    { key: "ai.temperature", en: "Temperature (Creativity)", id: "Temperature (Kreativitas)", ja: "温度（創造性）" },
    { key: "ai.max_tokens", en: "Max Output Tokens", id: "Token Output Maksimal", ja: "最大出力トークン" },
    { key: "ai.thinking", en: "AI is formulating answer...", id: "AI sedang merumuskan jawaban...", ja: "AIが回答を生成中..." },

    // Knowledge Base & Docs
    { key: "docs.title", en: "Vector Knowledge Base", id: "Pusat Pengetahuan Vektor", ja: "ベクトルナレッジベース" },
    { key: "docs.upload_pdf", en: "Upload PDF or Markdown File", id: "Unggah Berkas PDF atau Markdown", ja: "PDFまたはMarkdownをアップロード" },
    { key: "docs.summarize", en: "Summarize Discussion", id: "Ringkas Pembahasan", ja: "ディスカッションを要約" },
    { key: "docs.prompt_library", en: "System Prompt Library", id: "Pustaka Prompt Sistem", ja: "システムプロンプト集" },
    { key: "docs.save_prompt", en: "Save as Custom Prompt", id: "Simpan sebagai Prompt Kustom", ja: "カスタムプロンプトとして保存" }
  ];

  for (const item of nexusKeys) {
    registerKey(projNexus.id, item.key, item.en, item.id, item.ja, item.ns);
  }
  console.log(`  ✓ Ingested ${nexusKeys.length} specialized keys for Nexus Chat`);

  // ─────────────────────────────────────────────────────────────
  // PART 5: Ingest WABridge (17 Dashboard Pages: QR, Broadcast, Bot, Webhooks)
  // ─────────────────────────────────────────────────────────────
  console.log("\n📱 Ingesting comprehensive keys for WA Bridge Gateway...");
  const wabridgeKeys: Array<{ key: string; en: string; id: string; ja?: string; ns?: string }> = [
    { key: "device.title", en: "WhatsApp Device Sessions", id: "Sesi Perangkat WhatsApp", ja: "WhatsAppデバイスセッション" },
    { key: "device.scan_qr", en: "Scan QR Code on your WhatsApp App", id: "Pindai Kode QR di Aplikasi WhatsApp", ja: "WhatsAppアプリでQRコードをスキャン" },
    { key: "device.pairing_code", en: "Link with Phone Number Code", id: "Tautkan via Kode Nomor HP", ja: "電話番号コードで連携" },
    { key: "device.connected", en: "Engine Connected & Ready", id: "Perangkat Terhubung & Siap", ja: "接続完了・待機中" },
    { key: "device.disconnected", en: "Disconnected - Scan Required", id: "Terputus - Perlu Pindai Ulang", ja: "切断 - 再スキャンが必要" },
    { key: "device.battery_level", en: "Device Battery", id: "Status Baterai HP", ja: "端末バッテリー" },
    { key: "device.reconnect", en: "Reconnect Engine", id: "Sambungkan Ulang Engine", ja: "再接続" },

    // Messages & Live Chat
    { key: "messages.live_chat", en: "WhatsApp Live Chat Inbox", id: "Kotak Masuk Chat Langsung", ja: "ライブチャット受信トレイ" },
    { key: "messages.recipient", en: "Recipient Phone Number (+CountryCode)", id: "Nomor HP Penerima (+KodeNegara)", ja: "送信先電話番号（国番号含む）" },
    { key: "messages.send_direct", en: "Send Direct Message", id: "Kirim Pesan Langsung", ja: "ダイレクトメッセージ送信" },
    { key: "messages.send_media", en: "Send Media / Document", id: "Kirim Media / Dokumen", ja: "メディア・文書を送信" },
    { key: "messages.status_sent", en: "Sent", id: "Terkirim", ja: "送信済み" },
    { key: "messages.status_delivered", en: "Delivered", id: "Diterima", ja: "配信済み" },
    { key: "messages.status_read", en: "Read", id: "Dibaca", ja: "既読" },

    // Broadcast Campaigns
    { key: "broadcast.title", en: "Broadcast Campaigns", id: "Kampanye Siaran Massal", ja: "一斉配信キャンペーン" },
    { key: "broadcast.new_campaign", en: "Create New Campaign", id: "Buat Kampanye Baru", ja: "新規キャンペーン作成" },
    { key: "broadcast.campaign_name", en: "Campaign Name", id: "Nama Kampanye", ja: "キャンペーン名" },
    { key: "broadcast.upload_csv", en: "Upload Recipient Numbers (.CSV)", id: "Unggah Kontak Penerima (.CSV)", ja: "宛先CSVファイルをアップロード" },
    { key: "broadcast.schedule_time", en: "Schedule Broadcast", id: "Jadwalkan Waktu Siaran", ja: "配信日時を設定" },
    { key: "broadcast.delivery_rate", en: "Success Delivery Rate", id: "Tingkat Keberhasilan Pengiriman", ja: "配信成功率" },

    // Auto-Reply Bot
    { key: "bot.title", en: "Automated Keyword Rules", id: "Aturan Balas Otomatis (Kata Kunci)", ja: "自動応答キーワード設定" },
    { key: "bot.new_rule", en: "Add Auto-Reply Rule", id: "Tambah Aturan Balas Otomatis", ja: "自動応答ルールを追加" },
    { key: "bot.keyword", en: "Trigger Keyword", id: "Kata Kunci Pemicu", ja: "トリガーキーワード" },
    { key: "bot.match_exact", en: "Exact Match", id: "Cocok Persis", ja: "完全一致" },
    { key: "bot.match_contains", en: "Contains Keyword", id: "Mengandung Kata", ja: "部分一致" },
    { key: "bot.reply_body", en: "Auto-Reply Message Text", id: "Teks Balasan Otomatis", ja: "自動返信メッセージ本文" },

    // Webhooks & Developer API
    { key: "webhook.title", en: "Incoming Webhook Dispatcher", id: "Distributor Webhook Masuk", ja: "Webhook受信ディスパッチャ" },
    { key: "webhook.payload_url", en: "Webhook Endpoint URL", id: "URL Endpoint Webhook", ja: "WebhookエンドポイントURL" },
    { key: "webhook.secret", en: "Secret Signing Token", id: "Token Rahasia Pengaman", ja: "シークレット署名トークン" },
    { key: "webhook.test_event", en: "Send Test Webhook Event", id: "Kirim Uji Coba Event Webhook", ja: "テストWebhookを送信" },
    { key: "webhook.delivery_logs", en: "Webhook Delivery Logs", id: "Log Pengiriman Webhook", ja: "Webhook配信ログ" }
  ];

  for (const item of wabridgeKeys) {
    registerKey(projWabridge.id, item.key, item.en, item.id, item.ja, item.ns);
  }
  console.log(`  ✓ Ingested ${wabridgeKeys.length} specialized keys for WA Bridge Gateway`);

  // ─────────────────────────────────────────────────────────────
  // PART 6: Ingest Portfolio Web (Showcase, Experience, Tech Stack, Contact)
  // ─────────────────────────────────────────────────────────────
  console.log("\n🚀 Ingesting comprehensive keys for Portfolio Web...");
  const portfolioKeys: Array<{ key: string; en: string; id: string; ja?: string; ns?: string }> = [
    { key: "portfolio.greeting", en: "Hello, I'm", id: "Halo, saya", ja: "こんにちは、" },
    { key: "portfolio.role_title", en: "Senior Full-Stack Software Engineer & Cloud Architect", id: "Software Engineer Full-Stack Senior & Arsitek Cloud", ja: "シニアフルスタックエンジニア & クラウドアーキテクト" },
    { key: "portfolio.hero_bio", en: "Engineering resilient cloud systems, high-performance distributed architectures, and polished user experiences.", id: "Merancang sistem cloud tangguh, arsitektur terdistribusi performa tinggi, dan pengalaman antarmuka pengguna yang elegan.", ja: "堅牢なクラウドシステム、高パフォーマンスな分散アーキテクチャ、洗練されたユーザー体験を設計。" },
    { key: "portfolio.contact_cta", en: "Get In Touch", id: "Hubungi Saya", ja: "お問い合わせ" },
    { key: "portfolio.download_cv", en: "Download Resume", id: "Unduh CV / Resume", ja: "履歴書ダウンロード" },
    { key: "portfolio.experience_years", en: "Years of Engineering Experience", id: "Tahun Pengalaman Profesional", ja: "年のエンジニア実務経験" },
    { key: "portfolio.completed_projects", en: "Production Deployments", id: "Sistem Terpasang di Produksi", ja: "本番デプロイ実績" },
    { key: "portfolio.tech_stack_title", en: "Technical Arsenal & Frameworks", id: "Keahlian Teknis & Framework", ja: "技術スタック & スキル" },
    { key: "portfolio.featured_projects", en: "Featured Works & Open Source", id: "Karya Unggulan & Open Source", ja: "主要実績とオープンソース制作物" },
    { key: "portfolio.live_demo", en: "Live Demo", id: "Demo Langsung", ja: "ライブデモ" },
    { key: "portfolio.source_code", en: "Source Code", id: "Kode Sumber", ja: "ソースコード" },
    { key: "portfolio.testimonials", en: "Recommendations & Reviews", id: "Rekomendasi & Testimoni", ja: "推薦の声・レビュー" },
    { key: "portfolio.contact_title", en: "Let's Build Something Great", id: "Mari Bangun Sesuatu yang Hebat Bersama", ja: "素晴らしいものを一緒に創りましょう" },
    { key: "portfolio.send_message", en: "Send Message", id: "Kirim Pesan", ja: "メッセージを送信" },
    { key: "portfolio.message_success", en: "Thank you! I will respond within 24 hours.", id: "Terima kasih! Saya akan merespons pesan Anda dalam 24 jam.", ja: "ありがとうございます！24時間以内にご返信いたします。" }
  ];

  for (const item of portfolioKeys) {
    registerKey(projPortfolio.id, item.key, item.en, item.id, item.ja, item.ns);
  }
  console.log(`  ✓ Ingested ${portfolioKeys.length} specialized keys for Portfolio Web`);

  // ─────────────────────────────────────────────────────────────
  // PART 7: Ingest UML Flow Studio & Irma Iryani Web
  // ─────────────────────────────────────────────────────────────
  console.log("\n📐 Ingesting keys for UML Flow & Irma Iryani...");
  const umlKeys: Array<{ key: string; en: string; id: string; ja?: string; ns?: string }> = [
    { key: "canvas.title", en: "Architecture & UML Modeling Canvas", id: "Kanvas Pemodelan Arsitektur & UML", ja: "UMLモデリングキャンバス" },
    { key: "canvas.zoom_in", en: "Zoom In", id: "Perbesar", ja: "ズームイン" },
    { key: "canvas.zoom_out", en: "Zoom Out", id: "Perkecil", ja: "ズームアウト" },
    { key: "canvas.fit_view", en: "Fit to Viewport", id: "Paskan Layar", ja: "全体表示" },
    { key: "canvas.snap_grid", en: "Snap to Grid", id: "Ratakan ke Garis Kisi", ja: "グリッド吸着" },
    { key: "canvas.undo", en: "Undo", id: "Batalkan", ja: "元に戻す" },
    { key: "canvas.redo", en: "Redo", id: "Ulangi", ja: "やり直す" },
    { key: "tools.add_class", en: "Add Class Box", id: "Tambah Kotak Kelas", ja: "クラスを追加" },
    { key: "tools.add_interface", en: "Add Interface", id: "Tambah Antarmuka (Interface)", ja: "インターフェースを追加" },
    { key: "tools.add_relationship", en: "Connect Arrow", id: "Hubungkan Garis Panah", ja: "リレーション矢印" },
    { key: "tools.export_png", en: "Export as High-Res PNG", id: "Ekspor sebagai Gambar PNG", ja: "PNG形式でエクスポート" },
    { key: "tools.export_svg", en: "Export as Vector SVG", id: "Ekspor sebagai Vektor SVG", ja: "SVGベクトルでエクスポート" },
    { key: "tools.export_json", en: "Export Schema (.JSON)", id: "Ekspor Struktur (.JSON)", ja: "JSON定義を書き出す" }
  ];

  for (const item of umlKeys) {
    registerKey(projUml.id, item.key, item.en, item.id, item.ja, item.ns);
  }

  const irmaKeys: Array<{ key: string; en: string; id: string; ja?: string; ns?: string }> = [
    { key: "brand.tagline", en: "Professional Consultation & Creative Strategy", id: "Konsultasi Profesional & Strategi Kreatif", ja: "プロフェッショナル・コンサルティング & クリエイティブ戦略" },
    { key: "brand.about_title", en: "About & Vision", id: "Tentang Kami & Visi", ja: "事業案内とビジョン" },
    { key: "brand.services_title", en: "Premium Services & Solutions", id: "Layanan Unggulan & Solusi", ja: "提供サービス・ソリューション" },
    { key: "booking.schedule_cta", en: "Book a Consultation Session", id: "Jadwalkan Sesi Konsultasi", ja: "相談セッションを予約" },
    { key: "booking.select_date", en: "Select Available Date", id: "Pilih Tanggal yang Tersedia", ja: "希望日程を選択" },
    { key: "booking.select_time", en: "Select Time Slot", id: "Pilih Jam Konsultasi", ja: "時間帯を選択" },
    { key: "blog.latest_articles", en: "Latest Insights & Thought Leadership", id: "Artikel & Wawasan Terbaru", ja: "最新のコラム・考察" },
    { key: "faq.title", en: "Frequently Asked Questions", id: "Pertanyaan yang Sering Diajukan", ja: "よくあるご質問 (FAQ)" }
  ];

  for (const item of irmaKeys) {
    registerKey(projIrma.id, item.key, item.en, item.id, item.ja, item.ns);
  }

  // Force database flush to disk
  db.save();

  console.log(`\n================================================================`);
  console.log(`🎉 [Polyglot Hub] MASTER INGEST COMPLETE!`);
  console.log(`Total Keys Registered: ${totalSeeded}`);
  console.log(`================================================================`);
}

main().catch(console.error);
