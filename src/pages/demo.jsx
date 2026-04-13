import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CATEGORIES = [
  "Housing","Food & Dining","Transport","Health","Entertainment",
  "Education","Shopping","Utilities","Salary","Freelance",
  "Investment","Business","Gift","Other",
];

const fmt = (n) =>
  '৳' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

// ── Detail row component ───────────────────────────────────────────────────
const Row = ({ label, value }) => (
  <div className="flex justify-between items-start py-3 border-b border-slate-100 last:border-0">
    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider w-32 flex-shrink-0">
      {label}
    </span>
    <span className="text-sm font-medium text-slate-800 text-right">{value}</span>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────
const TransactionDetails = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const axiosSecure  = useAxiosSecure();

  const [data,        setData]        = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [editing,     setEditing]     = useState(false);
  const [saving,      setSaving]      = useState(false);

  // edit form state — mirrors the editable fields
  const [type,        setType]        = useState('expense');
  const [editError,   setEditError]   = useState({});

  // ── fetch ────────────────────────────────────────────────────────────────
  useEffect(() => {
    axiosSecure
      .get(`/transactions/${id}`)
      .then(res => {
        setData(res.data.transaction);
        setType(res.data.transaction.type);
      })
      .catch(() => toast.error('Failed to load transaction.'))
      .finally(() => setLoading(false));
  }, [id]);

  // ── delete ───────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Delete this transaction?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it',
    });
    if (!result.isConfirmed) return;
    try {
      await axiosSecure.delete(`/transactions/${id}`);
      toast.success('Transaction deleted.');
      navigate('/transactions');
    } catch {
      toast.error('Could not delete transaction.');
    }
  };

  // ── edit submit ──────────────────────────────────────────────────────────
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const category    = e.target.category.value;
    const amount      = e.target.amount.value;
    const description = e.target.description.value;
    const date        = e.target.date.value;

    // validation
    const errs = {};
    if (!category)                        errs.category    = 'Select a category';
    if (!amount || parseFloat(amount) < 0.01) errs.amount  = 'Must be greater than 0';
    if (!description.trim())              errs.description = 'Description is required';
    if (!date)                            errs.date        = 'Date is required';
    if (Object.keys(errs).length) { setEditError(errs); return; }

    setSaving(true);
    try {
      const res = await axiosSecure.put(`/transactions/${id}`, {
        type,
        category,
        amount: parseFloat(amount),
        description,
        date,
      });
      setData(res.data.transaction);
      setEditing(false);
      setEditError({});
      toast.success('Transaction updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  const field = (key) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white focus:shadow-sm ${
      editError[key]
        ? 'border-red-300 focus:border-red-400'
        : 'border-slate-200 focus:border-indigo-400'
    }`;

  // ── loading ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex justify-center py-24">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );

  if (!data) return (
    <div className="text-center py-24 text-slate-400">
      <p className="text-4xl mb-3">🔍</p>
      <p className="text-sm">Transaction not found.</p>
    </div>
  );

  const isIncome = data.type === 'income';

  return (
    <div className="max-w-xl mx-auto px-4 py-10">

      {/* ── back button ── */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 mb-6 transition-colors"
      >
        ← Back
      </button>

      {/* ── page title + action buttons ── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          {editing ? 'Edit Transaction' : 'Transaction Details'}
        </h1>
        {!editing && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="text-sm px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 font-semibold transition-all"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-4 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 font-semibold transition-all"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          VIEW MODE
      ══════════════════════════════════════════════════════════════════ */}
      {!editing && (
        <>
          {/* amount hero card */}
          <div className={`rounded-2xl p-6 mb-6 text-center ${isIncome ? 'bg-emerald-50 border border-emerald-100' : 'bg-rose-50 border border-rose-100'}`}>
            <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block ${isIncome ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
              {data.type}
            </span>
            <p className={`text-4xl font-bold mt-2 ${isIncome ? 'text-emerald-600' : 'text-rose-500'}`}>
              {isIncome ? '+' : '−'}{fmt(data.amount)}
            </p>
            <p className="text-slate-500 text-sm mt-2">{data.category}</p>
          </div>

          {/* detail rows */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-2 mb-4">
            <Row label="Description" value={data.description} />
            <Row label="Date"        value={fmtDate(data.date)} />
            <Row label="Category"    value={data.category} />
            <Row label="Type"        value={<span className="capitalize">{data.type}</span>} />
            <Row label="Name"        value={data.name} />
            <Row label="Email"       value={data.email} />
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          EDIT MODE
      ══════════════════════════════════════════════════════════════════ */}
      {editing && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
          <form onSubmit={handleEditSubmit} noValidate className="space-y-4">

            {/* type toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Type
              </label>
              <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                {['expense', 'income'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-all ${
                      type === t
                        ? t === 'income'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-500 text-white'
                        : 'bg-white text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {t === 'income' ? '+ Income' : '− Expense'}
                  </button>
                ))}
              </div>
            </div>

            {/* category */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="category"
                defaultValue={data.category}
                className={field('category')}
                onChange={() => setEditError(p => ({ ...p, category: '' }))}
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {editError.category && <p className="text-red-500 text-xs mt-1">{editError.category}</p>}
            </div>

            {/* amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Amount (৳)
              </label>
              <input
                type="number"
                name="amount"
                defaultValue={data.amount}
                step="0.01"
                min="0.01"
                className={field('amount')}
                onChange={() => setEditError(p => ({ ...p, amount: '' }))}
              />
              {editError.amount && <p className="text-red-500 text-xs mt-1">{editError.amount}</p>}
            </div>

            {/* description */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <input
                type="text"
                name="description"
                defaultValue={data.description}
                maxLength={200}
                className={field('description')}
                onChange={() => setEditError(p => ({ ...p, description: '' }))}
              />
              {editError.description && <p className="text-red-500 text-xs mt-1">{editError.description}</p>}
            </div>

            {/* date */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={new Date(data.date).toISOString().split('T')[0]}
                className={field('date')}
                onChange={() => setEditError(p => ({ ...p, date: '' }))}
              />
              {editError.date && <p className="text-red-500 text-xs mt-1">{editError.date}</p>}
            </div>

            {/* buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => { setEditing(false); setEditError({}); }}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-xl text-sm font-semibold transition-all disabled:cursor-not-allowed"
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;