const express = require('express');
const router = express.Router();
const db = require('../db/db-config');

// Fetch Online Users
router.get('/online-users', (req, res) => {
    const query = 'SELECT id, name, email FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.status(200).json({ success: true, users: results });
    });
});

module.exports = router;
