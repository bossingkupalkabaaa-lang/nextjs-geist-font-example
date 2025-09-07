# Plan for Building QR Code + Face-Recognition Attendance System

## Information Gathered
- **Project Type**: Web application with frontend (vanilla HTML/CSS/JS) and backend (PHP + MySQL).
- **Current Workspace**: Next.js boilerplate with TypeScript and shadcn/ui, but task requires vanilla HTML/JS frontend and PHP backend. Need to create a new project structure in a subdirectory (e.g., `attendance-system`) to avoid conflicts.
- **Key Features**:
  - Authentication: Login/Signup with roles (admin, teacher), secure sessions, password hashing.
  - Pages: Login, Signup, Dashboard, Attendance, Students, Teachers, Profiles, QR Generator, Scanner (QR and Face), Admin.
  - Dashboard: Counts, global search, notifications.
  - CRUD: Students, Teachers, Attendance with import/export CSV (robust mapping).
  - QR: Generate QR codes per student, bulk download PNG/ZIP.
  - Scanners: Camera-based QR and face recognition for auto-attendance.
  - Database: MySQL schema with InnoDB, indexes, timestamps.
  - Libraries: jsQR/qr-scanner for QR, face-api.js for face recognition, PHP PDO for backend.
- **Deliverables**: Frontend files (HTML/CSS/JS), backend PHP APIs, schema.sql, seed.sql, README, sample CSVs.
- **Requirements Identified**:
  - No external API keys needed (client-side face/QR recognition).
  - Use free/open-source libraries: face-api.js (CDN models), jsQR (no API), qrcodejs for generation.
  - Production-ready for LAMP stack.
- **Dependencies**:
  - Frontend: Vanilla JS, Fetch API, camera access.
  - Backend: PHP 7.4+, PDO, optional League\Csv for CSV parsing.
  - Database: MySQL with phpMyAdmin for management.
- **Security**: Prepared statements, input validation, rate-limiting for scans.
- **Testing**: Basic integration tests for APIs, manual testing for UI/UX.

## Plan: Detailed Code Update Plan at File Level
1. **Project Structure Setup**:
   - Create `attendance-system/` directory.
   - Subdirectories: `frontend/` (HTML/CSS/JS), `backend/` (PHP APIs), `database/` (SQL files), `assets/` (sample CSVs, models if needed).
2. **Database Schema**:
   - Create `database/schema.sql`: Tables for users, students, teachers, attendance, qr_codes, notifications.
   - Create `database/seed.sql`: Sample data for testing.
3. **Backend PHP APIs**:
   - `backend/auth.php`: Login, signup, session management.
   - `backend/students.php`: CRUD, import/export CSV.
   - `backend/teachers.php`: CRUD, import/export CSV.
   - `backend/attendance.php`: CRUD, auto-record from scans.
   - `backend/qr.php`: Generate QR codes, bulk download.
   - `backend/import.php`: Handle CSV import with mapping.
   - `backend/export.php`: Handle CSV export.
   - `backend/notify.php`: Notifications logic.
   - Include config.php for DB connection (PDO).
4. **Frontend Files**:
   - `frontend/index.html`: Main entry (redirect to login).
   - `frontend/login.html`, `frontend/signup.html`: Auth pages.
   - `frontend/dashboard.html`: Homepage with navigation.
   - `frontend/attendance.html`, `frontend/students.html`, `frontend/teachers.html`, `frontend/profiles.html`, `frontend/qr-generator.html`, `frontend/scanner.html`, `frontend/admin.html`: Feature pages.
   - `frontend/css/styles.css`: Maroon-themed styles, responsive.
   - `frontend/js/`: Scripts for each page (e.g., auth.js, dashboard.js), global search, notifications, CSV handling, QR/face scanning.
5. **Libraries Integration**:
   - Include jsQR, qrcodejs, face-api.js via CDN in HTML.
   - For face: Load models from CDN, handle enrollment and recognition.
   - For QR: Real-time scanning with camera.
6. **CSV Handling**:
   - Robust parser to detect headers, provide mapping UI.
   - Preview and validation before import.
7. **Security & Validation**:
   - Sanitize inputs, use PDO prepared statements.
   - Rate-limit scans, validate file uploads.
8. **Testing & Documentation**:
   - Basic PHP unit tests for APIs.
   - README.md with LAMP setup, DB creation, CSV import tutorial.
   - Sample CSVs: students.csv, teachers.csv, attendance.csv.

## Dependent Files to be Edited/Created
- New project: All files are new creations in `attendance-system/`.
- No edits to existing Next.js files; create separate structure.
- Dependencies: No new npm packages; use CDN for JS libs. For PHP, optional composer for League\Csv.

## Followup Steps
1. ✅ Create project directory and structure.
2. ✅ Implement database schema and seed data.
3. ✅ Build backend APIs with PDO and security.
4. ✅ Develop frontend HTML/CSS/JS with responsive design.
5. ✅ Integrate QR and face scanning with camera access.
6. ✅ Implement CSV import/export with mapping UI.
7. ✅ Add authentication, roles, and session management.
8. Test locally (simulate LAMP with XAMPP or similar).
9. ✅ Write README and sample CSVs.
10. Manual testing: UI/UX, responsiveness, camera permissions, CSV parsing.
11. Final validation: Open in VS Code, deploy on LAMP.
