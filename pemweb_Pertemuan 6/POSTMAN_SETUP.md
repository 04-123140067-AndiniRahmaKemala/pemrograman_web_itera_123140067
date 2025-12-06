# Cara Import Collection ke Postman

## Method 1: Import dari File JSON

### Langkah-Langkah:
1. **Buka Postman**
2. **Klik tombol "Import"** di bagian atas kiri
3. **Pilih "Upload Files"**
4. **Cari dan pilih file**: `Pyramid_Mahasiswa_API.postman_collection.json`
5. **Klik "Import"**
6. Collection akan muncul di sidebar sebelah kiri

## Method 2: Manual Setup (Jika tidak bisa import)

Jika file collection tidak bisa diimport, ikuti langkah manual ini:

### 1. Setup Environment (Opsional tapi Recommended)

1. Klik **Settings** (gear icon) → **Manage Environments**
2. Klik **Create** → Buat environment baru bernama: `Local Development`
3. Tambahkan variable baru:
   - **VARIABLE NAME**: `base_url`
   - **VALUE**: `http://127.0.0.1:6543`
4. Klik **Save**
5. Di dropdown environment Postman, pilih: `Local Development`

### 2. Setup Requests Secara Manual

#### Request 1: GET All Matakuliah
```
Method: GET
URL: http://127.0.0.1:6543/api/matakuliah
Headers: (kosongkan atau default)
Body: (kosongkan)
```

#### Request 2: GET Detail Matakuliah
```
Method: GET
URL: http://127.0.0.1:6543/api/matakuliah/1
Headers: (kosongkan atau default)
Body: (kosongkan)
```

#### Request 3: POST Create Matakuliah
```
Method: POST
URL: http://127.0.0.1:6543/api/matakuliah
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "kode_mk": "SECURITY401",
  "nama_mk": "Keamanan Siber",
  "sks": 3,
  "semester": 4
}
```

#### Request 4: PUT Update Matakuliah
```
Method: PUT
URL: http://127.0.0.1:6543/api/matakuliah/1
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "nama_mk": "Pemrograman Dasar - Updated",
  "sks": 4
}
```

#### Request 5: DELETE Matakuliah
```
Method: DELETE
URL: http://127.0.0.1:6543/api/matakuliah/3
Headers: (kosongkan atau default)
Body: (kosongkan)
```

---

## Testing Sequence (Urutan Testing)

### Sequence 1: Baca Data
1. **GET All Matakuliah** → Lihat semua data (5 item awal)
2. **GET Detail Matakuliah (ID=1)** → Lihat detail PROG101

### Sequence 2: Tambah Data
3. **POST Create Matakuliah** → Tambah data baru (SECURITY401)
4. **GET All Matakuliah** → Cek apakah data sudah bertambah (seharusnya 6 item)

### Sequence 3: Update Data
5. **PUT Update Matakuliah (ID=2)** → Update Web Development
6. **GET Detail Matakuliah (ID=2)** → Verifikasi perubahan

### Sequence 4: Hapus Data
7. **DELETE Matakuliah (ID=6)** → Hapus data yang baru dibuat
8. **GET All Matakuliah** → Verifikasi data sudah dihapus (kembali 5 item)

---

## Expected Results

### ✅ GET All Matakuliah
**Status**: 200 OK
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
    ...
  ]
}
```

### ✅ GET Detail (ID=1)
**Status**: 200 OK
```json
{
  "id": 1,
  "kode_mk": "PROG101",
  "nama_mk": "Pemrograman Dasar",
  "sks": 3,
  "semester": 1
}
```

### ✅ POST Create
**Status**: 201 Created
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

### ✅ PUT Update
**Status**: 200 OK
```json
{
  "message": "Matakuliah berhasil diupdate",
  "data": {
    "id": 2,
    "kode_mk": "WEBDEV201",
    "nama_mk": "Web Development & Mobile",
    "sks": 4,
    "semester": 2
  }
}
```

### ✅ DELETE
**Status**: 200 OK
```json
{
  "message": "Matakuliah berhasil dihapus"
}
```

---

## Error Cases yang Mungkin

### ❌ GET Detail dengan ID tidak ada (ID=999)
**Status**: 404 Not Found
```json
{
  "error": "Matakuliah tidak ditemukan"
}
```

### ❌ POST dengan kode yang sudah ada
**Status**: 400 Bad Request
```json
{
  "error": "Kode matakuliah sudah ada"
}
```

### ❌ POST dengan field yang kurang
**Status**: 400 Bad Request
```json
{
  "error": "Field kode_mk diperlukan"
}
```

---

## Quick Test Command (Optional - Menggunakan curl di PowerShell)

Jika ingin test tanpa Postman:

```powershell
# GET All
$response = Invoke-WebRequest -Uri "http://127.0.0.1:6543/api/matakuliah" -Method GET
$response.Content | ConvertFrom-Json

# POST Create
$body = @{
    kode_mk = "TEST123"
    nama_mk = "Test Course"
    sks = 3
    semester = 1
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://127.0.0.1:6543/api/matakuliah" -Method POST -Body $body -ContentType "application/json"
```

