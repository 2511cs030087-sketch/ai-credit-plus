import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { recentTransactions, monthlyTransactions } from '../data/mockData';

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = [
    { name: 'Income', value: 45, color: '#16A34A' },
    { name: 'Rent & Living', value: 25, color: '#E11D2E' },
    { name: 'Loan EMI', value: 12, color: '#F59E0B' },
    { name: 'Subscriptions', value: 8, color: '#3B82F6' },
    { name: 'Utilities', value: 10, color: '#737373' }
  ];

  const filtered = recentTransactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) ||
                          t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'All' || t.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Transaction Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Categorized spending analysis and recurring flow detection.
        </p>
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Category Breakdown Donut Chart */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Spending Category Distribution</h3>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4}>
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '12px', marginTop: '8px' }}>
            {categories.map((c, idx) => (
              <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c.color }} />
                {c.name} ({c.value}%)
              </span>
            ))}
          </div>
        </div>

        {/* Transaction Frequency Bar Chart */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Transaction Velocity</h3>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTransactions}>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="var(--brand-red)" radius={[4, 4, 0, 0]} name="Tx Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filterable Transactions Table */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '36px' }}
              />
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Income', 'Expense', 'Loan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No transactions matching search query.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Description</th>
                  <th style={{ padding: '12px 16px' }}>Category</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{t.date}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.description}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-secondary" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                        {t.category}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 700,
                        color: t.type === 'credit' ? 'var(--accent-green)' : 'var(--text-primary)'
                      }}
                    >
                      {t.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
