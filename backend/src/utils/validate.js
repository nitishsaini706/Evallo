const joi = require("joi");


const registerSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    role:joi.string().required()
});
const loginSchema=joi.object({
    
    email:joi.string().required(),
    password:joi.string().required(),
    
});


const contentSchema = joi.object({
    title:joi.string().required(),
    category:joi.string().required(),
    price:joi.string().required(),
    tags: joi.array().items(joi.string().required()).optional(),
    difficulty: joi.string().optional(),
    targetAudience: joi.string().optional(),
    status:joi.string().required(),
    contentType:joi.string().required()
});
const contentListSchema = joi.object({
    email: joi.string().required(),

});
module.exports = { contentSchema, loginSchema, registerSchema, contentListSchema }