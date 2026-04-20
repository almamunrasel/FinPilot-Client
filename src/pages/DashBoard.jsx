import React, { useState } from "react";
import { useLocation } from "react-router";
import AddTransaction from "./AddTransaction";
import AllTransactions from "./AllTransactions";
import Summary from "./Summary";
import { motion as Motion } from "framer-motion";

const TABS = [
  { id: "summary", label: "Summary", icon: "▦" },
  { id: "all", label: "All Transactions", icon: "≡" },
  { id: "add", label: "Add Transaction", icon: "+" },
];

const DashBoard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("summary");

  React.useEffect(() => {
    const tab = location.state?.tab;
    if (tab && ["summary", "all", "add"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-[#0f1b46]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
            Financial workspace
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Transaction Center
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your money with faster actions and richer insights.</p>
        </div>

        <div className="mb-8 flex gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-[#162447]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              }`}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <Motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div>
            {activeTab === "summary" && <Summary />}
            {activeTab === "add" && <AddTransaction />}
            {activeTab === "all" && <AllTransactions />}
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default DashBoard;