# QR Code + Face-Recognition Attendance System

A complete web-based attendance system with QR code generation, face recognition, and comprehensive management features.

## Features

- **Authentication**: Secure login/signup with admin/teacher roles
- **Dashboard**: Overview of students, teachers, and attendance stats
- **Student/Teacher Management**: CRUD operations with CSV import/export
- **Attendance Tracking**: Manual entry and auto-recording via QR/face scans
- **QR Generator**: Generate and download QR codes for students
- **Scanner**: Real-time QR and face recognition for attendance
- **Notifications**: Alerts for absences/late arrivals
- **Global Search**: Live filtering across all data
- **Responsive Design**: Mobile-friendly maroon-themed UI

## Tech Stack

- **Frontend**: HTML/CSS/JS (Vanilla)
- **Backend**: PHP 7.4+ with PDO
- **Database**: MySQL
- **Libraries**:
  - QR: jsQR, qrcodejs
  - Face: face-api.js
  - CSV: PHP built-in

## Installation

### Prerequisites
- LAMP stack (Linux, Apache, MySQL, PHP)
- PHP 7.4+ with PDO extension
- MySQL 5.7+
- Webcam for scanning features

### Setup Steps

1. **Clone/Download** the project to your web server root (e.g., `/var/www/html/attendance-system`)

2. **Database Setup**:
   ```bash
   mysql -u root -p
   CREATE DATABASE attendance_system;
   SOURCE database/schema.sql;
   SOURCE database/seed.sql;
   ```

3. **Configure Database**:
   - Edit `backend/config.php` with your DB credentials
   - Default: host=localhost, user=root, pass='', db=attendance_system

4. **Permissions**:
   ```bash
   chmod 755 attendance-system/
   chown www-data:www-data attendance-system/
   ```

5. **Face Models** (Optional for face recognition):
   - Download face-api.js models to `frontend/models/`
   - Or use CDN (already configured)

6. **Access**:
   - Open `http://localhost/attendance-system/frontend/index.html`
   - Login with admin@example.com / admin123
   - Or signup for new account

## Usage

### Admin Features
- Add/edit/delete students and teachers
- Generate QR codes and download as PNG/ZIP
- Import/export CSV with mapping
- View all attendance records
- Manage settings

### Teacher Features
- View assigned students/attendance
- Record manual attendance
- Scan QR/face for auto-attendance

### CSV Import
- Supports any column order
- Auto-detects headers or provides mapping UI
- Validates data before insertion
- Sample CSVs in `assets/`

### Scanning
- **QR**: Camera scans QR, looks up student, records attendance
- **Face**: Detects face, matches with enrolled profiles, records attendance
- Works on desktop/mobile with webcam

## API Endpoints

- `POST /backend/auth.php` - Login/signup/logout
- `GET/POST /backend/students.php` - Student CRUD
- `GET/POST /backend/teachers.php` - Teacher CRUD
- `GET/POST /backend/attendance.php` - Attendance CRUD
- `GET/POST /backend/qr.php` - QR generation
- `POST /backend/import.php` - CSV import
- `GET /backend/export.php` - CSV export
- `GET/POST /backend/notify.php` - Notifications

## Security

- Passwords hashed with password_hash()
- PDO prepared statements
- Input sanitization
- Session-based authentication
- Rate-limiting for scans

## Troubleshooting

- **Camera not working**: Ensure HTTPS or localhost
- **Face not detecting**: Check model loading
- **DB connection error**: Verify credentials in config.php
- **PHP errors**: Check Apache logs

## Sample Data

- Admin: admin@example.com / admin123
- Teacher: teacher1@example.com / teacher123
- Students: See assets/students.csv

## Future Enhancements

- Real-time notifications with WebSockets
- Advanced face enrollment UI
- Bulk operations
- Reports and analytics
- Mobile app

## License

MIT License
