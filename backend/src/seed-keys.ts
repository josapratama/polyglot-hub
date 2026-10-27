import { db } from "./db.js";

interface KeySeed {
  projectSlug: string;
  key: string;
  namespace: string;
  en: string;
  id: string;
  ja?: string;
  context?: string;
}

const KEYS_CATALOG: KeySeed[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. COMMON (Universal across ALL applications)
  // ─────────────────────────────────────────────────────────────
  // Actions
  { projectSlug: "common", key: "actions.save", namespace: "actions", en: "Save", id: "Simpan", ja: "保存" },
  { projectSlug: "common", key: "actions.cancel", namespace: "actions", en: "Cancel", id: "Batal", ja: "キャンセル" },
  { projectSlug: "common", key: "actions.delete", namespace: "actions", en: "Delete", id: "Hapus", ja: "削除" },
  { projectSlug: "common", key: "actions.edit", namespace: "actions", en: "Edit", id: "Ubah", ja: "編集" },
  { projectSlug: "common", key: "actions.create", namespace: "actions", en: "Create", id: "Buat", ja: "作成" },
  { projectSlug: "common", key: "actions.confirm", namespace: "actions", en: "Confirm", id: "Konfirmasi", ja: "確認" },
  { projectSlug: "common", key: "actions.back", namespace: "actions", en: "Back", id: "Kembali", ja: "戻る" },
  { projectSlug: "common", key: "actions.next", namespace: "actions", en: "Next", id: "Lanjut", ja: "次へ" },
  { projectSlug: "common", key: "actions.submit", namespace: "actions", en: "Submit", id: "Kirim", ja: "送信" },
  { projectSlug: "common", key: "actions.refresh", namespace: "actions", en: "Refresh", id: "Segarkan", ja: "更新" },
  { projectSlug: "common", key: "actions.close", namespace: "actions", en: "Close", id: "Tutup", ja: "閉じる" },
  { projectSlug: "common", key: "actions.search", namespace: "actions", en: "Search", id: "Cari", ja: "検索" },
  { projectSlug: "common", key: "actions.filter", namespace: "actions", en: "Filter", id: "Saring", ja: "フィルター" },
  { projectSlug: "common", key: "actions.download", namespace: "actions", en: "Download", id: "Unduh", ja: "ダウンロード" },
  { projectSlug: "common", key: "actions.upload", namespace: "actions", en: "Upload", id: "Unggah", ja: "アップロード" },
  { projectSlug: "common", key: "actions.copy", namespace: "actions", en: "Copy", id: "Salin", ja: "コピー" },
  { projectSlug: "common", key: "actions.copied", namespace: "actions", en: "Copied!", id: "Tersalin!", ja: "コピーしました！" },
  { projectSlug: "common", key: "actions.open", namespace: "actions", en: "Open", id: "Buka", ja: "開く" },
  { projectSlug: "common", key: "actions.view", namespace: "actions", en: "View", id: "Lihat", ja: "表示" },
  { projectSlug: "common", key: "actions.export", namespace: "actions", en: "Export", id: "Ekspor", ja: "エクスポート" },
  { projectSlug: "common", key: "actions.import", namespace: "actions", en: "Import", id: "Impor", ja: "インポート" },
  { projectSlug: "common", key: "actions.retry", namespace: "actions", en: "Retry", id: "Coba Lagi", ja: "再試行" },
  { projectSlug: "common", key: "actions.reset", namespace: "actions", en: "Reset", id: "Reset", ja: "リセット" },
  { projectSlug: "common", key: "actions.clear", namespace: "actions", en: "Clear", id: "Bersihkan", ja: "クリア" },

  // Auth
  { projectSlug: "common", key: "auth.login", namespace: "auth", en: "Sign In", id: "Masuk", ja: "ログイン" },
  { projectSlug: "common", key: "auth.register", namespace: "auth", en: "Create Account", id: "Daftar Akun", ja: "アカウント作成" },
  { projectSlug: "common", key: "auth.logout", namespace: "auth", en: "Sign Out", id: "Keluar", ja: "ログアウト" },
  { projectSlug: "common", key: "auth.email", namespace: "auth", en: "Email Address", id: "Alamat Email", ja: "メールアドレス" },
  { projectSlug: "common", key: "auth.password", namespace: "auth", en: "Password", id: "Kata Sandi", ja: "パスワード" },
  { projectSlug: "common", key: "auth.confirm_password", namespace: "auth", en: "Confirm Password", id: "Konfirmasi Kata Sandi", ja: "パスワード再入力" },
  { projectSlug: "common", key: "auth.forgot_password", namespace: "auth", en: "Forgot Password?", id: "Lupa Kata Sandi?", ja: "パスワードをお忘れですか？" },
  { projectSlug: "common", key: "auth.remember_me", namespace: "auth", en: "Remember Me", id: "Ingat Saya", ja: "ログイン状態を保持" },
  { projectSlug: "common", key: "auth.full_name", namespace: "auth", en: "Full Name", id: "Nama Lengkap", ja: "氏名" },
  { projectSlug: "common", key: "auth.welcome_back", namespace: "auth", en: "Welcome Back", id: "Selamat Datang Kembali", ja: "おかえりなさい" },

  // Status
  { projectSlug: "common", key: "status.loading", namespace: "status", en: "Loading...", id: "Memuat...", ja: "読み込み中..." },
  { projectSlug: "common", key: "status.saving", namespace: "status", en: "Saving...", id: "Menyimpan...", ja: "保存中..." },
  { projectSlug: "common", key: "status.success", namespace: "status", en: "Success", id: "Berhasil", ja: "成功" },
  { projectSlug: "common", key: "status.failed", namespace: "status", en: "Failed", id: "Gagal", ja: "失敗" },
  { projectSlug: "common", key: "status.error", namespace: "status", en: "Error Occurred", id: "Terjadi Kesalahan", ja: "エラーが発生しました" },
  { projectSlug: "common", key: "status.active", namespace: "status", en: "Active", id: "Aktif", ja: "有効" },
  { projectSlug: "common", key: "status.inactive", namespace: "status", en: "Inactive", id: "Tidak Aktif", ja: "無効" },
  { projectSlug: "common", key: "status.online", namespace: "status", en: "Online", id: "Online", ja: "オンライン" },
  { projectSlug: "common", key: "status.offline", namespace: "status", en: "Offline", id: "Offline", ja: "オフライン" },

  // Nav
  { projectSlug: "common", key: "nav.dashboard", namespace: "nav", en: "Dashboard", id: "Dashboard", ja: "ダッシュボード" },
  { projectSlug: "common", key: "nav.settings", namespace: "nav", en: "Settings", id: "Pengaturan", ja: "設定" },
  { projectSlug: "common", key: "nav.analytics", namespace: "nav", en: "Analytics", id: "Analitik", ja: "分析" },
  { projectSlug: "common", key: "nav.profile", namespace: "nav", en: "Profile", id: "Profil", ja: "プロフィール" },
  { projectSlug: "common", key: "nav.help", namespace: "nav", en: "Help & Docs", id: "Bantuan & Panduan", ja: "ヘルプとドキュメント" },

  // Dialogs & Confirmations
  { projectSlug: "common", key: "confirm.delete_title", namespace: "confirm", en: "Are you sure you want to delete this?", id: "Apakah Anda yakin ingin menghapus ini?", ja: "本当に削除しますか？" },
  { projectSlug: "common", key: "confirm.delete_desc", namespace: "confirm", en: "This action cannot be undone.", id: "Tindakan ini tidak dapat dibatalkan.", ja: "この操作は取り消せません。" },
  { projectSlug: "common", key: "confirm.yes_delete", namespace: "confirm", en: "Yes, Delete", id: "Ya, Hapus", ja: "はい、削除します" },
  { projectSlug: "common", key: "table.no_data", namespace: "table", en: "No records found", id: "Tidak ada data ditemukan", ja: "データが見つかりません" },
  { projectSlug: "common", key: "table.search_placeholder", namespace: "table", en: "Search items...", id: "Cari data...", ja: "検索..." },

  // ─────────────────────────────────────────────────────────────
  // 2. UPLOADBOX (UploadBox CDN & Storage)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "uploadbox", key: "hero.title", namespace: "hero", en: "Modern File Infrastructure & Smart CDN Delivery", id: "Infrastruktur File Modern & Pengiriman CDN Cerdas" },
  { projectSlug: "uploadbox", key: "hero.subtitle", namespace: "hero", en: "Upload, transform, optimize, and deliver media globally with microsecond latency.", id: "Unggah, transformasi, optimalkan, dan distribusikan media secara global dengan latensi mikrodetik." },
  { projectSlug: "uploadbox", key: "upload.drag_drop", namespace: "upload", en: "Drag & drop files here, or click to browse", id: "Tarik & lepas file di sini, atau klik untuk memilih" },
  { projectSlug: "uploadbox", key: "upload.clipboard_hint", namespace: "upload", en: "Press Ctrl+V anywhere to paste screenshot from clipboard", id: "Tekan Ctrl+V di mana saja untuk menempelkan screenshot dari clipboard" },
  { projectSlug: "uploadbox", key: "upload.target_folder", namespace: "upload", en: "Target Folder", id: "Folder Tujuan" },
  { projectSlug: "uploadbox", key: "upload.url_title", namespace: "upload", en: "Upload from Remote URL", id: "Unggah dari URL Eksternal" },
  { projectSlug: "uploadbox", key: "upload.queue_title", namespace: "upload", en: "Upload Queue", id: "Antrean Unggahan" },
  { projectSlug: "uploadbox", key: "files.title", namespace: "files", en: "All Asset Library", id: "Pustaka Semua Aset" },
  { projectSlug: "uploadbox", key: "files.filter_all", namespace: "files", en: "All Assets", id: "Semua Aset" },
  { projectSlug: "uploadbox", key: "files.filter_images", namespace: "files", en: "Images", id: "Gambar" },
  { projectSlug: "uploadbox", key: "files.filter_videos", namespace: "files", en: "Videos", id: "Video" },
  { projectSlug: "uploadbox", key: "files.filter_docs", namespace: "files", en: "Documents", id: "Dokumen" },
  { projectSlug: "uploadbox", key: "files.new_folder", namespace: "files", en: "+ New Folder", id: "+ Folder Baru" },
  { projectSlug: "uploadbox", key: "files.batch_selected", namespace: "files", en: "{count} assets selected", id: "{count} aset dipilih" },
  { projectSlug: "uploadbox", key: "editor.title", namespace: "editor", en: "Image Studio Editor", id: "Studio Editor Gambar" },
  { projectSlug: "uploadbox", key: "editor.rotate_left", namespace: "editor", en: "Rotate 90° Left", id: "Putar 90° ke Kiri" },
  { projectSlug: "uploadbox", key: "editor.rotate_right", namespace: "editor", en: "Rotate 90° Right", id: "Putar 90° ke Kanan" },
  { projectSlug: "uploadbox", key: "editor.crop", namespace: "editor", en: "Crop Image", id: "Potong Gambar" },
  { projectSlug: "uploadbox", key: "editor.apply_crop", namespace: "editor", en: "Apply Crop Area", id: "Terapkan Pemotongan" },
  { projectSlug: "uploadbox", key: "editor.save_as_new", namespace: "editor", en: "Save as New Asset", id: "Simpan sebagai Aset Baru" },
  { projectSlug: "uploadbox", key: "cdn.direct_url", namespace: "cdn", en: "Direct CDN URL", id: "URL CDN Langsung" },
  { projectSlug: "uploadbox", key: "cdn.markdown_embed", namespace: "cdn", en: "Markdown Embed", id: "Sintaks Markdown" },
  { projectSlug: "uploadbox", key: "cdn.html_embed", namespace: "cdn", en: "HTML <img> Tag", id: "Tag HTML <img>" },
  { projectSlug: "uploadbox", key: "trash.title", namespace: "trash", en: "Trash Bin", id: "Tempat Sampah" },
  { projectSlug: "uploadbox", key: "trash.purge_30d", namespace: "trash", en: "Files in trash will be permanently purged after 30 days", id: "File di tempat sampah akan dihapus permanen setelah 30 hari" },
  { projectSlug: "uploadbox", key: "trash.empty_trash", namespace: "trash", en: "Empty Trash", id: "Kosongkan Sampah" },
  { projectSlug: "uploadbox", key: "trash.restore", namespace: "trash", en: "Restore Asset", id: "Pulihkan Aset" },

  // ─────────────────────────────────────────────────────────────
  // 3. NEXUS CHAT (Nexus Chat)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "nexus-chat", key: "chat.channels", namespace: "chat", en: "Channels", id: "Saluran" },
  { projectSlug: "nexus-chat", key: "chat.direct_messages", namespace: "chat", en: "Direct Messages", id: "Pesan Langsung" },
  { projectSlug: "nexus-chat", key: "chat.type_message", namespace: "chat", en: "Type a message...", id: "Ketik pesan..." },
  { projectSlug: "nexus-chat", key: "chat.send", namespace: "chat", en: "Send Message", id: "Kirim Pesan" },
  { projectSlug: "nexus-chat", key: "chat.typing", namespace: "chat", en: "{name} is typing...", id: "{name} sedang mengetik..." },
  { projectSlug: "nexus-chat", key: "chat.online_count", namespace: "chat", en: "{count} members online", id: "{count} anggota online" },
  { projectSlug: "nexus-chat", key: "chat.attach_file", namespace: "chat", en: "Attach Media or File", id: "Lampirkan Media atau File" },
  { projectSlug: "nexus-chat", key: "chat.record_voice", namespace: "chat", en: "Record Voice Message", id: "Rekam Pesan Suara" },
  { projectSlug: "nexus-chat", key: "room.create_channel", namespace: "room", en: "Create New Channel", id: "Buat Saluran Baru" },
  { projectSlug: "nexus-chat", key: "room.members", namespace: "room", en: "Channel Members", id: "Anggota Saluran" },
  { projectSlug: "nexus-chat", key: "room.leave", namespace: "room", en: "Leave Channel", id: "Tinggalkan Saluran" },
  { projectSlug: "nexus-chat", key: "presence.online", namespace: "presence", en: "Online", id: "Aktif" },
  { projectSlug: "nexus-chat", key: "presence.away", namespace: "presence", en: "Away", id: "Tidak di Tempat" },
  { projectSlug: "nexus-chat", key: "presence.dnd", namespace: "presence", en: "Do Not Disturb", id: "Jangan Ganggu" },

  // ─────────────────────────────────────────────────────────────
  // 4. MINIHOST (Mini VPS Panel)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "minihost", key: "dashboard.apps", namespace: "dashboard", en: "Deployed Applications", id: "Aplikasi Terpasang" },
  { projectSlug: "minihost", key: "dashboard.cpu_usage", namespace: "dashboard", en: "CPU Allocation", id: "Alokasi CPU" },
  { projectSlug: "minihost", key: "dashboard.ram_usage", namespace: "dashboard", en: "RAM Memory", id: "Memori RAM" },
  { projectSlug: "minihost", key: "dashboard.disk_usage", namespace: "dashboard", en: "Storage Disk", id: "Penyimpanan Disk" },
  { projectSlug: "minihost", key: "app.restart", namespace: "app", en: "Restart Container", id: "Mulai Ulang Kontainer" },
  { projectSlug: "minihost", key: "app.stop", namespace: "app", en: "Stop Container", id: "Hentikan Kontainer" },
  { projectSlug: "minihost", key: "app.redeploy", namespace: "app", en: "Redeploy Latest", id: "Deploy Ulang Versi Terbaru" },
  { projectSlug: "minihost", key: "app.live_logs", namespace: "app", en: "Live Streaming Logs", id: "Log Streaming Langsung" },
  { projectSlug: "minihost", key: "app.terminal", namespace: "app", en: "Web SSH Terminal", id: "Terminal Web SSH" },
  { projectSlug: "minihost", key: "env.title", namespace: "env", en: "Environment Variables", id: "Variabel Lingkungan" },
  { projectSlug: "minihost", key: "domain.title", namespace: "domain", en: "Custom Domain & SSL", id: "Domain Kustom & Sertifikat SSL" },
  { projectSlug: "minihost", key: "domain.caddy_status", namespace: "domain", en: "Reverse Proxy Status", id: "Status Reverse Proxy" },

  // ─────────────────────────────────────────────────────────────
  // 5. WABRIDGE (WhatsApp Gateway / Bridge)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "wabridge", key: "device.scan_qr", namespace: "device", en: "Scan QR Code with WhatsApp", id: "Pindai Kode QR dengan WhatsApp" },
  { projectSlug: "wabridge", key: "device.status_connected", namespace: "device", en: "WhatsApp Device Connected", id: "Perangkat WhatsApp Terhubung" },
  { projectSlug: "wabridge", key: "device.status_disconnected", namespace: "device", en: "Device Disconnected", id: "Perangkat Terputus" },
  { projectSlug: "wabridge", key: "message.send_single", namespace: "message", en: "Send Direct Message", id: "Kirim Pesan Langsung" },
  { projectSlug: "wabridge", key: "message.broadcast", namespace: "message", en: "Broadcast Campaign", id: "Kampanye Siaran Massal" },
  { projectSlug: "wabridge", key: "webhook.title", namespace: "webhook", en: "Incoming Webhook Dispatcher", id: "Distributor Webhook Masuk" },

  // ─────────────────────────────────────────────────────────────
  // 6. ARSIP DIGITAL (Digital Archives)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "arsip-digital", key: "archive.doc_title", namespace: "archive", en: "Document Title", id: "Judul Dokumen" },
  { projectSlug: "arsip-digital", key: "archive.doc_number", namespace: "archive", en: "Archive Registration Number", id: "Nomor Registrasi Arsip" },
  { projectSlug: "archive.category", key: "archive.category", namespace: "archive", en: "Archive Classification", id: "Klasifikasi Arsip" },
  { projectSlug: "arsip-digital", key: "archive.retention", namespace: "archive", en: "Retention Schedule", id: "Jadwal Retensi Arsip" },
  { projectSlug: "arsip-digital", key: "security.confidential", namespace: "security", en: "Confidential / Secret", id: "Rahasia / Terbatas" },
  { projectSlug: "arsip-digital", key: "security.public", namespace: "security", en: "Public Record", id: "Dokumen Publik" },

  // ─────────────────────────────────────────────────────────────
  // 7. PORTFOLIO (Personal Showcase)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "portfolio", key: "hero.greeting", namespace: "hero", en: "Hello, I am", id: "Halo, saya" },
  { projectSlug: "portfolio", key: "hero.role", namespace: "hero", en: "Full-Stack Software Engineer & Cloud Architect", id: "Software Engineer Full-Stack & Arsitek Cloud" },
  { projectSlug: "portfolio", key: "hero.hire_me", namespace: "hero", en: "Get In Touch", id: "Hubungi Saya" },
  { projectSlug: "portfolio", key: "hero.download_cv", namespace: "hero", en: "Download Resume", id: "Unduh CV / Resume" },
  { projectSlug: "portfolio", key: "projects.featured", namespace: "projects", en: "Featured Works & Experiments", id: "Karya Unggulan & Eksperimen" },
  { projectSlug: "portfolio", key: "contact.title", namespace: "contact", en: "Let's Build Something Together", id: "Mari Bangun Sesuatu Bersama" }
];

