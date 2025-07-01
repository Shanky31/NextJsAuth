import {connecttoDb} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
connecttoDb();

export async function POST(request:NextRequest){
    try{
        const requestBody=await request.json();
        const {email,password}=requestBody;
        //validation
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({
                message:'Incorrect Email , User Does not exist'
                
            },{status:400})
        }
        console.log(user,"User exisit");
        const validPassword=await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({
                message:'Incorrect Password'
                
            },{status:400})
        }
        const tokenData={
            id:user?._id,
            username:user.username,
            email:user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{ expiresIn:'1d'})
       const response = NextResponse.json({message:'Logged In Successfully',success:true})
        response.cookies.set('token',token,{httpOnly:true})
        return response;

    }catch(error:any){
          return NextResponse.json({error:error.message}, {status:500})
    }
}