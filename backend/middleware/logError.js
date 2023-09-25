const {format}=require('date-fns');
const path=require('path');
const { v4: uuidv4 } = require('uuid');
const fs=require('fs');

const logError = (message,logFileName) => {
        const dateTime=`${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
        const errMessage=`${dateTime}\t${uuidv4()}\t${message}\n`;

        if(!fs.existsSync(path.join(__dirname,'..','logs')))
        {
            fs.mkdir(path.join(__dirname,'..','logs'));
        }
        fs.appendFile(path.join(__dirname,'..','logs',logFileName),errMessage,(err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
          });
}

module.exports=logError