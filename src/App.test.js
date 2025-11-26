import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// TEST 1: Render aplikasi tanpa crash
test('renders aplikasi manajemen buku tanpa error', () => {
  render(<App />);
  const headingElement = screen.getByText(/manajemen buku pribadi/i);
  expect(headingElement).toBeInTheDocument();
});

// TEST 2: Tombol tambah buku ada dan berfungsi
test('tombol tambah buku baru muncul dan bisa diklik', () => {
  render(<App />);
  const addButton = screen.getByText(/tambah buku baru/i);
  expect(addButton).toBeInTheDocument();
  
  // Klik tombol
  fireEvent.click(addButton);
  
  // Form harus muncul
  const judulLabel = screen.getByText(/judul buku/i);
  expect(judulLabel).toBeInTheDocument();
});

// TEST 3: Validasi form - tidak bisa submit jika kosong
test('validasi form menunjukkan error jika input kosong', async () => {
  render(<App />);
  
  // Buka form
  const addButton = screen.getByText(/tambah buku baru/i);
  fireEvent.click(addButton);
  
  // Cari tombol submit
  const submitButton = screen.getByRole('button', { name: /tambah buku/i });
  
  // Klik submit tanpa isi form
  fireEvent.click(submitButton);
  
  // Error harus muncul
  await waitFor(() => {
    expect(screen.getByText(/judul buku harus diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/nama penulis harus diisi/i)).toBeInTheDocument();
  });
});

// TEST 4: Berhasil menambah buku dengan data valid
test('berhasil menambah buku dengan data yang valid', async () => {
  render(<App />);
  
  // Buka form
  const addButton = screen.getByText(/tambah buku baru/i);
  fireEvent.click(addButton);
  
  // Isi form
  const judulInput = screen.getByPlaceholderText(/masukkan judul buku/i);
  const penulisInput = screen.getByPlaceholderText(/masukkan nama penulis/i);
  
  fireEvent.change(judulInput, { target: { value: 'Harry Potter' } });
  fireEvent.change(penulisInput, { target: { value: 'J.K. Rowling' } });
  
  // Submit form
  const submitButton = screen.getByRole('button', { name: /tambah buku/i });
  fireEvent.click(submitButton);
  
  // Buku harus muncul di daftar
  await waitFor(() => {
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText(/J.K. Rowling/i)).toBeInTheDocument();
  });
});

// TEST 5: Navigasi antara Beranda dan Statistik
test('navigasi antara halaman beranda dan statistik berfungsi', () => {
  render(<App />);
  
  // Awalnya di Beranda
  expect(screen.getByText(/tambah buku baru/i)).toBeInTheDocument();
  
  // Klik tombol Statistik
  const statsButton = screen.getByRole('button', { name: /statistik/i });
  fireEvent.click(statsButton);
  
  // Harus muncul halaman statistik
  expect(screen.getByText(/total koleksi buku/i)).toBeInTheDocument();
  expect(screen.getByText(/distribusi buku/i)).toBeInTheDocument();
  
  // Klik tombol Beranda
  const homeButton = screen.getByRole('button', { name: /beranda/i });
  fireEvent.click(homeButton);
  
  // Kembali ke Beranda
  expect(screen.getByText(/tambah buku baru/i)).toBeInTheDocument();
});

// TEST 6 (BONUS): Filter buku berdasarkan status
test('filter buku berdasarkan status berfungsi', async () => {
  render(<App />);

  // Tambah Buku 1 (milik)
  fireEvent.click(screen.getByText(/tambah buku baru/i));

  fireEvent.change(screen.getByPlaceholderText(/masukkan judul buku/i), {
    target: { value: "Buku Satu" },
  });

  fireEvent.change(screen.getByPlaceholderText(/masukkan nama penulis/i), {
    target: { value: "Penulis Satu" },
  });

  const statusSelect1 = screen.getAllByRole("combobox")[0];
  fireEvent.change(statusSelect1, { target: { value: "milik" } });

  fireEvent.click(screen.getByRole("button", { name: /tambah buku/i }));

  // Tambah Buku 2 (baca)
  await waitFor(() => {
    fireEvent.click(screen.getByText(/tambah buku baru/i));
  });

  fireEvent.change(screen.getByPlaceholderText(/masukkan judul buku/i), {
    target: { value: "Buku Dua" },
  });

  fireEvent.change(screen.getByPlaceholderText(/masukkan nama penulis/i), {
    target: { value: "Penulis Dua" },
  });

  const statusSelect2 = screen.getAllByRole("combobox")[0];
  fireEvent.change(statusSelect2, { target: { value: "baca" } });

  fireEvent.click(screen.getByRole("button", { name: /tambah buku/i }));

  // 🔥 TUNGGU COMBOBOX FILTER SIAP
  await waitFor(() => {
  expect(screen.getAllByRole("combobox").length).toBeGreaterThan(0);
  });

  // Filter Status
const filterSelect = screen.getByLabelText(/filter-status/i);
fireEvent.change(filterSelect, { target: { value: "milik" } });

  // Cek hasil
  expect(screen.getByText("Buku Satu")).toBeInTheDocument();
  expect(screen.queryByText("Buku Dua")).not.toBeInTheDocument();
});
