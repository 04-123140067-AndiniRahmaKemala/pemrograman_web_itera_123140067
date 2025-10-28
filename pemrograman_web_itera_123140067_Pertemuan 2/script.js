// Data
let jadwalKuliah = [];
let tugas = [];
let catatan = [];
let editId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateWaktu();
    setInterval(updateWaktu, 1000);
    loadFromLocalStorage();
    renderAll();
    ambilCuaca();
});

// Waktu Real-time
function updateWaktu() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    timeElement.textContent = now.toLocaleTimeString('id-ID');
    dateElement.textContent = now.toLocaleDateString('id-ID', options);
}

// Modal Functions
function bukaModalKuliah() {
    editId = null;
    document.getElementById('modalKuliah').classList.add('active');
    document.getElementById('namaKuliah').focus();
}

function bukaModalTugas() {
    editId = null;
    document.getElementById('modalTugas').classList.add('active');
    document.getElementById('namaTugas').focus();
}

function bukaModalCatatan() {
    editId = null;
    document.getElementById('modalCatatan').classList.add('active');
    document.getElementById('judulCatatan').focus();
}

function tutupModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Jadwal Kuliah Functions
function simpanKuliah(e) {
    e.preventDefault();
    
    const kuliahData = {
        nama: document.getElementById('namaKuliah').value,
        hari: document.getElementById('hariKuliah').value,
        waktu: document.getElementById('waktuKuliah').value,
        ruang: document.getElementById('ruangKuliah').value
    };

    if (editId) {
        const index = jadwalKuliah.findIndex(j => j.id === editId);
        if (index !== -1) {
            jadwalKuliah[index] = { ...jadwalKuliah[index], ...kuliahData };
        }
    } else {
        jadwalKuliah.push({
            id: Date.now().toString(),
            ...kuliahData
        });
    }

    saveToLocalStorage();
    renderJadwalKuliah();
    tutupModal('modalKuliah');
    e.target.reset();
}

function renderJadwalKuliah() {
    const container = document.getElementById('jadwalKuliahList');
    
    if (jadwalKuliah.length === 0) {
        container.innerHTML = '<div class="empty-state">Belum ada jadwal kuliah</div>';
        return;
    }

    container.innerHTML = jadwalKuliah.map(jadwal => `
        <div class="schedule-item">
            <h3>${jadwal.nama}</h3>
            <div class="schedule-details">
                <div>${jadwal.hari}, ${jadwal.waktu}</div>
                <div>${jadwal.ruang}</div>
            </div>
        </div>
    `).join('');
}

// Tugas Functions
function simpanTugas(e) {
    e.preventDefault();
    
    const tugasData = {
        nama: document.getElementById('namaTugas').value,
        matkul: document.getElementById('matkulTugas').value,
        deadline: document.getElementById('deadlineTugas').value,
        prioritas: document.getElementById('prioritasTugas').value
    };

    if (editId) {
        const index = tugas.findIndex(t => t.id === editId);
        if (index !== -1) {
            tugas[index] = { ...tugas[index], ...tugasData };
        }
    } else {
        tugas.push({
            id: Date.now().toString(),
            ...tugasData
        });
    }

    saveToLocalStorage();
    renderTugas();
    tutupModal('modalTugas');
    e.target.reset();
}

function renderTugas() {
    const container = document.getElementById('daftarTugas');
    
    if (tugas.length === 0) {
        container.innerHTML = '<div class="empty-state">Belum ada tugas</div>';
        return;
    }

    container.innerHTML = tugas.map(t => `
        <div class="task-item">
            <h3>${t.nama}</h3>
            <div class="task-details">
                <span>${t.matkul}</span>
                <span class="priority-badge priority-${t.prioritas}">${t.prioritas}</span>
            </div>
        </div>
    `).join('');
}

// Catatan Functions
function simpanCatatan(e) {
    e.preventDefault();
    
    const catatanData = {
        judul: document.getElementById('judulCatatan').value,
        isi: document.getElementById('isiCatatan').value
    };

    if (editId) {
        const index = catatan.findIndex(c => c.id === editId);
        if (index !== -1) {
            catatan[index] = { ...catatan[index], ...catatanData };
        }
    } else {
        catatan.push({
            id: Date.now().toString(),
            ...catatanData
        });
    }

    saveToLocalStorage();
    renderCatatan();
    tutupModal('modalCatatan');
    e.target.reset();
}

