<?php
require_once 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all students or search
    $search = isset($_GET['search']) ? sanitize($_GET['search']) : '';
    $query = "SELECT * FROM students WHERE name LIKE ? OR student_id LIKE ? OR strand LIKE ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute(["%$search%", "%$search%", "%$search%"]);
    $students = $stmt->fetchAll();
    echo json_encode($students);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action'])) {
        if ($data['action'] === 'add' && isAdmin()) {
            $name = sanitize($data['name']);
            $student_id = sanitize($data['student_id']);
            $strand = sanitize($data['strand']);

            $stmt = $pdo->prepare("INSERT INTO students (name, student_id, strand) VALUES (?, ?, ?)");
            try {
                $stmt->execute([$name, $student_id, $strand]);
                echo json_encode(['success' => true, 'message' => 'Student added']);
            } catch (PDOException $e) {
                echo json_encode(['success' => false, 'message' => 'Student ID already exists']);
            }
        } elseif ($data['action'] === 'update' && isAdmin()) {
            $id = (int)$data['id'];
            $name = sanitize($data['name']);
            $student_id = sanitize($data['student_id']);
            $strand = sanitize($data['strand']);

            $stmt = $pdo->prepare("UPDATE students SET name = ?, student_id = ?, strand = ? WHERE id = ?");
            $stmt->execute([$name, $student_id, $strand, $id]);
            echo json_encode(['success' => true, 'message' => 'Student updated']);
        } elseif ($data['action'] === 'delete' && isAdmin()) {
            $id = (int)$data['id'];
            $stmt = $pdo->prepare("DELETE FROM students WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Student deleted']);
        } elseif ($data['action'] === 'import') {
            // Handle CSV import (simplified)
            echo json_encode(['success' => true, 'message' => 'Import handled']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
