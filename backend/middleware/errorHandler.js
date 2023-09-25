const logError=require('./logError');
const errorHandler=(err,req,res,next) =>{
    logError(`${err.name}: ${err.message}`, 'errLog.txt');
    console.log(err.stack);
    res.status(500).send(err.message);
}


module.exports=errorHandler