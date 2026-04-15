import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEyeSlash } from "react-icons/fa";
import { PiEyesBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const {login,setLoading,googleSignIn}=useAuth();
   const [error,setError]=useState('');
  const [success,setSuccess]=useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin=async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);   
    const email=e.target.email.value;
    const password=e.target.password.value;
    try{
      await login({email,password});
      setSuccess('you have been logged in successfully via email and password');
      e.target.reset();
      navigate(from, { replace: true });

        
    }catch(err){
      setError(err.response?.data?.message || "Login failed. Try again.");
    }finally{
      setLoading(false);
    }


  }
  const handlegoogleSignIn=async()=>{
  setError('');
  try{
   const res= await googleSignIn();
   setSuccess('you are succefully logged in via google')
   console.log(res);

  }catch(err){
    setError(err.message ||"Google sign-in failed. Try again.");

  }
  

}



  return (
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
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-8 md:left-10 text-3xl md:text-5xl font-extrabold tracking-tight z-20 cursor-pointer"
      >
        FinPilot<span className="text-blue-500">.</span>
      </Link>

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
          <h2 className="text-3xl font-bold text-center mb-3">Log In</h2>

          <p className="text-center text-sm md:text-lg mb-6">
            New to FinPilot?{" "}
            <span className="text-blue-600 hover:text-blue-900 cursor-pointer">
              <Link to='/auth/registration'>Sign up today.</Link>
            </span>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>

              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute top-3 right-4"
                >
                  {show ? <FaEyeSlash /> : <PiEyesBold />}
                </button>
              </div>
            </div>

            <div>
              <Link
                to="/auth/forgotpassword"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn bg-blue-700 hover:bg-blue-900 text-white w-full"
            >
              Login
            </button>
             {
                  error && <p className='text-red-500'>{error}</p>
              }
               

            <p className="text-center text-sm pt-3">
              Don’t Have An Account?{" "}
              <Link
                to="/auth/registration"
                className="text-blue-600 hover:underline"
              >
                Register
              </Link>
            </p>
             {
              success && <p className='text-green-400'> {success}</p>
              }
          </form>

          <div className="pt-5">
            <button onClick={handlegoogleSignIn} className="btn w-full">
              <FcGoogle />
              Sign In With Google
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs md:text-sm text-gray-300 flex flex-wrap justify-center gap-4 px-4 text-center">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Dhaka Privacy Policy</span>
      </div>
    </motion.div>
  );
};

export default LoginPage;