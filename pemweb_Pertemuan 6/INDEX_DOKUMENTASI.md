# 📚 INDEX DOKUMENTASI - TESTING PYRAMID MAHASISWA API

Berikut adalah panduan lengkap untuk testing API Pyramid Mahasiswa dengan Postman. Pilih panduan sesuai kebutuhan Anda:

---

## 🚀 QUICK START (Jika Terburu-buru)

**File**: `QUICK_START_POSTMAN.md`

Gunakan ini jika:
- Anda terburu-buru
- Hanya ingin tahu 5 endpoint utama
- Ingin ringkasan super cepat

**Waktu**: ~5 menit

---

## 📖 PANDUAN LENGKAP STEP-BY-STEP

**File**: `PANDUAN_POSTMAN_LENGKAP.md`

Gunakan ini jika:
- Pertama kali menggunakan Postman
- Ingin penjelasan detail setiap langkah
- Perlu troubleshooting guide lengkap

**Isi**:
- Setup awal Postman
- 7 test cases lengkap dengan screenshot
- Error test cases
- Tips & tricks
- Troubleshooting

**Waktu**: ~30-45 menit

---

## 🖼️ VISUAL GUIDE (Banyak Diagram)

**File**: `VISUAL_GUIDE_POSTMAN.md`

Gunakan ini jika:
- Visual learner
- Kesulitan memahami teks
- Ingin lihat tampilan Postman

**Isi**:
- Diagram ASCII Postman UI
- Step-by-step dengan visual
- HTTP status codes color guide
- Common mistakes & solutions

**Waktu**: ~15 menit

---

## ✅ TESTING CHECKLIST

**File**: `TESTING_CHECKLIST.md`

Gunakan ini untuk:
- Dokumentasikan hasil testing
- Checklist setiap test
- Score testing Anda
- Print dan tangani manual

**Gunakan saat**: Testing berlangsung

---

## 🔗 API DOCUMENTATION

**File**: `POSTMAN_TESTING_GUIDE.md`

Gunakan ini untuk:
- Referensi lengkap endpoint
- Request/Response format
- HTTP status codes
- Error handling

**Gunakan saat**: Perlu referensi endpoint

---

## 📦 POSTMAN COLLECTION FILE

**File**: `Pyramid_Mahasiswa_API.postman_collection.json`

Gunakan untuk:
- Import langsung ke Postman
- Semua 5 request sudah siap
- Hemat waktu setup manual
- Sudah ada auto-test scripts

**Cara import**:
1. Postman → Import
2. Upload file ini
3. Langsung bisa testing

**Waktu setup**: ~2 menit

---

## 📋 SETUP POSTMAN

**File**: `POSTMAN_SETUP.md`

Gunakan ini untuk:
- Setup environment
- Manual setup requests (jika tidak import collection)
- Konfigurasi URL base

---

## 🎯 RECOMMENDED LEARNING PATH

### Jika Baru Pertama Kali:
1. Baca: `QUICK_START_POSTMAN.md` (5 min)
2. Baca: `VISUAL_GUIDE_POSTMAN.md` (15 min)
3. Lakukan: Testing dengan `PANDUAN_POSTMAN_LENGKAP.md` (45 min)
4. Dokumentasikan: Gunakan `TESTING_CHECKLIST.md`

**Total**: ~65 menit

---

### Jika Sudah Tahu Postman:
1. Download file: `Pyramid_Mahasiswa_API.postman_collection.json`
2. Import ke Postman
3. Ikuti: `QUICK_START_POSTMAN.md`
4. Testing langsung

**Total**: ~10 menit

---

### Jika Hanya Perlu Referensi:
1. Baca: `POSTMAN_TESTING_GUIDE.md` (untuk endpoint reference)
2. Gunakan: `POSTMAN_SETUP.md` (untuk environment setup)

**Total**: ~5 menit

---

## 📊 FILE MAPPING

| File | Tujuan | Waktu | Level |
|------|--------|-------|-------|
| QUICK_START_POSTMAN.md | Overview cepat | 5 min | Semua |
| PANDUAN_POSTMAN_LENGKAP.md | Tutorial lengkap | 45 min | Beginner |
| VISUAL_GUIDE_POSTMAN.md | Visual learning | 15 min | Beginner |
| TESTING_CHECKLIST.md | Dokumentasi hasil | - | Semua |
| POSTMAN_TESTING_GUIDE.md | API reference | 10 min | Referensi |
| POSTMAN_SETUP.md | Setup guide | 10 min | Manual setup |
| Pyramid_Mahasiswa_API.postman_collection.json | Collection file | 2 min | Import |

---

## 🔧 SERVER INFO

- **URL**: http://127.0.0.1:6543
- **Database**: PostgreSQL
- **Data Awal**: 5 Matakuliah
- **API Base Path**: /api/matakuliah

---

## 📞 ENDPOINTS

1. **GET All**: `/api/matakuliah`
2. **GET Detail**: `/api/matakuliah/{id}`
3. **POST Create**: `/api/matakuliah` (dengan body JSON)
4. **PUT Update**: `/api/matakuliah/{id}` (dengan body JSON)
5. **DELETE**: `/api/matakuliah/{id}`

---

## ✨ QUICK REFERENCE - 5 TESTING SCENARIOS

### Scenario 1: Read Data
- GET `/api/matakuliah` → 5 data
- GET `/api/matakuliah/1` → Detail

### Scenario 2: Create Data
- POST `/api/matakuliah` → New data (ID 6)
- Verify dengan GET

### Scenario 3: Update Data
- PUT `/api/matakuliah/2` → Change name & sks
- Verify dengan GET

### Scenario 4: Delete Data
- DELETE `/api/matakuliah/6` → Remove data
- Verify dengan GET

### Scenario 5: Error Handling
- GET ID tidak ada → 404
- POST field kurang → 400
- POST kode duplikat → 400

---

## 🎓 LEARNING OUTCOMES

Setelah mengikuti panduan ini, Anda akan bisa:

✅ Setup Postman dengan environment variables  
✅ Membuat HTTP request (GET, POST, PUT, DELETE)  
✅ Mengirim JSON body di POST dan PUT  
✅ Membaca dan interpret response  
✅ Troubleshoot error di API  
✅ Dokumentasikan testing results  
✅ Memahami REST API principles  

---

## 📝 NOTES

- Semua file dalam format Markdown (.md)
- Postman collection file sudah siap import
- Semua URL sudah hardcoded untuk convenience
- Testing bisa offline (setelah setup awal)

---

## 🎯 START TESTING NOW!

Pilih file yang sesuai dengan kebutuhan Anda dan mulai testing! 🚀

---

**Questions?** Lihat troubleshooting section di `PANDUAN_POSTMAN_LENGKAP.md`

