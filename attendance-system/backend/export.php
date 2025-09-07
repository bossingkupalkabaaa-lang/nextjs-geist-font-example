<?php
require_once 'config.php';

$table = sanitize($_GET['table']); // students, teachers, attendance

if ($table === 'students') {
    $stmt = $pdo->query("SELECT name, student_id, strand FROM students");
    $data = $stmt->fetchAll();
    $filename = 'students.csv';
    $headers = ['Name', 'StudentID', 'Strand'];
} elseif ($table === 'teachers') {
    $stmt = $pdo->query("SELECT name, position, email FROM teachers");
    $data = $stmt->fetchAll();
    $filename = 'teachers.csv';
    $headers = ['Name', 'Position', 'Email'];
} elseif ($table === 'attendance') {
    $stmt = $pdo->query("SELECT a.date, a.time_in, a.time_out, s.name, s.strand, a.remarks FROM attendance a JOIN students s ON a.student_id = s.id");
    $data = $stmt->fetchAll();
    $filename = 'attendance.csv';
    $headers = ['Date', 'TimeIn', 'TimeOut', 'Name', 'Strand', 'Remarks'];
} else {
    die('Invalid table');
}

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="' . $filename . '"');

$output = fopen('php://output', 'w');
fputcsv($output, $headers);
foreach ($data as $row) {
    fputcsv($output, $row);
}
fclose($output);
?>
