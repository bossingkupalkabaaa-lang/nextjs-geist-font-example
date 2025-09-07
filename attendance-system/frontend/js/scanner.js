// Scanner JS
const API_BASE = '../backend/';

document.addEventListener('DOMContentLoaded', () => {
    const qrTab = document.getElementById('qrTab');
    const faceTab = document.getElementById('faceTab');
    const qrScanner = document.getElementById('qrScanner');
    const faceScanner = document.getElementById('faceScanner');

    // Tab switching
    qrTab.addEventListener('click', () => {
        qrScanner.style.display = 'block';
        faceScanner.style.display = 'none';
        qrTab.classList.add('active');
        faceTab.classList.remove('active');
        startQRScan();
    });

    faceTab.addEventListener('click', () => {
        qrScanner.style.display = 'none';
        faceScanner.style.display = 'block';
        faceTab.classList.add('active');
        qrTab.classList.remove('active');
        startFaceScan();
    });

    // QR Scanning
    async function startQRScan() {
        const video = document.getElementById('qrVideo');
        const canvas = document.getElementById('qrCanvas');
        const resultEl = document.getElementById('qrResult');

        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;

        const canvasContext = canvas.getContext('2d');

        function scan() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    resultEl.textContent = `Scanned: ${code.data}`;
                    // Lookup student and record attendance
                    recordAttendance(code.data, 'QR');
                    stream.getTracks().forEach(track => track.stop());
                }
            }
            requestAnimationFrame(scan);
        }
        scan();
    }

    // Face Scanning
    async function startFaceScan() {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

        const video = document.getElementById('faceVideo');
        const canvas = document.getElementById('faceCanvas');
        const resultEl = document.getElementById('faceResult');

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            if (detections.length > 0) {
                // Match with enrolled faces (simplified)
                resultEl.textContent = 'Face detected - Matching...';
                // In real app, compare with stored embeddings
                recordAttendance('FACE_MATCHED_ID', 'Face');
            }
        }, 100);
    }

    async function recordAttendance(identifier, scannedBy) {
        // Simplified: assume identifier is student_id
        const student_id = identifier.replace('STU-', '');
        await fetch(API_BASE + 'attendance.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add', student_id, scanned_by: scannedBy })
        });
        alert('Attendance recorded!');
    }

    // Start with QR
    startQRScan();
});
