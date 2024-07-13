// Handle user registration and login

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const InstitutionAdmin = require('../models/InstitutionAdmin');

// Register
router.post('/register', async (req, res) => {
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const admin = new InstitutionAdmin({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    instituteName: req.body.instituteName,
    instituteRegistrationNumber: req.body.instituteRegistrationNumber
  });

  try {
    const savedAdmin = await admin.save();
    res.send({ admin: admin._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  // Check if the email exists
  const admin = await InstitutionAdmin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send('Email is not found');

  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
