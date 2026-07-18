const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/faculty-summary', verifyToken, analyticsController.getFacultyAnalytics);

module.exports = router;
