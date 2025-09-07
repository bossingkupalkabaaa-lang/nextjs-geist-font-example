// Students JS
const API_BASE = '../backend/';

document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.querySelector('#studentsTable tbody');
    const addModal = document.getElementById('addModal');
    const addForm = document.getElementById('addStudentForm');

    // Load students
    async function loadStudents() {
        const students = await fetch(API_BASE + 'students.php').then(r => r.json());
        tbody.innerHTML = '';
        students.forEach(s => {
            const row = `<tr>
                <td>${s.name}</td>
                <td>${s.student_id}</td>
                <td>${s.strand}</td>
                <td>
                    <button onclick="editStudent(${s.id})">Edit</button>
                    <button onclick="deleteStudent(${s.id})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    loadStudents();

    // Add student
    document.getElementById('addStudentBtn').addEventListener('click', () => {
        addModal.style.display = 'flex';
    });

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const student_id = document.getElementById('student_id').value;
        const strand = document.getElementById('strand').value;

        await fetch(API_BASE + 'students.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add', name, student_id, strand })
        });
        addModal.style.display = 'none';
        loadStudents();
    });

    // Edit/Delete
    window.editStudent = (id) => {
        // Implement edit modal
        alert('Edit functionality');
    };

    window.deleteStudent = async (id) => {
        if (confirm('Delete student?')) {
            await fetch(API_BASE + 'students.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            loadStudents();
        }
    };

    // Export
    document.getElementById('exportBtn').addEventListener('click', () => {
        window.location.href = API_BASE + 'export.php?table=students';
    });

    // Import
    document.getElementById('importBtn').addEventListener('click', () => {
        alert('Import requires file upload');
    });
});
