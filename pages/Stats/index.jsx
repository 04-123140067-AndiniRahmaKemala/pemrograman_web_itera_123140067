import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';

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
    <>
      <h2 className="text-3xl font-bold text-amber-900 mb-6">Statistik Buku</h2>
      
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

        {/* Progress Bars */}
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
  );
};

export default Stats;