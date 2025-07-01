'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router=useRouter();
  const [user,setUser]=useState({
    email:'',
    userName:'',
    password:''
  });
  const [buttonDisabled,setButtonDisabled]=useState(true);
  const [loading,setLoading]=useState(false);

 const onSignUp= async ()=>{
  try{
    setLoading(true);
    const response=await axios.post('/api/users/signup',user);
    console.log(response);
    toast.success("User registered successfully");
    setLoading(false);
    router.push('/login');
  }catch(error:any){  
    console.log(error);
    toast.error(error.response.data.message);
    setLoading(false);
  }
 }
useEffect(()=>{
if(user.email.length>0 && user.userName.length>0 && user.password.length>0){
  setButtonDisabled(false);
}else{
  setButtonDisabled(true);
}
},[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="p-6 border-2 border-blue-400 rounded-xl bg-white shadow-2xl w-96 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">Sign Up</h1>
        <label htmlFor="userName" className="mb-2 text-blue-600 font-medium">User Name</label>
        <input 
          className="mt-2 mb-2 border border-blue-300 rounded-lg p-2 bg-blue-50 text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text" id="userName" value={user.userName} onChange={(e)=>setUser({...user,userName:e.target.value})} placeholder="Enter your user name" />
        <label htmlFor="email" className="mb-2 mt-2 text-blue-600 font-medium">Email</label>
        <input 
          className="mt-2 mb-2 border border-blue-300 rounded-lg p-2 bg-blue-50 text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email" id="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter your email" />
        <label htmlFor="password" className="mb-4 mt-2 text-blue-600 font-medium">Password</label>
        <input 
          className="mt-2 mb-2 border border-blue-300 rounded-lg p-2 bg-blue-50 text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password" id="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter your password" />
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg mt-4 cursor-pointer w-full hover:opacity-90 transition-opacity" onClick={onSignUp} disabled={buttonDisabled}>
          {loading ? "Processing" : "Sign Up"}
        </button>
        <Link href="/login" className="text-blue-600 mt-4 block text-center hover:text-blue-700 transition-colors">Already have an account? Login</Link>
      </div>
    </div>
  ) 
}
