import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';

// 🔹 Impor komponen & hooks
import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Stats from './pages/Stats/Stats.jsx';
import { useBooks } from './context/BookContext.jsx';
import useBookStats from './hooks/useBookStats.jsx';

// 🔹 Mock modul eksternal
vi.mock('./context/BookContext.jsx', () => ({
  useBooks: vi.fn(),
}));

vi.mock('./hooks/useBookStats.jsx', () => ({
  default: vi.fn(),
}));

// 🔹 Data palsu
const mockBooks = [
  { id: '1', title: 'Harry Potter', author: 'J.K Rowling', status: 'milik' },
  { id: '2', title: 'Hujan', author: 'Tere Liye', status: 'baca' },
  { id: '3', title: 'Back to November', author: 'Soldi Algaran', status: 'beli' },
];

// 🔹 Mock localStorage
beforeAll(() => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  };
  global.localStorage = localStorageMock;
});

// 🔹 Nilai default sebelum setiap test
beforeEach(() => {
  vi.clearAllMocks();

  useBooks.mockReturnValue({
    books: mockBooks,
    addBook: vi.fn(),
    updateBook: vi.fn(),
    deleteBook: vi.fn(),
  });

  useBookStats.mockReturnValue({
    total: 3,
    owned: 1,
    reading: 1,
    toBuy: 1,
  });
});

// 🔹 Rangkaian Tes
describe('Aplikasi Manajemen Buku', () => {
  // ✅ Tes 1: Render halaman Home
  it('Tes 1: Render Halaman Home dan tampilkan daftar buku', () => {
    render(<Home />);
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Hujan')).toBeInTheDocument();
    expect(screen.getByText('Back to November')).toBeInTheDocument();
  });

  // ✅ Tes 2: Fungsionalitas Pencarian
  it('Tes 2: Filter pencarian berfungsi', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText(/Cari Buku/i), 'Harry');
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.queryByText('Hujan')).not.toBeInTheDocument();
  });

  // ✅ Tes 3: Fungsionalitas Filter Status
  it('Tes 3: Filter status berfungsi', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.selectOptions(
      screen.getByLabelText(/Filter Berdasarkan Status/i),
      'baca'
    );
    expect(screen.queryByText('Harry Potter')).not.toBeInTheDocument();
    expect(screen.getByText('Hujan')).toBeInTheDocument();
  });

 // ✅ Tes 4: Render halaman Statistik
it('Tes 4: Render Halaman Statistik dan tampilkan data', () => {
  render(<Stats />);
  // Sesuaikan teks dengan yang ada di komponen Stats.jsx
  expect(screen.getByText(/Total Buku/i)).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();

  // Gunakan getAllByText karena ada lebih dari satu elemen "33%"
  const persen = screen.getAllByText(/33\s*%/i);
  expect(persen.length).toBeGreaterThan(0); // pastikan ada elemen 33%
  expect(screen.getByText(/Buku Dimiliki/i)).toBeInTheDocument();
});

  // ✅ Tes 5: Navigasi Aplikasi (Routing)
  it('Tes 5: Navigasi dari Home ke Statistik berfungsi', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /Home/i });
    const statsLink = screen.getByRole('link', { name: /Statistik/i });

    // Pastikan halaman awal di Home
    expect(screen.getByRole('heading', { name: /Daftar Bukuku/i })).toBeInTheDocument();

    // Klik ke halaman Statistik
    await user.click(statsLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Statistik Buku/i })).toBeInTheDocument();
    });

    // Pastikan status aktif link berubah
    expect(homeLink).not.toHaveClass('active');
    expect(statsLink).toHaveClass('active');
  });
});
