import React, { useState } from 'react';
import { useBooks } from "../context/BookContext.jsx";

// --- Komponen Modal Konfirmasi ---
const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <h3>Konfirmasi Penghapusan</h3>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button onClick={onConfirm} className="btn btn-danger">Ya, Hapus</button>
          <button onClick={onCancel} className="btn btn-secondary">Batal</button>
        </div>
      </div>
    </div>
  );
};
// ---------------------------------


function BookList({ books, onEdit }) {
  const { deleteBook } = useBooks();

  // State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State untuk menyimpan buku mana yang akan dihapus
  const [bookToDelete, setBookToDelete] = useState(null);

  // Objek untuk mapping status
  const statusMap = {
    milik: { text: 'Dimiliki', class: 'status-milik' },
    baca: { text: 'Sedang Dibaca', class: 'status-baca' },
    beli: { text: 'Ingin Dibeli', class: 'status-beli' },
  };

  // 1. Saat tombol "Hapus" di item buku diklik
  const handleDeleteClick = (book) => {
    setBookToDelete(book); // Simpan info buku
    setIsModalOpen(true);    // Buka modal
  };

  // 2. Saat tombol "Ya, Hapus" di dalam modal diklik
  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete.id); // Hapus buku
    }
    setIsModalOpen(false);   // Tutup modal
    setBookToDelete(null); // Bersihkan state
  };

  // 3. Saat tombol "Batal" di dalam modal diklik
  const handleCancelDelete = () => {
    setIsModalOpen(false);   // Tutup modal
    setBookToDelete(null); // Bersihkan state
  };

  // Tampilkan pesan jika tidak ada buku
  if (books.length === 0) {
    return <p className="empty-list card">Tidak ada buku yang cocok dengan filter atau daftar kosong.</p>;
  }

  return (
    <>
      <div className="book-list">
        {books.map(book => (
          <div className="book-item" key={book.id}>
            <div className="book-item-details">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <span className={`status-badge ${statusMap[book.status]?.class || ''}`}>
                {statusMap[book.status]?.text || book.status}
              </span>
            </div>
            <div className="book-item-actions">
              <button
                onClick={() => onEdit(book)}
                className="btn btn-secondary"
                aria-label={`Edit ${book.title}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(book)} // Ganti ke fungsi ini
                className="btn btn-danger"
                aria-label={`Hapus ${book.title}`}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RENDER MODAL DI SINI (di luar .book-list) */}
      <ConfirmModal
        isOpen={isModalOpen}
        message={`Apakah Anda yakin ingin menghapus buku "${bookToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default BookList;