async function seedAllKeys() {
  console.log("🌱 [Polyglot Hub] Seeding enterprise translation catalog...");

  // Ensure projects exist
  const projectsToEnsure = [
    { slug: "common", name: "Common & Universal", desc: "Shared buttons, auth, dialogs, and actions", icon: "🌐" },
    { slug: "uploadbox", name: "UploadBox CDN", desc: "Storage, media delivery, image studio", icon: "📦" },
    { slug: "nexus-chat", name: "Nexus Chat", desc: "Chat channels, direct messages, rooms", icon: "💬" },
    { slug: "minihost", name: "Mini VPS Panel", desc: "Container dashboard, logs, terminal", icon: "⚡" },
    { slug: "wabridge", name: "WA Bridge Gateway", desc: "WhatsApp API bridge & broadcasts", icon: "📱" },
    { slug: "arsip-digital", name: "Arsip Digital", desc: "Document indexation & archives", icon: "📑" },
    { slug: "portfolio", name: "Portfolio Web", desc: "Personal showcase, skills & contact", icon: "🚀" },
  ];

  for (const p of projectsToEnsure) {
    if (!db.getProjectBySlug(p.slug)) {
      db.createProject(p.name, p.slug, p.desc, p.icon);
      console.log(`  + Created project: ${p.name}`);
    }
  }

  // Seed keys
  let seededCount = 0;
  for (const item of KEYS_CATALOG) {
    const proj = db.getProjectBySlug(item.projectSlug);
    if (!proj) continue;

    const translations: Record<string, string> = {
      en: item.en,
      id: item.id,
    };
    if (item.ja) translations.ja = item.ja;

    db.setTranslation(proj.id, item.key, translations, item.namespace, item.context);
    seededCount++;
  }

  console.log(`✨ [Polyglot Hub] Successfully seeded ${seededCount} enterprise keys across ${projectsToEnsure.length} projects!`);
}

seedAllKeys();
