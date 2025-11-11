## Sistem Manajemen Perpustakaan Sederhana

Aplikasi manajemen perpustakaan berbasis Python yang menerapkan konsep Object-Oriented Programming (OOP) secara lengkap, meliputi Abstraction, Encapsulation, Inheritance, dan Polymorphism.

## Deskripsi Proyek

Sistem ini dirancang untuk mengelola koleksi buku dan majalah pada perpustakaan.
Program ini menampilkan implementasi prinsip OOP secara praktis dan terstruktur, sekaligus menambahkan fitur interaktif seperti menu navigasi dan pilihan kembali ke menu utama.

## Fitur Utama

✅ Menambahkan item baru (Buku dan Majalah)

✅ Menampilkan seluruh koleksi perpustakaan

✅ Mencari item berdasarkan judul atau ID

✅ Meminjam dan mengembalikan item

✅ Menampilkan statistik koleksi perpustakaan

✅ Fitur interaktif: kembali ke menu utama (y/n) setelah setiap aksi

 ## Struktur Program
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


## Konsep OOP yang Diterapkan
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

## Contoh Tampilan Program
📖 Tampilan Utama
<img width="1034" height="621" alt="image" src="https://github.com/user-attachments/assets/810db466-5402-46eb-92b8-8838a5745a4f" />

📘 Menu 1 dan 2
<img width="1021" height="868" alt="image" src="https://github.com/user-attachments/assets/89cad667-0c19-4170-9170-6741efb81892" />

📘 Menu 3 dan 4
<img width="761" height="672" alt="image" src="https://github.com/user-attachments/assets/0e3bdf5b-5573-48c8-ac07-088df1469041" />
<img width="1020" height="796" alt="image" src="https://github.com/user-attachments/assets/be967f68-c9f7-41b6-a6be-d2b586931adb" />

📘 Menu 5, 6, dan 7
<img width="1025" height="590" alt="image" src="https://github.com/user-attachments/assets/c16ab8c6-d42f-466f-9222-1a2c5b680817" />
<img width="1014" height="644" alt="image" src="https://github.com/user-attachments/assets/4cf56ae9-34be-439b-9cf8-79b63fcdb8f0" />
<img width="1032" height="544" alt="image" src="https://github.com/user-attachments/assets/8d22f85c-d1ae-422e-aaa3-852b447806aa" />

📘 Menu 8 dan 9
<img width="1008" height="726" alt="image" src="https://github.com/user-attachments/assets/4f3001c0-16df-4d84-a447-a3ab522b68bc" />
<img width="1019" height="720" alt="image" src="https://github.com/user-attachments/assets/3588d315-5932-4c3d-94e2-abd615b4a71c" />

## Diagram Class
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


