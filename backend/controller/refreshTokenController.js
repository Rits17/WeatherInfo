const jwt=require('jsonwebtoken');
const userModel = require('../models/Employee')
const { refresh_token_secret,access_token_secret} = require('../config/secretTokenGenerator');

const refreshToken=async (req,res)=>{
    // get the refresh token from cookie

    const cookies=req.cookies;

    if(!cookies?.jwt){
        return res.status(401).json({'message':'No Cookie'});
    }
    const token=cookies.jwt;

    // verify the token from db

    const existingUser=await userModel.findOne({'refreshToken':token});
    if(!existingUser){
        return res.status(403).json({'message':'Forbidden'});
    }

    jwt.verify(token,refresh_token_secret,(err,decoded)=>{
        if(err){
            return res.status(401).json({'message':'Expired Cookie'});
        }

        const roles=Object.values(existingUser.Roles)

        const accessToken = jwt.sign({
            'userInfo': {
                'user': existingUser.UserName,
                'roles': roles
            }
        }, access_token_secret, { expiresIn: '40s' });

        res.json({roles,accessToken})
    });
}

module.exports=refreshToken;