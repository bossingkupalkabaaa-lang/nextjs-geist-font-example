// QR Generator JS
const API_BASE = '../backend/';

document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.querySelector('#qrTable tbody');

    // Load students and generate QR
    async function loadQRs() {
        const students = await fetch(API_BASE + 'students.php').then(r => r.json());
        tbody.innerHTML = '';
        students.forEach(s => {
            const qrData = `STU-${s.id}`;
            const row = `<tr>
                <td>${s.name}</td>
                <td>${s.student_id}</td>
                <td><div id="qr-${s.id}"></div></td>
                <td><button onclick="downloadQR(${s.id}, '${qrData}')">Download PNG</button></td>
            </tr>`;
            tbody.innerHTML += row;

            // Generate QR
            new QRCode(document.getElementById(`qr-${s.id}`), {
                text: qrData,
                width: 128,
                height: 128
            });
        });
    }

    loadQRs();

    // Generate all
    document.getElementById('generateAllBtn').addEventListener('click', async () => {
        const students = await fetch(API_BASE + 'students.php').then(r => r.json());
        for (const s of students) {
            await fetch(API_BASE + 'qr.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'generate', student_id: s.id })
            });
        }
        alert('QRs generated');
    });

    // Download ZIP (simplified)
    document.getElementById('downloadZipBtn').addEventListener('click', () => {
        alert('ZIP download requires server-side implementation');
    });

    // Download individual PNG
    window.downloadQR = (id, data) => {
        const canvas = document.querySelector(`#qr-${id} canvas`);
        const link = document.createElement('a');
        link.download = `qr-${id}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };
});
