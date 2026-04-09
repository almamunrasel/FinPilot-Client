import React from 'react';

export default function YNABStyleDashboard() {
  const cards = [
    { title: 'Total Balance', value: '$12,450' },
    { title: 'This Month Spent', value: '$1,820' },
    { title: 'Savings Goal', value: '68%' },
    { title: 'Remaining Budget', value: '$930' },
  ];

  const transactions = [
    ['Groceries', '-$85', 'Food'],
    ['Salary', '+$2,500', 'Income'],
    ['Internet Bill', '-$40', 'Utilities'],
    ['Coffee', '-$6', 'Food'],
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <aside className="w-64 bg-white shadow-sm p-6 border-r">
        <h1 className="text-2xl font-bold mb-8">FinEase</h1>
        <nav className="space-y-4 text-gray-700">
          <div className="font-medium">Dashboard</div>
          <div>Budget</div>
          <div>Transactions</div>
          <div>Goals</div>
          <div>Reports</div>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Monthly Budget Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => (
            <div key={card.title} className="bg-white rounded-2xl shadow-sm p-6">
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-2">Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="py-3">{t[0]}</td>
                    <td>{t[1]}</td>
                    <td>{t[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Budget Progress</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm">Food</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                  <div className="bg-black h-3 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <p className="text-sm">Utilities</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                  <div className="bg-black h-3 rounded-full w-1/2"></div>
                </div>
              </div>
              <div>
                <p className="text-sm">Savings</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                  <div className="bg-black h-3 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
