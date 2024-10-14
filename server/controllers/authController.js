const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const User=require("../models/User");
const crypto= require("crypto");

exports.signup =async(req,res)=>{
    const {f_Pwd,f_userName}=req.body;
    try{
        const hashedPwd = await bcrypt.hash(f_Pwd,10);
        const verify_crypto=crypto.randomBytes(32).toString('hex');
        const user=new User({
            f_sno:verify_crypto,
            f_userName,
            f_Pwd:hashedPwd,
        })
        await user.save();
        console.log("New User",user);
        res.status(201).json({message:"Message Created",user});
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.login= async(req,res)=>{
    const {f_Pwd,f_userName}=req.body;
    try{
        const user=await User.findOne({f_userName});
        if(!user) return res.status(400).json({message:"Invalid Login"});
        const isMatch= await bcrypt.compare(f_Pwd,user.f_Pwd);
        if(!isMatch) return res.status(400).json({message:"Invalid Login"});
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"4h"});
        res.json({token,user});
    }
    catch(error){
        res.status(400).josn({message:error.message})
    }
}