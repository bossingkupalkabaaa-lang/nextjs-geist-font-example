<?php
require_once 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action'])) {
        if ($data['action'] === 'login') {
            $email = sanitize($data['email']);
            $password = $data['password'];

            $stmt = $pdo->prepare("SELECT id, username, password_hash, role FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role'];
                echo json_encode(['success' => true, 'message' => 'Login successful']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            }
        } elseif ($data['action'] === 'signup') {
            $username = sanitize($data['username']);
            $email = sanitize($data['email']);
            $password = password_hash($data['password'], PASSWORD_DEFAULT);
            $role = sanitize($data['role']) ?: 'teacher';

            $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
            try {
                $stmt->execute([$username, $email, $password, $role]);
                echo json_encode(['success' => true, 'message' => 'Signup successful']);
            } catch (PDOException $e) {
                echo json_encode(['success' => false, 'message' => 'Email or username already exists']);
            }
        } elseif ($data['action'] === 'logout') {
            session_destroy();
            echo json_encode(['success' => true, 'message' => 'Logged out']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
