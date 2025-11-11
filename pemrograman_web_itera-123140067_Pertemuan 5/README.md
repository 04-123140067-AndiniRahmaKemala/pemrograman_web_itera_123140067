📚 Sistem Manajemen Perpustakaan Sederhana

Aplikasi manajemen perpustakaan berbasis Python yang menerapkan konsep Object-Oriented Programming (OOP) secara lengkap, meliputi Abstraction, Encapsulation, Inheritance, dan Polymorphism.

📋 Deskripsi Proyek

Sistem ini dirancang untuk mengelola koleksi buku dan majalah pada perpustakaan.
Program ini menampilkan implementasi prinsip OOP secara praktis dan terstruktur, sekaligus menambahkan fitur interaktif seperti menu navigasi dan pilihan kembali ke menu utama.

✨ Fitur Utama

✅ Menambahkan item baru (Buku dan Majalah)

✅ Menampilkan seluruh koleksi perpustakaan

✅ Mencari item berdasarkan judul atau ID

✅ Meminjam dan mengembalikan item

✅ Menampilkan statistik koleksi perpustakaan

✅ Fitur interaktif: kembali ke menu utama (y/n) setelah setiap aksi

🏗️ Struktur Program
1. Abstract Base Class – LibraryItem

Kelas dasar abstrak yang digunakan sebagai cetak biru untuk semua jenis item di perpustakaan.

Atribut:

__item_id → ID unik item (private)

_title → Judul item

_year → Tahun terbit

_is_available → Status ketersediaan item

Method:

borrow() → Meminjam item jika tersedia

return_item() → Mengembalikan item

get_info() → Menampilkan detail item (abstract)

get_category() → Mengembalikan kategori item (abstract)

2. Subclass – Book

Representasi kelas buku yang mewarisi LibraryItem.

Atribut Tambahan:

_author → Penulis buku

_pages → Jumlah halaman

Implementasi Method:

Override get_info() → Menampilkan detail buku dengan format ASCII

Override get_category() → Mengembalikan kategori "Buku"

3. Subclass – Magazine

Representasi kelas majalah yang juga mewarisi LibraryItem.

Atribut Tambahan:

_issue_number → Nomor edisi majalah

_publisher → Nama penerbit

Implementasi Method:

Override get_info() → Menampilkan detail majalah

Override get_category() → Mengembalikan kategori "Majalah"

4. Class – Library

Kelas utama untuk mengelola semua koleksi item.

Atribut:

__name → Nama perpustakaan

__items → Daftar koleksi item

Method Utama:

add_item() → Menambah item baru

display_all_items() → Menampilkan semua koleksi

find_by_id() → Mencari item berdasarkan ID

find_by_title() → Mencari item berdasarkan judul

borrow_item() → Meminjam item

return_item() → Mengembalikan item

get_statistics() → Menampilkan data statistik koleksi


Konsep OOP yang Diterapkan
Abstraction & Inheritance
class LibraryItem(ABC):
    @abstractmethod
    def get_info(self):
        pass

class Book(LibraryItem):
    def get_category(self) -> str:
        return "Buku"

Encapsulation
class LibraryItem:
    def __init__(self, item_id, title, year):
        self.__item_id = item_id
        self._title = title
        self._year = year
        self._is_available = True

Polymorphism
items = [Book(...), Magazine(...)]
for item in items:
    print(item.get_info())  # Memanggil versi get_info() masing-masing class

Cara Menjalankan Program
Prasyarat

Python 3.8 atau lebih tinggi

Modul abc dan typing (sudah termasuk dalam Python standard library)

Langkah-langkah

Pastikan file library_system.py sudah ada di direktori kerja.

Jalankan program melalui terminal atau IDE:

python library_system.py


Pilih menu sesuai kebutuhan:

Tambah item

Cari item

Pinjam / Kembalikan item

Lihat statistik

Setelah setiap aksi, program akan menanyakan:

Ingin kembali ke menu utama? (y/n):

📸 Contoh Tampilan Program
📖 Menu Utama
<img width="1759" height="940" alt="image" src="https://github.com/user-attachments/assets/a95a6bce-499d-44f4-b4c1-d1d7bc64edec" />

📘 Contoh Output Detail Buku
<img width="1759" height="940" alt="image" src="https://github.com/user-attachments/assets/a95a6bce-499d-44f4-b4c1-d1d7bc64edec" />

📊 Statistik Koleksi
📊 RINGKASAN PERPUSTAKAAN
<img width="1759" height="940" alt="image" src="https://github.com/user-attachments/assets/a95a6bce-499d-44f4-b4c1-d1d7bc64edec" />

🎨 Diagram Class
                    ┌────────────────────────────┐
                    │       LibraryItem (ABC)    │
                    ├────────────────────────────┤
                    │ - __item_id                │
                    │ - _title                   │
                    │ - _year                    │
                    │ - _is_available            │
                    ├────────────────────────────┤
                    │ + borrow()                 │
                    │ + return_item()            │
                    │ + get_info() (abstract)    │
                    │ + get_category() (abstract)│
                    └──────────────┬─────────────┘
                                   │
            ┌──────────────────────┴───────────────────────┐
            │                                              │
     ┌──────▼───────┐                              ┌──────▼───────┐
     │    Book       │                              │   Magazine   │
     ├───────────────┤                              ├──────────────┤
     │ - _author     │                              │ - _publisher │
     │ - _pages      │                              │ - _issue_num │
     ├───────────────┤                              ├──────────────┤
     │ + get_info()  │                              │ + get_info() │
     │ + get_category()│                             │ + get_category()│
     └───────────────┘                              └──────────────┘

                    ┌────────────────────────────┐
                    │          Library           │
                    ├────────────────────────────┤
                    │ - __name                   │
                    │ - __items                  │
                    ├────────────────────────────┤
                    │ + add_item()               │
                    │ + find_by_id()             │
                    │ + find_by_title()          │
                    │ + borrow_item()            │
                    │ + return_item()            │
                    │ + display_all_items()      │
                    │ + get_statistics()         │
                    └────────────────────────────┘

