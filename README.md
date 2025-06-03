# 📘 Automated Test: 24Slides Login & Download Templates

Proyek ini menggunakan [Playwright](https://playwright.dev/) untuk mengotomatisasi pengujian fitur login dan pengunduhan template dari situs [24slides.com](https://24slides.com).

---

## 📦 Persyaratan

* Node.js (versi 16 atau lebih baru)
* npm (sudah terinstal bersama Node.js)

---

## ⚙️ Instalasi

```bash
# Clone repository atau salin file ke direktori kerja Anda
cd nama-folder-proyek

# Inisialisasi proyek dan install Playwright
npm init -y
npm install -D @playwright/test

# Instal browser Playwright
npx playwright install
```

---

## 📁 Struktur Folder

```bash
.
├── tests/
│   └── login.test.js          # Semua test case
├── storage/
│   └── login-state.json       # (Opsional) session login tersimpan
├── playwright.config.js       # (Jika diperlukan konfigurasi tambahan)
└── README.md
```

---

## ▶️ Menjalankan Test

### Jalankan Semua Test

```bash
npx playwright test
```

### Jalankan Test Tertentu

```bash
npx playwright test tests/login.test.js --grep "TC01"
```

### Jalankan dengan UI Reporter

```bash
npx playwright test --ui
```

---

## 🔐 Login Otomatis (Optional)

Untuk menghindari login ulang berulang kali:

```bash
# Jalankan browser interaktif
npx playwright codegen https://app.24slides.com

# Login secara manual dengan email/password
# Setelah berhasil login, simpan session state
# Di jendela terminal terpisah:
npx playwright open https://app.24slides.com
```

Lalu simpan `storageState`:

```javascript
// dalam setup script atau secara manual
await context.storageState({ path: 'storage/login-state.json' });
```

Di dalam test:

```javascript
test.use({ storageState: 'storage/login-state.json' });
```

---

## 📌 Catatan

* TC04 & TC05 (Login dengan Google/LinkedIn) **dilewati** (`test.skip`) karena butuh akun OAuth test khusus.
* Locator seperti `text=Dashboard` bisa berubah — pastikan sesuai dengan teks aktual.


