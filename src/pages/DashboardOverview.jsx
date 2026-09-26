import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid
} from 'recharts';
import {
  TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, AlertTriangle,
  Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Upload, Banknote
} from 'lucide-react';
import CreditScoreCard from '../components/CreditScoreCard';
import { incomeData, recentTransactions, riskAlerts } from '../data/mockData';

export default function DashboardOverview() {
  const { openAIChat } = useOutletContext() || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Top Banner Grid: Hero Score Card + Health Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Hero AI Credit Score Card */}
        <CreditScoreCard score={782} rating="Excellent" trend="+24" />

        {/* Financial Health Summary Grid Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          
          {/* Monthly Income */}
          <div className="card">
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>MONTHLY INCOME</div>
            <div style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0', color: 'var(--text-primary)' }}>
              ₹78,500
            </div>
            <div style={{ fontSize: '12px', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={14} /> +8.4% MoM
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="card">
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>MONTHLY EXPENSES</div>
            <div style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0', color: 'var(--text-primary)' }}>
              ₹42,300
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowDownRight size={14} /> 54% of income
            </div>
          </div>

          {/* Savings */}
          <div className="card">
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>SAVINGS</div>
            <div style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0', color: 'var(--accent-green)' }}>
              ₹24,200
            </div>
            <span className="badge badge-green" style={{ fontSize: '11px' }}>31% Savings Rate</span>
          </div>

          {/* EMI Obligations */}
          <div className="card">
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>CURRENT EMI</div>
            <div style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0', color: 'var(--text-primary)' }}>
              ₹8,400
            </div>
            <span className="badge badge-amber" style={{ fontSize: '11px' }}>10.7% DTI (Healthy)</span>
          </div>

        </div>
      </div>

      {/* Analytics Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        
        {/* Income vs Expenses Trend Area Chart */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Income & Cash Flow Analytics</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>6-Month Financial Trend</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-green)' }} /> Income
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--brand-red)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--brand-red)' }} /> Expense
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incomeData.slice(6)}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E11D2E" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#E11D2E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val) => `₹${val.toLocaleString('en-IN')}`}
                />
                <Area type="monotone" dataKey="income" stroke="#16A34A" strokeWidth={2} fillOpacity={1} fill="url(#incomeGrad)" />
                <Area type="monotone" dataKey="expense" stroke="#E11D2E" strokeWidth={2} fillOpacity={1} fill="url(#expenseGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Risk Alerts & Pre-Approved Loan Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Risk Alerts Preview */}
          <div className="card" style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="var(--brand-red-bright)" />
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Risk Alerts</h3>
              </div>
              <Link to="/dashboard/risk-alerts" style={{ fontSize: '12px', color: 'var(--brand-red-bright)', textDecoration: 'none', fontWeight: 600 }}>
                View All →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {riskAlerts.slice(0, 2).map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <span className={`badge ${alert.level === 'high' ? 'badge-red' : 'badge-amber'}`} style={{ marginTop: '2px' }}>
                    {alert.level.toUpperCase()}
                  </span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{alert.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{alert.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-Approved Loan Highlight Card */}
          <div
            style={{
              padding: '20px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-red)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-red)'
            }}
          >
            <div>
              <span className="badge badge-green" style={{ fontSize: '10px', marginBottom: '6px' }}>PRE-APPROVED OFFER</span>
              <h4 style={{ fontSize: '18px', fontWeight: 800 }}>Personal Loan ₹8,00,000</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                9.4% Interest • ₹17,200/mo estimated EMI
              </p>
            </div>
            <Link to="/dashboard/loans" className="btn btn-primary btn-sm">
              <Banknote size={14} /> View Details
            </Link>
          </div>

        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Recent Financial Activity</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Verified Bank Transactions</p>
          </div>
          <Link to="/dashboard/transactions" className="btn btn-outline btn-sm">
            View All Transactions
          </Link>
        </div>

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
              {recentTransactions.slice(0, 5).map((t) => (
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
      </div>
    </div>
  );
}
