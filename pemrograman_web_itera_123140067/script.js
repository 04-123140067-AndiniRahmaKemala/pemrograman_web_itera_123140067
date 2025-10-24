let tasks = [];
let editingId = null;
let currentView = 'grid';
let currentPriority = 'all';

const motivationalQuotes = [
    { text: "Kamu bisa melakukannya! Semangat belajar! 💪", author: "— You Can Do It!" },
    { text: "Setiap usaha tidak akan mengkhianati hasil 🌟", author: "— Keep Going!" },
    { text: "Hari ini lebih baik dari kemarin 🌸", author: "— Progress Not Perfection" },
    { text: "Percaya pada dirimu sendiri! ✨", author: "— Believe In Yourself" },
    { text: "Sukses dimulai dari langkah kecil 🚀", author: "— Start Small" },
    { text: "Kamu lebih kuat dari yang kamu kira! 💕", author: "— You Are Strong" }
];

// Load tasks dari localStorage
function loadTasks() {
    const stored = localStorage.getItem('myStudyTasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

// Save tasks ke localStorage
function saveTasks() {
    localStorage.setItem('myStudyTasks', JSON.stringify(tasks));
}

// Format tanggal
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Cek apakah deadline sudah lewat
function isOverdue(dateString, status) {
    if (status === 'done') return false;
    const deadline = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    return deadline < today;
}

// Update statistik
function updateStats() {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status !== 'done').length;
    const done = tasks.filter(t => t.status === 'done').length;
    const progress = done / (total || 1) * 100;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('doneTasks').textContent = done;
    document.getElementById('progressPercent').textContent = Math.round(progress) + '%';
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '%';
}

// Tampilkan random quote
function showRandomQuote() {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('quoteText').textContent = randomQuote.text;
    document.getElementById('quoteAuthor').textContent = randomQuote.author;
}

// Render tasks
function renderTasks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    let filteredTasks = tasks.filter(task => {
        const matchSearch = task.name.toLowerCase().includes(searchTerm) || 
                          task.subject.toLowerCase().includes(searchTerm);
        const matchStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchPriority = currentPriority === 'all' || task.priority === currentPriority;
        return matchSearch && matchStatus && matchPriority;
    });

    // Sorting
    if (sortBy === 'deadline') {
        filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortBy === 'priority') {
        const priorityOrder = { 'tinggi': 0, 'sedang': 1, 'rendah': 2 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'newest') {
        filteredTasks.sort((a, b) => b.id - a.id);
    }

    if (currentView === 'grid') {
        renderGridView(filteredTasks);
    } else {
        renderListView(filteredTasks);
    }
}

// Render Grid View
function renderGridView(filteredTasks) {
    const grid = document.getElementById('tasksGrid');
    
    if (filteredTasks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <p>${tasks.length === 0 ? 'Belum ada tugas nih! Yuk tambah tugas pertamamu! 💖' : 'Tidak ada tugas yang sesuai filter 🎀'}</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredTasks.map(task => {
        const statusLabels = {
            'belum': 'Belum Dikerjakan',
            'progress': 'Dalam Pengerjaan',
            'done': 'Selesai'
        };

        const priorityLabels = {
            'tinggi': '🔴 Tinggi',
            'sedang': '🟡 Sedang',
            'rendah': '🔵 Rendah'
        };

        const overdue = isOverdue(task.deadline, task.status);

        return `
            <div class="task-card" style="border-left-color: ${task.priority === 'tinggi' ? '#d63031' : task.priority === 'sedang' ? '#e17055' : '#0984e3'}">
                <div class="task-card-header">
                    <div>
                        <div class="task-title">${task.name}</div>
                        <div class="task-subject">📚 ${task.subject}</div>
                    </div>
                    <span class="priority-badge priority-${task.priority}">${priorityLabels[task.priority]}</span>
                </div>
                <div class="task-meta">
                    <div class="task-meta-item" style="color: ${overdue ? '#d63031' : '#666'}">
                        📅 ${formatDate(task.deadline)} ${overdue ? '(Terlewat!)' : ''}
                    </div>
                    ${task.notes ? `<div class="task-meta-item">📝 ${task.notes}</div>` : ''}
                </div>
                <span class="status-badge status-${task.status}">${statusLabels[task.status]}</span>
                <div class="task-actions">
                    <button class="btn btn-edit" onclick="editTask(${task.id})">✏️ Edit</button>
                    <button class="btn btn-delete" onclick="deleteTask(${task.id})">🗑️ Hapus</button>
                </div>
            </div>
        `;
    }).join('');
}

// Render List View
function renderListView(filteredTasks) {
    const tableBody = document.getElementById('tableBody');
    
    if (filteredTasks.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <div class="empty-state-icon">🔍</div>
                        <p>${tasks.length === 0 ? 'Belum ada tugas! 💖' : 'Tidak ada tugas yang sesuai filter 🎀'}</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    const statusLabels = {
        'belum': 'Belum Dikerjakan',
        'progress': 'Dalam Pengerjaan',
        'done': 'Selesai'
    };

    const priorityLabels = {
        'tinggi': '🔴 Tinggi',
        'sedang': '🟡 Sedang',
        'rendah': '🔵 Rendah'
    };

    tableBody.innerHTML = filteredTasks.map(task => {
        const overdue = isOverdue(task.deadline, task.status);
        return `
            <tr>
                <td><strong>${task.name}</strong></td>
                <td>${task.subject}</td>
                <td style="color: ${overdue ? '#d63031' : '#666'}">${formatDate(task.deadline)}</td>
                <td><span class="priority-badge priority-${task.priority}">${priorityLabels[task.priority]}</span></td>
                <td><span class="status-badge status-${task.status}">${statusLabels[task.status]}</span></td>
                <td>
                    <div class="task-actions">
                        <button class="btn btn-edit" onclick="editTask(${task.id})">✏️</button>
                        <button class="btn btn-delete" onclick="deleteTask(${task.id})">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Form Submit - TAMBAH/EDIT TUGAS
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const taskData = {
        id: editingId || Date.now(),
        name: document.getElementById('taskName').value,
        subject: document.getElementById('subject').value,
        deadline: document.getElementById('deadline').value,
        priority: document.getElementById('priority').value,
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value || ''
    };

    if (editingId) {
        const index = tasks.findIndex(t => t.id === editingId);
        tasks[index] = taskData;
        editingId = null;
    } else {
        tasks.push(taskData);
    }

    saveTasks();
    renderTasks();
    updateStats();
    closeModal();
    document.getElementById('taskForm').reset();
});

// Edit Task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingId = id;
        document.getElementById('taskName').value = task.name;
        document.getElementById('subject').value = task.subject;
        document.getElementById('deadline').value = task.deadline;
        document.getElementById('priority').value = task.priority;
        document.getElementById('status').value = task.status;
        document.getElementById('notes').value = task.notes || '';
        openModal();
    }
}

// Delete Task
function deleteTask(id) {
    if (confirm('Yakin mau hapus tugas ini? 🥺')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Modal Functions
function openModal() {
    document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
    document.getElementById('taskForm').reset();
    editingId = null;
}

// Event Listeners
document.getElementById('openModal').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    const modal = document.getElementById('taskModal');
    if (e.target === modal) {
        closeModal();
    }
});

document.getElementById('searchInput').addEventListener('input', renderTasks);
document.getElementById('statusFilter').addEventListener('change', renderTasks);
document.getElementById('sortBy').addEventListener('change', renderTasks);

// View Toggle
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        
        if (currentView === 'grid') {
            document.getElementById('tasksGrid').style.display = 'grid';
            document.getElementById('tasksTable').style.display = 'none';
        } else {
            document.getElementById('tasksGrid').style.display = 'none';
            document.getElementById('tasksTable').style.display = 'block';
        }
        renderTasks();
    });
});

// Priority Filter
document.querySelectorAll('.priority-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.priority-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        currentPriority = tag.dataset.priority;
        renderTasks();
    });
});

// Refresh Quote
document.getElementById('refreshQuote').addEventListener('click', showRandomQuote);

// Initialize
loadTasks();
renderTasks();
updateStats();
showRandomQuote();