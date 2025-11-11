import React, { useMemo } from 'react';
import useBookStats from '../../hooks/useBookStats.jsx'; 

function Stats() {
  // 1. Ambil data dari custom hook
  const { total, owned, reading, toBuy } = useBookStats();

  // 2. Hitung persentase (menggunakan useMemo untuk efisiensi)
  const [ownedPercent, readingPercent, toBuyPercent] = useMemo(() => {
    const calcPercent = (value) => (total === 0 ? 0 : (value / total) * 100);
    return [
      calcPercent(owned),
      calcPercent(reading),
      calcPercent(toBuy)
    ];
  }, [total, owned, reading, toBuy]);

  return (
    <div className="card">
      <h2>Statistik Buku</h2>
      
      {/* BAGIAN 1: STATISTIK DENGAN IKON (MODIFIKASI) */}
      <div className="stats-grid">
        {/* Item 1: Total */}
        <div className="stat-item">
          <div className="stat-icon">📚</div>
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total Buku</div>
        </div>
        
        {/* Item 2: Dimiliki */}
        <div className="stat-item">
          <div className="stat-icon">✅</div>
          <div className="stat-number">{owned}</div>
          <div className="stat-label">Buku Dimiliki</div>
        </div>

        {/* Item 3: Dibaca */}
        <div className="stat-item">
          <div className="stat-icon">📖</div>
          <div className="stat-number">{reading}</div>
          <div className="stat-label">Sedang Dibaca</div>
        </div>

        {/* Item 4: Dibeli */}
        <div className="stat-item">
          <div className="stat-icon">🛒</div>
          <div className="stat-number">{toBuy}</div>
          <div className="stat-label">Ingin Dibeli</div>
        </div>
      </div>

      {/* BAGIAN 2: FITUR BARU - BILAH PROPORSI */}
      <div className="stats-proportions">
        <h3>Proporsi Koleksi</h3>

        {/* Bar 1: Dimiliki */}
        <div className="progress-item">
          <div className="progress-label">
            <span>Dimiliki</span>
            <span>{Math.round(ownedPercent)}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar owned" 
              style={{ width: `${ownedPercent}%` }}
              aria-valuenow={ownedPercent}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            ></div>
          </div>
        </div>

        {/* Bar 2: Sedang Dibaca */}
        <div className="progress-item">
          <div className="progress-label">
            <span>Sedang Dibaca</span>
            <span>{Math.round(readingPercent)}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar reading" 
              style={{ width: `${readingPercent}%` }}
              aria-valuenow={readingPercent}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            ></div>
          </div>
        </div>

        {/* Bar 3: Ingin Dibeli */}
        <div className="progress-item">
          <div className="progress-label">
            <span>Ingin Dibeli</span>
            <span>{Math.round(toBuyPercent)}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar to-buy" 
              style={{ width: `${toBuyPercent}%` }}
              aria-valuenow={toBuyPercent}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            ></div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Stats;