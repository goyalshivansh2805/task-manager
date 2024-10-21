const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const handleRegister = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill all fields"});
        }
        
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        user = new User({name,email,password:hashedPassword});
        await user.save();
        res.status(200).json({message:"User registered successfully"});

    } catch (error) {
        console.log(error);
    }
}

const handleLogin = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please fill all fields"});
    }

    try {
    
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"User does not exist"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const accessToken  = jwt.sign({email:user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
        const refreshToken = jwt.sign({email:user.email},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
        user.refreshToken = refreshToken;
        await user.save();
        await res.cookie('jwt',refreshToken,{httpOnly:false,maxAge:7*24 * 60 * 60 * 1000});
        res.status(200).json({message:"Login Successful!",accessToken,username:user.name});
    } catch (error) {
        console.log(error);
    }
}

const handleLogout = async (req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); 
    const refreshToken = cookies.jwt;
    await User.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
    return res.sendStatus(204); 

}



module.exports = {handleRegister, handleLogin,handleLogout};