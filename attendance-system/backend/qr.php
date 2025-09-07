<?php
require_once 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch QR codes
    $stmt = $pdo->query("SELECT q.*, s.name FROM qr_codes q JOIN students s ON q.student_id = s.id");
    $qrs = $stmt->fetchAll();
    echo json_encode($qrs);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action']) && $data['action'] === 'generate') {
        $student_id = (int)$data['student_id'];
        $qr_data = 'STU-' . $student_id;

        $stmt = $pdo->prepare("INSERT INTO qr_codes (student_id, qr_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE generated_at = CURRENT_TIMESTAMP");
        $stmt->execute([$student_id, $qr_data]);

        // In a real app, generate PNG here using a library like phpqrcode
        echo json_encode(['success' => true, 'qr_data' => $qr_data, 'message' => 'QR generated']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
