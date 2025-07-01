import {connecttoDb} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import  {sendMail} from "@/helpers/mailer";

connecttoDb();

export async function POST(request:NextRequest){
    try{
        console.log("hererereer,62534623675")
        const requestBody=await request.json();
        const {userName,email,password}=requestBody;
        //validation
        console.log(requestBody);
        const user= await User.findOne({email});
        if(user){
            return NextResponse.json({error:'User already exists'},{status:400});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt); 
        console.log(hashedPassword)
        //Only model interaction
        const newUser= new User({
            userName,
            email,
            password:hashedPassword,
        })  
        //DB interaction and saving data
        const savedUser=await newUser.save();
        console.log(savedUser);
        //till this step user is saved in db , but now we have to send the mail
        //Send verification mail
        await sendMail({email,emailType:'VERIFY',userID:savedUser?._id});
        return NextResponse.json({
            message:"user registered successfully",
            success:true,
            savedUser
        });

    }catch (error:any){
        return NextResponse.json({error:error.message}, {status:500})
    }
}