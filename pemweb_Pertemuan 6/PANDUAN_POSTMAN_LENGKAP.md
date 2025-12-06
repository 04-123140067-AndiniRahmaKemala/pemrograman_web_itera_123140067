# 📚 PANDUAN LENGKAP TESTING API PYRAMID DENGAN POSTMAN

## TAHAP 1: PERSIAPAN

### ✅ Hal yang Perlu Dicek

1. **Server Pyramid harus berjalan**
   - Terminal menunjukkan: `Serving on http://127.0.0.1:6543`
   - Jika belum berjalan, lihat di bagian "Restart Server" di akhir dokumen

2. **Postman sudah terinstall**
   - Download dari: https://www.postman.com/downloads/
   - Atau gunakan Postman Web: https://web.postman.co/

3. **Database sudah terkoneksi dengan data awal**
   - 5 Matakuliah sudah ada di database

---

## TAHAP 2: SETUP AWAL DI POSTMAN

### Langkah 1: Buka Postman
1. Klik aplikasi **Postman**
2. Tunggu sampai aplikasi terbuka sepenuhnya

### Langkah 2: Setup Environment (OPSIONAL - tapi Disarankan)
1. Klik **Settings** ⚙️ (gear icon di atas)
2. Klik **Manage Environments**
3. Klik tombol **Create** atau **+**
4. Isi:
   - **Environment Name**: `Local Development`
   - Klik **Add Variable**
5. Tambahkan variable:
   - **Variable**: `base_url`
   - **Initial Value**: `http://127.0.0.1:6543`
   - **Current Value**: `http://127.0.0.1:6543`
6. Klik **Save** (atau **Add Environment** jika ada tombol itu)

### Langkah 3: Pilih Environment yang Baru Dibuat
- Di bawah nama collection, ada dropdown **Environment**
- Pilih: **Local Development**
- Sekarang Anda bisa gunakan `{{base_url}}` di URL

---

## TAHAP 3: IMPORT COLLECTION (OPTIONAL - Lebih Cepat)

### Jika Ingin Menggunakan Collection File:

1. Klik **Import** (tombol besar di atas kiri)
2. Pilih **Upload Files**
3. Cari file: `Pyramid_Mahasiswa_API.postman_collection.json`
4. Klik **Import**
5. Collection akan muncul di sidebar kiri dengan 5 request sudah siap

**Jika sudah import, lanjut ke TAHAP 4.**

---

## TAHAP 3B: SETUP MANUAL (Jika Tidak Pakai Collection)

### Langkah 1: Buat Request Baru
1. Klik **+** atau **New** → **HTTP Request**
2. Nanti akan terbuka tab baru kosong untuk request

### Langkah 2: Request 1 - GET All Matakuliah
Ikuti langkah-langkah di bawah untuk membuat 5 request

---

## TAHAP 4: TESTING ENDPOINT - PANDUAN STEP BY STEP

### ✨ TEST 1: GET ALL MATAKULIAH

**Tujuan**: Melihat semua data matakuliah yang ada

**Langkah:**
1. **Buat Request Baru** atau gunakan dari collection
2. Pilih method: **GET** (klik dropdown di sebelah URL)
3. **Masukkan URL**:
   ```
   http://127.0.0.1:6543/api/matakuliah
   ```
   atau (jika sudah setup environment):
   ```
   {{base_url}}/api/matakuliah
   ```
4. **Klik Send** (tombol biru di sebelah kanan URL)
5. **Lihat Response** di bawah

