const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');



// get all of the information from the candidates table
router.get('/candidates', (req, res) => {
    const sql = `select candidates.*, parties.name
                as party_name
                from candidates
                left join parties
                on candidates.party_id = parties.id`;
    const params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json({
            message: "success",
            data: rows
        })
    });
});


// GET a single candidate
router.get('/candidate/:id', (req, res) => {
    const sql = `select candidates.*, parties.name
                as party_name
                from candidates
                left join parties
                on candidates.party_id = parties.id
                where candidates.id = ?`;
    const params = [req.params.id];

    db.get(sql, params, (err, row) => {

        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: row
        });
    });
}); 

// Delete a candidate
router.delete('/candidate/:id', (req, res) => {
    const sql = `delete from candidates where id = ?`;
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

// add acandidate to the candidates table
router.post('/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    // Creat a candidate
    const sql = `insert into candidates (first_name, last_name, industry_connected) values (?,?,?)`
    
    const params = [body.first_name, body.last_name, body.industry_connected];
    
    // ES5 function, not arrow function, to use this
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } 
        res.json({
            message: 'success', 
            data: body, 
            id: this.lastID
        })
    });
});

// edit a candidate's information
router.put('/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = `update candidates set party_id = ?
                where id = ?`;
    const params = [req.body.party_id, req.params.id];

    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: req.body, 
            changes: this.changes
        })
    });
});

module.exports = router;