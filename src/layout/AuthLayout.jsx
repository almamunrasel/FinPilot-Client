import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#0f1b46] dark:text-slate-100">
      <main>
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;