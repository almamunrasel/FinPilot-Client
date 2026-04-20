import React from "react";
import { useNavigate } from "react-router";
import errorPage from "../assets/error-404.png";
import Navigationbar from "../components/Navigationbar";
import Footer from "../components/Footer";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-full">
      <Navigationbar />
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
        <div className="pointer-events-none absolute left-10 top-10 h-40 w-40 animate-pulse rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 animate-pulse rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="relative z-10 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl dark:border-slate-800 dark:bg-[#162447]/90">
          <img className="mx-auto h-[240px] w-[240px] md:h-[320px] md:w-[320px]" src={errorPage} alt="Page not found" />
          <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100">Oops, page not found</p>
          <p className="mt-2 text-slate-500 dark:text-slate-300">The page you are looking for is not available.</p>
          <div className="mt-8">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white transition hover:from-indigo-700 hover:to-violet-700"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;