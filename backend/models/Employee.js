const mongoose=require('mongoose')
const {Schema} =mongoose;

const userSchema= new Schema({
    UserName:{
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Roles:{
        User:String,
        Admin:String
    },
    refreshToken: String
})

module.exports = mongoose.model('Employee',userSchema);