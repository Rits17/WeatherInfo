const mongoose=require('mongoose');

const dbConn= async() =>{
    try
    {
    await mongoose.connect('mongodb+srv://ritika1704:Iwillwin17@cluster0.fabskk3.mongodb.net/PersonsDB?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology:true
        //mongodb+srv://ritika1704:<password>@cluster0.fabskk3.mongodb.net/?retryWrites=true&w=majority
    })
}
catch{
    console.log("Mongodb Connection not established")
}
}

module.exports=dbConn