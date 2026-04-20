import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { User, Mail, Lock, Edit } from "lucide-react";
import { motion as Motion } from "framer-motion";

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myData = {
    name: user?.name || "Anonymous User",
    email: user?.email || "No email",
    photoURL: user?.photoURL || "https://i.ibb.co/rf8xQWv/user.png",
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-slate-50 px-4 py-10 transition-colors dark:bg-[#0f1b46]"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6">
        <div className="w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-[#162447]">
          <div className="relative h-36 bg-linear-to-r from-[#161c5f] to-[#2c47b9]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_50%)]" />
          </div>

          <div className="px-6 pb-8 pt-0 md:px-10">
            <div className="-mt-14 flex justify-center">
              <img
                src={myData.photoURL}
                alt="Profile"
                className="h-28 w-28 rounded-full border-4 border-white bg-slate-100 object-cover object-top shadow-lg dark:border-slate-900"
              />
            </div>

            <h1 className="mt-4 text-center text-3xl font-bold text-slate-800 dark:text-slate-100">My Profile</h1>
            <p className="mb-8 mt-2 text-center text-slate-500 dark:text-slate-400">Manage your personal information</p>

            <div className="grid gap-4">
              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <User className="text-indigo-500" />
                <div>
                  <p className="text-sm text-slate-400">Full Name</p>
                  <p className="font-semibold text-slate-700 dark:text-slate-100">{myData.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <Mail className="text-indigo-500" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="font-semibold text-slate-700 dark:text-slate-100">{myData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <Lock className="text-indigo-500" />
                <div>
                  <p className="text-sm text-slate-400">Password</p>
                  <p className="font-semibold text-slate-700 dark:text-slate-100">••••••••</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/auth/updateProfile")}
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700"
            >
              <Edit size={18} />
              Update Profile
            </button>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#162447]">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Profile Tips</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Keep your profile updated so teammates and reports can identify your account clearly.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-sm text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">Use a clear full name</div>
            <div className="rounded-xl bg-cyan-50 p-3 text-sm text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200">Set a real profile photo</div>
            <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">Review profile monthly</div>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default MyProfile;