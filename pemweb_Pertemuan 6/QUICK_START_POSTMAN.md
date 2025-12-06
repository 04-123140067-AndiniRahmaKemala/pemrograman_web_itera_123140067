# 🚀 QUICK START - TESTING POSTMAN (Ringkas)

## Server Status: ✅ Berjalan di http://127.0.0.1:6543

---

## 5 Endpoint yang Harus Ditest

### 1️⃣ GET ALL MATAKULIAH
```
GET http://127.0.0.1:6543/api/matakuliah
```
✓ Expected: 200 OK dengan 5 data matakuliah

### 2️⃣ GET DETAIL (ID=1)
```
GET http://127.0.0.1:6543/api/matakuliah/1
```
✓ Expected: 200 OK dengan detail PROG101

### 3️⃣ POST CREATE
```
POST http://127.0.0.1:6543/api/matakuliah
Body (JSON):
{
  "kode_mk": "SECURITY401",
  "nama_mk": "Keamanan Siber",
  "sks": 3,
  "semester": 4
}
```
✓ Expected: 201 Created dengan ID 6

### 4️⃣ PUT UPDATE (ID=2)
```
PUT http://127.0.0.1:6543/api/matakuliah/2
Body (JSON):
{
  "nama_mk": "Web Development with React",
  "sks": 4
}
```
✓ Expected: 200 OK dengan data ter-update

### 5️⃣ DELETE (ID=6)
```
DELETE http://127.0.0.1:6543/api/matakuliah/6
```
✓ Expected: 200 OK, data dihapus

---

## Cara Cepat di Postman

### Step 1: Buka Postman → New Request

### Step 2: Setup Environment (Optional)
- Buat environment: `Local Development`
- Tambah variable `base_url = http://127.0.0.1:6543`
- Gunakan `{{base_url}}` di URL

### Step 3: Test Satu Per Satu
1. Copy URL dari atas
2. Pilih method (GET/POST/PUT/DELETE)
3. Jika POST/PUT: Klik Body → raw → JSON
4. Paste JSON body
5. Click SEND
6. Lihat Status & Response

### Step 4: Verifikasi
- ✅ Setiap test harus hijau (2xx status)
- ✅ Response sesuai expected
- ✅ Data berubah di database

---

## Import Collection (Jika Ada File)

1. Postman → Import
2. Upload: `Pyramid_Mahasiswa_API.postman_collection.json`
3. Semua 5 request sudah siap
4. Tinggal klik SEND satu per satu

---

## File Referensi Lengkap

- 📄 **PANDUAN_POSTMAN_LENGKAP.md** - Panduan step-by-step super detail
- 📄 **POSTMAN_TESTING_GUIDE.md** - Dokumentasi API lengkap
- 📄 **Pyramid_Mahasiswa_API.postman_collection.json** - Collection file

---

**Selesai! Mulai testing sekarang! 🎯**

