import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

const BookForm = ({ bookToEdit, onClose, isOpen, onToggle }) => {
  const { addBook, updateBook } = useBooks();
  const [formData, setFormData] = useState({
    judul: '',
    penulis: '',
    status: 'milik'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        judul: bookToEdit.judul,
        penulis: bookToEdit.penulis,
        status: bookToEdit.status
      });
    }
  }, [bookToEdit]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.judul.trim()) {
      newErrors.judul = 'Judul buku harus diisi';
    } else if (formData.judul.trim().length < 3) {
      newErrors.judul = 'Judul buku minimal 3 karakter';
    }

    if (!formData.penulis.trim()) {
      newErrors.penulis = 'Nama penulis harus diisi';
    } else if (formData.penulis.trim().length < 3) {
      newErrors.penulis = 'Nama penulis minimal 3 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    if (bookToEdit) {
      updateBook(bookToEdit.id, formData);
    } else {
      addBook(formData);
    }

    setFormData({ judul: '', penulis: '', status: 'milik' });
    setErrors({});
    if (onClose) onClose();
    if (onToggle) onToggle();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen && !bookToEdit) {
    return (
      <div className="mb-6">
        <button
          onClick={onToggle}
          className="w-full bg-amber-700 text-white py-3 px-6 rounded-lg hover:bg-amber-800 transition font-medium flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Tambah Buku Baru
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-2 border-amber-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-amber-900">
          {bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}
        </h2>
        {!bookToEdit && (
          <button
            onClick={onToggle}
            className="text-amber-700 hover:text-amber-900 transition"
            title="Tutup"
          >
            <X size={24} />
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-amber-900 mb-2 font-medium">Judul Buku</label>
        <input
          type="text"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            errors.judul ? 'border-red-500' : 'border-amber-300'
          }`}
          placeholder="Masukkan judul buku"
        />
        {errors.judul && <p className="text-red-500 text-sm mt-1">{errors.judul}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-amber-900 mb-2 font-medium">Penulis</label>
        <input
          type="text"
          name="penulis"
          value={formData.penulis}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            errors.penulis ? 'border-red-500' : 'border-amber-300'
          }`}
          placeholder="Masukkan nama penulis"
        />
        {errors.penulis && <p className="text-red-500 text-sm mt-1">{errors.penulis}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-amber-900 mb-2 font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="milik">Milik</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition font-medium"
        >
          {bookToEdit ? 'Update Buku' : 'Tambah Buku'}
        </button>
        {bookToEdit && (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition"
          >
            Batal
          </button>
        )}
      </div>
    </div>
  );
};

export default BookForm;