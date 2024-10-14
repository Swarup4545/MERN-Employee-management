const mongoose=require("mongoose");

const Employee=new mongoose.Schema({
    f_user:{type:String,required:true},
    f_Image:{type:String},
    f_Name: { type: String, required: true },
    f_Email: { type: String, required: true, unique: true },
    f_Mobile: { type: String, required: true },
    f_Designation: { type: String, required: true },
    f_gender: { type: String, required: true },
    f_Course: { type: String, required: true },
    f_Createdate: { type: Date, default: Date.now },
})

const t_Employee=mongoose.model("t_Employee",Employee);
module.exports=t_Employee