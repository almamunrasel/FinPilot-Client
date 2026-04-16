import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import userIcon from '../assets/user.png'
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeProvider';





const Navigationbar = () => {
  const {user,loading,logOut}=useAuth();
  const {theme,toggleTheme}=useTheme();
  console.log(user);
  const handlelogOut=()=>{
    logOut();
    toast.success('you are logged out!!');

  }
  const links = (
    <>
      <li>
        <NavLink to="/" className="relative group py-2 px-3 text-white transition-colors duration-300 hover:text-blue-300">
          Home
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </NavLink>
      </li>

      {/* All Products with Submenu */}
      {/* <li className="group relative">
        <div className="cursor-pointer relative py-2 px-3 text-white transition-colors duration-300 group-hover:text-blue-300 flex items-center gap-1">
          My Transaction
          <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </div>

        // {/* Fluid Submenu Dropdown */}
        {/* // <ul className="absolute left-0 top-full mt-0 w-48 bg-white text-gray-800 rounded-md shadow-xl 
        //                opacity-0 invisible translate-y-2 transition-all duration-300 
        //                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 p-2">
        //   <li><NavLink to="/transaction" className="block p-2 hover:bg-indigo-50 rounded">Add Transaction</NavLink></li>
        //   <li><NavLink to="/transaction" className="block p-2 hover:bg-indigo-50 rounded">All Transaction</NavLink></li>
        //   <li><NavLink to="/transaction" className="block p-2 hover:bg-indigo-50 rounded">Summary</NavLink></li>
          
          
        // </ul>
      </li> */} 

      <li>
        <NavLink to="/transaction" className="relative group py-2 px-3 text-white transition-colors duration-300 hover:text-blue-300">
          My Transaction
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </NavLink>
      </li>
       <li>
        <NavLink to="/myProfile" className="relative group py-2 px-3 text-white transition-colors duration-300 hover:text-blue-300">
          My Profile
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </NavLink>
      </li>
      <li>
        <button onClick={toggleTheme} className="btn">
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
      </li>

    </>
  );

  return (
    <div className="bg-[#161c5f] text-white">
      <div className="navbar w-10/12 mx-auto overflow-visible py-5"> 
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-indigo-900 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl">
              {links}
            </ul>
          </div>

          <NavLink to='/' className="btn btn-ghost text-3xl font-bold transition-all duration-300 hover:from-indigo-600 hover:to-blue-900 hover:bg-gradient-to-b hover:text-white hover:-rotate-6 hover:scale-105">
            FinPilot
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex overflow-visible">
          <ul className="menu menu-horizontal px-1 gap-2 overflow-visible">
            {links}
          </ul>
        </div>
         
        <div className="navbar-end gap-2 md:gap-6">
  {!user && (
    <Link
      to="/auth/login"
      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
    >
      Log In
    </Link>
  )}

  {user && (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="cursor-pointer">
        <div className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors duration-200">
          <span className="hidden md:block text-sm font-medium text-white">
            {user.name}
          </span>
          <div className="relative">
            <img
              src={user.photoURL ? user.photoURL : userIcon}
              alt={user.name}
              className="w-9 h-9 rounded-full border-2 border-[#b4f05a] object-cover hover:scale-105 transition-transform duration-200"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#161c5f] rounded-full" />
          </div>
        </div>
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content mt-3 w-56 rounded-xl overflow-hidden shadow-2xl border border-white/10"
        style={{ background: "#1e2670" }}
      >
        {/* User info header */}
        <li className="px-4 py-3 border-b border-white/10">
          <p className="text-xs text-gray-400">Signed in as</p>
          <p className="text-sm font-semibold text-white truncate">{user.email}</p>
        </li>

        <li>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-150">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </li>

        <li>
          <Link
            to="/auth/updateprofile"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Update Profile
          </Link>
        </li>

        {/* Divider */}
        <li className="border-t border-white/10 mt-1">
          <button onClick={handlelogOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150 hover:cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )}

  {!user && (
    <button className="hidden md:block bg-[#b4f05a] text-[#161c5f] px-4 py-2.5 rounded-lg text-sm font-bold transition-transform duration-200 hover:scale-105 active:scale-95">
      Start Your Free Trial
    </button>
  )}
</div>
      </div>
    </div>
  );
};

export default Navigationbar;