function renderCatatan() {
    const container = document.getElementById('daftarCatatan');
    
    if (catatan.length === 0) {
        container.innerHTML = '<div class="empty-state">Belum ada catatan</div>';
        return;
    }

    container.innerHTML = catatan.map(c => `
        <div class="note-item">
            <h3>${c.judul}</h3>
            <div class="note-content">${c.isi}</div>
        </div>
    `).join('');
}

// Cuaca Function
async function ambilCuaca() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-5.45&longitude=105.27&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FJakarta');
        const data = await response.json();
        
        const suhu = Math.round(data.current.temperature_2m);
        const angin = (data.current.wind_speed_10m * 3.6).toFixed(1); // Convert m/s to km/h
        const kodeCuaca = data.current.weather_code;
        
        const deskripsiCuaca = getDeskripsiCuaca(kodeCuaca);
        
        document.querySelector('.temperature').textContent = `${suhu}°C`;
        document.querySelector('.weather-desc').textContent = deskripsiCuaca;
        document.querySelector('.weather-item .value').textContent = `${angin} km/j`;
        
    } catch (error) {
        console.error('Error mengambil data cuaca:', error);
        document.querySelector('.weather-desc').textContent = 'Gagal memuat';
    }
}

function getDeskripsiCuaca(kode) {
    const cuacaMap = {
        0: 'Cerah',
        1: 'Cerah Berawan',
        2: 'Berawan',
        3: 'Mendung',
        45: 'Berkabut',
        48: 'Berkabut',
        51: 'Gerimis',
        53: 'Gerimis',
        55: 'Gerimis Lebat',
        61: 'Hujan Ringan',
        63: 'Hujan',
        65: 'Hujan Lebat',
        80: 'Hujan Lokal',
        81: 'Hujan Lokal',
        82: 'Hujan Lokal'
    };
    return cuacaMap[kode] || 'Berawan';
}

// LocalStorage Functions
function saveToLocalStorage() {
    localStorage.setItem('jadwalKuliah', JSON.stringify(jadwalKuliah));
    localStorage.setItem('tugas', JSON.stringify(tugas));
    localStorage.setItem('catatan', JSON.stringify(catatan));
}

function loadFromLocalStorage() {
    jadwalKuliah = JSON.parse(localStorage.getItem('jadwalKuliah')) || [];
    tugas = JSON.parse(localStorage.getItem('tugas')) || [];
    catatan = JSON.parse(localStorage.getItem('catatan')) || [];
}

function renderAll() {
    renderJadwalKuliah();
    renderTugas();
    renderCatatan();
}

// Add sample data if empty
function addSampleData() {
    if (jadwalKuliah.length === 0) {
        jadwalKuliah.push({
            id: '1',
            nama: 'Jaringan Komputer',
            hari: 'Selasa',
            waktu: '10.00-11.40',
            ruang: 'OK2'
        });
    }
    
    if (tugas.length === 0) {
        tugas.push(
            {
                id: '1',
                nama: 'Praktikum Pengweb Tugas 2',
                matkul: 'Pemrograman Web',
                deadline: '2025-11-05',
                prioritas: 'tinggi'
            },
            {
                id: '2',
                nama: 'Praktikum Jarkom Minggu 6',
                matkul: 'Jaringan Komputer',
                deadline: '2025-11-08',
                prioritas: 'sedang'
            }
        );
    }
    
    if (catatan.length === 0) {
        catatan.push(
            {
                id: '1',
                judul: 'Kelas Jaringan Komputer',
                isi: 'Kelas jaringan komputer RB minggu ke-10 dipindah ke hari Sabtu'
            },
            {
                id: '2',
                judul: 'Catatan IB',
                isi: 'Bahan materi IB minggu ke-9 tentang database relational'
            }
        );
    }
    
    saveToLocalStorage();
    renderAll();
}

// Uncomment line below to add sample data
// addSampleData();