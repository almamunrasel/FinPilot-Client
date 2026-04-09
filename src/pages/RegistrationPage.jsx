import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEyeSlash } from "react-icons/fa";
import { PiEyesBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const RegistrationPage = () => {
  const [show, setShow] = useState(false);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');
  const {register,setLoading}=useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  
  const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
  
  const handleRegister=async(e)=>{
    e.preventDefault();
    const name=e.target.name.value;
    const photoURL=e.target.photoURL.value;
    const email = e.target.email.value;
    const password=e.target.password.value;
    const terms= e.target.terms.checked;
    console.log(name,photoURL,email,password);
    if (!passwordRegex.test(password)) {
      return setError("Password must be one uppercase,one lowercase and 6 characters");
    }
    setError('');
    setSuccess(false);
    if(!terms){
      setError('please accept our terms and conditions');
      return;
    }
    setSuccess(false);
    if(!terms){
      setError('please accept our terms and conditions');
      return;
    }
    try{
      await register({name,photoURL,email,password});
      setSuccess(true);
      e.target.reset();
      // navigate('/');


    }catch(err){
      setError(err.response?.data?.message || "Registration failed. Try again.");

    } finally{
      setLoading(false);
      
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
          <h2 className="text-3xl font-bold text-center mb-3">Sign Up</h2>

          <p className="text-center text-sm md:text-lg mb-6">
            Have an Account?{" "}
            <span className="text-blue-600 hover:text-blue-900 cursor-pointer">
              <Link to='/auth/login'>Log in.</Link>
            </span>
          </p>

          <form onSubmit={handleRegister} className="space-y-4 ">
                    <div>
                      <label className="label text-black font-semibold">Your name</label>
                      <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full"
                        placeholder="enter your name"
                        required
                      />
                    </div>
                    <div> 
                      <label className="label text-black font-semibold">Photo Url</label>
                      <input
                        type="text"
                        name="photoURL"
                        className="input input-bordered w-full"
                        placeholder="enter your photo url"
                        required
                      />
                    </div>
                    <div>
                      <label className="label text-black font-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div>
                      <label className="label text-black font-semibold">Password</label>

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
                      <label class="label text-black font-semibold">
                          <input type="checkbox" name='terms'  class="checkbox" />
                          Accept Our <span className="text-blue-500 hover:text-blue-900">terms</span> and <span className="text-blue-500 hover:text-blue-900">Conditions</span>
                      </label>
                      {
                         error && <p className='text-red-400'>{error}</p>
                      }

                  </div>

                  

                    <button
                      type="submit"
                      className="btn bg-blue-700 hover:bg-blue-900 text-white w-full"
                    >
                      Sign Up
                    </button>
                  {
                  success && <p className='text-green-400'> you have been registered successfully !!</p>
                  }
                  <p className="text-center"><hr /></p>
          </form>

          <div className="pt-5">
            <button className="btn w-full">
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

export default RegistrationPage;