const verifyRoles=(...allowedRoles)=>{
return (req,res,next)=>{
    if(!req?.roles){
        return res.sendStatus(401);
    }
    const findRole=req.roles.map(role => allowedRoles.includes(role)).find(value => value === true)
    if(!findRole){
        return res.status(401).json({'message':'You are not authorized'});
    }
    next();
}
}

module.exports=verifyRoles;
