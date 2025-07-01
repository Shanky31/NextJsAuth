import {connecttoDb} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connecttoDb();

export async function POST(request:NextRequest){
    try{
        const requestBody=await request.json();
        const {token}=requestBody;
        console.log(token);
        if(!token){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        const user =await User.findOne({verfiyToken:token,
            verfiyTokenExpiryDate:{
                $gt:Date.now()
            }
        })
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
       console.log(user);
       user.isVerified=true;
       user.verfiyToken=undefined;
       user.verfiyTokenExpiryDate=undefined;
       await user.save();
       return NextResponse.json({
           message:"User verified successfully",
           success:true,
           user
       })
    }catch(error:any){
        return NextResponse.json({error:error.message}, {status:500})
    }
}