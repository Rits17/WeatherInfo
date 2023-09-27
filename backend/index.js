require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const logger=require('./middleware/logger');
const errorHandler=require('./middleware/errorHandler');
const rootRoute=require('./routes/root');
const path=require('path');
const corsOptions=require('./config/corsOptions');
const dbConn=require('./config/dbConn');
const mongoose=require('mongoose');
const registerRoute=require('./routes/registerRoute');
const loginRoute=require('./routes/loginRoute');
const employeeRoute=require('./routes/employeeRoute');
const verifyJwtToken=require('./middleware/verifyJwtToken');
const cookieParser = require('cookie-parser');
const refreshRoute=require('./routes/refreshRoute');
const credentials = require('./middleware/credential');
const logoutRoute=require('./routes/logoutRoute');

const port=3500;

dbConn();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json())

app.use(cookieParser());

app.use('/',rootRoute);
app.use('/register',registerRoute)
app.use('/login',loginRoute)
app.use('/refreshToken',refreshRoute)
app.use('/logout',logoutRoute);

app.use(verifyJwtToken);
app.use('/employee',employeeRoute)


app.all("*",(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.send(__dirname,"views","404.html");
    }
    else if(req.accepts('json')){
        res.json({"error":"Data Not Found"});
    }
    else{
        res.send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open',()=>{
    console.log('Mongo Db Connection established');
    app.listen(port,()=>console.log(`Server started on port ${port}`));
})


