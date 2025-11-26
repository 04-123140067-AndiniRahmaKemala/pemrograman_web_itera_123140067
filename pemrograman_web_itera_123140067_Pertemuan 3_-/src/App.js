import React, { useState, useEffect, createContext, useContext } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Search, Filter, Home, BarChart3, X } from 'lucide-react';

// Custom Hook: useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Custom Hook: useBookStats
const useBookStats = (books) => {
  const [stats, setStats] = useState({
    total: 0,
    milik: 0,
    baca: 0,
    beli: 0
  });

  useEffect(() => {
    const newStats = {
      total: books.length,
      milik: books.filter(b => b.status === 'milik').length,
      baca: books.filter(b => b.status === 'baca').length,
      beli: books.filter(b => b.status === 'beli').length
    };
    setStats(newStats);
  }, [books]);

  return stats;
};

// Context API untuk Book Management
const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => book.id === id ? { ...book, ...updatedBook } : book));
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const getFilteredBooks = () => {
    let filtered = books;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(book => book.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.penulis.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <BookContext.Provider value={{
      books,
      addBook,
      updateBook,
      deleteBook,
      getFilteredBooks,
      searchQuery,
      setSearchQuery,
      filterStatus,
      setFilterStatus
    }}>
      {children}
    </BookContext.Provider>
  );
};

const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};

// Component: BookForm
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

// Component: BookList
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

// Component: BookFilter
const BookFilter = () => {
  const { searchQuery, setSearchQuery, filterStatus, setFilterStatus } = useBooks();

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-6 border-2 border-amber-200">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-amber-900 mb-2 font-medium flex items-center gap-2">
            <Search size={18} />
            Cari Buku
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan judul atau penulis..."
            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-amber-900 mb-2 font-medium flex items-center gap-2">
            <Filter size={18} />
            Filter Status
          </label>
          <select
            aria-label="filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Semua Status</option>
            <option value="milik">Milik</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Component: Stats
const Stats = () => {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const getPercentage = (value) => {
    return stats.total > 0 ? Math.round((value / stats.total) * 100) : 0;
  };

  const statData = [
    { 
      label: 'Milik', 
      value: stats.milik, 
      percentage: getPercentage(stats.milik),
      color: 'bg-green-500',
      lightColor: 'bg-green-100',
      icon: '📚'
    },
    { 
      label: 'Sedang Dibaca', 
      value: stats.baca, 
      percentage: getPercentage(stats.baca),
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      icon: '📖'
    },
    { 
      label: 'Ingin Dibeli', 
      value: stats.beli, 
      percentage: getPercentage(stats.beli),
      color: 'bg-orange-500',
      lightColor: 'bg-orange-100',
      icon: '🛒'
    }
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Total Buku - Card Besar */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-lg mb-2">Total Koleksi Buku</p>
              <p className="text-6xl font-bold mb-2">{stats.total}</p>
              <p className="text-amber-200">Buku dalam perpustakaan Anda</p>
            </div>
            <div className="text-8xl opacity-20">📚</div>
          </div>
        </div>
      </div>

      {/* Progress Bars untuk setiap kategori */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-amber-200">
        <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <BarChart3 size={28} className="text-amber-600" />
          Distribusi Buku
        </h3>
        
        <div className="space-y-6">
          {statData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-amber-900">{item.label}</p>
                    <p className="text-sm text-amber-600">{item.value} buku</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-900">{item.percentage}%</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className={`w-full h-4 ${item.lightColor} rounded-full overflow-hidden`}>
                <div 
                  className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                  style={{ width: `${item.percentage}%` }}
                >
                  {item.percentage > 10 && (
                    <span className="text-white text-xs font-bold">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200 text-center">
          <p className="text-4xl mb-2">📚</p>
          <p className="text-2xl font-bold text-green-800">{stats.milik}</p>
          <p className="text-sm text-green-600">Milik</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200 text-center">
          <p className="text-4xl mb-2">📖</p>
          <p className="text-2xl font-bold text-blue-800">{stats.baca}</p>
          <p className="text-sm text-blue-600">Sedang Dibaca</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200 text-center">
          <p className="text-4xl mb-2">🛒</p>
          <p className="text-2xl font-bold text-orange-800">{stats.beli}</p>
          <p className="text-sm text-orange-600">Ingin Dibeli</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [editingBook, setEditingBook] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
    setCurrentPage('home');
  };

  const handleCloseEdit = () => {
    setEditingBook(null);
    setIsFormOpen(false);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    if (isFormOpen) {
      setEditingBook(null);
    }
  };

  return (
    <BookProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        {/* Navigation */}
        <nav className="bg-gradient-to-r from-amber-100 to-yellow-100 shadow-lg mb-6 border-b-4 border-amber-300">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
                <BookOpen className="text-amber-700" />
                Manajemen Buku Pribadi
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                    currentPage === 'home'
                      ? 'bg-amber-700 text-white shadow-lg'
                      : 'bg-white text-amber-900 hover:bg-amber-200 border-2 border-amber-300'
                  }`}
                >
                  <Home size={18} />
                  Beranda
                </button>
                <button
                  onClick={() => setCurrentPage('stats')}
                  className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                    currentPage === 'stats'
                      ? 'bg-amber-700 text-white shadow-lg'
                      : 'bg-white text-amber-900 hover:bg-amber-200 border-2 border-amber-300'
                  }`}
                >
                  <BarChart3 size={18} />
                  Statistik
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          {currentPage === 'home' && (
            <>
              <BookForm 
                bookToEdit={editingBook} 
                onClose={handleCloseEdit}
                isOpen={isFormOpen}
                onToggle={toggleForm}
              />
              <BookFilter />
              <BookList onEdit={handleEdit} />
            </>
          )}

          {currentPage === 'stats' && (
            <>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Statistik Buku</h2>
              <Stats />
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Tentang Aplikasi</h3>
                <p className="text-amber-700 mb-2">
                  Aplikasi Manajemen Buku Pribadi membantu Anda melacak koleksi buku dengan mudah.
                </p>
                <p className="text-amber-700">
                  Fitur: Tambah/Edit/Hapus buku, Filter berdasarkan status, Pencarian, dan Statistik lengkap.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </BookProvider>
  );
};

export default App;