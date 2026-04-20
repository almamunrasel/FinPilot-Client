import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEyeSlash } from "react-icons/fa";
import { PiEyesBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { motion as Motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const RegistrationPage = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { register, setLoading, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    setError("");
    setSuccess("");

    if (!passwordRegex.test(password)) {
      return setError("Password must include upper/lowercase and be at least 6 characters.");
    }

    if (!terms) {
      setError("Please accept our terms and conditions.");
      return;
    }
    try {
      setLoading(true);
      await register({ name, photoURL, email, password });
      setSuccess("Your account has been created successfully.");
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlegoogleSignIn = async () => {
    setError("");
    setSuccess("");
    try {
      await googleSignIn();
      setSuccess("You are successfully logged in via Google.");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Google sign-in failed. Try again.");
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#0f1d63] via-[#1f2f89] to-[#1f2a6f] text-white"
    >
      <div className="pointer-events-none absolute -left-16 top-16 h-64 w-64 animate-pulse rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-8 h-72 w-72 animate-pulse rounded-full bg-fuchsia-400/20 blur-3xl" />

      <Link
        to="/"
        className="absolute left-6 top-6 z-20 text-3xl font-extrabold tracking-tight md:left-10 md:top-8 md:text-5xl"
      >
        FinPilot<span className="text-cyan-300">.</span>
      </Link>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-4 py-20 sm:px-6 md:px-8 lg:flex-row lg:justify-between lg:px-12">
        <div className="w-full space-y-5 text-center lg:w-1/2 lg:text-left">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-100">
            Create account
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Build a healthier money habit with a better daily workflow.
          </h1>
          <p className="text-base text-indigo-100 md:text-xl">
            Plan your expenses, monitor progress, and stay confident every month.
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white p-6 text-black shadow-2xl md:p-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-slate-900">Sign Up</h2>

          <p className="mb-6 text-center text-sm text-slate-600 md:text-base">
            Have an Account?{" "}
            <Link to="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-800">
              Log in.
            </Link>
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">Your name</label>
              <input type="text" name="name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-indigo-400 focus:bg-white" placeholder="Enter your full name" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">Photo URL</label>
              <input type="text" name="photoURL" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-indigo-400 focus:bg-white" placeholder="Paste your photo URL" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">Email</label>
              <input type="email" name="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-indigo-400 focus:bg-white" placeholder="Enter your email" required />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-indigo-400 focus:bg-white"
                  placeholder="Create your password"
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-3 text-slate-500">
                  {show ? <FaEyeSlash /> : <PiEyesBold />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" name="terms" className="checkbox checkbox-sm" />
              Accept Terms and Conditions
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}

            <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">
              Sign Up
            </button>
            {success && <p className="text-sm text-emerald-600">{success}</p>}
          </form>

          <div className="pt-5">
            <button
              onClick={handlegoogleSignIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <FcGoogle />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-4 px-4 text-center text-xs text-indigo-100/80 md:text-sm">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
      </div>
    </Motion.div>
  );
};

export default RegistrationPage;