# Aplikasi Manajemen Matakuliah dengan Pyramid

Aplikasi API sederhana untuk manajemen matakuliah berdasarkan apa yang telah dipelajari dalam praktikum.

## Deskripsi Proyek

Aplikasi ini adalah API backend untuk mengelola data matakuliah menggunakan Pyramid Framework. Aplikasi menyediakan endpoint REST API untuk operasi CRUD (Create, Read, Update, Delete) pada data matakuliah.

## Model Data

### Matakuliah

Model `Matakuliah` dengan atribut berikut:

| Atribut   | Tipe    | Deskripsi              | Constraint      |
|-----------|---------|------------------------|-----------------|
| id        | Integer | Primary key            | Auto Increment  |
| kode_mk   | Text    | Kode mata kuliah       | Unique, Not null|
| nama_mk   | Text    | Nama mata kuliah       | Not null        |
| sks       | Integer | Jumlah SKS             | Not null        |
| semester  | Integer | Semester pengambilan   | Not null        |

## API Endpoints

Implementasi endpoint untuk operasi dasar:

| HTTP Method | URL Pattern            | Deskripsi                        |
|-------------|------------------------|----------------------------------|
| GET         | `/api/matakuliah`      | Mendapatkan semua matakuliah     |
| GET         | `/api/matakuliah/{id}` | Mendapatkan detail satu matakuliah|
| POST        | `/api/matakuliah`      | Menambahkan matakuliah baru      |
| PUT         | `/api/matakuliah/{id}` | Mengupdate data matakuliah       |
| DELETE      | `/api/matakuliah/{id}` | Menghapus data matakuliah        |

⚠️ **Penting:** Jangan lupa menambahkan parameter `request_method` pada setiap route untuk memastikan routing berfungsi dengan benar!

## Cara Instalasi

### 1. Langkah membuat virtual environment

```bash
# Buat virtual environment
python -m venv venv

# Aktivasi virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Windows CMD:
.\venv\Scripts\activate.bat

# Linux/Mac:
source venv/bin/activate
```

### 2. Instalasi dependensi

```bash
cd pyramid_mahasiswa
pip install -e .
```

### 3. Konfigurasi database

Database sudah dikonfigurasi menggunakan SQLite di file `development.ini`:

```ini
sqlalchemy.url = sqlite:///%(here)s/pyramid_mahasiswa.sqlite
```

## Cara Menjalankan

### 1. Menjalankan migrasi

```bash
# Generate migration file (sudah dilakukan)
alembic -c development.ini revision --autogenerate -m "Create matakuliah table"

# Jalankan migration
alembic -c development.ini upgrade head
```

### 2. Menjalankan server

```bash
pserve development.ini --reload
```

Server akan berjalan di `http://localhost:6543`

## Testing

### Tambahkan data awal minimal 3 matakuliah

Anda bisa menggunakan script `initialize_db.py` atau menambahkan manual via API.

## Dokumentasi Testing API dengan Postman

### 1. GET All Matakuliah

Mendapatkan semua data matakuliah yang tersimpan di database.

**Endpoint:** `GET http://localhost:6543/api/matakuliah`

**Screenshot Testing:**

![GET All Matakuliah](screenshots/get_all_matakuliah.png)

**Contoh Response:**
```json
{
  "matakuliah": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    },
    {
      "id": 2,
      "kode_mk": "IF102",
      "nama_mk": "Struktur Data",
      "sks": 3,
      "semester": 2
    }
  ]
}
```

---

### 2. GET Matakuliah by ID

Mendapatkan detail satu matakuliah berdasarkan ID.

**Endpoint:** `GET http://localhost:6543/api/matakuliah/{id}`

**Screenshot Testing:**

![GET Matakuliah by ID](screenshots/get_matakuliah_by_id.png)

**Contoh Response:**
```json
{
  "id": 1,
  "kode_mk": "IF101",
  "nama_mk": "Algoritma dan Pemrograman",
  "sks": 3,
  "semester": 1
}
```

---

### 3. POST - Create Matakuliah

