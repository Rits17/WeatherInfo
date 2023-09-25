const userModel = require('../models/Employee')

const logout=async (req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }

    const token=cookies.jwt;
    const existingUser=await userModel.findOne({refreshToken:token});

    if(!existingUser){
        res.clearCookie('jwt',{httpOnly:true});
        return res.status(401).json({'message':'Unauthorized'});
    }

    await userModel.updateOne({ _id: existingUser._id }, { refreshToken: ''})
    res.clearCookie('jwt',{httpOnly:true});
    return res.status(200).json({'message':'You have successfully logged out'})
}

module.exports=logout
