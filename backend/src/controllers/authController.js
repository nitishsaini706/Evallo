const { registerSchema, loginSchema } = require("../utils/validate");
const authService = require("../services/userService");
require('dotenv').config()
const jwt = require("jsonwebtoken")

const register = async (req, res) => { 
    try {
        const { error, value } = registerSchema.validate(req.body);
        
        if(error){
            res.status(400).send(error.details);
        }
        await authService.register(value);
        res.status(201).send('User created successfully');
    } catch (error) {
        console.log("",error);
        res.status(400).send(error);
    }
}

const login = async (req, res) => {
    try{
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            res.status(400).send(error.details);
        }
        
        const result = await authService.login(value);
        if(!result){
            res.status(401).send('Invalid credentials');
        }
        res.header('Authorization', result.token).send(result);
    }catch(e){
        res.status(400).send(e);
    }
};
const verify = async (req, res) => {
    try {
        
        const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
        if(verified){

            res.status(200).send(verified);
        }else{

            res.status(400).send("invalid token, login again");
        }

    } catch (e) {
        console.log('error in verifying', e)
        res.status(400).send(e);
    }
};
module.exports = { login, register, verify }