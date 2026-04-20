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
      <h3 className="mb-4 text-base font-semibold text-cyan-300">{title}</h3>
      <ul className="space-y-2.5 text-sm text-white/85">
        {items.map((item) => (
          <li key={item} className="cursor-pointer transition-colors hover:text-cyan-200">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-[#0e1c5d] px-6 py-14 text-white sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h2 className="text-3xl font-black tracking-tight">FinPilot</h2>
            <p className="mt-2 max-w-sm text-sm text-indigo-100/90">
              Build better financial habits with a cleaner, faster, and more
              intuitive money dashboard.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-white/25 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/50 focus:border-cyan-300"
          />

          <div className="flex flex-wrap gap-3 text-xl text-cyan-300">
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">f</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">x</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">in</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">yt</span>
          </div>

          <div className="space-y-2 text-sm leading-7 text-white/65">
            <p>Copyright © 2026, FinPilot. All Rights Reserved.</p>
            <p>Simple tools for income, expenses, goals, and confident planning.</p>
          </div>
        </div>

        {renderLinks("Company", company)}
        {renderLinks("Programs", programs)}
        {renderLinks("App", app)}
        {renderLinks("Legal", legal)}
      </div>
    </footer>
  );
}
