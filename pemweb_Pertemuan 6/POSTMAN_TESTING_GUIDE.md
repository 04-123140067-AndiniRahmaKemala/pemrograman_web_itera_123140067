# Testing API Pyramid Mahasiswa dengan Postman

## Base URL
```
http://127.0.0.1:6543
```

## Endpoint yang Tersedia

### 1. GET All Matakuliah (Mendapatkan semua data)
**URL:** `GET http://127.0.0.1:6543/api/matakuliah`

**Response (Status 200):**
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
    ...
  ]
}
```

---

### 2. GET Detail Matakuliah (Mendapatkan satu data berdasarkan ID)
**URL:** `GET http://127.0.0.1:6543/api/matakuliah/1`

**Path Parameter:**
- `id` = ID matakuliah (integer)

**Response (Status 200):**
```json
{
  "id": 1,
  "kode_mk": "PROG101",
  "nama_mk": "Pemrograman Dasar",
  "sks": 3,
  "semester": 1
}
```

**Response jika tidak ditemukan (Status 404):**
```json
{
  "error": "Matakuliah tidak ditemukan"
}
```

---

### 3. POST Tambah Matakuliah Baru (Create)
**URL:** `POST http://127.0.0.1:6543/api/matakuliah`

**Headers:**
```
Content-Type: application/json
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

**Response (Status 201):**
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

**Response jika kode sudah ada (Status 400):**
```json
{
  "error": "Kode matakuliah sudah ada"
}
```

---

### 4. PUT Update Matakuliah (Update)
**URL:** `PUT http://127.0.0.1:6543/api/matakuliah/1`

**Headers:**
```
Content-Type: application/json
```

**Path Parameter:**
- `id` = ID matakuliah yang ingin diupdate (integer)

**Request Body (bisa partial):**
```json
{
  "nama_mk": "Pemrograman Dasar - Updated",
  "sks": 4
}
```

**Response (Status 200):**
```json
{
  "message": "Matakuliah berhasil diupdate",
  "data": {
    "id": 1,
    "kode_mk": "PROG101",
    "nama_mk": "Pemrograman Dasar - Updated",
    "sks": 4,
    "semester": 1
  }
}
```

---

### 5. DELETE Hapus Matakuliah (Delete)
**URL:** `DELETE http://127.0.0.1:6543/api/matakuliah/1`

**Path Parameter:**
- `id` = ID matakuliah yang ingin dihapus (integer)

**Response (Status 200):**
```json
{
  "message": "Matakuliah berhasil dihapus"
}
```

**Response jika tidak ditemukan (Status 404):**
```json
{
  "error": "Matakuliah tidak ditemukan"
}
```

---

## Langkah-Langkah Testing di Postman

### Step 1: Test GET All Matakuliah
1. Buka Postman
2. Klik `+` untuk membuat request baru
3. Pilih method `GET`
4. Masukkan URL: `http://127.0.0.1:6543/api/matakuliah`
5. Klik `Send`
6. Lihat hasilnya - seharusnya menampilkan 5 data matakuliah

### Step 2: Test GET Detail Matakuliah
1. Pilih method `GET`
2. Masukkan URL: `http://127.0.0.1:6543/api/matakuliah/1`
3. Klik `Send`
4. Seharusnya menampilkan data matakuliah dengan id 1 (PROG101)

### Step 3: Test POST Tambah Matakuliah
1. Pilih method `POST`
2. Masukkan URL: `http://127.0.0.1:6543/api/matakuliah`
3. Klik tab `Body`
4. Pilih `raw` dan pastikan format `JSON`
5. Masukkan data:
```json
{
  "kode_mk": "AI501",
  "nama_mk": "Artificial Intelligence",
  "sks": 4,
  "semester": 5
}
```
6. Klik `Send`
7. Seharusnya response status 201 dengan data baru

### Step 4: Test PUT Update Matakuliah
1. Pilih method `PUT`
2. Masukkan URL: `http://127.0.0.1:6543/api/matakuliah/2`
3. Klik tab `Body`
4. Pilih `raw` dan format `JSON`
5. Masukkan data yang ingin diupdate:
```json
{
  "nama_mk": "Web Development & Mobile",
  "sks": 4
}
```
6. Klik `Send`
7. Response seharusnya status 200 dengan data yang sudah diupdate

### Step 5: Test DELETE Matakuliah
1. Pilih method `DELETE`
2. Masukkan URL: `http://127.0.0.1:6543/api/matakuliah/3`
3. Klik `Send`
4. Response seharusnya status 200 dengan pesan berhasil dihapus

### Step 6: Verify Perubahan
1. GET ulang semua matakuliah untuk memastikan perubahan tersimpan
2. URL: `GET http://127.0.0.1:6543/api/matakuliah`

---

## Data Awal yang Sudah Ada

| ID | Kode MK | Nama MK | SKS | Semester |
|----|---------|---------|-----|----------|
| 1  | PROG101 | Pemrograman Dasar | 3 | 1 |
| 2  | WEBDEV201 | Web Development | 4 | 2 |
| 3  | DATABASE301 | Basis Data | 3 | 3 |
| 4  | ALGO101 | Struktur Data & Algoritma | 4 | 2 |
| 5  | NETWORK201 | Jaringan Komputer | 3 | 3 |

---

## Error Handling

### Status Code yang Mungkin Muncul:
- **200 OK** - Request berhasil
- **201 Created** - Resource berhasil dibuat (POST)
- **400 Bad Request** - Data tidak valid atau kode mk sudah ada
- **404 Not Found** - Resource tidak ditemukan
- **500 Internal Server Error** - Database error

### Contoh Error Response:
```json
{
  "error": "Deskripsi error di sini"
}
```

---

## Tips Penggunaan Postman

1. **Simpan Request sebagai Collection**: 
   - Klik `Save` setelah membuat request
   - Buat folder baru bernama "Pyramid Mahasiswa API"
   - Simpan setiap request dengan nama deskriptif

2. **Gunakan Postman Environment untuk Base URL**:
   - Klik gear icon → Manage Environments
   - Buat environment baru: `Local Development`
   - Tambah variable: `base_url` = `http://127.0.0.1:6543`
   - Gunakan `{{base_url}}/api/matakuliah` di URL

3. **Test Response dengan Test Scripts**:
   - Di tab `Tests`, tambahkan validasi response
   - Contoh:
   ```javascript
   pm.test("Status code is 200", function() {
     pm.response.to.have.status(200);
   });
   ```

