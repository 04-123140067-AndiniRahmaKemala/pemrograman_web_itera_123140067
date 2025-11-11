# ============================================================
# Program Pengelolaan Data Nilai Mahasiswa
# ============================================================

# Data awal: minimal 5 mahasiswa (list of dictionary)
mahasiswa_list = [
    {"nama": "Andinn", "nim": "123140067", "nilai_uts": 75, "nilai_uas": 80, "nilai_tugas": 85},
    {"nama": "Jihwii", "nim": "123140069", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 60},
    {"nama": "Miptul", "nim": "123140088", "nilai_uts": 90, "nilai_uas": 88, "nilai_tugas": 95},
    {"nama": "Alliyah", "nim": "123140064", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},
    {"nama": "Rahma", "nim": "123140099", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80}
]

# ============================================================
# FUNGSI-FUNGSI
# ============================================================

def hitung_nilai_akhir(mhs):
    """Menghitung nilai akhir mahasiswa (30% UTS + 40% UAS + 30% Tugas)."""
    return 0.3 * mhs["nilai_uts"] + 0.4 * mhs["nilai_uas"] + 0.3 * mhs["nilai_tugas"]

def tentukan_grade(nilai):
    """Menentukan grade berdasarkan nilai akhir."""
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

def tampilkan_data(mahasiswa_list):
    """Menampilkan data mahasiswa dalam format tabel."""
    print("="*75)
    print("{:<10} {:<10} {:<10} {:<10} {:<10} {:<10}".format(
        "NIM", "Nama", "UTS", "UAS", "Tugas", "Nilai Akhir (Grade)"
    ))
    print("="*75)
    for mhs in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        print("{:<10} {:<10} {:<10} {:<10} {:<10} {:.2f} ({})".format(
            mhs["nim"], mhs["nama"], mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"], nilai_akhir, grade
        ))
    print("="*75)

def cari_mahasiswa_tertinggi(mahasiswa_list):
    """Mencari mahasiswa dengan nilai tertinggi."""
    return max(mahasiswa_list, key=hitung_nilai_akhir)

def cari_mahasiswa_terendah(mahasiswa_list):
    """Mencari mahasiswa dengan nilai terendah."""
    return min(mahasiswa_list, key=hitung_nilai_akhir)

def input_mahasiswa_baru():
    """Menambahkan data mahasiswa baru melalui input user."""
    nama = input("Masukkan nama mahasiswa: ")
    nim = input("Masukkan NIM: ")
    uts = float(input("Masukkan nilai UTS: "))
    uas = float(input("Masukkan nilai UAS: "))
    tugas = float(input("Masukkan nilai Tugas: "))
    return {"nama": nama, "nim": nim, "nilai_uts": uts, "nilai_uas": uas, "nilai_tugas": tugas}

def filter_berdasarkan_grade(mahasiswa_list, grade_dicari):
    """Menampilkan mahasiswa dengan grade tertentu."""
    hasil = []
    for mhs in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        if grade == grade_dicari:
            hasil.append(mhs)
    return hasil

def hitung_rata_rata_kelas(mahasiswa_list):
    """Menghitung rata-rata nilai akhir kelas."""
    total = sum(hitung_nilai_akhir(mhs) for mhs in mahasiswa_list)
    return total / len(mahasiswa_list)

# ============================================================
# PROGRAM UTAMA
# ============================================================

while True:
    print("\n=== MENU PROGRAM PENGELOLAAN DATA NILAI MAHASISWA ===")
    print("1. Tampilkan semua data mahasiswa")
    print("2. Tambahkan data mahasiswa baru")
    print("3. Tampilkan mahasiswa dengan nilai tertinggi")
    print("4. Tampilkan mahasiswa dengan nilai terendah")
    print("5. Filter mahasiswa berdasarkan grade")
    print("6. Hitung rata-rata nilai kelas")
    print("7. Keluar")

    pilihan = input("Pilih menu (1-7): ")

    if pilihan == "1":
        tampilkan_data(mahasiswa_list)

    elif pilihan == "2":
        baru = input_mahasiswa_baru()
        mahasiswa_list.append(baru)
        print("Data mahasiswa berhasil ditambahkan!")

    elif pilihan == "3":
        tertinggi = cari_mahasiswa_tertinggi(mahasiswa_list)
        nilai = hitung_nilai_akhir(tertinggi)
        print(f"\nMahasiswa dengan nilai tertinggi: {tertinggi['nama']} ({nilai:.2f})")

    elif pilihan == "4":
        terendah = cari_mahasiswa_terendah(mahasiswa_list)
        nilai = hitung_nilai_akhir(terendah)
        print(f"\nMahasiswa dengan nilai terendah: {terendah['nama']} ({nilai:.2f})")

    elif pilihan == "5":
        grade_dicari = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
        hasil = filter_berdasarkan_grade(mahasiswa_list, grade_dicari)
        if hasil:
            print(f"\nMahasiswa dengan grade {grade_dicari}:")
            tampilkan_data(hasil)
        else:
            print("Tidak ada mahasiswa dengan grade tersebut.")

    elif pilihan == "6":
        rata_rata = hitung_rata_rata_kelas(mahasiswa_list)
        print(f"\nRata-rata nilai akhir kelas: {rata_rata:.2f}")

    elif pilihan == "7":
        print("Program selesai. Terima kasih!")
        break

    else:
        print("Pilihan tidak valid. Coba lagi.")
