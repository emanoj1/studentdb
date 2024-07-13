// Define the schema for institution admins.

const mongoose = require('mongoose');

const InstitutionAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instituteName: { type: String, required: true },
  instituteRegistrationNumber: { type: String, required: true }
});

module.exports = mongoose.model('InstitutionAdmin', InstitutionAdminSchema);
