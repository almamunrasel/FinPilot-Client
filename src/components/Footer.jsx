export default function Footer() {
  const company = ["About", "Careers", "Press", "FinPilot: The Book"];
  const programs = [
    "FinPilot for the Workplace",
    "FinPilot for Students",
    "Certified Coaching",
  ];
  const app = ["Status", "What's New", "API", "Cancellation", "Contact Support"];
  const legal = [
    "Terms",
    "Security",
    "Privacy Policy",
    "Accessibility",
    "Your Privacy Choices",
  ];

  const renderLinks = (title, items) => (
    <div>
      <h3 className="text-emerald-400 font-semibold text-lg mb-4">{title}</h3>
      <ul className="space-y-3 text-white/90 text-sm sm:text-base">
        {items.map((item) => (
          <li key={item} className="hover:text-emerald-300 cursor-pointer transition-colors">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-[#1f2366] text-white px-6 sm:px-10 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Left section */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold">🌳</h1>

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-emerald-400 bg-transparent px-4 py-3 outline-none focus:border-emerald-300"
          />

          <div className="flex flex-wrap gap-4 text-2xl text-emerald-400">
            <span>📘</span>
            <span>✖️</span>
            <span>📷</span>
            <span>📌</span>
            <span>🎵</span>
            <span>▶️</span>
            <span>🎙️</span>
          </div>

          <div className="text-sm text-white/60 space-y-3 leading-7">
            <p>Copyright © 2026, FinPilot. All Rights Reserved.</p>
            <p>
              FinPilot helps you manage income, expenses, and savings goals with
              a clean modern dashboard.
            </p>
          </div>
        </div>

        {/* Link columns */}
        {renderLinks("Company", company)}
        {renderLinks("Programs", programs)}
        {renderLinks("App", app)}
        {renderLinks("Legal", legal)}
      </div>
    </footer>
  );
}
