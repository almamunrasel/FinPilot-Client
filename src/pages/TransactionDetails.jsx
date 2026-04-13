import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = [
  "Housing","Food & Dining","Transport","Health","Entertainment",
  "Education","Shopping","Utilities","Salary","Freelance",
  "Investment","Business","Gift","Other",
];
const fmt = (n) =>
  '৳' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


const DetailLevel=({label,value})=>(
  <div className='flex justify-between items-start py-3 border-b border-slate-100 last:border-0 '>
    <span className='text-lg font-semibold text-slate-400 uppercase tracking-wider w-32 shrink-0'>{label}</span>
    <span className='text-xl font-medium text-slate-800 text-right '>{value}</span>

  </div>
)


const TransactionDetails = () => {
 
  const [error,setError]=useState({});
  
  const navigate=useNavigate();
  const {id}=useParams();
  const axiosSecure=useAxiosSecure();
  const [data,setData]=useState(null);
  const [editing,setEditing]=useState(false);
   const [type,setType]=useState("");
  const {user,loading,setLoading}=useAuth();
  useEffect(()=>{
    
    axiosSecure.get(`/transactions/${id}`)
    .then(res=>{
      setData(res.data.transaction);
      setType(res.data.transaction.type)
    })
    .catch(()=>toast.error('Failed to load data'));

  },[id])
  console.log(id);
  console.log(data?.type);
 
  

    const handleDelete=async(id)=>{
      const result= await Swal.fire({
        title: 'Delete this transaction?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#94a3b8',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
  
      })
      if(!result.isConfirmed) return;
      else{
        try{
          await axiosSecure.delete(`/transactions/${id}`)
          toast.success('transaction deleted!');
         
        }catch{
          toast.error('could not delete right now');
  
        }
      }
  
    }
    const handleEditTransaction=async(e)=>{
      e.preventDefault();
      const category    = e.target.category.value;
      const amount      = e.target.amount.value;
      const description = e.target.description.value;
      const date        = e.target.date.value;
      const errs = {};
      if (!category)                        errs.category    = 'Select a category';
      if (!amount || parseFloat(amount) < 0.01) errs.amount  = 'Must be greater than 0';
      if (!description.trim())              errs.description = 'Description is required';
      if (!date)                            errs.date        = 'Date is required';
      if (Object.keys(errs).length) { setError(errs); return; }
      setLoading(true);

      const newTransaction = {
          type,
          category,
          amount: parseFloat(amount),
          description,
          date,
          email: user?.email,
          name: user?.name,
      };
      try{
            const res=await axiosSecure.patch(`/transactions/${id}`,newTransaction);
            setData(res.data.transaction);
            setEditing(false);
            toast.success('transaction added!');
            setError({})
      
      
      }catch(err){
            toast.error('failed to add transaction');
            toast.error(err.response?.data?.message || 'Update failed.');
      }finally{
        setLoading(false);
      }

    }
     const field = (key) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white/60 backdrop-blur-sm focus:bg-white focus:shadow-sm ${
      error[key] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"
    }`;
    
    if(loading) <LoadingSpinner></LoadingSpinner>
   
  return (
    <div className='max-w-2xl mx-auto px-4 py-10'>

      <button className='cursor-pointer flex items-center text-slate-400 hover:text-slate-700' onClick={()=>navigate(-1)}>← Back </button>
      <div className='flex justify-between items-center mt-10'>
        <div>
          <p className='text-2xl font-bold'>Transaction Details</p>
        </div>
        <div className='flex flex-row gap-2'>
          
            <button onClick={()=>setEditing(true)} className={`text-lg font-semibold px-3 py-1.5 ${editing? 'bg-green-400':'bg-indigo-50'}  rounded-lg  cursor-pointer`}>Edit</button>
              <button onClick={()=>handleDelete(data._id)} className='text-lg font-semibold px-3 py-1.5 bg-red-50 rounded-lg hover:bg-red-100 cursor-pointer'>Delete</button>

        </div>

      </div>
      {
        !editing && (
          <>
          <div className={`rounded-2xl mt-5 p-6 mb-6 text-center ${ data?.type==='income'? 'bg-emerald-50 border border-emerald-100' :       'bg-rose-50        border border-rose-100'}`}>
            <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block ${data?.type==='income' ?'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
              {data?.type}
            </span>
            <p className={`text-4xl font-bold mt-2 ${data?.type==='income' ? 'text-emerald-600' : 'text-rose-500'}`}>
              {data?.type==='income' ? '+' : '−'}{fmt(data?.amount)}
            </p>
            <p className="text-slate-500 text-sm mt-2">{data?.category}</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl px-6 py-2 mb-4">
            <DetailLevel label="Description" value={data?.description} />
            <DetailLevel label="Date"        value={fmtDate(data?.date)} />
            <DetailLevel label="Category"    value={data?.category} />
            <DetailLevel label="Type"        value={<span className="capitalize">{data?.type}</span>} />
            <DetailLevel label="Name"        value={data?.name} />
            <DetailLevel label="Email"       value={data?.email} />
      </div>
          </>
        )
      }
      {
        editing && (
          <>


           <p className='text-slate-500 text-lg mb-7 max-w-10/12 mx-auto'>Fill in the details below to <span className='font-bold'>Edit</span> the entry</p>
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

      <form onSubmit={handleEditTransaction}  className='space-y-4' >
        {/* //categories */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
          <select name="category" defaultValue={data?.category} className={field("category")}
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
                defaultValue={data?.amount}
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
                defaultValue={data?.description}
                required
            />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
            <input
                type="date"
                name="date"
                // defaultValue={new Date().toISOString().split("T")[0]}
                className="input input-bordered w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white/60 backdrop-blur-sm focus:bg-white focus:shadow-sm"
                defaultValue={new Date(data?.date).toISOString().split("T")[0]}
                
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
        <button type="submit" 
          className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm hover:shadow-md">
          {loading ? "Saving" : "Save Changes"}
        </button>

       
      </form>



          
          </>
        )
      }

      


      
    </div>
  );
};

export default TransactionDetails;