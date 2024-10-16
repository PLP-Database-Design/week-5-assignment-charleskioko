const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Configure MySQL connection using environment variables from .env file
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Root route for testing the server
app.get('/', (req, res) => {
  res.send('Welcome to the Hospital API');
});

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Question 3: Filter patients by first name
app.get('/patients/:first_name', (req, res) => {
  const firstName = req.params.first_name;
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  db.query(sql, [firstName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Question 4: Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  db.query(sql, [specialty], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Listen to the server on the specified port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
