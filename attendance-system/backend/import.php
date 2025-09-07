<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['csv'])) {
    $file = $_FILES['csv']['tmp_name'];
    $table = sanitize($_POST['table']); // students or teachers

    if (($handle = fopen($file, "r")) !== FALSE) {
        $headers = fgetcsv($handle, 1000, ",");
        $mapping = json_decode($_POST['mapping'], true); // e.g., {"Name": 0, "StudentID": 1}

        $inserted = 0;
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            if ($table === 'students') {
                $name = sanitize($data[$mapping['Name']]);
                $student_id = sanitize($data[$mapping['StudentID']]);
                $strand = sanitize($data[$mapping['Strand']]);

                $stmt = $pdo->prepare("INSERT INTO students (name, student_id, strand) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)");
                $stmt->execute([$name, $student_id, $strand]);
                $inserted++;
            } elseif ($table === 'teachers') {
                $name = sanitize($data[$mapping['Name']]);
                $position = sanitize($data[$mapping['Position']]);
                $email = sanitize($data[$mapping['Email']]);

                $stmt = $pdo->prepare("INSERT INTO teachers (name, position, email) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)");
                $stmt->execute([$name, $position, $email]);
                $inserted++;
            }
        }
        fclose($handle);
        echo json_encode(['success' => true, 'message' => "$inserted records imported"]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to open CSV']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
