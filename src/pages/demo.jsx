import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure';

// ── constants ──────────────────────────────────────────────────────────────
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const PIE_COLORS = [
  '#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6',
  '#06b6d4','#f97316','#ec4899','#14b8a6','#84cc16',
];

const fmt = (n) =>
  '৳' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });

// ── custom tooltip for pie ─────────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-lg px-4 py-3">
      <p className="text-xs font-semibold text-slate-500 mb-0.5">{payload[0].name}</p>
      <p className="text-sm font-bold text-slate-800">{fmt(payload[0].value)}</p>
      <p className="text-xs text-slate-400">{payload[0].payload.percent}% of expenses</p>
    </div>
  );
};

// ── custom tooltip for bar ─────────────────────────────────────────────────
const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-lg px-4 py-3 min-w-[140px]">
      <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex justify-between gap-4 text-xs">
          <span style={{ color: p.fill }} className="font-medium capitalize">{p.name}</span>
          <span className="font-bold text-slate-800">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

// ── stat card ──────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, colorClass, bgClass, borderClass, icon }) => (
  <div className={`rounded-2xl border p-5 ${bgClass} ${borderClass}`}>
    <div className="flex items-start justify-between mb-3">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <span className="text-lg">{icon}</span>
    </div>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
    {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
  </div>
);

// ── custom pie label ───────────────────────────────────────────────────────
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ── main component ─────────────────────────────────────────────────────────
const Summary = () => {
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('all');

  useEffect(() => {
    axiosSecure.get('/transactions')
      .then(res => setTransactions(res.data.transactions))
      .catch(() => toast.error('Failed to load report data.'))
      .finally(() => setLoading(false));
  }, []);

  // ── filtered transactions ────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (selectedMonth === 'all') return transactions;
    return transactions.filter(
      t => new Date(t.date).getMonth() === parseInt(selectedMonth)
    );
  }, [transactions, selectedMonth]);

  // ── summary stats ────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const income  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const rate    = income > 0 ? (((income - expense) / income) * 100).toFixed(1) : '0.0';
    return { income, expense, balance: income - expense, savingsRate: rate };
  }, [filtered]);

  // ── pie data — expenses by category ─────────────────────────────────────
  const pieData = useMemo(() => {
    const map = {};
    filtered.filter(t => t.type === 'expense')
      .forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
    const total = Object.values(map).reduce((s, v) => s + v, 0);
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        value,
        percent: total > 0 ? ((value / total) * 100).toFixed(1) : '0',
      }));
  }, [filtered]);

  // ── bar data — monthly totals (always all months) ────────────────────────
  const barData = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      const m = new Date(t.date).getMonth();
      if (!map[m]) map[m] = { month: MONTHS[m].slice(0, 3), income: 0, expense: 0, order: m };
      if (t.type === 'income')  map[m].income  += t.amount;
      else                      map[m].expense += t.amount;
    });
    return Object.values(map).sort((a, b) => a.order - b.order);
  }, [transactions]);

  // ── top categories ───────────────────────────────────────────────────────
  const topCategories = useMemo(() => {
    const total = pieData.reduce((s, d) => s + d.value, 0);
    return pieData.slice(0, 5).map((d, i) => ({
      ...d,
      color: PIE_COLORS[i % PIE_COLORS.length],
      pct: total > 0 ? (d.value / total) * 100 : 0,
    }));
  }, [pieData]);

  // ── loading ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-400">Loading your report…</p>
    </div>
  );

  const currentMonthLabel = selectedMonth === 'all' ? 'All Time' : MONTHS[parseInt(selectedMonth)];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* ── page header ── */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Reports</h1>
          <p className="text-slate-400 text-sm mt-1">
            {transactions.length} transactions · {currentMonthLabel}
          </p>
        </div>

        {/* month filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filter</span>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-indigo-400 bg-white shadow-sm min-w-[160px]"
          >
            <option value="all">All Months</option>
            {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* ── 4 stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Net Balance" icon="💰"
          value={fmt(stats.balance)}
          sub={stats.balance >= 0 ? 'You are in the green' : 'Spending exceeds income'}
          colorClass={stats.balance >= 0 ? 'text-indigo-600' : 'text-rose-500'}
          bgClass={stats.balance >= 0 ? 'bg-indigo-50' : 'bg-rose-50'}
          borderClass={stats.balance >= 0 ? 'border-indigo-100' : 'border-rose-100'}
        />
        <StatCard
          label="Total Income" icon="📈"
          value={fmt(stats.income)}
          sub={`${filtered.filter(t => t.type === 'income').length} transactions`}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
          borderClass="border-emerald-100"
        />
        <StatCard
          label="Total Expenses" icon="📉"
          value={fmt(stats.expense)}
          sub={`${filtered.filter(t => t.type === 'expense').length} transactions`}
          colorClass="text-rose-500"
          bgClass="bg-rose-50"
          borderClass="border-rose-100"
        />
        <StatCard
          label="Savings Rate" icon="🎯"
          value={`${stats.savingsRate}%`}
          sub="of income saved"
          colorClass={parseFloat(stats.savingsRate) >= 20 ? 'text-emerald-600' : 'text-amber-500'}
          bgClass={parseFloat(stats.savingsRate) >= 20 ? 'bg-emerald-50' : 'bg-amber-50'}
          borderClass={parseFloat(stats.savingsRate) >= 20 ? 'border-emerald-100' : 'border-amber-100'}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
          <p className="text-5xl mb-4">📊</p>
          <p className="text-slate-500 font-medium">No data for this period</p>
          <p className="text-slate-400 text-sm mt-1">Try selecting a different month</p>
        </div>
      ) : (
        <>
          {/* ── charts row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* pie chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="mb-5">
                <h2 className="text-base font-bold text-slate-800">Expenses by Category</h2>
                <p className="text-xs text-slate-400 mt-0.5">{currentMonthLabel} · {pieData.length} categories</p>
              </div>

              {pieData.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-slate-300">
                  <p className="text-sm">No expense data</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%" cy="50%"
                      innerRadius={65}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomLabel}
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span style={{ fontSize: 12, color: '#64748b' }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* bar chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="mb-5">
                <h2 className="text-base font-bold text-slate-800">Monthly Overview</h2>
                <p className="text-xs text-slate-400 mt-0.5">Income vs Expenses · All months</p>
              </div>

              {barData.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-slate-300">
                  <p className="text-sm">No data yet</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={barData} barGap={4} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={v => `৳${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
                    />
                    <Tooltip content={<BarTooltip />} cursor={{ fill: '#f8fafc' }} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={value => (
                        <span style={{ fontSize: 12, color: '#64748b', textTransform: 'capitalize' }}>{value}</span>
                      )}
                    />
                    <Bar dataKey="income"  fill="#10b981" radius={[4, 4, 0, 0]} name="income" />
                    <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} name="expense" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* ── top spending categories table ── */}
          {topCategories.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-base font-bold text-slate-800">Top Spending Categories</h2>
                <p className="text-xs text-slate-400 mt-0.5">Where your money is going · {currentMonthLabel}</p>
              </div>

              <div className="space-y-4">
                {topCategories.map((cat, i) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: cat.color }}
                        />
                        <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                        <span className="text-xs text-slate-400">#{i + 1}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{cat.pct.toFixed(1)}%</span>
                        <span className="text-sm font-bold text-slate-800">{fmt(cat.value)}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${cat.pct}%`, background: cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* total */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-500">Total Expenses</span>
                <span className="text-base font-bold text-rose-500">{fmt(stats.expense)}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Summary;