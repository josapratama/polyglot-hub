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

export const COMPREHENSIVE_CATALOG: KeySeed[] = [
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
  { projectSlug: "common", key: "actions.duplicate", namespace: "actions", en: "Duplicate", id: "Duplikat", ja: "複製" },
  { projectSlug: "common", key: "actions.archive", namespace: "actions", en: "Archive", id: "Arsipkan", ja: "アーカイブ" },
  { projectSlug: "common", key: "actions.unarchive", namespace: "actions", en: "Unarchive", id: "Batal Arsip", ja: "アーカイブ解除" },
  { projectSlug: "common", key: "actions.expand", namespace: "actions", en: "Expand All", id: "Buka Semua", ja: "すべて展開" },
  { projectSlug: "common", key: "actions.collapse", namespace: "actions", en: "Collapse All", id: "Tutup Semua", ja: "すべて折りたたむ" },
  { projectSlug: "common", key: "actions.apply", namespace: "actions", en: "Apply", id: "Terapkan", ja: "適用" },

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
  { projectSlug: "common", key: "auth.already_have_account", namespace: "auth", en: "Already have an account?", id: "Sudah memiliki akun?", ja: "アカウントをお持ちですか？" },
  { projectSlug: "common", key: "auth.dont_have_account", namespace: "auth", en: "Don't have an account?", id: "Belum punya akun?", ja: "アカウントをお持ちでないですか？" },
  { projectSlug: "common", key: "auth.or_continue_with", namespace: "auth", en: "Or continue with", id: "Atau lanjutkan dengan", ja: "または以下で続ける" },

  // Validation
  { projectSlug: "common", key: "validation.required", namespace: "validation", en: "This field is required", id: "Kolom ini wajib diisi", ja: "この項目は必須です" },
  { projectSlug: "common", key: "validation.invalid_email", namespace: "validation", en: "Please enter a valid email address", id: "Masukkan alamat email yang valid", ja: "有効なメールアドレスを入力してください" },
  { projectSlug: "common", key: "validation.min_length", namespace: "validation", en: "Must be at least {min} characters", id: "Minimal {min} karakter", ja: "{min}文字以上で入力してください" },
  { projectSlug: "common", key: "validation.max_length", namespace: "validation", en: "Must not exceed {max} characters", id: "Maksimal {max} karakter", ja: "{max}文字以内で入力してください" },
  { projectSlug: "common", key: "validation.password_mismatch", namespace: "validation", en: "Passwords do not match", id: "Konfirmasi kata sandi tidak cocok", ja: "パスワードが一致しません" },
  { projectSlug: "common", key: "validation.invalid_url", namespace: "validation", en: "Please enter a valid URL", id: "Masukkan URL tautan yang valid", ja: "有効なURLを入力してください" },
  { projectSlug: "common", key: "validation.numbers_only", namespace: "validation", en: "Only numeric values allowed", id: "Hanya angka yang diperbolehkan", ja: "半角数字のみ入力可能です" },

  // Status
  { projectSlug: "common", key: "status.loading", namespace: "status", en: "Loading...", id: "Memuat...", ja: "読み込み中..." },
  { projectSlug: "common", key: "status.saving", namespace: "status", en: "Saving...", id: "Menyimpan...", ja: "保存中..." },
  { projectSlug: "common", key: "status.processing", namespace: "status", en: "Processing...", id: "Memproses...", ja: "処理中..." },
  { projectSlug: "common", key: "status.success", namespace: "status", en: "Success", id: "Berhasil", ja: "成功" },
  { projectSlug: "common", key: "status.failed", namespace: "status", en: "Failed", id: "Gagal", ja: "失敗" },
  { projectSlug: "common", key: "status.error", namespace: "status", en: "Error Occurred", id: "Terjadi Kesalahan", ja: "エラーが発生しました" },
  { projectSlug: "common", key: "status.active", namespace: "status", en: "Active", id: "Aktif", ja: "有効" },
  { projectSlug: "common", key: "status.inactive", namespace: "status", en: "Inactive", id: "Tidak Aktif", ja: "無効" },
  { projectSlug: "common", key: "status.online", namespace: "status", en: "Online", id: "Online", ja: "オンライン" },
  { projectSlug: "common", key: "status.offline", namespace: "status", en: "Offline", id: "Offline", ja: "オフライン" },
  { projectSlug: "common", key: "status.pending", namespace: "status", en: "Pending", id: "Menunggu", ja: "保留中" },
  { projectSlug: "common", key: "status.completed", namespace: "status", en: "Completed", id: "Selesai", ja: "完了" },
  { projectSlug: "common", key: "status.draft", namespace: "status", en: "Draft", id: "Draf", ja: "下書き" },
  { projectSlug: "common", key: "status.published", namespace: "status", en: "Published", id: "Dipublikasikan", ja: "公開済み" },

  // Nav
  { projectSlug: "common", key: "nav.dashboard", namespace: "nav", en: "Dashboard", id: "Dashboard", ja: "ダッシュボード" },
  { projectSlug: "common", key: "nav.settings", namespace: "nav", en: "Settings", id: "Pengaturan", ja: "設定" },
  { projectSlug: "common", key: "nav.analytics", namespace: "nav", en: "Analytics", id: "Analitik", ja: "分析" },
  { projectSlug: "common", key: "nav.profile", namespace: "nav", en: "Profile", id: "Profil", ja: "プロフィール" },
  { projectSlug: "common", key: "nav.home", namespace: "nav", en: "Home", id: "Beranda", ja: "ホーム" },
  { projectSlug: "common", key: "nav.notifications", namespace: "nav", en: "Notifications", id: "Notifikasi", ja: "通知" },
  { projectSlug: "common", key: "nav.documentation", namespace: "nav", en: "Docs", id: "Dokumentasi", ja: "ドキュメント" },
  { projectSlug: "common", key: "nav.help_center", namespace: "nav", en: "Help Center", id: "Pusat Bantuan", ja: "ヘルプセンター" },

  // Table & Pagination
  { projectSlug: "common", key: "table.no_data", namespace: "table", en: "No data available", id: "Tidak ada data tersedia", ja: "データがありません" },
  { projectSlug: "common", key: "table.showing", namespace: "table", en: "Showing", id: "Menampilkan", ja: "表示中:" },
  { projectSlug: "common", key: "table.to", namespace: "table", en: "to", id: "hingga", ja: "〜" },
  { projectSlug: "common", key: "table.of", namespace: "table", en: "of", id: "dari", ja: "/" },
  { projectSlug: "common", key: "table.results", namespace: "table", en: "results", id: "hasil", ja: "件" },
  { projectSlug: "common", key: "table.per_page", namespace: "table", en: "Rows per page", id: "Baris per halaman", ja: "表示件数" },
  { projectSlug: "common", key: "table.prev", namespace: "table", en: "Previous", id: "Sebelumnya", ja: "前へ" },
  { projectSlug: "common", key: "table.next", namespace: "table", en: "Next", id: "Berikutnya", ja: "次へ" },
  { projectSlug: "common", key: "table.select_all", namespace: "table", en: "Select All", id: "Pilih Semua", ja: "すべて選択" },
  { projectSlug: "common", key: "table.selected_count", namespace: "table", en: "{count} items selected", id: "{count} item dipilih", ja: "{count}件選択中" },

  // Modals & Dialogs
  { projectSlug: "common", key: "modal.confirm_title", namespace: "modal", en: "Confirm Action", id: "Konfirmasi Tindakan", ja: "アクションの確認" },
  { projectSlug: "common", key: "modal.confirm_delete", namespace: "modal", en: "Are you sure you want to permanently delete this item? This action cannot be undone.", id: "Apakah Anda yakin ingin menghapus item ini secara permanen? Tindakan ini tidak dapat dibatalkan.", ja: "このアイテムを完全に削除してもよろしいですか？この操作は元に戻せません。" },
  { projectSlug: "common", key: "modal.unsaved_changes", namespace: "modal", en: "You have unsaved changes. Do you want to leave without saving?", id: "Ada perubahan yang belum disimpan. Yakin ingin keluar tanpa menyimpan?", ja: "保存されていない変更があります。保存せずに移動しますか？" },
  { projectSlug: "common", key: "modal.discard", namespace: "modal", en: "Discard Changes", id: "Buang Perubahan", ja: "変更を破棄" },

  // Toast & Notifications
  { projectSlug: "common", key: "toast.saved_success", namespace: "toast", en: "Changes saved successfully", id: "Perubahan berhasil disimpan", ja: "正常に保存されました" },
  { projectSlug: "common", key: "toast.deleted_success", namespace: "toast", en: "Item deleted successfully", id: "Item berhasil dihapus", ja: "正常に削除されました" },
  { projectSlug: "common", key: "toast.copied_to_clipboard", namespace: "toast", en: "Copied to clipboard!", id: "Disalin ke papan klip!", ja: "クリップボードにコピーしました！" },
  { projectSlug: "common", key: "toast.network_error", namespace: "toast", en: "Network error. Please check your connection.", id: "Kesalahan jaringan. Periksa koneksi internet Anda.", ja: "ネットワークエラーが発生しました。接続を確認してください。" },
  { projectSlug: "common", key: "toast.unauthorized", namespace: "toast", en: "Session expired. Please sign in again.", id: "Sesi telah berakhir. Silakan masuk kembali.", ja: "セッションの有効期限が切れました。再度ログインしてください。" },

  // Time & Dates
  { projectSlug: "common", key: "time.just_now", namespace: "time", en: "Just now", id: "Baru saja", ja: "たった今" },
  { projectSlug: "common", key: "time.minutes_ago", namespace: "time", en: "{m}m ago", id: "{m} mnt lalu", ja: "{m}分前" },
  { projectSlug: "common", key: "time.hours_ago", namespace: "time", en: "{h}h ago", id: "{h} jam lalu", ja: "{h}時間前" },
  { projectSlug: "common", key: "time.days_ago", namespace: "time", en: "{d}d ago", id: "{d} hari lalu", ja: "{d}日前" },
  { projectSlug: "common", key: "time.today", namespace: "time", en: "Today", id: "Hari Ini", ja: "今日" },
  { projectSlug: "common", key: "time.yesterday", namespace: "time", en: "Yesterday", id: "Kemarin", ja: "昨日" },

  // Theme & Language
  { projectSlug: "common", key: "theme.light", namespace: "theme", en: "Light Mode", id: "Mode Terang", ja: "ライトモード" },
  { projectSlug: "common", key: "theme.dark", namespace: "theme", en: "Dark Mode", id: "Mode Gelap", ja: "ダークモード" },
  { projectSlug: "common", key: "theme.system", namespace: "theme", en: "System Preference", id: "Ikuti Sistem", ja: "システム設定に従う" },
  { projectSlug: "common", key: "language.switch", namespace: "language", en: "Switch Language", id: "Ganti Bahasa", ja: "言語を切り替える" },


  // ─────────────────────────────────────────────────────────────
  // 2. UPLOADBOX (Storage, CDN Media Delivery, Image Studio)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "uploadbox", key: "hero.title", namespace: "hero", en: "Modern File Infrastructure & Edge Delivery", id: "Infrastruktur File Modern & Pengiriman CDN Cerdas", ja: "モダンなファイル基盤とエッジ配信" },
  { projectSlug: "uploadbox", key: "hero.subtitle", namespace: "hero", en: "Lightning-fast asset management, dynamic image transformations, and enterprise cloud distribution.", id: "Manajemen aset secepat kilat, transformasi gambar dinamis, dan distribusi cloud kelas enterprise.", ja: "超高速アセット管理、動的画像変換、エンタープライズクラウド配信。" },
  { projectSlug: "uploadbox", key: "hero.cta_upload", namespace: "hero", en: "Upload Files Now", id: "Mulai Unggah File", ja: "今すぐアップロード" },
  { projectSlug: "uploadbox", key: "hero.cta_explore", namespace: "hero", en: "Explore Storage", id: "Jelajahi Penyimpanan", ja: "ストレージを見る" },

  // Upload Area
  { projectSlug: "uploadbox", key: "upload.title", namespace: "upload", en: "File Dropzone", id: "Zona Unggah File", ja: "ファイルアップロード" },
  { projectSlug: "uploadbox", key: "upload.drag_drop", namespace: "upload", en: "Drag & drop files here, or click to browse", id: "Tarik & lepas file di sini, atau klik untuk memilih", ja: "ファイルをここにドラッグ＆ドロップ、またはクリックして選択" },
  { projectSlug: "uploadbox", key: "upload.max_size_hint", namespace: "upload", en: "Supports files up to 2GB each. Images, videos, archives, and docs.", id: "Mendukung file hingga 2GB per file. Gambar, video, arsip, dan dokumen.", ja: "最大2GBまでのファイルに対応（画像・動画・圧縮ファイル・文書）" },
  { projectSlug: "uploadbox", key: "upload.uploading_count", namespace: "upload", en: "Uploading {current} of {total} files...", id: "Mengunggah {current} dari {total} file...", ja: "{current}/{total}件のファイルをアップロード中..." },
  { projectSlug: "uploadbox", key: "upload.all_done", namespace: "upload", en: "All uploads completed successfully!", id: "Semua file berhasil diunggah!", ja: "すべてのアップロードが完了しました！" },

  // Analytics View
  { projectSlug: "uploadbox", key: "analytics.title", namespace: "analytics", en: "Usage & Analytics", id: "Penggunaan & Analitik", ja: "利用状況と分析" },
  { projectSlug: "uploadbox", key: "analytics.subtitle", namespace: "analytics", en: "Real-time storage insights, upload trends, and distribution", id: "Wawasan penyimpanan real-time, tren unggahan, dan distribusi data", ja: "リアルタイムのストレージ状況、アップロード推移、配信統計" },
  { projectSlug: "uploadbox", key: "analytics.live_metrics", namespace: "analytics", en: "Live Metrics", id: "Metrik Langsung", ja: "ライブメトリクス" },
  { projectSlug: "uploadbox", key: "analytics.total_assets", namespace: "analytics", en: "Total Assets", id: "Total Aset", ja: "総アセット数" },
  { projectSlug: "uploadbox", key: "analytics.total_assets_sub", namespace: "analytics", en: "Stored across all folders", id: "Tersimpan di seluruh folder", ja: "全フォルダの合計" },
  { projectSlug: "uploadbox", key: "analytics.storage_used", namespace: "analytics", en: "Storage Used", id: "Kapasitas Terpakai", ja: "使用ストレージ容量" },
  { projectSlug: "uploadbox", key: "analytics.bandwidth", namespace: "analytics", en: "CDN Bandwidth Consumed", id: "Bandwidth CDN Digunakan", ja: "消費CDN帯域幅" },
  { projectSlug: "uploadbox", key: "analytics.downloads_count", namespace: "analytics", en: "Monthly Downloads", id: "Total Unduhan Bulanan", ja: "月間ダウンロード数" },
  { projectSlug: "uploadbox", key: "analytics.storage_by_type", namespace: "analytics", en: "Storage by File Type", id: "Distribusi Berdasarkan Tipe File", ja: "ファイル形式別ストレージ" },
  { projectSlug: "uploadbox", key: "analytics.upload_velocity", namespace: "analytics", en: "Upload Activity Trend", id: "Tren Aktivitas Unggahan", ja: "アップロード推移グラフ" },

  // Files Browser
  { projectSlug: "uploadbox", key: "files.my_files", namespace: "files", en: "My Storage Vault", id: "Gudang Berkas Saya", ja: "マイトレージ" },
  { projectSlug: "uploadbox", key: "files.new_folder", namespace: "files", en: "New Folder", id: "Folder Baru", ja: "新しいフォルダ" },
  { projectSlug: "uploadbox", key: "files.folder_name_placeholder", namespace: "files", en: "Enter folder name...", id: "Masukkan nama folder...", ja: "フォルダ名を入力..." },
  { projectSlug: "uploadbox", key: "files.sort_name", namespace: "files", en: "Sort by Name", id: "Urutkan Nama", ja: "名前順" },
  { projectSlug: "uploadbox", key: "files.sort_date", namespace: "files", en: "Sort by Date", id: "Urutkan Tanggal", ja: "更新日時順" },
  { projectSlug: "uploadbox", key: "files.sort_size", namespace: "files", en: "Sort by Size", id: "Urutkan Ukuran", ja: "サイズ順" },
  { projectSlug: "uploadbox", key: "files.grid_view", namespace: "files", en: "Grid View", id: "Tampilan Grid", ja: "グリッド表示" },
  { projectSlug: "uploadbox", key: "files.list_view", namespace: "files", en: "List View", id: "Tampilan Daftar", ja: "リスト表示" },
  { projectSlug: "uploadbox", key: "files.empty_vault", namespace: "files", en: "No files found in this directory", id: "Belum ada berkas di folder ini", ja: "このフォルダにはファイルがありません" },

  // Details
  { projectSlug: "uploadbox", key: "details.file_info", namespace: "details", en: "Asset Metadata", id: "Informasi Berkas", ja: "アセット情報" },
  { projectSlug: "uploadbox", key: "details.dimensions", namespace: "details", en: "Dimensions", id: "Dimensi", ja: "解像度" },
  { projectSlug: "uploadbox", key: "details.mime_type", namespace: "details", en: "Content Type", id: "Tipe Konten", ja: "コンテンツ形式" },
  { projectSlug: "uploadbox", key: "details.copy_cdn_link", namespace: "details", en: "Copy Edge CDN URL", id: "Salin Link CDN Edge", ja: "CDNエッジURLをコピー" },
  { projectSlug: "uploadbox", key: "details.open_editor", namespace: "details", en: "Open Image Studio", id: "Buka Editor Gambar", ja: "画像エディタを開く" },

  // Image Studio Editor
  { projectSlug: "uploadbox", key: "editor.title", namespace: "editor", en: "Image Studio Editor", id: "Studio Editor Gambar", ja: "画像スタジオエディタ" },
  { projectSlug: "uploadbox", key: "editor.crop", namespace: "editor", en: "Crop & Aspect Ratio", id: "Potong & Rasio Aspek", ja: "切り抜き・比率" },
  { projectSlug: "uploadbox", key: "editor.rotate_left", namespace: "editor", en: "Rotate Left", id: "Putar Kiri", ja: "左90度回転" },
  { projectSlug: "uploadbox", key: "editor.rotate_right", namespace: "editor", en: "Rotate Right", id: "Putar Kanan", ja: "右90度回転" },
  { projectSlug: "uploadbox", key: "editor.brightness", namespace: "editor", en: "Brightness", id: "Kecerahan", ja: "明るさ" },
  { projectSlug: "uploadbox", key: "editor.contrast", namespace: "editor", en: "Contrast", id: "Kontras", ja: "コントラスト" },
  { projectSlug: "uploadbox", key: "editor.saturation", namespace: "editor", en: "Saturation", id: "Saturasi Warna", ja: "彩度" },
  { projectSlug: "uploadbox", key: "editor.watermark", namespace: "editor", en: "Watermark Overlay", id: "Tanda Air (Watermark)", ja: "透かしオーバーレイ" },
  { projectSlug: "uploadbox", key: "editor.save_as_new", namespace: "editor", en: "Save as New Copy", id: "Simpan Salinan Baru", ja: "コピーとして保存" },

  // Groups & Collaboration
  { projectSlug: "uploadbox", key: "groups.title", namespace: "groups", en: "Shared Spaces & Workspaces", id: "Ruang Bersama & Kolaborasi", ja: "共有スペース・ワークスペース" },
  { projectSlug: "uploadbox", key: "groups.create_space", namespace: "groups", en: "Create Shared Space", id: "Buat Ruang Bersama", ja: "共有スペースを作成" },
  { projectSlug: "uploadbox", key: "groups.invite_email", namespace: "groups", en: "Invite collaborator by email...", id: "Undang rekan via email...", ja: "メールでメンバーを招待..." },
  { projectSlug: "uploadbox", key: "groups.role_admin", namespace: "groups", en: "Administrator", id: "Administrator", ja: "管理者" },
  { projectSlug: "uploadbox", key: "groups.role_editor", namespace: "groups", en: "Editor (Upload & Delete)", id: "Editor (Unggah & Hapus)", ja: "編集者" },
  { projectSlug: "uploadbox", key: "groups.role_viewer", namespace: "groups", en: "Viewer (Read Only)", id: "Pelihat (Hanya Baca)", ja: "閲覧者" },

  // Trash
  { projectSlug: "uploadbox", key: "trash.title", namespace: "trash", en: "Recycle Bin", id: "Tempat Sampah", ja: "ゴミ箱" },
  { projectSlug: "uploadbox", key: "trash.retention_alert", namespace: "trash", en: "Deleted items will be permanently erased after 30 days.", id: "Item yang dihapus akan dimusnahkan permanen setelah 30 hari.", ja: "削除されたアイテムは30日後に完全に消去されます。" },
  { projectSlug: "uploadbox", key: "trash.empty_bin", namespace: "trash", en: "Empty Recycle Bin", id: "Kosongkan Tempat Sampah", ja: "ゴミ箱を空にする" },
  { projectSlug: "uploadbox", key: "trash.restore_file", namespace: "trash", en: "Restore Asset", id: "Pulihkan Berkas", ja: "復元する" },
  { projectSlug: "uploadbox", key: "trash.delete_permanent", namespace: "trash", en: "Erase Permanently", id: "Hapus Permanen", ja: "完全に消去" },

  // Public Share
  { projectSlug: "uploadbox", key: "share.public_link", namespace: "share", en: "Public Sharing Link", id: "Tautan Berbagi Publik", ja: "公開共有リンク" },
  { projectSlug: "uploadbox", key: "share.password_protect", namespace: "share", en: "Password Protection", id: "Lindungi dengan Kata Sandi", ja: "パスワード保護" },
  { projectSlug: "uploadbox", key: "share.expiry_time", namespace: "share", en: "Auto-Expire Link", id: "Batas Waktu Tautan", ja: "リンク有効期限" },
  { projectSlug: "uploadbox", key: "share.download_bundle", namespace: "share", en: "Download All as ZIP", id: "Unduh Semua (.ZIP)", ja: "ZIPで一括ダウンロード" },


  // ─────────────────────────────────────────────────────────────
  // 3. NEXUS CHAT (Channels, Direct Messages, AI Docs, Voice)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "nexus-chat", key: "chat.channels_title", namespace: "chat", en: "Channels & Rooms", id: "Kanal & Obrolan Grup", ja: "チャンネル一覧" },
  { projectSlug: "nexus-chat", key: "chat.dm_title", namespace: "chat", en: "Direct Messages", id: "Pesan Langsung (DM)", ja: "ダイレクトメッセージ" },
  { projectSlug: "nexus-chat", key: "chat.create_channel", namespace: "chat", en: "Create New Channel", id: "Buat Kanal Baru", ja: "新規チャンネル作成" },
  { projectSlug: "nexus-chat", key: "chat.channel_name_label", namespace: "chat", en: "Channel Name", id: "Nama Kanal", ja: "チャンネル名" },
  { projectSlug: "nexus-chat", key: "chat.channel_topic_label", namespace: "chat", en: "Topic / Description", id: "Topik Pembahasan", ja: "トピック・説明" },
  { projectSlug: "nexus-chat", key: "chat.type_message_placeholder", namespace: "chat", en: "Type your message or press / for AI commands...", id: "Ketik pesan Anda atau tekan / untuk perintah AI...", ja: "メッセージを入力、または / でAIコマンド..." },
  { projectSlug: "nexus-chat", key: "chat.send_button", namespace: "chat", en: "Send Message", id: "Kirim Pesan", ja: "送信" },
  { projectSlug: "nexus-chat", key: "chat.voice_record_start", namespace: "chat", en: "Record Voice Message", id: "Rekam Pesan Suara", ja: "音声メッセージを録音" },
  { projectSlug: "nexus-chat", key: "chat.voice_recording_active", namespace: "chat", en: "Recording voice...", id: "Sedang merekam suara...", ja: "録音中..." },
  { projectSlug: "nexus-chat", key: "chat.attach_files", namespace: "chat", en: "Attach Media or Documents", id: "Lampirkan Media atau Dokumen", ja: "メディアやファイルを添付" },
  { projectSlug: "nexus-chat", key: "chat.reply_in_thread", namespace: "chat", en: "Reply in Thread", id: "Balas di Utas (Thread)", ja: "スレッドで返信" },
  { projectSlug: "nexus-chat", key: "chat.pin_message", namespace: "chat", en: "Pin to Conversation", id: "Sematkan Pesan", ja: "メッセージをピン留め" },
  { projectSlug: "nexus-chat", key: "chat.pinned_items", namespace: "chat", en: "Pinned Messages", id: "Pesan yang Disematkan", ja: "ピン留め一覧" },
  { projectSlug: "nexus-chat", key: "chat.search_messages", namespace: "chat", en: "Search history...", id: "Cari riwayat percakapan...", ja: "メッセージを検索..." },
  { projectSlug: "nexus-chat", key: "chat.typing_indicator", namespace: "chat", en: "{user} is typing...", id: "{user} sedang mengetik...", ja: "{user}が入力中..." },
  { projectSlug: "nexus-chat", key: "chat.members_online_count", namespace: "chat", en: "{count} members online", id: "{count} anggota online", ja: "{count}人がオンライン" },
  { projectSlug: "nexus-chat", key: "chat.empty_conversation", namespace: "chat", en: "Start a new conversation!", id: "Mulai percakapan baru yang menarik!", ja: "会話を始めましょう！" },

  // AI Knowledge Assistant & Prompts
  { projectSlug: "nexus-chat", key: "ai.knowledge_base_title", namespace: "ai", en: "Knowledge Base & AI Assistant", id: "Pusat Pengetahuan & Asisten AI", ja: "ナレッジベースとAIアシスタント" },
  { projectSlug: "nexus-chat", key: "ai.upload_docs", namespace: "ai", en: "Upload Reference PDF / Markdown", id: "Unggah Dokumen Referensi (PDF/MD)", ja: "参照ドキュメントをアップロード" },
  { projectSlug: "nexus-chat", key: "ai.summarize_channel", namespace: "ai", en: "Summarize Discussion", id: "Ringkas Percakapan Kanal Ini", ja: "会話スレッドを要約" },
  { projectSlug: "nexus-chat", key: "ai.prompt_library", namespace: "ai", en: "System Prompt Library", id: "Pustaka Prompt Sistem", ja: "プロンプトテンプレート集" },
  { projectSlug: "nexus-chat", key: "ai.ai_is_thinking", namespace: "ai", en: "Nexus AI is generating response...", id: "Nexus AI sedang merumuskan jawaban...", ja: "Nexus AIが応答を生成中..." },


  // ─────────────────────────────────────────────────────────────
  // 4. MINIHOST (Mini VPS Control Panel, Containers, SSL, Metrics)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "minihost", key: "dash.title", namespace: "dash", en: "Edge VPS Infrastructure", id: "Infrastruktur VPS Mini & Node", ja: "エッジVPS基盤" },
  { projectSlug: "minihost", key: "dash.cluster_status", namespace: "dash", en: "Cluster Health", id: "Kesehatan Node Cluster", ja: "クラスタ状態" },
  { projectSlug: "minihost", key: "metrics.cpu", namespace: "metrics", en: "CPU Utilization", id: "Beban Prosesor (CPU)", ja: "CPU使用率" },
  { projectSlug: "minihost", key: "metrics.ram", namespace: "metrics", en: "Memory (RAM)", id: "Memori (RAM)", ja: "メモリ使用量" },
  { projectSlug: "minihost", key: "metrics.disk", namespace: "metrics", en: "NVMe Storage Disk", id: "Penyimpanan Harddisk (NVMe)", ja: "ディスク使用量" },
  { projectSlug: "minihost", key: "metrics.network_in", namespace: "metrics", en: "Inbound Network", id: "Lalu Lintas Masuk (Inbound)", ja: "インバウンドトラフィック" },
  { projectSlug: "minihost", key: "metrics.network_out", namespace: "metrics", en: "Outbound Network", id: "Lalu Lintas Keluar (Outbound)", ja: "アウトバウンドトラフィック" },
  { projectSlug: "minihost", key: "metrics.uptime", namespace: "metrics", en: "Server Uptime", id: "Waktu Aktif Server", ja: "稼働時間 (Uptime)" },
  { projectSlug: "minihost", key: "metrics.temperature", namespace: "metrics", en: "Core Temperature", id: "Suhu Inti Hardware", ja: "コア温度" },

  // Containers & Apps
  { projectSlug: "minihost", key: "apps.deploy_new", namespace: "apps", en: "Deploy New Service", id: "Deploy Layanan Baru", ja: "新しいサービスをデプロイ" },
  { projectSlug: "minihost", key: "apps.container_status", namespace: "apps", en: "Container Status", id: "Status Kontainer", ja: "コンテナステータス" },
  { projectSlug: "minihost", key: "apps.git_repo", namespace: "apps", en: "Git Repository URL", id: "Alamat Git Repository", ja: "GitリポジトリURL" },
  { projectSlug: "minihost", key: "apps.branch_name", namespace: "apps", en: "Branch Name", id: "Nama Branch", ja: "ブランチ名" },
  { projectSlug: "minihost", key: "apps.env_vars", namespace: "apps", en: "Environment Variables (.env)", id: "Variabel Lingkungan (.env)", ja: "環境変数 (.env)" },
  { projectSlug: "minihost", key: "apps.action_restart", namespace: "apps", en: "Restart Service", id: "Mulai Ulang Layanan", ja: "サービスを再起動" },
  { projectSlug: "minihost", key: "apps.action_stop", namespace: "apps", en: "Stop Container", id: "Hentikan Kontainer", ja: "コンテナを停止" },
  { projectSlug: "minihost", key: "apps.action_rebuild", namespace: "apps", en: "Rebuild Image (Zero Downtime)", id: "Build Ulang (Tanpa Downtime)", ja: "リビルド実行" },
  { projectSlug: "minihost", key: "apps.live_logs", namespace: "apps", en: "Live Container Logs", id: "Log Kontainer Real-Time", ja: "リアルタイムログ" },

  // Domains & SSL
  { projectSlug: "minihost", key: "domains.title", namespace: "domains", en: "Domains & Reverse Proxy", id: "Domain & Reverse Proxy", ja: "ドメインとリバースプロキシ" },
  { projectSlug: "minihost", key: "domains.add_domain", namespace: "domains", en: "Connect Custom Domain", id: "Sambungkan Domain Kustom", ja: "独自ドメインを接続" },
  { projectSlug: "minihost", key: "domains.ssl_auto", namespace: "domains", en: "Automatic Let's Encrypt SSL", id: "Sertifikat SSL Otomatis", ja: "Let's Encrypt SSL自動発行" },
  { projectSlug: "minihost", key: "domains.dns_records", namespace: "domains", en: "DNS Routing Status", id: "Status Pengaturan DNS", ja: "DNSルーティング状態" },

  // Databases
  { projectSlug: "minihost", key: "db.title", namespace: "db", en: "Managed Databases", id: "Pusat Database Terkelola", ja: "マネージドデータベース" },
  { projectSlug: "minihost", key: "db.create_new", namespace: "db", en: "Create Database Instance", id: "Buat Instance Database", ja: "データベースを作成" },
  { projectSlug: "minihost", key: "db.connection_string", namespace: "db", en: "Connection URI", id: "String Koneksi", ja: "接続文字列" },
  { projectSlug: "minihost", key: "db.backup_now", namespace: "db", en: "Trigger Manual Backup", id: "Cadangkan Sekarang", ja: "バックアップを実行" },

  // Web Terminal & Tunnels
  { projectSlug: "minihost", key: "terminal.title", namespace: "terminal", en: "Web SSH Terminal", id: "Terminal Shell Web (SSH)", ja: "Web SSHターミナル" },
  { projectSlug: "minihost", key: "tunnel.title", namespace: "tunnel", en: "Public Edge Tunnels", id: "Tunnel Akses Publik", ja: "パブリックエッジトンネル" },
  { projectSlug: "minihost", key: "tunnel.create", namespace: "tunnel", en: "Expose Local Port", id: "Buka Port Lokal ke Internet", ja: "ローカルポートを公開" },


  // ─────────────────────────────────────────────────────────────
  // 5. WABRIDGE (WhatsApp Gateway, Broadcast Campaigns, Webhooks)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "wabridge", key: "device.title", namespace: "device", en: "WhatsApp Device Sessions", id: "Sesi Perangkat WhatsApp", ja: "WhatsAppデバイスセッション" },
  { projectSlug: "wabridge", key: "device.scan_qr_prompt", namespace: "device", en: "Scan QR Code on your WhatsApp App", id: "Pindai Kode QR melalui Aplikasi WhatsApp", ja: "WhatsAppアプリでQRコードをスキャン" },
  { projectSlug: "wabridge", key: "device.pairing_code", namespace: "device", en: "Or link with phone number pairing code", id: "Atau tautkan via kode nomor telepon", ja: "電話番号ペアリングコードで連携" },
  { projectSlug: "wabridge", key: "device.status_connected", namespace: "device", en: "Engine Connected & Synced", id: "Perangkat Terhubung & Sinkron", ja: "接続完了・同期中" },
  { projectSlug: "wabridge", key: "device.status_disconnected", namespace: "device", en: "Disconnected - Scan Required", id: "Terputus - Perlu Pindai Ulang", ja: "切断 - 再スキャンが必要です" },
  { projectSlug: "wabridge", key: "device.battery_level", namespace: "device", en: "Device Battery", id: "Status Baterai HP", ja: "端末バッテリー残量" },

  // Messages & Broadcasts
  { projectSlug: "wabridge", key: "message.send_direct", namespace: "message", en: "Send Direct WhatsApp Message", id: "Kirim Pesan WhatsApp Langsung", ja: "ダイレクトメッセージ送信" },
  { projectSlug: "wabridge", key: "message.recipient_number", namespace: "message", en: "Recipient Phone Number (with Country Code)", id: "Nomor HP Penerima (dengan kode negara)", ja: "送信先電話番号（国番号含む）" },
  { projectSlug: "wabridge", key: "message.broadcast_campaigns", namespace: "message", en: "Broadcast Campaigns", id: "Kampanye Siaran Massal", ja: "一斉配信キャンペーン" },
  { projectSlug: "wabridge", key: "message.new_campaign", namespace: "message", en: "Create New Campaign", id: "Buat Kampanye Siaran Baru", ja: "新しいキャンペーンを作成" },
  { projectSlug: "wabridge", key: "message.import_contacts_csv", namespace: "message", en: "Upload Contact Numbers (.CSV)", id: "Unggah Kontak Penerima (.CSV)", ja: "連絡先CSVをアップロード" },
  { projectSlug: "wabridge", key: "message.delivery_rate", namespace: "message", en: "Successful Delivery Rate", id: "Tingkat Keberhasilan Pengiriman", ja: "配信成功率" },

  // Auto-Reply & Webhooks
  { projectSlug: "wabridge", key: "bot.rules_title", namespace: "bot", en: "Auto-Reply Keyword Rules", id: "Aturan Balas Otomatis (Kata Kunci)", ja: "自動応答キーワード設定" },
  { projectSlug: "wabridge", key: "bot.trigger_keyword", namespace: "bot", en: "Incoming Trigger Keyword", id: "Kata Kunci Pemicu", ja: "トリガーキーワード" },
  { projectSlug: "wabridge", key: "bot.response_content", namespace: "bot", en: "Automated Reply Message", id: "Pesan Tanggapan Otomatis", ja: "自動返信本文" },
  { projectSlug: "wabridge", key: "webhook.title", namespace: "webhook", en: "Incoming Webhook Dispatcher", id: "Distributor Webhook Masuk", ja: "Webhook受信ディスパッチャ" },
  { projectSlug: "wabridge", key: "webhook.test_event", namespace: "webhook", en: "Send Test Webhook Payload", id: "Kirim Sampel Event Webhook", ja: "テストWebhookを送信" },
  { projectSlug: "wabridge", key: "api.docs_btn", namespace: "api", en: "REST API Documentation", id: "Dokumentasi REST API", ja: "REST API仕様書" },


  // ─────────────────────────────────────────────────────────────
  // 6. ARSIP DIGITAL (Document Archives, Disposisi, Klasifikasi)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "arsip-digital", key: "archive.inbox", namespace: "archive", en: "Incoming Mails / Letters", id: "Surat Masuk", ja: "受信文書" },
  { projectSlug: "arsip-digital", key: "archive.outbox", namespace: "archive", en: "Outgoing Mails / Letters", id: "Surat Keluar", ja: "送信文書" },
  { projectSlug: "arsip-digital", key: "archive.doc_title", namespace: "archive", en: "Letter Subject / Title", id: "Perihal / Judul Surat", ja: "文書件名・題目" },
  { projectSlug: "arsip-digital", key: "archive.doc_number", namespace: "archive", en: "Letter Registration Number", id: "Nomor Registrasi Surat", ja: "文書整理番号" },
  { projectSlug: "arsip-digital", key: "archive.agenda_number", namespace: "archive", en: "Agenda Register Index", id: "Nomor Buku Agenda", ja: "受付台帳番号" },
  { projectSlug: "arsip-digital", key: "archive.sender", namespace: "archive", en: "Sender Origin / Organization", id: "Instansi Pengirim", ja: "差出人・組織" },
  { projectSlug: "arsip-digital", key: "archive.recipient", namespace: "archive", en: "Target Destination", id: "Tujuan Surat", ja: "宛先" },
  { projectSlug: "arsip-digital", key: "archive.date_letter", namespace: "archive", en: "Letter Date", id: "Tanggal Surat", ja: "文書発行日" },
  { projectSlug: "arsip-digital", key: "archive.date_received", namespace: "archive", en: "Date Received & Recorded", id: "Tanggal Diterima", ja: "収受年月日" },
  { projectSlug: "arsip-digital", key: "archive.classification", namespace: "archive", en: "Code Classification", id: "Kode Klasifikasi Arsip", ja: "文書分類コード" },
  { projectSlug: "arsip-digital", key: "archive.retention_period", namespace: "archive", en: "Retention Schedule Period", id: "Jadwal Retensi Arsip (JRA)", ja: "保存期間 (JRA)" },
  { projectSlug: "arsip-digital", key: "archive.storage_box", namespace: "archive", en: "Physical Shelf / Box Location", id: "Lokasi Fisik / Nomor Rak Box", ja: "保管書架・保管箱番号" },

  // Disposisi & Verifikasi
  { projectSlug: "arsip-digital", key: "disposisi.sheet_title", namespace: "disposisi", en: "Disposition Sheet", id: "Lembar Disposisi Surat", ja: "供覧・指示票" },
  { projectSlug: "arsip-digital", key: "disposisi.assigned_to", namespace: "disposisi", en: "Forward / Assign To", id: "Disposisi Diteruskan Kepada", ja: "指示先・担当者" },
  { projectSlug: "arsip-digital", key: "disposisi.instructions", namespace: "disposisi", en: "Follow-up Instructions", id: "Instruksi / Catatan Pimpinan", ja: "指示内容・備考" },
  { projectSlug: "arsip-digital", key: "disposisi.status", namespace: "disposisi", en: "Disposition Status", id: "Status Tindak Lanjut", ja: "進捗ステータス" },
  { projectSlug: "arsip-digital", key: "security.confidential", namespace: "security", en: "Confidential / Secret", id: "Rahasia / Terbatas", ja: "極秘・秘密文書" },
  { projectSlug: "arsip-digital", key: "security.vital", namespace: "security", en: "Vital Permanent Archive", id: "Arsip Vital Permanen", ja: "重要恒久アーカイブ" },
  { projectSlug: "arsip-digital", key: "security.public", namespace: "security", en: "Public Record", id: "Dokumen Publik", ja: "公開公文書" },


  // ─────────────────────────────────────────────────────────────
  // 7. PORTFOLIO (Personal Developer Showcase & CV)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "portfolio", key: "hero.greeting", namespace: "hero", en: "Hello, I am", id: "Halo, saya", ja: "こんにちは、" },
  { projectSlug: "portfolio", key: "hero.role", namespace: "hero", en: "Full-Stack Software Engineer & Cloud Architect", id: "Software Engineer Full-Stack & Arsitek Cloud", ja: "フルスタックエンジニア & クラウドアーキテクト" },
  { projectSlug: "portfolio", key: "hero.bio", namespace: "hero", en: "Crafting resilient cloud infrastructure, modern web applications, and intuitive developer experiences.", id: "Membangun infrastruktur cloud tangguh, aplikasi web modern, dan pengalaman pengembang yang intuitif.", ja: "堅牢なクラウド基盤、最新のWebアプリ、直感的な開発者体験を構築。" },
  { projectSlug: "portfolio", key: "hero.hire_me", namespace: "hero", en: "Get In Touch", id: "Hubungi Saya", ja: "お問い合わせ" },
  { projectSlug: "portfolio", key: "hero.download_cv", namespace: "hero", en: "Download Resume", id: "Unduh CV / Resume", ja: "履歴書ダウンロード" },

  // Tech Stack & Projects
  { projectSlug: "portfolio", key: "skills.title", namespace: "skills", en: "Technical Arsenal & Frameworks", id: "Keahlian Teknis & Framework", ja: "技術スタック & スキル" },
  { projectSlug: "portfolio", key: "skills.experience_years", namespace: "skills", en: "{years}+ Years Commercial Experience", id: "{years}+ Tahun Pengalaman Profesional", ja: "{years}+年の開発実務経験" },
  { projectSlug: "portfolio", key: "projects.featured", namespace: "projects", en: "Featured Works & Experiments", id: "Karya Unggulan & Eksperimen", ja: "注目の実績と制作事例" },
  { projectSlug: "portfolio", key: "projects.view_live", namespace: "projects", en: "Live Demo", id: "Lihat Demo", ja: "ライブデモ" },
  { projectSlug: "portfolio", key: "projects.source_code", namespace: "projects", en: "Source Code", id: "Kode Sumber", ja: "ソースコード" },
  { projectSlug: "portfolio", key: "contact.title", namespace: "contact", en: "Let's Build Something Together", id: "Mari Bangun Sesuatu Bersama", ja: "一緒に創り上げましょう" },
  { projectSlug: "portfolio", key: "contact.send_message", namespace: "contact", en: "Send Message", id: "Kirim Pesan Sekarang", ja: "メッセージを送信" },
  { projectSlug: "portfolio", key: "contact.success_notice", namespace: "contact", en: "Thank you! I will get back to you within 24 hours.", id: "Terima kasih! Saya akan membalas pesan Anda dalam 24 jam.", ja: "ありがとうございます！24時間以内に返信いたします。" },


  // ─────────────────────────────────────────────────────────────
  // 8. UML-FLOW (Interactive Diagramming, Architecture & Modeling)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "uml-flow", key: "canvas.title", namespace: "canvas", en: "Architecture & UML Modeling Canvas", id: "Kanvas Pemodelan Arsitektur & UML", ja: "UMLモデリングキャンバス" },
  { projectSlug: "uml-flow", key: "canvas.zoom_in", namespace: "canvas", en: "Zoom In", id: "Perbesar", ja: "ズームイン" },
  { projectSlug: "uml-flow", key: "canvas.zoom_out", namespace: "canvas", en: "Zoom Out", id: "Perkecil", ja: "ズームアウト" },
  { projectSlug: "uml-flow", key: "canvas.fit_view", namespace: "canvas", en: "Fit to Viewport", id: "Paskan Layar", ja: "全体表示" },
  { projectSlug: "uml-flow", key: "canvas.snap_grid", namespace: "canvas", en: "Snap to Grid", id: "Ratakan ke Garis Kisi", ja: "グリッド吸着" },
  { projectSlug: "uml-flow", key: "canvas.undo", namespace: "canvas", en: "Undo", id: "Batalkan", ja: "元に戻す" },
  { projectSlug: "uml-flow", key: "canvas.redo", namespace: "canvas", en: "Redo", id: "Ulangi", ja: "やり直す" },
  { projectSlug: "uml-flow", key: "tools.add_class", namespace: "tools", en: "Add Class Box", id: "Tambah Kotak Kelas", ja: "クラスを追加" },
  { projectSlug: "uml-flow", key: "tools.add_interface", namespace: "tools", en: "Add Interface", id: "Tambah Antarmuka (Interface)", ja: "インターフェースを追加" },
  { projectSlug: "uml-flow", key: "tools.add_relationship", namespace: "tools", en: "Connect Arrow", id: "Hubungkan Garis Panah", ja: "リレーション矢印" },
  { projectSlug: "uml-flow", key: "tools.export_png", namespace: "tools", en: "Export as High-Res PNG", id: "Ekspor sebagai Gambar PNG", ja: "PNG形式でエクスポート" },
  { projectSlug: "uml-flow", key: "tools.export_svg", namespace: "tools", en: "Export as Vector SVG", id: "Ekspor sebagai Vektor SVG", ja: "SVGベクトルでエクスポート" },
  { projectSlug: "uml-flow", key: "tools.export_json", namespace: "tools", en: "Export Schema (.JSON)", id: "Ekspor Struktur (.JSON)", ja: "JSON定義を書き出す" },


  // ─────────────────────────────────────────────────────────────
  // 9. IRMA-IRYANI (Personal / Agency Branding & Consultation)
  // ─────────────────────────────────────────────────────────────
  { projectSlug: "irma-iryani", key: "brand.tagline", namespace: "brand", en: "Professional Consultation & Creative Strategy", id: "Konsultasi Profesional & Strategi Kreatif", ja: "プロフェッショナル・コンサルティング & クリエイティブ戦略" },
  { projectSlug: "irma-iryani", key: "brand.about_title", namespace: "brand", en: "About & Vision", id: "Tentang Kami & Visi", ja: "事業案内とビジョン" },
  { projectSlug: "irma-iryani", key: "brand.services_title", namespace: "brand", en: "Premium Services & Solutions", id: "Layanan Unggulan & Solusi", ja: "提供サービス・ソリューション" },
  { projectSlug: "irma-iryani", key: "booking.schedule_cta", namespace: "booking", en: "Book a Consultation Session", id: "Jadwalkan Sesi Konsultasi", ja: "相談セッションを予約" },
  { projectSlug: "irma-iryani", key: "booking.select_date", namespace: "booking", en: "Select Available Date", id: "Pilih Tanggal yang Tersedia", ja: "希望日程を選択" },
  { projectSlug: "irma-iryani", key: "booking.select_time", namespace: "booking", en: "Select Time Slot", id: "Pilih Jam Konsultasi", ja: "時間帯を選択" },
  { projectSlug: "irma-iryani", key: "blog.latest_articles", namespace: "blog", en: "Latest Insights & Thought Leadership", id: "Artikel & Wawasan Terbaru", ja: "最新のコラム・考察" },
  { projectSlug: "irma-iryani", key: "faq.title", namespace: "faq", en: "Frequently Asked Questions", id: "Pertanyaan yang Sering Diajukan", ja: "よくあるご質問 (FAQ)" }
];

