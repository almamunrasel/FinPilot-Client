import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';

const cM=(n)=>
  '৳' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const type_style={
   income:  { dot: 'bg-emerald-400', amount: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700'},
   expense: { dot: 'bg-rose-400',amount: 'text-rose-500',    badge: 'bg-rose-50 text-rose-600'},
  
}




const AllTransactions = () => {
  const axiosSecure=useAxiosSecure();
  const [transactions,setTransactions]=useState([]);
  const [filter,setFilter]=useState('all');
  const [sortOrder,setSortOrder]=useState('newest');
  const navigate    = useNavigate();
  const [loading,setLoading]=useState(true);
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
      finally{
        setLoading(false);
      }
      
      
    };
    fetchTransactions();

  },[]);
  const totalIncome=transactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const totalExpense= transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const finalBalance=totalIncome-totalExpense;

  const filteredData= transactions.filter(t=> filter==='all' || t.type===filter ).sort((a,b)=>{
    if(sortOrder==='newest') return new Date(b.date) - new Date(a.date);
    if(sortOrder==='oldest') return new Date(a.date) - new Date(b.date);
    if(sortOrder==='highest') return  b.amount-a.amount;
    if(sortOrder==='lowest') return a.amount-b.amount;

  })

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
        setTransactions(prev=>prev.filter(t=>t._id !==id));

      }catch{
        toast.error('could not delete right now');

      }
    }

  }

  if(loading){
    return <LoadingSpinner></LoadingSpinner>
  }
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



  <div className='grid grid-cols-3 gap-3 mb-7'>
    <div className='rounded-2xl border  p-4 bg-indigo-50 border-indigo-100 hover:bg-indigo-300 '>
      <p className='text-xs font-semibold text-slate-400 tracking-wider mb-1'>Balance</p>
      <p className='font-bold text-xs md:text-xl text-indigo-600 '>{cM(finalBalance)}</p>


    </div>
    <div className='rounded-2xl border  p-4 bg-emerald-50 border-emerald-100 hover:bg-emerald-300 '>
      <p className='text-xs font-semibold text-slate-400 tracking-wider mb-1'>Income</p>
      <p className='font-bold text-xs md:text-xl text-emerald-600 '>{cM(totalIncome)}</p>


    </div>
    <div className='rounded-2xl border  p-4 bg-rose-50 border-rose-100 hover:bg-rose-300 '>
      <p className='text-xs font-semibold text-slate-400 tracking-wider mb-1'>Expense</p>
      <p className='font-bold text-xs md:text-xl text-rose-500 '>{cM(totalExpense)}</p>


    </div>
  </div> 
  <div className='flex justify-between flex-wrap gap-4 '>
     <div className='flex gap-2'>
    {['all','income','expense'].map((t)=>(
      <button key={t} onClick={()=>setFilter(t)} className={`px-4 py-1.5  rounded-xl text-lg font-semibold transition-all cursor-pointer
        ${filter===t
          ? 'bg-indigo-600 text-white'
          : 'bg-slate-200 text-slate-500 hover:bg-slate-200'
        }`}>{t}</button>
    ))}
    
  </div>
  <div>
    <select value={sortOrder}
   onChange={e=>setSortOrder(e.target.value)}
   className='px-2 py-1.5 mr-2 rounded-xl border border-slate-200 cursor-pointer outline-none text-slate-600 text-lg'>
    <option value="newest">Newest first</option>
    <option value="oldest">Oldest first</option>
    <option value="highest">Highest amount</option>
    <option value="lowest">Lowest amount</option>

   </select>
    <span className='text-lg text-slate-500'>{filteredData.length} shown</span>
  </div>
  
  </div>
  {
    filteredData.length===0 ?
     (
      <div className='text-center p-24'>
        <p className="text-5xl mb-4">💸</p>
          <p className="text-slate-400 ">No transactions found.</p>
          <button
            onClick={() => navigate('/add-transaction')}
            className="mt-4 text-indigo-600  hover:underline cursor-pointer text-lg font-bold"
          >
            Add your first transaction →
          </button>

      </div>
     )
    :( <div className='mt-2.5 space-y-5'>
      {filteredData.map(t=>{
        const style = type_style[t.type];

        return(
         <div className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 px-5 py-4  hover:border-indigo-200 
         hover:shadow-2xl cursor-pointer transition-all">
       
            <div className={`h-2.5 w-2.5 rounded-full  ${style.dot}`}></div>
            <div className='flex-1'>
              <div className='flex items-center gap-2  flex-wrap'>
               <p className='sm:text-xs md:text-lg font-medium text-slate-800'>{t.description}</p>
               <span className={`px-2 py-0.5 text-xs rounded-2xl ${style.badge}`}>{t.category}</span>

            </div>
            <p className='text-sm text-slate-400 mt-0.5'>{fmtDate(t.date)}</p>
            </div>
            <p className={`${style.amount} sm:text-xs md:text-lg font-semibold shrink-0`}>{t.type==='income'? '+':'-'}{cM(t.amount)}</p>

            <div className='prebutun flex flex-col  md:flex-row gap-2  '>
              <button className='text-xs px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer' onClick={()=> navigate(`/transactionDetails/${t._id}`)}>View</button>
              {/* <button className='text-xs px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer'>Edit</button> */}
              <button onClick={()=>handleDelete(t._id)} className='text-xs px-3 py-1.5 bg-red-50 rounded-lg hover:bg-red-100 cursor-pointer'>Delete</button>
            </div>
         



         </div>

        )
        

      })}
        
      </div>)
  }
 
    


      
    </div>
  );
};

export default AllTransactions;