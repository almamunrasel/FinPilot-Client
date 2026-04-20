import React from "react";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";

const home = () => {
  return (
    <div className="bg-slate-50 transition-colors dark:bg-[#0f1b46]">
      <Hero />
      <StatsSection />
    </div>
  );
};

export default home;