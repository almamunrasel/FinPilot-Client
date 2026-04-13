import React, { useState } from 'react';
import AddTransaction from './AddTransaction';
import AllTransactions from './AllTransactions';



const TABS = [
  { id: "summary",  label: "Summary",          icon: "▦" },
  { id: "all",      label: "All Transactions",  icon: "≡" },
  { id: "add",      label: "Add Transaction",   icon: "+" },
];

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("summary");
  
  return (
    <div className='min-h-screen bg-slate-50'>
       <div className='max-w-4xl mx-auto px-4 sm:px-6 py-10'>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your money
          </p>
        </div>

         <div className="flex gap-1 bg-white rounded-2xl border border-slate-200 p-1.5 mb-8 shadow-sm">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 cursor-pointer rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div>
          {
            activeTab==="add" && <AddTransaction></AddTransaction>
           }
           {
            activeTab==="all" && <AllTransactions></AllTransactions>
           }
        </div>

       </div>
      
    </div>
  );
};

export default DashBoard;