const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleReissueAccessToken = async (req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(403);

    const refreshToken = cookies.jwt;
    try {
        const user = await User.findOne({refreshToken});
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err,decoded)=>{
                if(err) {
                    return res.sendStatus(401);
                }
                const accessToken  = jwt.sign({email:user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
                res.status(200).json({accessToken});
            }
        )
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {handleReissueAccessToken};