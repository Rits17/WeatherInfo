const logout=require('../controller/logoutController')
const router=require('express').Router();

router.get('/',logout);

module.exports=router;