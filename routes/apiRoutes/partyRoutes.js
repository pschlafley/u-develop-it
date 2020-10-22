const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// endpoint for parties table
router.get('/parties', (req,res) => {
    const sql = `select * from parties`;
    const params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});


// party table's id
router.get('/party/:id', (req,res) => {
    const sql = `select * from parties where id = ?`;
    const params = [req.params.id];

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: row
        });
    });
});


// Delete a party
router.delete('/party/:id', (req, res) => {
    const sql = `delete from parties where id = ?`;
    const params = [req.params.id];

    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }

        res.json({
            message: 'successfully deleted',
            changes: this.changes
        });
    });
});

module.exports = router;