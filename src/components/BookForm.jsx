import React, { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext.jsx";

function BookForm({ bookToEdit, onCancelEdit }) {
  const { addBook, updateBook } = useBooks();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "milik",
  });

  const [errors, setErrors] = useState({});

  // Mengisi form saat mode edit aktif
  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || "",
        author: bookToEdit.author || "",
        status: bookToEdit.status || "milik",
      });
    } else {
      resetForm();
    }
  }, [bookToEdit]);

  // Reset form
  const resetForm = () => {
    setFormData({ title: "", author: "", status: "milik" });
    setErrors({});
  };

  // Validasi input
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Judul tidak boleh kosong";
    if (!formData.author.trim()) newErrors.author = "Penulis tidak boleh kosong";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Menangani perubahan input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (bookToEdit) {
      updateBook(bookToEdit.id, formData);
      onCancelEdit?.(); // optional chaining agar tidak error jika tidak dikirim
    } else {
      addBook(formData);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
          aria-invalid={!!errors.title}
          placeholder="Masukkan judul buku"
        />
        {errors.title && (
          <span className="form-error" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          value={formData.author}
          onChange={handleChange}
          aria-invalid={!!errors.author}
          placeholder="Masukkan nama penulis"
        />
        {errors.author && (
          <span className="form-error" role="alert">
            {errors.author}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {bookToEdit ? "Update Buku" : "Simpan Buku"}
        </button>

        {bookToEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
            style={{ marginLeft: "10px" }}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
