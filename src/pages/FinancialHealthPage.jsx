import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Heart, TrendingUp, ShieldCheck, DollarSign, Activity } from 'lucide-react';
import { financialHealthData, cashFlowData } from '../data/mockData';

export default function FinancialHealthPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Financial Health Analysis</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Evaluate income stability, savings velocity, debt obligations, and cash flow resilience.
        </p>
      </div>

      {/* Main Health Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>INCOME STABILITY</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-green)', margin: '8px 0' }}>85%</div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Highly Consistent</span>
        </div>

        <div className="card">
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>SAVINGS SCORE</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-green)', margin: '8px 0' }}>72%</div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>₹24,200/mo Average</span>
        </div>

        <div className="card">
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>CASH FLOW SCORE</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-green)', margin: '8px 0' }}>78%</div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Positive Liquidity</span>
        </div>

        <div className="card">
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>DEBT RATIO (DTI)</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', margin: '8px 0' }}>22%</div>
          <span style={{ fontSize: '12px', color: 'var(--accent-green)' }}>Safely Below 40% Cap</span>
        </div>
      </div>

      {/* Cash Inflow vs Outflow Bar Chart */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Monthly Inflow vs Outflow</h3>
        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData}>
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val) => `₹${val.toLocaleString('en-IN')}`}
              />
              <Bar dataKey="inflow" fill="#16A34A" radius={[4, 4, 0, 0]} name="Inflow" />
              <Bar dataKey="outflow" fill="#E11D2E" radius={[4, 4, 0, 0]} name="Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
