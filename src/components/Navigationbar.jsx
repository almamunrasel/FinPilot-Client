import React from 'react';
import { Link, NavLink } from 'react-router';


const Navigationbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/" className="relative group py-2 px-3 text-white transition-colors duration-300 hover:text-blue-300">
          Home
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </NavLink>
      </li>

      {/* All Products with Submenu */}
      <li className="group relative">
        <div className="cursor-pointer relative py-2 px-3 text-white transition-colors duration-300 group-hover:text-blue-300 flex items-center gap-1">
          All Products
          <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </div>

        {/* Fluid Submenu Dropdown */}
        <ul className="absolute left-0 top-full mt-0 w-48 bg-white text-gray-800 rounded-md shadow-xl 
                       opacity-0 invisible translate-y-2 transition-all duration-300 
                       group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 p-2">
          <li><NavLink to="/allproducts/software" className="block p-2 hover:bg-indigo-50 rounded">Financial Software</NavLink></li>
          <li><NavLink to="/allproducts/trackers" className="block p-2 hover:bg-indigo-50 rounded">Expense Trackers</NavLink></li>
          <li><NavLink to="/allproducts/investment" className="block p-2 hover:bg-indigo-50 rounded">Investment Tools</NavLink></li>
        </ul>
      </li>

      <li>
        <NavLink to="/register" className="relative group py-2 px-3 text-white transition-colors duration-300 hover:text-blue-300">
          Register
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </NavLink>
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

          <a className="btn btn-ghost text-3xl font-bold transition-all duration-300 hover:from-indigo-600 hover:to-blue-900 hover:bg-gradient-to-b hover:text-white hover:-rotate-6 hover:scale-105">
            FinPilot
          </a>
        </div>

        <div className="navbar-center hidden lg:flex overflow-visible">
          <ul className="menu menu-horizontal px-1 gap-2 overflow-visible">
            {links}
          </ul>
        </div>
         

        <div className="navbar-end gap-2 md:gap-6">
          <Link to='/auth/login' className="text-sm cursor-pointer  font-medium hover:text-blue-300 transition-colors">Log In</Link>
          <button className="hidden md:block bg-[#b4f05a] text-[#161c5f] px-3 py-2.5 rounded-lg font-bold transition-transform duration-200 hover:scale-105 active:scale-95">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigationbar;