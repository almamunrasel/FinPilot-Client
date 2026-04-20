import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion as Motion } from "framer-motion";

const insightCards = [
  { label: "Monthly Income", value: 7480, prefix: "$", accent: "text-emerald-600" },
  { label: "Smart Savings", value: 1920, prefix: "$", accent: "text-indigo-600" },
  { label: "Goal Progress", value: 82, suffix: "%", accent: "text-violet-600" },
];

const CountUpValue = ({ value, prefix = "", suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const frameMs = 16;
    const totalFrames = Math.round(duration / frameMs);
    const increment = value / totalFrames;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        clearInterval(timer);
        setDisplayValue(value);
      } else {
        setDisplayValue(start);
      }
    }, frameMs);

    return () => clearInterval(timer);
  }, [value]);

  const formatted =
    value >= 1000
      ? Math.round(displayValue).toLocaleString("en-US")
      : Math.round(displayValue);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#0f1d63] via-[#1e2f8a] to-[#2f47b6] text-white">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />

      <div className="mx-auto grid min-h-[88vh] w-11/12 max-w-7xl items-center gap-12 py-14 lg:grid-cols-2 lg:py-16">
        <Motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <Motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-100 backdrop-blur"
          >
            <span className="relative inline-flex h-3 w-3 items-center justify-center">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />
              <Motion.span
                className="absolute h-3.5 w-3.5 rounded-full border border-cyan-200/60"
                animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <Motion.span
                className="absolute h-5.5 w-5.5 rounded-full border border-cyan-100/35"
                animate={{ opacity: [0.1, 0.45, 0.1], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
              />
            </span>
            Smarter budgeting starts here
          </Motion.div>

          <div className="space-y-5">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Take control of your money
              <span className="block bg-linear-to-r from-cyan-300 to-lime-300 bg-clip-text text-transparent">
                without the stress.
              </span>
            </h1>
            <p className="max-w-xl text-base text-indigo-100/90 sm:text-lg">
              FinPilot gives you clear budgets, live spending insights, and an
              actionable plan so every taka has a purpose.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/auth/registration"
              className="rounded-xl bg-lime-300 px-6 py-3 text-sm font-bold text-[#12215f] transition hover:-translate-y-0.5 hover:bg-lime-200"
            >
              Start Free Trial
            </Link>
            <button className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              See How It Works
            </button>
          </div>

          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3"
          >
            <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-cyan-100/80">
                Active users
              </p>
              <p className="mt-1 text-xl font-bold">25K+</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-cyan-100/80">
                Avg. savings
              </p>
              <p className="mt-1 text-xl font-bold">32%</p>
            </div>
            <div className="col-span-2 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:col-span-1">
              <p className="text-xs uppercase tracking-wide text-cyan-100/80">
                Trusted rating
              </p>
              <p className="mt-1 text-xl font-bold">4.9 / 5</p>
            </div>
          </Motion.div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          <div className="absolute -left-8 top-16 hidden h-24 w-24 rounded-2xl bg-cyan-300/20 blur-2xl sm:block" />
          <div className="absolute -right-8 bottom-10 hidden h-24 w-24 rounded-2xl bg-lime-300/20 blur-2xl sm:block" />

          <Motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-3xl border border-white/20 bg-white/95 p-5 text-slate-800 shadow-2xl transition-colors dark:bg-[#162447]/95 dark:text-slate-100 sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                  Dashboard
                </p>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  April Budget
                </h3>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                On Track
              </span>
            </div>

            <div className="space-y-3">
              {insightCards.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                >
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {item.label}
                  </p>
                  <p className={`text-base font-extrabold ${item.accent}`}>
                    <CountUpValue value={item.value} prefix={item.prefix} suffix={item.suffix} />
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-linear-to-r from-[#eef3ff] to-[#f4f9ff] p-4 dark:from-slate-800 dark:to-slate-900">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
                <span>Needs</span>
                <span>
                  <CountUpValue value={76} suffix="%" />
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                <Motion.div
                  className="h-2.5 rounded-full bg-linear-to-r from-indigo-500 to-cyan-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "76%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                You are staying under your weekly spending target. Great work.
              </p>
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;