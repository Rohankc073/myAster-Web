const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password for login
patientSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
