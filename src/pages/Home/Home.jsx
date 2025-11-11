import React, { useState, useMemo } from 'react';
import { useBooks } from '../../context/BookContext.jsx';

// PERBAIKAN: Hapus nama folder duplikat dari path ini
import BookForm from '../../components/BookForm.jsx';
import BookList from '../../components/BookList.jsx';
import BookFilter from '../../components/BookFilter.jsx';

// Komponen Halaman Home
function Home() {
  const { books } = useBooks();

  // State untuk form
  const [bookToEdit, setBookToEdit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  // State untuk filter & pencarian
  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');

  // Logika pencarian & filter
  const filteredBooks = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return books.filter(book => {
      const matchesStatus = (filter === 'semua') || (book.status === filter);
      const matchesSearch =
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [books, filter, searchTerm]);

  // Handler untuk membuka form (baik mode 'add' atau 'edit')
  const handleEdit = (book) => {
    setBookToEdit(book);
    setIsFormVisible(true); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler untuk tombol "Tambah Buku Baru"
  const toggleAddForm = () => {
    // Jika form terbuka, tutup. Jika tertutup, buka.
    if (isFormVisible) {
      setIsFormVisible(false);
      setBookToEdit(null); // Selalu reset saat ditutup
    } else {
      setBookToEdit(null); // Pastikan mode 'add'
      setIsFormVisible(true);
    }
  };

  // Handler untuk menutup form
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setBookToEdit(null); 
  };

  return (
    <div className="home-container">
      
      {/* Tombol untuk menampilkan form */}
      <button 
        onClick={toggleAddForm} 
        className="btn btn-primary btn-toggle-form"
        aria-expanded={isFormVisible}
      >
        {isFormVisible ? 'Tutup Form' : '+ Tambah Buku Baru'}
      </button>

      {/* Bungkus card dengan .form-wrapper untuk animasi */}
      <div className={isFormVisible ? "form-wrapper visible" : "form-wrapper"}>
        <div className="card">
          <h2>{bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
          <BookForm
            bookToEdit={bookToEdit}
            onCloseForm={handleCloseForm} // Ganti nama prop
          />
        </div>
      </div>

      {/* Filter dan List (selalu tampil) */}
      <div className="card">
        <h2>Daftar Bukuku</h2>
        <BookFilter
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <BookList books={filteredBooks} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default Home;