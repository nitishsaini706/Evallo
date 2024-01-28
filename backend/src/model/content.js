const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, required: true },
    tags: {type:[String]}, 
    contentType:{type:String},
    difficulty: { type: String }, 
    targetAudience: { type: String }, 
    status:{type:String,default:"pending"}
}, {
    timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);