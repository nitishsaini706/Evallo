const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: String,
    
});
// Content Schema
const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, required: true },
    tags: [TagSchema], 
    contentType:{type:String},
    difficulty: { type: String }, 
    targetAudience: { type: String }, 
    status:{type:String,default:"pending"}
}, {
    timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);