Menambahkan matakuliah baru ke database.

**Endpoint:** `POST http://localhost:6543/api/matakuliah`

**Headers:**
- Content-Type: application/json

**Request Body:**
```json
{
  "kode_mk": "IF301",
  "nama_mk": "Pemrograman Web",
  "sks": 3,
  "semester": 5
}
```

**Screenshot Testing:**

![POST Create Matakuliah](screenshots/post_create_matakuliah.png)

**Response (201 Created):**
```json
{
  "message": "Matakuliah berhasil ditambahkan",
  "data": {
    "id": 4,
    "kode_mk": "IF301",
    "nama_mk": "Pemrograman Web",
    "sks": 3,
    "semester": 5
  }
}
```

---

### 4. PUT - Update Matakuliah

Mengupdate data matakuliah yang sudah ada.

**Endpoint:** `PUT http://localhost:6543/api/matakuliah/{id}`

**Headers:**
- Content-Type: application/json

**Request Body:**
```json
{
  "nama_mk": "Pemrograman Web Lanjut",
  "sks": 4
}
```

**Screenshot Testing:**

![PUT Update Matakuliah](screenshots/put_update_matakuliah.png)

**Response (200 OK):**
```json
{
  "message": "Matakuliah berhasil diupdate",
  "data": {
    "id": 4,
    "kode_mk": "IF301",
    "nama_mk": "Pemrograman Web Lanjut",
    "sks": 4,
    "semester": 5
  }
}
```

---

### 5. DELETE - Delete Matakuliah

Menghapus matakuliah dari database.

**Endpoint:** `DELETE http://localhost:6543/api/matakuliah/{id}`

**Screenshot Testing:**

![DELETE Matakuliah](screenshots/delete_matakuliah.png)

**Response (200 OK):**
```json
{
  "message": "Matakuliah berhasil dihapus"
}
```

---

### Cara Testing dengan Postman

1. Buka Postman
2. Pastikan server sudah running di `http://localhost:6543`
3. Buat request sesuai dengan endpoint di atas
4. Untuk POST dan PUT, jangan lupa set Header `Content-Type: application/json`
5. Screenshot setiap hasil testing untuk dokumentasi
6. Simpan screenshot di folder `screenshots/`

## Struktur Proyek

```
pyramid_mahasiswa/
├── pyramid_mahasiswa/
│   ├── __init__.py           # Konfigurasi aplikasi
│   ├── routes.py             # Definisi routes
│   ├── models/
│   │   ├── __init__.py
│   │   ├── meta.py           # Base model
│   │   ├── mymodel.py        # Contoh model
│   │   └── matakuliah.py     # Model Matakuliah
│   ├── views/
│   │   ├── __init__.py
│   │   ├── default.py        # View default
│   │   └── matakuliah.py     # API endpoints matakuliah
│   ├── alembic/
│   │   ├── env.py
│   │   └── versions/         # Migration files
│   ├── templates/
│   └── static/
├── development.ini           # Konfigurasi development
├── production.ini            # Konfigurasi production
├── alembic.ini              # Konfigurasi Alembic
├── setup.py                 # Setup script
└── README.md                # Dokumentasi ini
```

## Teknologi yang Digunakan

- **Framework:** Pyramid 2.0
- **Database:** SQLite (via SQLAlchemy)
- **Migration:** Alembic
- **Server:** Waitress

## Troubleshooting

### Error: Database tidak ditemukan
Pastikan Anda sudah menjalankan migration dengan `alembic upgrade head`

### Error: Module tidak ditemukan
Pastikan Anda sudah install dependencies dengan `pip install -e .`

### Error: Port sudah digunakan
Ubah port di `development.ini` pada section `[server:main]`

## Catatan Penting

- Pastikan virtual environment sudah aktif sebelum menjalankan perintah
- Jangan lupa menjalankan migration sebelum menjalankan server
- Untuk production, gunakan `production.ini` dengan konfigurasi database yang sesuai
- API menggunakan JSON format untuk request dan response

## Lisensi

Proyek ini dibuat untuk keperluan praktikum.
