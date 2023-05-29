const express = require('express');
const router = express.Router();
const { pingUser } = require('../controllers/pingController');
const {
    dateRoutineUser,
    mostUsedMachines,
    userAndAdvice,
    nameRoutine,
    personalData,
    getMemberProgress,
    activeUsers
} = require('../controllers/consultsController');
const { userLogin } = require('../controllers/loginController');

// ping
router.get('/ping', pingUser);

// consults
router.get('/date-routine-user', dateRoutineUser);
router.get('/most-used-machines', mostUsedMachines);
router.get('/user-and-advice', userAndAdvice);
router.get('/user-routines', nameRoutine);
router.post('/personal-data', personalData);
router.post('/progress', getMemberProgress);
router.get('/active-users', activeUsers);

// login
router.post('/logins', userLogin);


module.exports = router;
