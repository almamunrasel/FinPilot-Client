import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const CATEGORIES = [
  "Housing","Food & Dining","Transport","Health","Entertainment",
  "Education","Shopping","Utilities","Salary","Freelance",
  "Investment","Business","Gift","Other",
];

const AddTransaction = () => {
  const [type,setType]=useState('expense');
  const [error,setError]=useState({});
  const axiosSecure=useAxiosSecure();
  const {user}=useAuth();
  const [submitting, setSubmitting] = useState(false);

   

  const handleAddTransaction=async(e)=>{
    e.preventDefault();
    const category=e.target.category.value;
    const amount=e.target.amount.value;
    if(amount<0.01) {
      setError({ amount: 'Amount must be greater than 0.01৳' });
      return;
    }
    const description=e.target.description.value;
    
    const date=e.target.date.value;
    const newTransaction = {
    type,
    category,
    amount: parseFloat(amount),
    description,
    date,
    email: user?.email,
    name: user?.name,
    };
   
    
    // console.log(newTransaction);
    try{
       setSubmitting(true);
      const res=await axiosSecure.post('/transactions',newTransaction);
      toast.success('transaction added!');
      console.log(res);
      e.target.reset();


    }catch(error){
      toast.error('failed to add transaction');
    }
    finally {
      setSubmitting(false);
    }

 

  }
    const field = (key) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white/60 backdrop-blur-sm focus:bg-white focus:shadow-sm ${
      error[key] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"
    }`;
  return (
    <div className=' max-w-lg mx-auto pt-2 pb-8'>
      <p className='text-slate-500 text-lg mb-7 max-w-10/12 mx-auto'>Fill in the details below to log a new entry</p>
      <div className='inline-flex p-1 bg-slate-100 rounded-2xl mb-7 gap-3 mt-5'>
        {
          ["expense","income"].map((t)=>(
            <button key={t} type='button' onClick={()=>setType(t)}
            className={`px-6 py-2 cursor-pointer rounded-xl text-sm font-semibold transition-all capitalize ${
              type===t
              ? t==="income" ?
                  "bg-emerald-500 text-white shadow-sm"
                 :"bg-rose-500 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-700"
            }`}
            >
              {t==="income"? "+ Income" : "-Expense"}

            </button>
          ))
        }
      </div>

      <form onSubmit={handleAddTransaction} className='space-y-4' >
        {/* //categories */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
          <select name="category" defaultValue="" className={field("category")}
            onChange={() => setError(p => ({ ...p, category: "" }))}>
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {error.category && <p className="text-red-500 text-xs mt-1">{error.category}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Amount</label>
            <input
                type="number"
                name="amount"
                className="input input-bordered w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white/60 backdrop-blur-sm focus:bg-white focus:shadow-sm"
                placeholder="0.0"
                required
            />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
            <input
                type="text"
                name="description"
                className="input input-bordered w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white/60 backdrop-blur-sm focus:bg-white focus:shadow-sm"
                placeholder="e.g Monthly house rent"
                maxLength={200}
                required
            />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
            <input
                type="date"
                name="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="input input-bordered w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white/60 backdrop-blur-sm focus:bg-white focus:shadow-sm"
                
                required
            />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Name</label>
            <input
                type="text"
                name="name"
                value={user?.name || ""}
                readOnly
                className="input input-bordered w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white/60 backdrop-blur-sm focus:bg-white focus:shadow-sm"
                
            />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
            <input
                type="email"
                readOnly
                name="email"
               value={user?.email || ""}
                className="input input-bordered w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white/60 backdrop-blur-sm focus:bg-white focus:shadow-sm"
                
            />
        </div>
        
        </div>
        <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {submitting ? "Adding…" : "Add Transaction"}
            </button>

       
      </form>



      
    </div>
  );
};

export default AddTransaction;