import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import Navigationbar from "../components/Navigationbar";

const homelayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#0f1b46] dark:text-slate-100">
      <section className="sticky top-0 z-50">
        <Navigationbar />
      </section>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default homelayout;