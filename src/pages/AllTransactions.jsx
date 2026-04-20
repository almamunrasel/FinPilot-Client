import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

const cM = (n) => "৳" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 });
const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const typeStyle = {
  income: { dot: "bg-emerald-400", amount: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200" },
  expense: { dot: "bg-rose-400", amount: "text-rose-500", badge: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-200" },
};

const AllTransactions = () => {
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axiosSecure.get("/transactions");
        setTransactions(res.data.transactions);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [axiosSecure]);

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const filteredData = useMemo(() => {
    return transactions
      .filter((t) => filter === "all" || t.type === filter)
      .sort((a, b) => {
        if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
        if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
        if (sortOrder === "highest") return b.amount - a.amount;
        if (sortOrder === "lowest") return a.amount - b.amount;
        return 0;
      });
  }, [filter, sortOrder, transactions]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this transaction?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      toast.success("Transaction deleted.");
    } catch {
      toast.error("Could not delete right now.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl px-4 py-6"
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">All Transactions</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{transactions.length} total entries</p>
        </div>
        <button onClick={() => navigate("/add-transaction")} className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800">
          + Add New
        </button>
      </div>

      <div className="mb-7 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/30 dark:bg-indigo-900/20">
          <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-300">Balance</p>
          <p className="text-xl font-bold text-indigo-600">{cM(totals.balance)}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/30 dark:bg-emerald-900/20">
          <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-300">Income</p>
          <p className="text-xl font-bold text-emerald-600">{cM(totals.income)}</p>
        </div>
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 dark:border-rose-900/30 dark:bg-rose-900/20">
          <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-300">Expense</p>
          <p className="text-xl font-bold text-rose-500">{cM(totals.expense)}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {["all", "income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`cursor-pointer rounded-xl px-4 py-1.5 text-sm font-semibold capitalize transition-all ${
                filter === t ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-600 outline-none dark:border-slate-700 dark:bg-[#162447] dark:text-slate-200"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest amount</option>
            <option value="lowest">Lowest amount</option>
          </select>
          <span className="text-sm text-slate-500 dark:text-slate-400">{filteredData.length} shown</span>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center dark:border-slate-800 dark:bg-[#162447]">
          <p className="mb-4 text-5xl">💸</p>
          <p className="text-slate-500 dark:text-slate-300">No transactions found.</p>
          <button onClick={() => navigate("/add-transaction")} className="mt-4 cursor-pointer text-sm font-bold text-indigo-600 hover:underline">
            Add your first transaction →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredData.map((t, index) => {
            const style = typeStyle[t.type];
            return (
              <Motion.div
                key={t._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 transition-all hover:border-indigo-200 hover:shadow-xl dark:border-slate-800 dark:bg-[#162447] dark:hover:border-indigo-800"
              >
                <div className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 md:text-base">{t.description}</p>
                    <span className={`rounded-2xl px-2 py-0.5 text-xs ${style.badge}`}>{t.category}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400 md:text-sm">{fmtDate(t.date)}</p>
                </div>
                <p className={`${style.amount} shrink-0 text-sm font-semibold md:text-base`}>
                  {t.type === "income" ? "+" : "-"}
                  {cM(t.amount)}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => navigate(`/transactionDetails/${t._id}`)} className="cursor-pointer rounded-lg bg-indigo-50 px-3 py-1.5 text-xs hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-200 dark:hover:bg-indigo-900/50">
                    View
                  </button>
                  <button onClick={() => handleDelete(t._id)} className="cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-xs hover:bg-red-100 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50">
                    Delete
                  </button>
                </div>
              </Motion.div>
            );
          })}
        </div>
      )}
    </Motion.div>
  );
};

export default AllTransactions;
