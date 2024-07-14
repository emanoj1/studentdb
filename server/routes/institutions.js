// Manage institution-related operations. 
// This will include functionalities such as viewing institution details, updating institution information, and deleting institutions if necessary.

const express = require('express');
const router = express.Router();
const InstitutionAdmin = require('../models/InstitutionAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Get all institution admins
router.get('/', async (req, res) => {
  try {
    const admins = await InstitutionAdmin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific institution admin by ID
router.get('/:id', async (req, res) => {
  try {
    const admin = await InstitutionAdmin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Institution admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update institution admin details
router.put('/:id', auth, async (req, res) => {
  const { name, email, password, instituteName, instituteRegistrationNumber } = req.body;

  // Hash the new password if provided
  let hashedPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  try {
    const admin = await InstitutionAdmin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Institution admin not found' });

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.password = hashedPassword || admin.password;
    admin.instituteName = instituteName || admin.instituteName;
    admin.instituteRegistrationNumber = instituteRegistrationNumber || admin.instituteRegistrationNumber;

    const updatedAdmin = await admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an institution admin by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const admin = await InstitutionAdmin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Institution admin not found' });

    await admin.remove();
    res.json({ message: 'Institution admin deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
