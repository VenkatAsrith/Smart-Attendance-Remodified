const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/dashboard/:rollNo?', verifyToken, studentController.getStudentDashboard);
router.put('/profile/:rollNo?', verifyToken, studentController.updateStudentProfile);

module.exports = router;
