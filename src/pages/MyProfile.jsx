import React from 'react';
import Summary from './Summary';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import { User, Mail, Lock, Edit } from "lucide-react";
import { motion } from "framer-motion";


const MyProfile = () => {
  const {user}=useAuth();
  const navigate=useNavigate();
  const myData={
    name:user.name,
    email:user.email,
    photoURL:user.photoURL,
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#25346D] relative overflow-hidden text-white"
    >
     <div className=" bg-slate-50 flex flex-col  items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#161c5f] h-32 relative">
          <img
            src={myData.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white absolute left-1/2 -translate-x-1/2 top-16 shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="pt-20 px-6 md:px-10 pb-8">
          <h1 className="text-3xl font-bold text-center text-slate-800">
            My Profile
          </h1>
          <p className="text-center text-slate-400 mt-2 mb-8">
            Manage your personal information
          </p>

          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <User className="text-indigo-500" />
              <div>
                <p className="text-sm text-slate-400">Full Name</p>
                <p className="font-semibold text-slate-700">{myData.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Mail className="text-indigo-500" />
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="font-semibold text-slate-700">{myData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Lock className="text-indigo-500" />
              <div>
                <p className="text-sm text-slate-400">Password</p>
                <p className="font-semibold text-slate-700">••••••••</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/auth/updateProfile')}
            className="mt-8 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold transition-all shadow-md cursor-pointer"
          >
            <Edit size={18} />
            Update Profile
          </button>
        </div>
      </div>
      <div>
         <Summary></Summary>
      </div>
     
    </div>
    </motion.div>
  );
};

export default MyProfile;