**Expected Response (Status 200 OK):**
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
    ... (3 data lagi)
  ]
}
```

**Checklist:**
- [ ] Status code adalah 200 (hijau)
- [ ] Response menampilkan array `matakuliah`
- [ ] Ada 5 item dalam array
- [ ] Setiap item memiliki: id, kode_mk, nama_mk, sks, semester

---

### ✨ TEST 2: GET DETAIL SATU MATAKULIAH

**Tujuan**: Melihat detail 1 matakuliah berdasarkan ID

**Langkah:**
1. **Buat Request Baru** (atau duplicate TEST 1)
2. Pilih method: **GET**
3. **Masukkan URL**:
   ```
   http://127.0.0.1:6543/api/matakuliah/1
   ```
   atau:
   ```
   {{base_url}}/api/matakuliah/1
   ```
4. **Klik Send**
5. **Lihat Response**

**Expected Response (Status 200 OK):**
```json
{
  "id": 1,
  "kode_mk": "PROG101",
  "nama_mk": "Pemrograman Dasar",
  "sks": 3,
  "semester": 1
}
```

**Checklist:**
- [ ] Status code adalah 200
- [ ] Response menampilkan 1 object (bukan array)
- [ ] Informasi PROG101 ditampilkan dengan benar
- [ ] Memiliki 4 field: id, kode_mk, nama_mk, sks, semester

---

### ✨ TEST 3: POST TAMBAH MATAKULIAH BARU

**Tujuan**: Menambahkan matakuliah baru ke database

**Langkah:**
1. **Buat Request Baru**
2. Pilih method: **POST**
3. **Masukkan URL**:
   ```
   http://127.0.0.1:6543/api/matakuliah
   ```
4. **Klik Tab "Body"** (di bawah URL)
5. **Pilih "raw"** di bagian bawah
6. **Pastikan format "JSON"** (dropdown di kanan "raw")
7. **Masukkan JSON di text area**:
```json
{
  "kode_mk": "SECURITY401",
  "nama_mk": "Keamanan Siber",
  "sks": 3,
  "semester": 4
}
```
8. **Klik Send**
9. **Lihat Response**

**Expected Response (Status 201 Created):**
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

**Checklist:**
- [ ] Status code adalah 201 (biru, dibaca "Created")
- [ ] Message mengatakan "berhasil ditambahkan"
- [ ] Data baru memiliki ID (biasanya 6 karena sudah 5 sebelumnya)
- [ ] Kode_mk, nama_mk, sks, semester sesuai dengan yang dikirim

---

### ✨ TEST 4: PUT UPDATE MATAKULIAH

**Tujuan**: Mengubah data matakuliah yang sudah ada

**Langkah:**
1. **Buat Request Baru**
2. Pilih method: **PUT**
3. **Masukkan URL**:
   ```
   http://127.0.0.1:6543/api/matakuliah/2
   ```
   (angka 2 = ID matakuliah yang ingin diupdate)
4. **Klik Tab "Body"**
5. **Pilih "raw"**
6. **Format "JSON"**
7. **Masukkan JSON** (bisa update beberapa field atau semua):
```json
{
  "nama_mk": "Web Development with React & Vue",
  "sks": 4
}
```
8. **Klik Send**
9. **Lihat Response**

**Expected Response (Status 200 OK):**
```json
{
  "message": "Matakuliah berhasil diupdate",
  "data": {
    "id": 2,
    "kode_mk": "WEBDEV201",
    "nama_mk": "Web Development with React & Vue",
    "sks": 4,
    "semester": 2
  }
}
```

**Checklist:**
- [ ] Status code adalah 200
- [ ] Message mengatakan "berhasil diupdate"
- [ ] Field yang diupdate sudah berubah
- [ ] Field yang tidak diupdate tetap sama
- [ ] ID tetap 2

---

### ✨ TEST 5: VERIFY UPDATE (GET DETAIL LAGI)

**Tujuan**: Memastikan perubahan sudah tersimpan

**Langkah:**
1. **Gunakan TEST 2 lagi** atau buat request GET baru
2. URL: `http://127.0.0.1:6543/api/matakuliah/2`
3. **Klik Send**
4. **Lihat apakah nama dan SKS sudah berubah**

**Expected Response:**
```json
{
  "id": 2,
  "kode_mk": "WEBDEV201",
  "nama_mk": "Web Development with React & Vue",  ← Berubah
  "sks": 4,                                        ← Berubah dari 4
  "semester": 2
}
```

**Checklist:**
- [ ] Nama_mk sudah berubah ke "Web Development with React & Vue"
- [ ] SKS sudah berubah ke 4

---

### ✨ TEST 6: DELETE MATAKULIAH

**Tujuan**: Menghapus data matakuliah yang tidak diperlukan

**Langkah:**
1. **Buat Request Baru**
2. Pilih method: **DELETE**
3. **Masukkan URL**:
   ```
   http://127.0.0.1:6543/api/matakuliah/6
   ```
   (angka 6 = ID matakuliah yang ingin dihapus - yang baru kita tambahkan)
4. **Tab Body** - **Kosongkan** (tidak perlu body untuk DELETE)
5. **Klik Send**
6. **Lihat Response**

**Expected Response (Status 200 OK):**
```json
{
  "message": "Matakuliah berhasil dihapus"
}
```

**Checklist:**
- [ ] Status code adalah 200
- [ ] Message mengatakan "berhasil dihapus"

---

### ✨ TEST 7: VERIFY DELETE (GET ALL LAGI)

**Tujuan**: Memastikan data sudah benar-benar dihapus

**Langkah:**
1. **Gunakan TEST 1 lagi** (GET All)
2. URL: `http://127.0.0.1:6543/api/matakuliah`
3. **Klik Send**
4. **Hitung jumlah data**

**Expected Response:**
```json
{
  "matakuliah": [
    ... (hanya 5 data - yang dihapus tidak ada)
  ]
}
```

**Checklist:**
- [ ] Total data kembali ke 5
- [ ] Data dengan kode "SECURITY401" tidak ada lagi

---

## TAHAP 5: TESTING ERROR CASES (OPSIONAL)

### Test Error 1: GET dengan ID yang tidak ada
**URL**: `GET http://127.0.0.1:6543/api/matakuliah/999`

**Expected Response (404 Not Found):**
```json
{
  "error": "Matakuliah tidak ditemukan"
}
```

---

### Test Error 2: POST dengan field yang kurang
**Method**: POST  
**URL**: `http://127.0.0.1:6543/api/matakuliah`

