// Teachers JS (similar to students.js)
const API_BASE = '../backend/';

document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.querySelector('#teachersTable tbody');
    const addModal = document.getElementById('addModal');
    const addForm = document.getElementById('addTeacherForm');

    async function loadTeachers() {
        const teachers = await fetch(API_BASE + 'teachers.php').then(r => r.json());
        tbody.innerHTML = '';
        teachers.forEach(t => {
            const row = `<tr>
                <td>${t.name}</td>
                <td>${t.position}</td>
                <td>${t.email}</td>
                <td>
                    <button onclick="editTeacher(${t.id})">Edit</button>
                    <button onclick="deleteTeacher(${t.id})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    loadTeachers();

    document.getElementById('addTeacherBtn').addEventListener('click', () => {
        addModal.style.display = 'flex';
    });

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const email = document.getElementById('email').value;

        await fetch(API_BASE + 'teachers.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add', name, position, email })
        });
        addModal.style.display = 'none';
        loadTeachers();
    });

    window.editTeacher = (id) => alert('Edit functionality');
    window.deleteTeacher = async (id) => {
        if (confirm('Delete teacher?')) {
            await fetch(API_BASE + 'teachers.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            loadTeachers();
        }
    };

    document.getElementById('exportBtn').addEventListener('click', () => {
        window.location.href = API_BASE + 'export.php?table=teachers';
    });
});
