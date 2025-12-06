# 🖼️ VISUAL GUIDE - POSTMAN TESTING

## Tampilan Postman

```
┌─────────────────────────────────────────────────────────────────┐
│ POSTMAN                                                         │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐  ┌──────────────────────────────────┐  │
│ │ Collections          │  │ Pyramid Mahasiswa API            │  │
│ │ ├─ Pyramid...       │  │ ├─ 1. GET All                   │  │
│ │ │  ├─ GET All       │  │ ├─ 2. GET Detail               │  │
│ │ │  ├─ GET Detail    │  │ ├─ 3. POST Create              │  │
│ │ │  ├─ POST Create   │  │ ├─ 4. PUT Update               │  │
│ │ │  ├─ PUT Update    │  │ └─ 5. DELETE                   │  │
│ │ │  └─ DELETE        │  │                                 │  │
│ │ └─                  │  │ ┌─ GET ───────────────────────┐ │  │
│ │                      │  │ │ http://127.0.0.1:6543/...   │ │  │
│ │                      │  │ └─────────────────────────────┘ │  │
│ └──────────────────────┘  │ Send  │ Save  │ ...             │  │
│                           │                                 │  │
│                           │ Body  │ Headers  │ Tests        │  │
│                           │ ┌────────────────────────────┐  │  │
│                           │ │ (JSON Response)            │  │  │
│                           │ │ {                          │  │  │
│                           │ │   "matakuliah": [...]      │  │  │
│                           │ │ }                          │  │  │
│                           │ └────────────────────────────┘  │  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Visual

### STEP 1: Buka Postman
```
1. Double-click icon Postman
2. Tunggu load (⏳ ~5 detik)
3. Postman siap digunakan
```

---

### STEP 2: Buat Request Baru
```
┌─ Postman
│  ├─ [+] New
│  │   └─ HTTP Request  ← KLIK SINI
│  └─ Tab baru kosong muncul
```

---

### STEP 3: Setup Request GET ALL

```
URL Input Area:
┌──────────────────────────────────────────────────────┐
│ GET ▼ │ http://127.0.0.1:6543/api/matakuliah       │
└──────────────────────────────────────────────────────┘
      ↑                        ↑
    METHOD                   PASTE URL DISINI

Tab Navigation:
┌─ Params │ Authorization │ Headers │ Body │ Pre-request │ Tests ─┐
│                                                                  │
│ (Kosongkan - tidak perlu untuk GET)                             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

Send Button:
┌──────────┐
│   SEND   │  ← KLIK DISINI
└──────────┘
```

---

### STEP 4: Lihat Response
```
Response Area:
┌─────────────────────────────────────────────────────┐
│ Status: 200 OK ✅                                   │
├─────────────────────────────────────────────────────┤
│ Body:                                               │
│ {                                                   │
│   "matakuliah": [                                   │
│     {                                               │
│       "id": 1,                                      │
│       "kode_mk": "PROG101",                         │
│       "nama_mk": "Pemrograman Dasar",               │
│       "sks": 3,                                     │
│       "semester": 1                                 │
│     },                                              │
│     ... (4 items lagi)                              │
│   ]                                                 │
│ }                                                   │
└─────────────────────────────────────────────────────┘
```

---

### STEP 5: Setup POST Request

```
URL:
┌──────────────────────────────────────────────────────┐
│ POST ▼ │ http://127.0.0.1:6543/api/matakuliah      │
└──────────────────────────────────────────────────────┘

Tab Navigation:
┌─ Params │ Authorization │ Headers │ Body │ ...──┐
                              ↓
                         KLIK INI

Body Tab:
┌──────────────────────────────────────────────────────┐
│ ◉ form-data  ◯ urlencoded  ◯ raw  ◯ binary        │
│                              ↑ KLIK INI             │
└──────────────────────────────────────────────────────┘

Setelah klik "raw":
┌──────────────────────────────────────────────────────┐
│ raw │ JSON ▼  (pastikan JSON dipilih)               │
└──────────────────────────────────────────────────────┘

