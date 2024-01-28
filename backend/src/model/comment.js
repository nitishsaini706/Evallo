const mongoose = require('mongoose');

// Content Schema
const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);