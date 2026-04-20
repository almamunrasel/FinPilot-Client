import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import userIcon from "../assets/user.png";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeProvider";


const Navigationbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handlelogOut = () => {
    logOut();
    toast.success("You are logged out!");
  };

  const userLabel =
    user?.name ||
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "User");

  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive ? "bg-white/15 text-cyan-200" : "text-white/90 hover:bg-white/10"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/transaction" className={navClass}>
          My Transaction
        </NavLink>
      </li>
      <li>
        <NavLink to="/myProfile" className={navClass}>
          My Profile
        </NavLink>
      </li>
      <li>
        <label
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2"
          title="Toggle dark mode"
        >
          <span className="text-xs font-semibold text-white/80">Light</span>
          <input
            type="checkbox"
            className="toggle toggle-sm border-white/30 bg-white/20 [--tglbg:#d9f99d] checked:[--tglbg:#1d4ed8]"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="text-xs font-semibold text-white/80">Dark</span>
        </label>
      </li>
    </>
  );

  return (
    <header className="border-b border-white/10 bg-linear-to-r from-[#0f1d63] to-[#243a98] text-white shadow-md">
      <div className="navbar mx-auto w-11/12 max-w-7xl overflow-visible py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white hover:bg-white/10 lg:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-1 mt-3 w-56 rounded-xl border border-white/15 bg-[#13236f] p-2 shadow-2xl">
              {links}
            </ul>
          </div>

          <Link
            to="/"
            className="text-2xl font-black text-white outline-none ring-0 transition-none hover:text-white focus:outline-none sm:text-3xl"
          >
            FinPilot
          </Link>
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
              className="text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
            >
              Log In
            </Link>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <div className="flex items-center gap-3 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-white/10">
                  <span className="hidden max-w-28 truncate text-sm font-medium text-white md:block">
                    {userLabel}
                  </span>
                  <div className="relative">
                    <img
                      src={user.photoURL ? user.photoURL : userIcon}
                      alt={`${userLabel} avatar`}
                      className="h-9 w-9 rounded-full border-2 border-[#b4f05a] object-cover transition-transform duration-200 hover:scale-105"
                    />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#161c5f] bg-green-400" />
                  </div>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content mt-3 w-56 overflow-hidden rounded-xl border border-white/10 shadow-2xl"
                style={{ background: "#1e2670" }}
              >
                <li className="border-b border-white/10 px-4 py-3">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="truncate text-sm font-semibold text-white">{user.email}</p>
                </li>

                <li>
                  <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-200 transition-colors duration-150 hover:bg-white/10 hover:text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                </li>

                <li>
                  <Link
                    to="/auth/updateprofile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Update Profile
                  </Link>
                </li>

                <li className="mt-1 border-t border-white/10">
                  <button onClick={handlelogOut} className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-red-400 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-300">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {!user && (
            <Link
              to="/auth/registration"
              className="hidden rounded-lg bg-lime-300 px-4 py-2.5 text-sm font-bold text-[#161c5f] transition hover:bg-lime-200 md:block"
            >
              Start Free Trial
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigationbar;