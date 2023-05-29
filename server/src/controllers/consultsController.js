const connection = require('../models/db');

//date and user and routine
module.exports.dateRoutineUser = (req, res) => {
    let memberCode = `MEM01`;
    try {
        connection.query('CALL GetUserEntryLogs(?)', [memberCode], (err, results) => {
            if (err) {
                console.error('Error calling the stored procedure:', err);
                res.status(500).json({ error: 'Error calling the stored procedure' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

//Most used Machines
module.exports.mostUsedMachines = (req, res) =>{
    const consult = `
        SELECT machines.name AS Maquina, (
            SELECT COUNT(*)
            FROM using_machine
            WHERE using_machine.machine_code = machines.code
        ) AS uses
        FROM machines;
    `;

    try {
        connection.query(consult, (err, results) => {
            if (err) {
                console.error('Error calling mostUsedMachines:', err);
                res.status(500).json({ error: 'Error calling mostUsedMachines' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error calling mostUsedMachines:', error);
        res.status(500).json({ error: 'Error calling mostUsedMachines' });
    }
}

//user and Advice
module.exports.userAndAdvice = (req, res) =>{
    const consult = `
        select 
            view_members.name as member, view_coaches.name as coach, routines.description, case when entry_log_member.routine_code = entry_log_coach.routine_code then true else false end as advisory
        from 
            view_members, view_coaches , routines, entry_log_member, entry_log_coach
        where
            view_members.code = entry_log_member.member_code AND 
            view_coaches.code = entry_log_coach.coach_code AND
            entry_log_member.routine_code = routines.code AND
            entry_log_coach.routine_code = routines.code;
    `;

    try {
        connection.query(consult, (err, results) => {
            if (err) {
                console.error('Error calling userAndAdvice:', err);
                res.status(500).json({ error: 'Error calling userAndAdvice' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error calling userAndAdvice:', error);
        res.status(500).json({ error: 'Error calling userAndAdvice' });
    }
}

//See what people are doing X routine
module.exports.nameRoutine = (req, res) =>{
    let memberCode = `MEM01`;
    const consult = `
        CALL GetUserRoutineEntries(?)
    `;

    try {
        connection.query(consult, [memberCode], (err, results) => {
            if (err) {
                console.error('Error calling nameRoutine:', err);
                res.status(500).json({ error: 'Error calling nameRoutine' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error calling nameRoutine:', error);
        res.status(500).json({ error: 'Error calling nameRoutine' });
    }
}

//PersonalData
module.exports.personalData = (req, res) =>{
    try {
        const { memberCode } = req.body;
        console.log(req.body);
        const consult = `CALL GetMemberInformation(?)`;

        connection.query(consult, [memberCode], (err, results) => {
            if (err) {
                console.error('Error calling personalData:', err);
                res.status(500).json({ error: 'Error calling personalData' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error calling personalData:', error);
        res.status(500).json({ error: 'Error calling personalData' });
    }
}

//progress
module.exports.getMemberProgress = (req, res) =>{
    const { memberCode } = req.body;
    console.log(req.body);

    const consult = `CALL GetMemberProgress(?)`;

    try {
        connection.query(consult, [memberCode], (err, results) => {
            if (err) {
                console.error('Error calling getMemberProgress:', err);
                res.status(500).json({ error: 'Error calling getMemberProgress' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error calling getMemberProgress:', error);
        res.status(500).json({ error: 'Error calling getMemberProgress' });
    }
}

//active users
module.exports.activeUsers = (req, res) =>{
    const consult = `
        SELECT
            users.name AS name,
            payment_history.payment_date AS payment_date,
            payment_history.next_payment AS next_payment,
            CASE
                WHEN CURDATE() BETWEEN payment_history.payment_date AND payment_history.next_payment THEN 'Activa'
                ELSE 'Inactiva'
            END AS membership_status
        FROM
            users, members, payment_history
        WHERE
            users.code = members.code
            AND payment_history.code_member = members.code;
    `;

    try {
        connection.query(consult, (err, results) => {
            if (err) {
                console.error('Error calling getMemberProgress:', err);
                res.status(500).json({ error: 'Error calling getMemberProgress' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error calling getMemberProgress:', error);
        res.status(500).json({ error: 'Error calling getMemberProgress' });
    }
}