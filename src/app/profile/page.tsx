"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";    
import axios from "axios";
import toast from "react-hot-toast";
export default function ProfilePage() {
    const router=useRouter();
    const [data,setData]=useState('nothing');
    const getUserDetails=async()=>{
        try{
            const response=await axios.post('/api/users/me');
            setData(response?.data?.data?._id);
            console.log(response);
        }catch(error:any){
            console.log(error);
        }
    }
    const onLogOut=async()=>{
        try{
            const response=await axios.get('/api/users/logout');
            console.log(response);
            toast.success("User logged out successfully");
            router.push('/login');
        }catch(error:any){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    // useEffect(()=>{
    //     getUserDetails();
    // },[]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Profile Page</h1>
            <hr/>
            <h2>{data==='nothing'?'Nothing':<><span>Click <Link href={`/profile/${data}`} className="text-blue-600 underline">here</Link> to see user details</span></>}</h2>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg mt-4 cursor-pointer hover:opacity-90 transition-opacity" onClick={onLogOut}>Log Out</button>
            <button className="bg-gradient-to-r from-green-600 to-green-800 text-white p-2 rounded-lg mt-4 cursor-pointer hover:opacity-90 transition-opacity" onClick={getUserDetails}>Get User Details</button>    
        </div>
    );
}