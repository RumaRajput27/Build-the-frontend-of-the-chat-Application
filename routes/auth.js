const express = require('express');
const router = express.Router();
const db = require('../db/db-config');

// Signup Route
router.post('/signup', (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, password], (err) => {
        if (err) {
            console.error('Error saving user to database:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.status(200).json({ success: true, message: 'User signed up successfully.' });
    });
});

// Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const query = 'SELECT id, name FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        const user = results[0];
        res.status(200).json({ success: true, user });
    });
});

module.exports = router;
