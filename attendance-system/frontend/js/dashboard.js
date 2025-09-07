// Dashboard JS
const API_BASE = '../backend/';

document.addEventListener('DOMContentLoaded', async () => {
    // Load stats
    const students = await fetch(API_BASE + 'students.php').then(r => r.json());
    const teachers = await fetch(API_BASE + 'teachers.php').then(r => r.json());
    const attendance = await fetch(API_BASE + 'attendance.php').then(r => r.json());

    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalTeachers').textContent = teachers.length;

    // Strand counts
    const strands = {};
    students.forEach(s => {
        strands[s.strand] = (strands[s.strand] || 0) + 1;
    });
    Object.keys(strands).forEach(strand => {
        const id = strand.toLowerCase() + 'Count';
        document.getElementById(id).textContent = strands[strand];
    });

    // Recent attendance
    const tbody = document.querySelector('#recentAttendanceTable tbody');
    attendance.slice(0, 10).forEach(a => {
        const row = `<tr>
            <td>${a.date}</td>
            <td>${a.name}</td>
            <td>${a.remarks}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    // Global search
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        const query = e.target.value;
        // Implement live filtering (simplified)
        console.log('Searching:', query);
    });

    // Notifications
    const notifications = await fetch(API_BASE + 'notify.php').then(r => r.json());
    document.getElementById('notifications').textContent = `🔔 (${notifications.length})`;
});
