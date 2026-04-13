import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

import Swal from 'sweetalert2';
const fmt = (n) =>
  '৳' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });




const TransactionDetails = () => {
 
 
  const navigate=useNavigate();
  const {id}=useParams();
  const axiosSecure=useAxiosSecure();
  const [data,setData]=useState(null);
  useEffect(()=>{
    
    axiosSecure.get(`/transactions/${id}`)
    .then(res=>setData(res.data.transaction))
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
   
  return (
    <div className='max-w-2xl mx-auto px-4 py-10'>

      <button className='cursor-pointer flex items-center text-slate-400 hover:text-slate-700' onClick={()=>navigate(-1)}>← Back </button>
      <div className='flex justify-between items-center mt-10'>
        <div>
          <p className='text-2xl font-bold'>Transaction Details</p>
        </div>
        <div className='flex flex-row gap-2'>
          
              <button className='text-lg font-semibold px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer'>Edit</button>
              <button onClick={()=>handleDelete(data._id)} className='text-lg font-semibold px-3 py-1.5 bg-red-50 rounded-lg hover:bg-red-100 cursor-pointer'>Delete</button>

        </div>

      </div>

      <div className={`rounded-2xl mt-5 p-6 mb-6 text-center ${ data?.type==='income'? 'bg-emerald-50 border border-emerald-100' :       'bg-rose-50        border border-rose-100'}`}>
            <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block ${data?.type==='income' ?'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
              {data?.type}
            </span>
            <p className={`text-4xl font-bold mt-2 ${data?.type==='income' ? 'text-emerald-600' : 'text-rose-500'}`}>
              {data?.type==='income' ? '+' : '−'}{fmt(data?.amount)}
            </p>
            <p className="text-slate-500 text-sm mt-2">{data?.category}</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-2 mb-4">
            <Row label="Description" value={data?.description} />
            <Row label="Date"        value={fmtDate(data?.date)} />
            <Row label="Category"    value={data?.category} />
            <Row label="Type"        value={<span className="capitalize">{data?.type}</span>} />
            <Row label="Name"        value={data?.name} />
            <Row label="Email"       value={data?.email} />
      </div>


      
    </div>
  );
};

export default TransactionDetails;