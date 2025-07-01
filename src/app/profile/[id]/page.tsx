'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default  function ProfilePage({params}:any){
    const router=useRouter();
    const [data,setData]=useState({userName:'',email:''});   
    const getUserDetails=async()=>{
        try{
            const response=await axios.post('/api/users/me');
            setData(response?.data?.data);
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
    useEffect(()=>{
        getUserDetails();
    },[]);
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-indigo-200 to-purple-00">
            <h1 className="text-3xl font-bold text-white">User Details</h1>
            <div className="flex flex-col items-center justify-center w-96 bg-white rounded-xl shadow-2xl p-4 mt-4">
                <h2 className="text-2xl font-bold text-blue-600">{data.userName}</h2>
                <p className="text-lg font-medium text-blue-600">{data.email}</p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg mt-4 cursor-pointer w-full hover:opacity-90 transition-opacity" onClick={onLogOut}>Logout</button>    
            </div>
        </div>
    )
}