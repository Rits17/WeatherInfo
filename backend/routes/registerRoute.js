const router=require('express').Router();
const handleNewEmployee=require('../controller/employeeRegistration');

router.post('/',handleNewEmployee);

module.exports=router;
