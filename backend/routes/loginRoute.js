const router=require('express').Router();
const handleNewEmployee=require('../controller/employeeRegistration');
const handleLogin=require('../controller/employeeLogin');

router.post('/',handleLogin);

module.exports=router;