Text Area (Paste JSON):
┌──────────────────────────────────────────────────────┐
│ {                                                    │
│   "kode_mk": "SECURITY401",                          │
│   "nama_mk": "Keamanan Siber",                       │
│   "sks": 3,                                          │
│   "semester": 4                                      │
│ }                                                    │
└──────────────────────────────────────────────────────┘
```

---

### STEP 6: Send POST Request
```
Klik SEND → Tunggu response

Response (201 Created):
┌─────────────────────────────────────────────────────┐
│ Status: 201 Created ✅ (Warna biru)                 │
├─────────────────────────────────────────────────────┤
│ {                                                   │
│   "message": "Matakuliah berhasil ditambahkan",    │
│   "data": {                                         │
│     "id": 6,     ← NEW ID                           │
│     "kode_mk": "SECURITY401",                       │
│     "nama_mk": "Keamanan Siber",                    │
│     "sks": 3,                                       │
│     "semester": 4                                   │
│   }                                                 │
│ }                                                   │
└─────────────────────────────────────────────────────┘
```

---

### STEP 7: Setup PUT Request

```
URL:
┌──────────────────────────────────────────────────────┐
│ PUT ▼ │ http://127.0.0.1:6543/api/matakuliah/2     │
└──────────────────────────────────────────────────────┘
                                              ↑ ID untuk diupdate

Body → raw → JSON:
┌──────────────────────────────────────────────────────┐
│ {                                                    │
│   "nama_mk": "Web Development with React",           │
│   "sks": 4                                           │
│ }                                                    │
└──────────────────────────────────────────────────────┘

Response (200 OK):
{
  "message": "Matakuliah berhasil diupdate",
  "data": {
    "id": 2,
    "kode_mk": "WEBDEV201",
    "nama_mk": "Web Development with React",  ← Berubah
    "sks": 4,                                  ← Berubah
    "semester": 2
  }
}
```

---

### STEP 8: Setup DELETE Request

```
URL:
┌──────────────────────────────────────────────────────┐
│ DELETE ▼ │ http://127.0.0.1:6543/api/matakuliah/6  │
└──────────────────────────────────────────────────────┘

Body: KOSONGKAN (tidak perlu body untuk DELETE)

Response (200 OK):
{
  "message": "Matakuliah berhasil dihapus"
}
```

---

## Color Guide - HTTP Status Codes

```
┌─────────────────────────────────────────┐
│ 🟢 200 OK              (Request OK)      │
│ 🟢 201 Created         (Resource dibuat) │
│ 🟠 400 Bad Request     (Data salah)      │
│ 🔴 404 Not Found       (Resource tidak ada)
│ 🔴 500 Server Error    (Server error)    │
└─────────────────────────────────────────┘
```

---

## JSON Format Reference

### Valid JSON (Contoh):
```json
{
  "kode_mk": "TEST101",
  "nama_mk": "Testing Course",
  "sks": 3,
  "semester": 5
}
```

### Invalid JSON (Jangan):
```json
{
  kode_mk: "TEST101",           // ❌ Key harus dalam quotes
  "nama_mk": "Testing Course",
  "sks": 3,
  "semester": 5,                // ❌ Trailing comma tidak boleh
}
```

---

## Common Mistakes & Solutions

```
❌ MISTAKE 1: URL typo
  ✅ FIX: Copy-paste dari panduan

❌ MISTAKE 2: Lupa klik "raw" di Body
  ✅ FIX: Body → raw → JSON

❌ MISTAKE 3: JSON format salah (missing quotes, dll)
  ✅ FIX: Gunakan JSON Validator online

❌ MISTAKE 4: Salah method (GET bukannya POST)
  ✅ FIX: Cek dropdown method di atas URL

❌ MISTAKE 5: Content-Type header salah
  ✅ FIX: Postman otomatis set jika pilih "raw" → "JSON"
```

---

## Postman Shortcuts

```
Ctrl + B    : Toggle Sidebar
Ctrl + S    : Save Request
Enter       : Send Request
```

---

**Selamat! Sekarang Anda tahu cara testing dengan Postman! 🎉**

