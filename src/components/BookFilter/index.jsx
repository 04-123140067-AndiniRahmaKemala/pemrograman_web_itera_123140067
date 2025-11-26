import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

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

export default BookFilter;