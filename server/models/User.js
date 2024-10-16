const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    f_sno:{
        type: String,
        required:[true,"Please provide a verify"]
    },
    f_userName:{
        type:String,
        required:[true,"Please Type your Name"],
        unique:true,
    },
    f_Pwd:{
        type:String,
        required:[true,"Please enter your Password"]
    }
})

const t_login=mongoose.model("t_login",userSchema);

module.exports = t_login;