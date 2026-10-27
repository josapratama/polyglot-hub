# 🌐 Polyglot Hub

> **Enterprise Translation Management System (TMS) & Build-Time Sync Engine**  
> Mengadopsi arsitektur multi-bahasa kelas dunia seperti Google, Netflix, dan Stripe: **Pengelolaan Terpusat di Dashboard TMS, namun Eksekusi Cepat secara Statis di Masing-masing Aplikasi (Zero Runtime Latency)**.

---

## 🎯 Mengapa Arsitektur Ini?

1. **Satu Sumber Kebenaran (Single Source of Truth)**:
   Semua kata, istilah, dan terjemahan dari seluruh project (`uploadbox`, `nexus-chat`, `minihost`, `wabridge`, dll.) dikelola di satu dashboard visual yang elegan.
2. **Zero Runtime Latency (Performa 100% Hijau di Lighthouse)**:
   Tidak ada request API terjemahan yang memperlambat browser pengunjung. Teks ditarik saat **build-time** (`npm run build`) dan menjadi file JSON statis lokal.
3. **AI / Free Auto-Translation**:
   Dapat menerjemahkan ribuan kata yang belum diterjemahkan secara otomatis dengan 1 klik tombol.
4. **Namespace Bersama (`common`)**:
   Kata-kata standar seperti *Save, Cancel, Confirm, Login, Loading...* otomatis diwariskan ke semua project tanpa perlu diketik ulang.

---

## 🚀 Cara Menjalankan Polyglot Hub

### 1. Mode Lokal (Development):
```bash
# Jalankan Backend (Port 4000)
cd backend
npm run dev

# Jalankan Frontend (Port 3001)
cd frontend
npm run dev
```
Buka browser di: **`http://localhost:3001`** (otomatis proxy ke backend).

### 2. Mode Production (Self-Contained):
```bash
npm run build
npm start
```
Buka browser di: **`http://localhost:4000`** (backend langsung melayani API dan dashboard frontend terkompilasi).

### 3. Deploy ke Server VPS Minihost via Docker:
```bash
docker compose up -d --build
```

---

## 📦 Cara Menghubungkan Project Lain (e.g. UploadBox, Nexus Chat)

### Langkah 1: Copy script sync
Salin file `bin/sync-i18n.js` ke folder project target Anda (misal ke `project/uploadbox-main/scripts/sync-i18n.js`).

### Langkah 2: Jalankan sync sebelum build
Tambahkan perintah `sync` ke `package.json` di project frontend Anda:

```json
{
  "scripts": {
    "sync:i18n": "node scripts/sync-i18n.js uploadbox ./src/locales http://localhost:4000",
    "prebuild": "npm run sync:i18n",
    "build": "vite build"
  }
}
```

Setiap kali Anda menjalankan `npm run build`:
1. Script otomatis mendownload file `id.json` dan `en.json` terbaru dari **Polyglot Hub**.
2. Tersimpan rapi di folder `src/locales/`.
3. Vite/Next.js mengompilasi file tersebut langsung ke bundle web.
4. Pengunjung mendapatkan terjemahan terbaru dengan kecepatan secepat kilat (0ms overhead)!

---

## 📡 REST API Reference

| Endpoint | Method | Deskripsi |
| :--- | :--- | :--- |
| `/api/projects` | `GET`, `POST` | Kelola daftar project & metrik kelengkapan bahasa |
| `/api/translations/:slug` | `GET` | Ambil semua key & terjemahan untuk satu project |
| `/api/translations` | `POST` | Tambah atau ubah terjemahan |
| `/api/translations/auto-translate` | `POST` | Terjemahkan teks otomatis (multi-service fallback) |
| `/api/translations/import` | `POST` | Impor massal dari file JSON yang sudah ada |
| `/api/v1/export/:slug/:lang` | `GET` | Ekspor JSON bersih siap pakai untuk web/mobile |
| `/api/v1/export/:slug` | `GET` | Ekspor bundle semua bahasa untuk project tersebut |
| `/api/v1/sync-script` | `GET` | Download script Node.js sync otomatis |

---

## 🛠️ Tech Stack
* **Backend**: Node.js, Express, TypeScript, File-backed Atomic Persistent Store (RAM < 25MB).
* **Frontend**: Vue 3, Vite, Tailwind CSS, Glassmorphic Design System, Dark/Light Appearance.
* **Architecture**: Google Enterprise Build-Time Compilation Pattern.
