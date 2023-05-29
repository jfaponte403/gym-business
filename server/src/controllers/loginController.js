const connection = require("../models/db");

module.exports.userLogin = (req, res) => {
    try {
        const { username, password } = req.body;
        const query = 'CALL GetUserByLogin(?, ?)';

        connection.query(query, [username, password], (err, results)=>{
            if (err) {
                console.error('Error calling userLogin:', err);
                res.status(500).json({ error: 'Error calling userLogin' });
                return;
            }
            if(results.length > 0){
                res.json({ results });
            } else {
                res.status(401).json({ error: 'Incorrect Data' });
            }
        });

    } catch (error) {
        console.error('Error calling userLogin:', error);
        res.status(500).json({ error: 'Error calling userLogin' });
    }
};