// Attendance JS
const API_BASE = '../backend/';

document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.querySelector('#attendanceTable tbody');
    const addModal = document.getElementById('addModal');
    const addForm = document.getElementById('addAttendanceForm');

    // Load attendance
    async function loadAttendance() {
        const attendance = await fetch(API_BASE + 'attendance.php').then(r => r.json());
        tbody.innerHTML = '';
        attendance.forEach(a => {
            const row = `<tr>
                <td>${a.date}</td>
                <td>${a.time_in || '-'}</td>
                <td>${a.time_out || '-'}</td>
                <td>${a.name}</td>
                <td>${a.strand}</td>
                <td>${a.remarks}</td>
                <td><button onclick="timeOut(${a.id})">Time Out</button></td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    loadAttendance();

    // Add attendance
    document.getElementById('addAttendanceBtn').addEventListener('click', async () => {
        const students = await fetch(API_BASE + 'students.php').then(r => r.json());
        const select = document.getElementById('studentSelect');
        select.innerHTML = '<option value="">Select Student</option>';
        students.forEach(s => {
            select.innerHTML += `<option value="${s.id}">${s.name}</option>`;
        });
        addModal.style.display = 'flex';
    });

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const student_id = document.getElementById('studentSelect').value;
        await fetch(API_BASE + 'attendance.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add', student_id })
        });
        addModal.style.display = 'none';
        loadAttendance();
    });

    // Time out
    window.timeOut = async (id) => {
        await fetch(API_BASE + 'attendance.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'update', id })
        });
        loadAttendance();
    };

    // Export
    document.getElementById('exportBtn').addEventListener('click', () => {
        window.location.href = API_BASE + 'export.php?table=attendance';
    });

    // Import (simplified)
    document.getElementById('importBtn').addEventListener('click', () => {
        alert('Import functionality requires file upload form');
    });

    // Clear
    document.getElementById('clearBtn').addEventListener('click', async () => {
        if (confirm('Clear all attendance?')) {
            // Implement clear logic
        }
    });
});
