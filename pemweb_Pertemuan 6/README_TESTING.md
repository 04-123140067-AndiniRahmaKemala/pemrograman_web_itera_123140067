# Panduan Testing API Pyramid Mahasiswa dengan Postman

## 📋 Status Aplikasi

✅ **Server**: Berjalan di `http://127.0.0.1:6543`  
✅ **Database**: PostgreSQL terhubung (password: 123140067)  
✅ **Data**: 5 Matakuliah sudah tersedia  

---

## 📁 File-File Penting

### Untuk Testing Postman:
1. **`Pyramid_Mahasiswa_API.postman_collection.json`** - Collection siap import
2. **`POSTMAN_SETUP.md`** - Panduan setup Postman lengkap
3. **`POSTMAN_TESTING_GUIDE.md`** - Dokumentasi endpoint lengkap

---

## 🚀 Quick Start - Setup di Postman

### Step 1: Import Collection
1. Buka **Postman**
2. Klik **Import** (tombol di atas kiri)
3. Pilih **Upload Files**
4. Cari file: `Pyramid_Mahasiswa_API.postman_collection.json`
5. Klik **Import**

### Step 2: Setup Environment (Optional)
1. Klik **Settings** (gear icon)
2. Klik **Manage Environments**
3. Klik **Create**
4. Nama: `Local Development`
5. Tambah Variable:
   - Key: `base_url`
   - Value: `http://127.0.0.1:6543`
6. Save dan pilih environment ini

---

## 🔍 Testing Manual (Tanpa Collection)

### Endpoint 1: GET All Matakuliah
```
Method: GET
URL: http://127.0.0.1:6543/api/matakuliah
```

**Expected Response (200 OK):**
```json
{
  "matakuliah": [
    {
      "id": 1,
      "kode_mk": "PROG101",
      "nama_mk": "Pemrograman Dasar",
      "sks": 3,
      "semester": 1
    },
    {
      "id": 2,
      "kode_mk": "WEBDEV201",
      "nama_mk": "Web Development",
      "sks": 4,
      "semester": 2
    },
    {
      "id": 3,
      "kode_mk": "DATABASE301",
      "nama_mk": "Basis Data",
      "sks": 3,
      "semester": 3
    },
    {
      "id": 4,
      "kode_mk": "ALGO101",
      "nama_mk": "Struktur Data & Algoritma",
      "sks": 4,
      "semester": 2
    },
    {
      "id": 5,
      "kode_mk": "NETWORK201",
      "nama_mk": "Jaringan Komputer",
      "sks": 3,
      "semester": 3
    }
  ]
}
```

---

### Endpoint 2: GET Detail Matakuliah
```
Method: GET
URL: http://127.0.0.1:6543/api/matakuliah/1
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "kode_mk": "PROG101",
  "nama_mk": "Pemrograman Dasar",
  "sks": 3,
  "semester": 1
}
```

---

### Endpoint 3: POST Create Matakuliah
```
Method: POST
URL: http://127.0.0.1:6543/api/matakuliah
Headers: Content-Type: application/json
```

**Request Body:**
```json
{
  "kode_mk": "SECURITY401",
  "nama_mk": "Keamanan Siber",
  "sks": 3,
  "semester": 4
}
```

**Expected Response (201 Created):**
```json
{
  "message": "Matakuliah berhasil ditambahkan",
  "data": {
    "id": 6,
    "kode_mk": "SECURITY401",
    "nama_mk": "Keamanan Siber",
    "sks": 3,
    "semester": 4
  }
}
```

---

### Endpoint 4: PUT Update Matakuliah
```
Method: PUT
URL: http://127.0.0.1:6543/api/matakuliah/2
Headers: Content-Type: application/json
```

**Request Body:**
```json
{
  "nama_mk": "Web Development dengan React",
  "sks": 4
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Matakuliah berhasil diupdate",
  "data": {
    "id": 2,
    "kode_mk": "WEBDEV201",
    "nama_mk": "Web Development dengan React",
    "sks": 4,
    "semester": 2
  }
}
```

---

### Endpoint 5: DELETE Matakuliah
```
Method: DELETE
URL: http://127.0.0.1:6543/api/matakuliah/6
```

**Expected Response (200 OK):**
```json
{
  "message": "Matakuliah berhasil dihapus"
}
```

