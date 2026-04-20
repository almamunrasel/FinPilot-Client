import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion as Motion } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";

const CATEGORIES = [
  "Housing", "Food & Dining", "Transport", "Health", "Entertainment",
  "Education", "Shopping", "Utilities", "Salary", "Freelance",
  "Investment", "Business", "Gift", "Other",
];

const fmt = (n) => "৳" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 });
const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const DetailLevel = ({ label, value }) => (
  <div className="flex items-start justify-between border-b border-slate-100 py-3 last:border-0 dark:border-slate-700">
    <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
    <span className="text-right text-sm font-medium text-slate-700 dark:text-slate-200 md:text-base">{value}</span>
  </div>
);

const TransactionDetails = () => {
  const [error, setError] = useState({});
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [type, setType] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await axiosSecure.get(`/transactions/${id}`);
        setData(res.data.transaction);
        setType(res.data.transaction.type);
      } catch {
        toast.error("Failed to load transaction.");
      } finally {
        setPageLoading(false);
      }
    };
    fetchOne();
  }, [axiosSecure, id]);

  const handleDelete = async (itemId) => {
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
      await axiosSecure.delete(`/transactions/${itemId}`);
      toast.success("Transaction deleted.");
      navigate("/transaction");
    } catch {
      toast.error("Could not delete right now.");
    }
  };

  const handleEditTransaction = async (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const date = e.target.date.value;

    const errs = {};
    if (!category) errs.category = "Select a category";
    if (!amount || parseFloat(amount) < 0.01) errs.amount = "Must be greater than 0";
    if (!description.trim()) errs.description = "Description is required";
    if (!date) errs.date = "Date is required";
    if (Object.keys(errs).length) {
      setError(errs);
      return;
    }

    const updated = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
      email: user?.email,
      name: user?.name,
    };

    try {
      setSaving(true);
      const res = await axiosSecure.patch(`/transactions/${id}`, updated);
      setData(res.data.transaction);
      setEditing(false);
      setError({});
      toast.success("Transaction updated.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const field = (key) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all bg-white/70 focus:bg-white dark:border-slate-700 dark:bg-[#162447] dark:text-slate-100 ${
      error[key] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"
    }`;

  if (pageLoading) return <LoadingSpinner />;
  if (!data) return null;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl px-4 py-10"
    >
      <button className="flex cursor-pointer items-center text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Transaction Details</h2>
        <div className="flex gap-2">
          <button onClick={() => setEditing((prev) => !prev)} className="cursor-pointer rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-200">
            {editing ? "Cancel" : "Edit"}
          </button>
          <button onClick={() => handleDelete(data._id)} className="cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-200">
            Delete
          </button>
        </div>
      </div>

      {!editing ? (
        <>
          <div className={`mt-5 mb-6 rounded-2xl border p-6 text-center ${data.type === "income" ? "border-emerald-100 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-900/20" : "border-rose-100 bg-rose-50 dark:border-rose-900/30 dark:bg-rose-900/20"}`}>
            <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${data.type === "income" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200" : "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-200"}`}>
              {data.type}
            </span>
            <p className={`mt-2 text-4xl font-bold ${data.type === "income" ? "text-emerald-600" : "text-rose-500"}`}>
              {data.type === "income" ? "+" : "-"}
              {fmt(data.amount)}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{data.category}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white px-6 py-2 shadow-sm dark:border-slate-800 dark:bg-[#162447]">
            <DetailLevel label="Description" value={data.description} />
            <DetailLevel label="Date" value={fmtDate(data.date)} />
            <DetailLevel label="Category" value={data.category} />
            <DetailLevel label="Type" value={<span className="capitalize">{data.type}</span>} />
            <DetailLevel label="Name" value={data.name} />
            <DetailLevel label="Email" value={data.email} />
          </div>
        </>
      ) : (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#162447]"
        >
          <p className="mb-5 text-sm text-slate-500 dark:text-slate-300">Edit this transaction and save your changes.</p>
          <div className="mb-5 inline-flex gap-3 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
            {["expense", "income"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-xl px-6 py-2 text-sm font-semibold capitalize transition-all ${
                  type === t ? (t === "income" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white") : "text-slate-500 dark:text-slate-200"
                }`}
              >
                {t === "income" ? "+ Income" : "- Expense"}
              </button>
            ))}
          </div>

          <form onSubmit={handleEditTransaction} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</label>
              <select name="category" defaultValue={data.category} className={field("category")} onChange={() => setError((p) => ({ ...p, category: "" }))}>
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {error.category && <p className="mt-1 text-xs text-red-500">{error.category}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</label>
              <input type="number" name="amount" className={field("amount")} defaultValue={data.amount} required />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Description</label>
              <input type="text" name="description" className={field("description")} defaultValue={data.description} maxLength={200} required />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</label>
              <input type="date" name="date" className={field("date")} defaultValue={new Date(data.date).toISOString().split("T")[0]} required />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</label>
                <input type="text" value={user?.name || ""} readOnly className={field("name")} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</label>
                <input type="email" value={user?.email || ""} readOnly className={field("email")} />
              </div>
            </div>

            <button type="submit" className="mt-2 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:bg-indigo-300" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </Motion.div>
      )}
    </Motion.div>
  );
};

export default TransactionDetails;
