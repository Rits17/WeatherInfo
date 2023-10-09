const router=require('express').Router();
const verifyRoles=require('../middleware/verifyRoles');

router.get('/',verifyRoles('admin'),(req,res)=>{
    res.status(200).json({'message':'Welcome'});
})

module.exports=router;