<?php
require_once 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $query = "SELECT a.*, s.name, s.strand FROM attendance a JOIN students s ON a.student_id = s.id ORDER BY a.date DESC, a.time_in DESC";
    $stmt = $pdo->query($query);
    $attendance = $stmt->fetchAll();
    echo json_encode($attendance);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action'])) {
        if ($data['action'] === 'add') {
            $student_id = (int)$data['student_id'];
            $date = date('Y-m-d');
            $time_in = date('H:i:s');
            $remarks = 'Present'; // Default, can be calculated based on grace period

            $stmt = $pdo->prepare("INSERT INTO attendance (student_id, date, time_in, remarks, scanned_by) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$student_id, $date, $time_in, $remarks, $data['scanned_by'] ?? null]);
            echo json_encode(['success' => true, 'message' => 'Attendance recorded']);
        } elseif ($data['action'] === 'update') {
            $id = (int)$data['id'];
            $time_out = date('H:i:s');
            $stmt = $pdo->prepare("UPDATE attendance SET time_out = ? WHERE id = ?");
            $stmt->execute([$time_out, $id]);
            echo json_encode(['success' => true, 'message' => 'Time out recorded']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