---

## ✨ Testing Scenario Lengkap

### Scenario 1: Baca Data
1. **GET** `/api/matakuliah` → Lihat semua (5 data)
2. **GET** `/api/matakuliah/1` → Lihat detail PROG101

### Scenario 2: Tambah Data
3. **POST** `/api/matakuliah` → Tambah SECURITY401
4. **GET** `/api/matakuliah` → Cek total (6 data)

### Scenario 3: Update Data
5. **PUT** `/api/matakuliah/2` → Update nama ke "Web Development dengan React"
6. **GET** `/api/matakuliah/2` → Verifikasi perubahan

### Scenario 4: Hapus Data
7. **DELETE** `/api/matakuliah/6` → Hapus SECURITY401
8. **GET** `/api/matakuliah` → Cek kembali 5 data

---

## 🎯 HTTP Status Codes

| Status | Arti | Contoh |
|--------|------|--------|
| **200** | OK - Request berhasil | GET, PUT, DELETE |
| **201** | Created - Resource dibuat | POST berhasil |
| **400** | Bad Request - Data tidak valid | Field kurang, data tidak sesuai |
| **404** | Not Found - Resource tidak ada | GET dengan ID tidak ada |
| **500** | Server Error - Database error | Koneksi DB gagal |

---

## 🛠️ Troubleshooting

### Error: "Unable to connect to the remote server"
**Solusi:**
1. Pastikan server berjalan di terminal
2. Check terminal untuk `Serving on http://127.0.0.1:6543`
3. Restart server jika tidak merespon

### Error: "Kode matakuliah sudah ada"
**Solusi:** Gunakan kode matakuliah yang belum ada di database

### Error: "Field {nama} diperlukan"
**Solusi:** Pastikan semua field required ada di request body:
- `kode_mk`
- `nama_mk`
- `sks`
- `semester`

### Database Connection Error
**Solusi:**
1. Pastikan PostgreSQL running
2. Cek password di `development.ini` sudah benar (123140067)
3. Cek database `pyramid_mahasiswa` sudah dibuat

---

## 📊 Data Awal yang Tersedia

| ID | Kode MK | Nama MK | SKS | Semester |
|----|---------|---------|-----|----------|
| 1  | PROG101 | Pemrograman Dasar | 3 | 1 |
| 2  | WEBDEV201 | Web Development | 4 | 2 |
| 3  | DATABASE301 | Basis Data | 3 | 3 |
| 4  | ALGO101 | Struktur Data & Algoritma | 4 | 2 |
| 5  | NETWORK201 | Jaringan Komputer | 3 | 3 |

---

## 📝 Test dengan PowerShell (Alternative)

```powershell
# GET All
Invoke-WebRequest -Uri "http://127.0.0.1:6543/api/matakuliah" -Method GET

# POST
$body = @{
    kode_mk = "TEST123"
    nama_mk = "Test"
    sks = 3
    semester = 1
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://127.0.0.1:6543/api/matakuliah" `
    -Method POST -Body $body -ContentType "application/json"
```

---

## 🎓 Penjelasan API Response

### Success Response Format
```json
{
  "message": "Pesan sukses",
  "data": {
    "id": 1,
    "kode_mk": "CODE123",
    "nama_mk": "Nama Course",
    "sks": 3,
    "semester": 1
  }
}
```

### Error Response Format
```json
{
  "error": "Deskripsi error"
}
```

---

## 💾 File yang Sudah Disiapkan

- ✅ **Pyramid_Mahasiswa_API.postman_collection.json** - Siap import di Postman
- ✅ **POSTMAN_SETUP.md** - Panduan lengkap setup
- ✅ **POSTMAN_TESTING_GUIDE.md** - Dokumentasi detail API
- ✅ **development.ini** - Config dengan password benar
- ✅ **Database PostgreSQL** - Sudah ada 5 data matakuliah
- ✅ **Server** - Berjalan di port 6543

---

## ✅ Persiapan Selesai!

Semua file dan dokumentasi sudah siap. Anda bisa langsung:

1. **Import collection** ke Postman
2. **Pilih environment** "Local Development" (optional)
3. **Jalankan request** dari collection

Atau ikuti manual setup seperti di atas. Selamat testing! 🚀

