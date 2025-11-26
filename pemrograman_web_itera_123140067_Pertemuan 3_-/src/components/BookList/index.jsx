import React from 'react';
import { BookOpen, Edit2, Trash2 } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

const BookList = ({ onEdit }) => {
  const { getFilteredBooks, deleteBook } = useBooks();
  const books = getFilteredBooks();

  const handleDelete = (id, judul) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus buku "${judul}"?`)) {
      deleteBook(id);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      milik: 'bg-green-100 text-green-800 border border-green-300',
      baca: 'bg-blue-100 text-blue-800 border border-blue-300',
      beli: 'bg-amber-100 text-amber-800 border border-amber-300'
    };
    const labels = {
      milik: 'Milik',
      baca: 'Sedang Dibaca',
      beli: 'Ingin Dibeli'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (books.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-amber-200">
        <BookOpen className="mx-auto mb-4 text-amber-400" size={48} />
        <p className="text-amber-700 text-lg">Belum ada buku. Tambahkan buku pertama Anda!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map(book => (
        <div key={book.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition border-2 border-amber-200">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-amber-900 flex-1">{book.judul}</h3>
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => onEdit(book)}
                className="text-amber-600 hover:text-amber-800 transition"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(book.id, book.judul)}
                className="text-red-600 hover:text-red-800 transition"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <p className="text-amber-700 mb-3">Penulis: {book.penulis}</p>
          {getStatusBadge(book.status)}
        </div>
      ))}
    </div>
  );
};

export default BookList;