export async function seedAllKeys() {
  console.log("🌱 [Polyglot Hub] Seeding complete enterprise translation catalog...");

  // Ensure all 9 projects exist
  const projectsToEnsure = [
    { slug: "common", name: "Common & Universal", desc: "Shared buttons, auth, dialogs, validation, and table widgets", icon: "🌐" },
    { slug: "uploadbox", name: "UploadBox CDN", desc: "Edge storage, dropzone, analytics, and image studio", icon: "📦" },
    { slug: "nexus-chat", name: "Nexus Chat", desc: "Real-time channels, DM, voice notes, and AI assistant", icon: "💬" },
    { slug: "minihost", name: "Mini VPS Panel", desc: "Edge cluster, container orchestrator, metrics, SSL, and terminal", icon: "⚡" },
    { slug: "wabridge", name: "WA Bridge Gateway", desc: "WhatsApp API bridge, QR scanner, and broadcast campaigns", icon: "📱" },
    { slug: "arsip-digital", name: "Arsip Digital", desc: "Document indexation, mail tracking, disposition, and retention", icon: "📑" },
    { slug: "portfolio", name: "Portfolio Web", desc: "Personal developer showcase, technical stack, and CV", icon: "🚀" },
    { slug: "uml-flow", name: "UML Flow Studio", desc: "Interactive architecture diagramming and vector modeling", icon: "📐" },
    { slug: "irma-iryani", name: "Irma Iryani Web", desc: "Creative brand consulting, booking, and thought leadership", icon: "✨" },
  ];

  for (const p of projectsToEnsure) {
    if (!db.getProjectBySlug(p.slug)) {
      db.createProject(p.name, p.slug, p.desc, p.icon);
      console.log(`  + Created project: ${p.name}`);
    }
  }

  // Seed keys
  let seededCount = 0;
  for (const item of COMPREHENSIVE_CATALOG) {
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