**Body** (tanpa field "sks"):
```json
{
  "kode_mk": "ERROR101",
  "nama_mk": "Error Course",
  "semester": 1
}
```

**Expected Response (400 Bad Request):**
```json
{
  "error": "Field sks diperlukan"
}
```

---

### Test Error 3: POST dengan kode yang sudah ada
**Method**: POST  
**URL**: `http://127.0.0.1:6543/api/matakuliah`

**Body** (gunakan kode yang sudah ada):
```json
{
  "kode_mk": "PROG101",
  "nama_mk": "Duplikat Course",
  "sks": 3,
  "semester": 1
}
```

**Expected Response (400 Bad Request):**
```json
{
  "error": "Kode matakuliah sudah ada"
}
```

---

## TAHAP 6: SAVE TESTING RESULTS

### Dokumentasikan Hasil Testing:

1. **Screenshot setiap response** (Print Screen)
2. **Catat semua status codes** yang Anda terima
3. **Verifikasi bahwa semua 7 test berhasil**

---

## 📋 CHECKLIST TESTING KESELURUHAN

- [ ] TEST 1: GET All - 5 data ditampilkan (Status 200)
- [ ] TEST 2: GET Detail - 1 data ditampilkan (Status 200)
- [ ] TEST 3: POST Create - Data baru ditambahkan (Status 201)
- [ ] TEST 4: PUT Update - Data berubah (Status 200)
- [ ] TEST 5: Verify Update - Data benar-benar berubah (Status 200)
- [ ] TEST 6: DELETE - Data dihapus (Status 200)
- [ ] TEST 7: Verify Delete - Data benar-benar hilang (Status 200)
- [ ] TEST Error 1: 404 Not Found
- [ ] TEST Error 2: 400 Bad Request (field kurang)
- [ ] TEST Error 3: 400 Bad Request (kode duplikat)

---

## 🚀 TIPS & TRICKS POSTMAN

### 1. Save Request
- Setelah membuat request, klik **Save**
- Beri nama yang jelas dan deskriptif
- Pilih collection untuk menyimpannya

### 2. Organize dalam Folders
- Di collection, buat folder: `CRUD Operations`
- Masukkan semua 5 request di dalamnya
- Lebih terorganisir

### 3. Gunakan Pre-request Script
Di tab **Pre-request Script**:
```javascript
console.log("Testing dimulai...");
```

### 4. Gunakan Tests untuk Validasi Otomatis
Di tab **Tests**:
```javascript
pm.test("Status code adalah 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response memiliki property matakuliah", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('matakuliah');
});
```

### 5. Gunakan Variables untuk Dynamic Testing
1. Set variable di collection atau environment
2. Gunakan `{{variable_name}}` di request
3. Helpful untuk testing dengan ID yang berbeda

---

## ❓ TROUBLESHOOTING

### Problem: "Unable to connect to the remote server"
**Solusi:**
1. Pastikan server Pyramid masih berjalan
2. Check di terminal apakah ada error
3. Restart server (lihat bagian Restart Server)

### Problem: "Could not get any response"
**Solusi:**
1. Cek URL sudah benar (tidak ada typo)
2. Cek method sudah benar (GET, POST, PUT, DELETE)
3. Test dengan URL: `http://127.0.0.1:6543` (tanpa `/api/matakuliah`)

### Problem: "404 Matakuliah tidak ditemukan"
**Solusi:**
1. Gunakan ID yang ada (1-5 untuk data awal)
2. Setelah POST, gunakan ID baru (6, 7, dst)

### Problem: "Field X diperlukan"
**Solusi:**
1. Pastikan semua field ada di body:
   - kode_mk
   - nama_mk
   - sks
   - semester
2. Field harus dikirim dalam format JSON yang benar

### Problem: "Kode matakuliah sudah ada"
**Solusi:**
1. Gunakan kode yang belum ada di database
2. Atau lihat dulu semua data dengan GET All

---

## 🔄 RESTART SERVER (Jika Diperlukan)

Jika server tidak merespons:

1. **Di terminal Power Shell:**
   ```
   cd "D:\SEMESTER 5\PENGWEB\067_P6\Pertemuan6\pyramid_mahasiswa"
   python -m pyramid.scripts.pserve development.ini
   ```

2. **Tunggu sampai muncul:**
   ```
   Serving on http://127.0.0.1:6543
   ```

3. **Kembali ke Postman dan coba lagi**

---

## 📞 DATA MATAKULIAH AWAL

| ID | Kode MK | Nama MK | SKS | Semester |
|----|---------|---------|-----|----------|
| 1  | PROG101 | Pemrograman Dasar | 3 | 1 |
| 2  | WEBDEV201 | Web Development | 4 | 2 |
| 3  | DATABASE301 | Basis Data | 3 | 3 |
| 4  | ALGO101 | Struktur Data & Algoritma | 4 | 2 |
| 5  | NETWORK201 | Jaringan Komputer | 3 | 3 |

---

**SELAMAT TESTING! 🎉**

Jika ada pertanyaan atau error, periksa bagian TROUBLESHOOTING di atas.

