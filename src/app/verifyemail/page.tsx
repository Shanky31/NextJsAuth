"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", token);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    setError(false);
      const token=window.location.search.split("=")[1];
      setToken(token||'');
    // const { query } = router;
    // setToken(query?.token || "");
  }, []);
  useEffect(() => {
    setError(false);
    if (token.length > 0) verifyUserEmail();
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
        Verify Email
      </h1>
      <h2>{token ? `${token}` : "No token found"}</h2>
      {verified && (
        <div>
          <h2>Verified Successfully</h2>
        
        <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Verification Failed</h2>
          <Link href="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
