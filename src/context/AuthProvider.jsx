import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import {  getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import app from '../firebase/firebase.config';

const axiosSecure=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL
   })

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
    const result= await signInWithPopup(firebaseAuth,googleProvider);
    const idToken =await result.user.getIdToken();
    const res=await axios.post(`${BASE_URL}/auth/google`,{idToken});
    saveAuth(res.data);
    return res.data;
    
  }
  //logout

  const logOut=async()=>{
    await signOut(firebaseAuth).catch(()=>{});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }
  const updateProfile=async({name,photoURL})=>{
    const token=localStorage.getItem("token");
    const res= await axiosSecure.patch(`/auth/updateprofile`,{
      name,
      photoURL
      },{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      })
    const updatedUser=res.data.user;
    localStorage.setItem("user",JSON.stringify(updatedUser));
    setUser(updatedUser);
    return res.data;
    

  }

  
  const authData={
    user,
    loading,
    register,
    login,
    setLoading,
    googleSignIn,
    logOut,
    updateProfile,
    }
  return <AuthContext.Provider value={authData}>
    {children}

  </AuthContext.Provider>
 
};

export default AuthProvider;