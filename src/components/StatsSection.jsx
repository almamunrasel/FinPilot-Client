import React from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";

const stats = [
  {
    value: "90%",
    title: "feel better about finances",
    description: "Users report less stress and better month-end confidence.",
  },
  {
    value: "3.1x",
    title: "faster goal tracking",
    description: "Progress updates become clear with category-by-category plans.",
  },
  {
    value: "70%",
    title: "build emergency savings",
    description: "Most users save for 3+ months of basic expenses.",
  },
  {
    value: "93%",
    title: "recommend FinPilot",
    description: "Families share it because it is simple and practical.",
  },
];

const features = [
  "Track income, bills, and day-to-day spending in one place",
  "Set category limits with automatic spend alerts",
  "Understand trends using a clean visual dashboard",
];

const StatsSection = () => {
  return (
    <section className="bg-slate-50 py-20 transition-colors dark:bg-[#0f1b46]">
      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="mx-auto w-11/12 max-w-7xl space-y-16"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
              Why people love FinPilot
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              A polished money app that helps you make better decisions every day
            </h2>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              The homepage now focuses on strong readability, cleaner spacing, and
              visual hierarchy so new users instantly understand your product value.
            </p>
            <div className="space-y-3">
              {features.map((item, index) => (
                <Motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  className="flex items-start gap-3 rounded-lg bg-white p-3 shadow-sm dark:bg-[#162447]"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                  <p className="text-sm text-slate-700 dark:text-slate-200 sm:text-base">{item}</p>
                </Motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((item, index) => (
              <Motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-[#162447]"
              >
                <p className="text-3xl font-extrabold text-indigo-700">{item.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </Motion.article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-linear-to-r from-[#1b2b82] to-[#293ca5] p-8 text-white sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-2xl font-bold sm:text-3xl">
                Ready to upgrade your financial life?
              </h3>
              <p className="text-indigo-100">
                Join FinPilot today and start planning smarter with a beautiful,
                distraction-free experience.
              </p>
            </div>
            <Link to="/auth/registration" className="rounded-xl bg-lime-300 px-6 py-3 text-sm font-bold text-[#12215f] transition hover:bg-lime-200">
              Create Free Account
            </Link>
          </div>
        </div>
      </Motion.div>
    </section>
  );
};

export default StatsSection;