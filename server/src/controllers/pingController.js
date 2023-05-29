const db = require('../models/db');
const connection = require("../models/db");

module.exports.pingUser = (req, res) => {
    const consult = 'SELECT * FROM users';

    try {
        connection.query(consult, (err, results) => {
            if (err) {
                console.error('Error calling pingUser:', err);
                res.status(500).json({ error: 'Error calling pingUser' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error calling pingUser:', error);
        res.status(500).json({ error: 'Error calling pingUser' });
    }
};