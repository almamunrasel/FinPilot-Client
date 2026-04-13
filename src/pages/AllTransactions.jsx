import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router';

const cM=(n)=>
  '৳' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });



const AllTransactions = () => {
  const axiosSecure=useAxiosSecure();
  const [transactions,setTransactions]=useState([]);
  const navigate    = useNavigate();
  useEffect(()=>{
    const fetchTransactions=async()=>{
      try{
        const res=await axiosSecure.get('/transactions');
        setTransactions(res.data.transactions);
        console.log(res.data.transactions);
      }
      catch(error){
        console.log(error);
        toast.error('Failed to load Transactions!!');
      }
      
    };
    fetchTransactions();

  },[]);
  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <div className='flex items-center justify-between gap-4 flex-wrap mb-8'>
        <div className=''>
        <h1 className='text-2xl font-bold text-slate-900'>All Transactions</h1>
        <p className='text-slate-400 text-sm mt-1'>{transactions.length} total entries</p>
      </div>
      <div>
        <button onClick={()=>navigate('/add-transaction')} className='bg-indigo-600 hover:bg-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer'>
          +Add New
        </button>
      </div>
    </div>

{/* 
     sorting */}
    


      
    </div>
  );
};

export default AllTransactions;