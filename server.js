const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files

// Database setup
const db = new sqlite3.Database('./scholarship.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initDatabase();
  }
});

// Initialize database tables
function initDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'student'
    )`);

    // Applications table
    db.run(`CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      appId TEXT UNIQUE NOT NULL,
      userEmail TEXT NOT NULL,
      name TEXT,
      gender TEXT,
      dob TEXT,
      aadhar TEXT,
      category TEXT,
      course TEXT,
      year TEXT,
      college TEXT,
      income TEXT,
      schName TEXT,
      acc TEXT,
      ifsc TEXT,
      addr TEXT,
      status TEXT DEFAULT 'Pending',
      appliedDate TEXT,
      FOREIGN KEY (userEmail) REFERENCES users (email)
    )`);

    // Seed data
    seedData();
  });
}

// Seed initial data
function seedData() {
  const users = [
    { name: 'Admin User', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
    { name: 'Student User', email: 'student@gmail.com', password: '12345', role: 'student' }
  ];

  users.forEach(user => {
    db.run(`INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [user.name, user.email, user.password, user.role]);
  });

  const apps = [
    { appId: 'APP1700000001', userEmail: 'student@gmail.com', name: 'Rahul Patil', gender: 'Male', dob: '2002-06-15', aadhar: '123456789012', cat: 'OBC', course: 'Engineering', year: '2024-25', college: 'Pune Institute of Technology', income: '₹1,00,000 - ₹2,50,000', schName: 'Post-Matric Scholarship', acc: '9876543210', ifsc: 'SBIN0012345', addr: 'Pune, Maharashtra', status: 'Pending', appliedDate: '01/01/2025, 10:00:00 AM' },
    { appId: 'APP1700000002', userEmail: 'student@gmail.com', name: 'Priya Deshmukh', gender: 'Female', dob: '2001-03-22', aadhar: '987654321098', cat: 'SC', course: 'MCA', year: '2024-25', college: 'Aurangabad University', income: 'Below ₹1,00,000', schName: 'Savitribai Phule Scholarship', acc: '1122334455', ifsc: 'BANK0001122', addr: 'Aurangabad, Maharashtra', status: 'Approved', appliedDate: '15/01/2025, 2:30:00 PM' },
    { appId: 'APP1700000003', userEmail: 'student@gmail.com', name: 'Amit Sharma', gender: 'Male', dob: '2003-08-10', aadhar: '456789012345', cat: 'General', course: 'BCA', year: '2024-25', college: 'Nagpur College', income: '₹2,50,000 - ₹5,00,000', schName: 'Minority Scholarship', acc: '2233445566', ifsc: 'HDFC0001234', addr: 'Nagpur, Maharashtra', status: 'Rejected', appliedDate: '20/02/2025, 11:15:00 AM' },
    { appId: 'APP1700000004', userEmail: 'student@gmail.com', name: 'Sneha Gupta', gender: 'Female', dob: '2000-12-05', aadhar: '789012345678', cat: 'ST', course: 'MBBS', year: '2024-25', college: 'Mumbai Medical College', income: '₹5,00,000 - ₹10,00,000', schName: 'Post-Matric Scholarship', acc: '3344556677', ifsc: 'ICIC0005678', addr: 'Mumbai, Maharashtra', status: 'Under Review', appliedDate: '05/03/2025, 4:45:00 PM' },
    { appId: 'APP1700000005', userEmail: 'student@gmail.com', name: 'Vikram Singh', gender: 'Male', dob: '2002-11-18', aadhar: '234567890123', cat: 'OBC', course: 'Law', year: '2024-25', college: 'Pune Law College', income: '₹1,00,000 - ₹2,50,000', schName: 'Savitribai Phule Scholarship', acc: '4455667788', ifsc: 'AXIS0009012', addr: 'Pune, Maharashtra', status: 'Approved', appliedDate: '12/03/2025, 9:20:00 AM' }
  ];

  apps.forEach(app => {
    db.run(`INSERT OR IGNORE INTO applications (appId, userEmail, name, gender, dob, aadhar, category, course, year, college, income, schName, acc, ifsc, addr, status, appliedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [app.appId, app.userEmail, app.name, app.gender, app.dob, app.aadhar, app.cat, app.course, app.year, app.college, app.income, app.schName, app.acc, app.ifsc, app.addr, app.status, app.appliedDate]);
  });
}

// API Routes

// Register new user
app.post('/api/users', (req, res) => {
  const { name, email, password, role } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.json({ success: false, message: 'Email already registered' });

    db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role || 'student'], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      res.json({ success: true, user: row });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Get applications for user
app.get('/api/applications/:email', (req, res) => {
  const email = req.params.email;
  db.all('SELECT * FROM applications WHERE userEmail = ?', [email], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Submit application
app.post('/api/applications', (req, res) => {
  const app = req.body;
  const sql = `INSERT INTO applications (appId, userEmail, name, gender, dob, aadhar, category, course, year, college, income, schName, acc, ifsc, addr, status, appliedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [app.appId, app.userEmail, app.name, app.gender, app.dob, app.aadhar, app.cat, app.course, app.year, app.college, app.income, app.schName, app.acc, app.ifsc, app.addr, app.status, app.appliedDate];

  db.run(sql, values, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// Get all applications (for admin)
app.get('/api/applications', (req, res) => {
  db.all('SELECT * FROM applications', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update application status (for admin)
app.put('/api/applications/:id', (req, res) => {
  const { status } = req.body;
  db.run('UPDATE applications SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});