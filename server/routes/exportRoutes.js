const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/excel', verifyToken, exportController.exportExcel);
router.get('/pdf', verifyToken, exportController.exportPDF);

module.exports = router;
