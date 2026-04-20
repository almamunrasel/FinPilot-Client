import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CATEGORIES = [
  "Housing","Food & Dining","Transport","Health","Entertainment",
  "Education","Shopping","Utilities","Salary","Freelance",
  "Investment","Business","Gift","Other",
];

const AddTransaction = () => {
  const [type, setType] = useState("expense");
  const [error, setError] = useState({});
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

   

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const amount = e.target.amount.value;
    if (amount < 0.01) {
      setError({ amount: "Amount must be greater than 0.01৳" });
      return;
    }
    const description = e.target.description.value;
    const date = e.target.date.value;
    const newTransaction = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
      email: user?.email,
      name: user?.name,
    };

    try {
      setSubmitting(true);
      await axiosSecure.post("/transactions", newTransaction);
      toast.success("Transaction added!");
      e.target.reset();
      navigate("/transaction", { state: { tab: "summary" } });
    } catch (error) {
      toast.error("Failed to add transaction");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const field = (key) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all bg-white/70 focus:bg-white focus:shadow-sm dark:border-slate-700 dark:bg-[#162447] dark:text-slate-100 dark:focus:border-indigo-400 ${
      error[key] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"
    }`;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-[#162447]/80 md:p-8"
    >
      <p className="mx-auto mb-7 max-w-xl text-center text-base text-slate-500 dark:text-slate-300">
        Fill in the details below to log a new entry with accurate category and date tracking.
      </p>
      <div className="mb-7 mt-5 inline-flex gap-3 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
        {["expense", "income"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`cursor-pointer rounded-xl px-6 py-2 text-sm font-semibold capitalize transition-all ${
              type === t
                ? t === "income"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-rose-500 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {t === "income" ? "+ Income" : "- Expense"}
          </button>
        ))}
      </div>

      <Motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.45 }}
        onSubmit={handleAddTransaction}
        className="space-y-4"
      >
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</label>
          <select name="category" defaultValue="" className={field("category")} onChange={() => setError((p) => ({ ...p, category: "" }))}>
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {error.category && <p className="text-red-500 text-xs mt-1">{error.category}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</label>
          <input type="number" name="amount" className={field("amount")} placeholder="0.0" required />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Description</label>
          <input type="text" name="description" className={field("description")} placeholder="e.g. Monthly house rent" maxLength={200} required />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</label>
          <input type="date" name="date" defaultValue={new Date().toISOString().split("T")[0]} className={field("date")} required />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</label>
            <input type="text" name="name" value={user?.name || ""} readOnly className={field("name")} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</label>
            <input type="email" readOnly name="email" value={user?.email || ""} className={field("email")} />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full cursor-pointer rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {submitting ? "Adding..." : "Add Transaction"}
        </button>
      </Motion.form>
    </Motion.div>
  );
};

export default AddTransaction;