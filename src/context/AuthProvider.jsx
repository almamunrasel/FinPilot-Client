import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import {  getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import app from '../firebase/firebase.config';

const AuthProvider = ({children}) => {

  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const firebaseAuth=getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  
  
  

  useEffect(()=>{
    const storedUser=localStorage.getItem("user");
    const storedToken=localStorage.getItem("token");
    if(storedUser && storedToken){
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

  },[])
  // Save auth data to localStorage and state
  const saveAuth = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  //register

  const register=async({name,photoURL,email,password})=>{
    const res=await axios.post(`${BASE_URL}/auth/register`,{
      name,
      photoURL:photoURL || "",
      email,
      password
    });
    saveAuth(res.data);
    return res.data;
  }
   // --- Email/password login ---
  const login = async ({ email, password }) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    saveAuth(res.data);
    return res.data;
  };

  //google popup login

  const googleSignIn=async()=>{
     return await signInWithPopup(firebaseAuth,googleProvider);
    // const token=result.user.getIdToken();

  }








  
  
  
  const authData={
    user,loading,register,login,setLoading,googleSignIn

  }
  return <AuthContext.Provider value={authData}>
    {children}

  </AuthContext.Provider>
 
};

export default AuthProvider;