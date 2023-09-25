const logError=require('./logError');

const logger=(req,res,next)=>{
    logError(`${req.method}\t${req.url}]\t${req.headers.origin}`,'reqLog.txt');
    next()
}

module.exports=logger;