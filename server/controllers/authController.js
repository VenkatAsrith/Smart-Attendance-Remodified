const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const { JWT_SECRET } = require('../middlewares/authMiddleware');

exports.login = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide identifier and password.' });
    }

    const query = role === 'FACULTY'
      ? { email: identifier.toLowerCase() }
      : { rollNo: identifier.toUpperCase() };

    let user = await User.findOne(query);

    // If student, fallback search by email
    if (!user && role === 'STUDENT') {
      user = await User.findOne({ email: identifier.toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    let profile = null;
    if (user.role === 'STUDENT') {
      profile = await Student.findOne({ rollNo: user.rollNo });
    } else if (user.role === 'FACULTY') {
      profile = await Faculty.findOne({ facultyId: user.facultyId });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        rollNo: user.rollNo,
        facultyId: user.facultyId,
        profileId: user.profileId
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        facultyId: user.facultyId,
        profile
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    let profile = null;
    if (user.role === 'STUDENT') {
      profile = await Student.findOne({ rollNo: user.rollNo });
    } else if (user.role === 'FACULTY') {
      profile = await Faculty.findOne({ facultyId: user.facultyId });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        facultyId: user.facultyId,
        profile
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch user profile.' });
  }
};
