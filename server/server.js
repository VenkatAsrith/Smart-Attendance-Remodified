const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const studentRoutes = require('./routes/studentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const exportRoutes = require('./routes/exportRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_attendance_enterprise';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/export', exportRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'Enterprise Attendance Management System API',
    timestamp: new Date().toISOString()
  });
});

// Database connection & Server Startup
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas / Local Instance.');
    app.listen(PORT, () => {
      console.log(`🚀 FAANG-Level Attendance Management Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB Connection Notice:', err.message);
    console.log('ℹ️ Operating in Standalone API Mode.');
    app.listen(PORT, () => {
      console.log(`🚀 Attendance Server running on port ${PORT} (Standalone)`);
    });
  });
