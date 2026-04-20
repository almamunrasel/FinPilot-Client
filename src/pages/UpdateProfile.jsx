import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import Navigationbar from "../components/Navigationbar";

const UpdateProfile = () => {
  const { user, updateProfile } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleupdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    if (!name || !photoURL) {
      return setError("You must provide name and photo URL.");
    }
    try {
      await updateProfile({ name, photoURL });
      setSuccess("Your profile has been updated successfully.");
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Updating profile failed. Try again.");
    }
  };

  return (
    <div>
      <Navigationbar />
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#0f1d63] via-[#1f2f89] to-[#1f2a6f] text-white"
      >
        <div className="pointer-events-none absolute -left-16 top-16 h-64 w-64 animate-pulse rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-8 h-72 w-72 animate-pulse rounded-full bg-fuchsia-400/20 blur-3xl" />

        <Motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
          }}
          className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-4 py-20 sm:px-6 md:px-8 lg:flex-row lg:justify-between lg:px-12"
        >
        <Motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} className="w-full space-y-5 text-center lg:w-1/2 lg:text-left">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-100">
            Personal settings
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Keep your profile updated for a personalized dashboard experience.
          </h1>
          <p className="text-base text-indigo-100 md:text-xl">
            Update your name and photo anytime to make your workspace feel yours.
          </p>
        </Motion.div>

        <Motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} className="w-full max-w-md rounded-2xl border border-white/20 bg-white p-6 text-black shadow-2xl md:p-8">
          <h2 className="mb-2 text-center text-2xl font-bold text-indigo-700">
            Hello {user?.name || "User"}
          </h2>
          <h3 className="mb-4 text-center text-3xl font-bold text-slate-900">Update Profile</h3>

          <form onSubmit={handleupdateProfile} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">Your Name</label>
              <input
                type="text"
                name="name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-indigo-400 focus:bg-white"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-indigo-400 focus:bg-white"
                placeholder="Enter your photo URL"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Update
            </button>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-emerald-600">{success}</p>}
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Back to{" "}
            <Link to="/myProfile" className="font-semibold text-indigo-600 hover:underline">
              My Profile
            </Link>
          </p>
        </Motion.div>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default UpdateProfile;