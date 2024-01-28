const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true,index:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'creator' },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);