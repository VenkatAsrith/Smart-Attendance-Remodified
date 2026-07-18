const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

router.get('/students', verifyToken, attendanceController.getStudentsForAttendance);
router.post('/save', verifyToken, requireRole('FACULTY', 'ADMIN'), attendanceController.saveAttendance);
router.get('/records', verifyToken, attendanceController.getAttendanceRecords);

module.exports = router;
