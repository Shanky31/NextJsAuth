import mongoose from "mongoose";

export async function connecttoDb(){
    try{
        console.log("camer here")
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;
        connection.on("connected",()=>{
            console.log("Mongo Db Connected");
        })
        connection.on("error",(error)=>{
            console.log("Mongo Db Connection Error",error);
            process.exit();
        })
    } catch(error){
        console.log("Mongoose connection error",error);
    }
}