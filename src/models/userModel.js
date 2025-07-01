import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'Please provide a username'],
        unique:[true,'User name already exists'],
    },
    email:{
        type:String,
        required:[true,'Please provide a username'],
        unique:[true,'Email already exists'],
    },
    password:{
        type:String,
        required:[true,'Please provide a username'],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiryDate:Date,
    verfiyToken:String,
    verfiyTokenExpiryDate:Date,
    
})
const User=mongoose.models.users|| mongoose.model('users',userSchema);
export default User;
