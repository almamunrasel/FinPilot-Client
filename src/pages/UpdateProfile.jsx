import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';
import Navigationbar from '../components/Navigationbar';
import useAuth from '../hooks/useAuth';

const UpdateProfile = () => {
  const {user,updateProfile}=useAuth();
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');
  const handleupdateProfile=async(e)=>{
    e.preventDefault();
    const name=e.target.name.value;
    const photoURL=e.target.photoURL.value;
    if(!name || !photoURL){
      return setError('you must give name or photo url to update');
    }
   try{
      await updateProfile({name,photoURL});
      setSuccess('your profile have been updated successfully');
      e.target.reset();
     

        
    }catch(err){
      setError(err.response?.data?.message || "updating profile failed. Try again.");
    }

  }
  return (
    <div>
      <Navigationbar></Navigationbar>

      <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#25346D] relative overflow-hidden text-white"
    >
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-[55%] h-40 bg-[#18244D] rounded-br-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[50%] h-64 bg-[#1B2550] rounded-bl-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40%] h-56 bg-[#18244D] rounded-tl-[160px] pointer-events-none" />

      {/* Logo */}
      <div
        
        className=" top-6 left-6 md:top-8 md:left-10 text-3xl md:text-5xl font-extrabold tracking-tight z-20 cursor-pointer"
      >
       
      </div>

      {/* Main layout */}
      <div className="relative z-10 max-w-6xl mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 md:px-8 lg:px-12 gap-10 py-20">
        
        {/* Left section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
          <div className="text-5xl md:text-6xl">🌳</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Never worry about <br /> money again.
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            92% feel less stressed since starting FinPilot.
          </p>
        </div>

        {/* Login card */}
        <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-2xl p-6 md:p-8">
          
         <h2 className="text-3xl font-bold text-[#25346D] text-center mb-3">Hello {user.name}</h2>

         <h2 className="text-3xl font-bold text-center mb-3">Update Your Profile</h2>


          <form onSubmit={handleupdateProfile}  className="space-y-4">
            <div>
              <label className="label">Your Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="enter your name"
                required
              />
            </div>

            <div>
              <label className="label">Photo URL</label>

              <div className="relative">
                <input
                  type='text'
                  name="photoURL"
                  className="input input-bordered w-full"
                  placeholder="enter your photo url"
                  required
                />

                
              </div>
            </div>

          

            <button 
              type="submit"
              className="btn bg-blue-700 hover:bg-blue-900 text-white w-full"
            >
              Update
            </button>
             {
                  error && <p className='text-red-500'>{error}</p>
              }
               

           
             {
              success && <p className='text-green-400'> {success}</p>
              }
          </form>

          
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs md:text-sm text-gray-300 flex flex-wrap justify-center gap-4 px-4 text-center">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Dhaka Privacy Policy</span>
      </div>
    </motion.div>

    </div>
    
  );
};

export default UpdateProfile;