-- Sample Seed Data for Attendance System
USE attendance_system;

-- Insert sample users
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@example.com', '$2y$10$examplehashedpassword', 'admin'), -- Password: admin123 (hashed)
('teacher1', 'teacher1@example.com', '$2y$10$examplehashedpassword2', 'teacher'); -- Password: teacher123

-- Insert sample students
INSERT INTO students (name, student_id, strand) VALUES
('John Doe', 'STU001', 'humss'),
('Jane Smith', 'STU002', 'abm'),
('Bob Johnson', 'STU003', 'css'),
('Alice Brown', 'STU004', 'smaw'),
('Charlie Wilson', 'STU005', 'auto'),
('Diana Davis', 'STU006', 'eim');

-- Insert sample teachers
INSERT INTO teachers (name, position, email) VALUES
('Mr. Anderson', 'Teacher I', 'anderson@example.com'),
('Ms. Garcia', 'Teacher II', 'garcia@example.com');

-- Insert sample attendance
INSERT INTO attendance (student_id, date, time_in, remarks) VALUES
(1, '2023-10-01', '08:00:00', 'Present'),
(2, '2023-10-01', '08:15:00', 'Late'),
(3, '2023-10-01', NULL, 'Absent');

-- Insert sample QR codes
INSERT INTO qr_codes (student_id, qr_data) VALUES
(1, 'STU-1'),
(2, 'STU-2'),
(3, 'STU-3');

-- Insert sample notifications
INSERT INTO notifications (user_id, message, type) VALUES
(1, 'System initialized', 'info'),
(1, '3 students absent today', 'warning');
