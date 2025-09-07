<?php
require_once 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $search = isset($_GET['search']) ? sanitize($_GET['search']) : '';
    $query = "SELECT * FROM teachers WHERE name LIKE ? OR position LIKE ? OR email LIKE ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute(["%$search%", "%$search%", "%$search%"]);
    $teachers = $stmt->fetchAll();
    echo json_encode($teachers);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action']) && isAdmin()) {
        if ($data['action'] === 'add') {
            $name = sanitize($data['name']);
            $position = sanitize($data['position']);
            $email = sanitize($data['email']);

            $stmt = $pdo->prepare("INSERT INTO teachers (name, position, email) VALUES (?, ?, ?)");
            try {
                $stmt->execute([$name, $position, $email]);
                echo json_encode(['success' => true, 'message' => 'Teacher added']);
            } catch (PDOException $e) {
                echo json_encode(['success' => false, 'message' => 'Email already exists']);
            }
        } elseif ($data['action'] === 'update') {
            $id = (int)$data['id'];
            $name = sanitize($data['name']);
            $position = sanitize($data['position']);
            $email = sanitize($data['email']);

            $stmt = $pdo->prepare("UPDATE teachers SET name = ?, position = ?, email = ? WHERE id = ?");
            $stmt->execute([$name, $position, $email, $id]);
            echo json_encode(['success' => true, 'message' => 'Teacher updated']);
        } elseif ($data['action'] === 'delete') {
            $id = (int)$data['id'];
            $stmt = $pdo->prepare("DELETE FROM teachers WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Teacher deleted']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
