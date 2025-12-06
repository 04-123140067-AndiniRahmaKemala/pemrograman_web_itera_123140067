import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Koneksi ke PostgreSQL
try:
    conn = psycopg2.connect(
        user="postgres",
        password="123140067",
        host="localhost",
        port="5432",
        database="pyramid_mahasiswa"
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    
    cursor = conn.cursor()
    
    # Tambahkan data matakuliah
    data_matakuliah = [
        ('PROG101', 'Pemrograman Dasar', 3, 1),
        ('WEBDEV201', 'Web Development', 4, 2),
        ('DATABASE301', 'Basis Data', 3, 3),
        ('ALGO101', 'Struktur Data & Algoritma', 4, 2),
        ('NETWORK201', 'Jaringan Komputer', 3, 3),
    ]
    
    for kode, nama, sks, semester in data_matakuliah:
        cursor.execute(
            "INSERT INTO matakuliah (kode_mk, nama_mk, sks, semester) VALUES (%s, %s, %s, %s)",
            (kode, nama, sks, semester)
        )
        print(f"Ditambahkan: {kode} - {nama}")
    
    print("\nSemua data berhasil ditambahkan!")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"Error: {e}")
    print("\nPastikan database sudah dibuat dengan benar")
except Exception as e:
    print(f"Error: {e}")
