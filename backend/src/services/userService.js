const User = require("../model/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const register = async(input) =>{
    try{
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = new User({ ...input, password: hashedPassword });
        const result = await user.save();
        return result;
    }catch(e){
        console.log("error in register service ",e);
        throw e;
    }
}

const login = async(input)=>{
    try{
        const user = await User.findOne({ email: input.email });
        if (!user || !await bcrypt.compare(input.password, user.password)) {
            return false;
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET);
        const result = {token:token,user:{email:user.email,role:user.role,name:user.name}};
        return result;
    }catch(e){
        console.log("error in login service ", e);
        throw e;
    }
}

module.exports = {login,register}