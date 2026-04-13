import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';


const TYPE_STYLE = {
  income:  { dot: 'bg-emerald-400', amount: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
  expense: { dot: 'bg-rose-400',    amount: 'text-rose-500',    badge: 'bg-rose-50 text-rose-600'       },
};

const fmt = (n) =>
  '৳' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const AllTransactions = () => {
  const axiosSecure = useAxiosSecure();
  const navigate    = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [filter,       setFilter]       = useState('all');   // all | income | expense
  const [sortOrder,    setSortOrder]    = useState('newest'); // newest | oldest | highest | lowest

  // ── fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchTransactions = async () => { 
      try {
        const res = await axiosSecure.get('/transactions');
        setTransactions(res.data.transactions);
      } catch (err) {
        toast.error('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // ── delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this transaction?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/transactions/${id}`);
      toast.success('Transaction deleted.');
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch {
      toast.error('Could not delete transaction.');
    }
  };

  // ── filter + sort ──────────────────────────────────────────────────────────
  const processed = transactions
    .filter(t => filter === 'all' || t.type === filter)
    .sort((a, b) => {
      if (sortOrder === 'newest')  return new Date(b.date) - new Date(a.date);
      if (sortOrder === 'oldest')  return new Date(a.date) - new Date(b.date);
      if (sortOrder === 'highest') return b.amount - a.amount;
      if (sortOrder === 'lowest')  return a.amount - b.amount;
      return 0;
    });

  // ── quick stats ────────────────────────────────────────────────────────────
  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

 

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Transactions</h1>
          <p className="text-slate-400 text-sm mt-1">{transactions.length} total entries</p>
        </div>
        <button
          onClick={() => navigate('/add-transaction')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          + Add New
        </button>
      </div>

      {/* ── quick stat pills ── */}
      <div className="grid grid-cols-3 gap-3 mb-7">
        {[
          { label: 'Balance',  value: fmt(totalIncome - totalExpense), color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Income',   value: fmt(totalIncome),                color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Expenses', value: fmt(totalExpense),               color: 'text-rose-500',    bg: 'bg-rose-50 border-rose-100' },
        ].map(card => (
          <div key={card.label} className={`rounded-2xl border p-4 ${card.bg}`}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{card.label}</p>
            <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* ── filters ── */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* type filter */}
        <div className="flex gap-1.5">
          {['all', 'income', 'expense'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* sort */}
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="ml-auto px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 outline-none focus:border-indigo-400 bg-white"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest">Highest amount</option>
          <option value="lowest">Lowest amount</option>
        </select>

        <span className="text-xs text-slate-400">{processed.length} shown</span>
      </div>

      {/* ── list ── */}
      {processed.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">💸</p>
          <p className="text-slate-400 text-sm">No transactions found.</p>
          <button
            onClick={() => navigate('/add-transaction')}
            className="mt-4 text-indigo-600 text-sm hover:underline"
          >
            Add your first transaction →
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {processed.map(t => {
            const style = TYPE_STYLE[t.type];
            return (
              <div
                key={t._id}
                className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 px-5 py-4 hover:border-indigo-100 hover:shadow-sm transition-all group"
              >
                {/* type dot */}
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${style.dot}`} />

                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-slate-800 truncate">{t.description}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${style.badge}`}>
                      {t.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{fmtDate(t.date)}</p>
                </div>

                {/* amount */}
                <p className={`text-sm font-bold flex-shrink-0 ${style.amount}`}>
                  {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
                </p>

                {/* actions — show on hover */}
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button
                    onClick={() => navigate(`/transaction/${t._id}`)}
                    className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/transaction/update/${t._id}`)}
                    className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="text-xs px-2.5 py-1 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllTransactions;