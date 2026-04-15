import React, { useEffect, useMemo, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const StatCard = ({ label, value, colorClass, bgClass, borderClass, icon }) => (
  <div className={`rounded-2xl border p-5 ${bgClass} ${borderClass}`}>
    <div className="flex items-start justify-between mb-3">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <span className="text-lg">{icon}</span>
    </div>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
    {/* {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>} */}
  </div>
); 

const Summary = () => {
  const [transactions,setTransactions]=useState([]);
  const axiosSecure=useAxiosSecure();
  const {setLoading}=useAuth();
  const [selectedMonth,setSelectedMonth]=useState('All');

  //monthwise transaction 


  useEffect(()=>{
    axiosSecure.get('/transactions')
     .then(res=>setTransactions(res.data.transactions))
     .catch(()=>toast.error('fialed to load report data'))
     .finally(()=>setLoading(false));

  },[])

  const monTran=useMemo(()=>{
    if(selectedMonth==='All') return transactions;
    else{
      return transactions.filter(t=>new Date(t.date).getMonth()===parseInt(selectedMonth));
    }

  },[selectedMonth,transactions]);
  
    const stats = useMemo(() => {
    const income  = monTran.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = monTran.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const rate    = income > 0 ? (((income - expense) / income) * 100).toFixed(1) : '0.0';
    return { income, expense, balance: income - expense, savingsRate: rate };
  }, [monTran]);
 
  return (
    <div className='max-w-6xl mx-auto sm:px-6 py-10'>
      
      {/* page header */}
      <div className='flex items-start justify-between flex-wrap gap-4 mb-10'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900 tracking-tight'>Financial Reports</h1>
          <p className='text-slate-400 text-lg mt-1'>{transactions.length} transactions.</p>
        </div>
        <div className='flex items-center gap-2'>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Filter</span>
          <select value={selectedMonth}
          onChange={e=>setSelectedMonth(e.target.value)} className='px-2 py-2.5 border border-slate-200 rounded-xl text-slate-700 focus:border-indigo-400 bg-white shadom-sm outline-none'>
            <option value="All">All Months</option>
            {MONTHS.map((month,index)=><option value={index}>{month}</option>)}

          </select>
        </div>
      </div>
      
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
        {/* stat card */}
          <StatCard
              label='Net Balance' icon="💰"
              value={stats.balance}
              colorClass={stats.balance >= 0 ? 'text-indigo-600' : 'text-rose-500'}
              bgClass={stats.balance >= 0 ? 'bg-indigo-50' : 'bg-rose-50'}
              borderClass={stats.balance >= 0 ? 'border-indigo-100' : 'border-rose-100'}
          />

          <StatCard
              label='Total Income' icon="📈"
              value={stats.income}
              colorClass="text-emerald-600"
              bgClass="bg-emerald-50"
              borderClass="border-emerald-100"
          />
          <StatCard
              label="Total Expenses" icon="📉"
              value={stats.expense}
              colorClass="text-rose-500"
              bgClass="bg-rose-50"
              borderClass="border-rose-100"
            />

          <StatCard
              label="Savings Rate" icon="🎯"
              value={`${stats.savingsRate}%`}
              sub="of income saved"
              colorClass={parseFloat(stats.savingsRate) >= 20 ? 'text-emerald-600' : 'text-amber-500'}
              bgClass={parseFloat(stats.savingsRate) >= 20 ? 'bg-emerald-50' : 'bg-amber-50'}
              borderClass={parseFloat(stats.savingsRate) >= 20 ? 'border-emerald-100' : 'border-amber-100'}
        />
      </div>

      {
          monTran.length===0 ? (
            <div className=" dataless text-center py-20  bg-white rounded-2xl border border-slate-100">
              <p className="text-5xl mb-4">📊</p>
              <p className="text-slate-500 font-medium">No data for this period</p>
              <p className="text-slate-400 text-sm mt-1">Try selecting a different month</p>
            </div>


          ): (
            <h1>blah</h1>
          )
        }
      

      
    </div>
  );
};

export default Summary;