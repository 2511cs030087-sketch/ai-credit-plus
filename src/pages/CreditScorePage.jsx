import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, Cpu } from 'lucide-react';
import CreditScoreCard from '../components/CreditScoreCard';

export default function CreditScorePage() {
  const score = 782;
  const rating = 'Excellent';

  const factorList = [
    { name: 'Payment Behavior', percentage: 92, weight: '25%', impact: '+14 pts', positive: true, detail: 'Consistent on-time utility & loan bill payments over 12 months.' },
    { name: 'Cash Flow Stability', percentage: 84, weight: '20%', impact: '+11 pts', positive: true, detail: 'Positive net liquid cash flow (₹36,200/mo) maintained every month.' },
    { name: 'Income Consistency', percentage: 88, weight: '15%', impact: '+12 pts', positive: true, detail: 'Verified recurring monthly salary/revenue deposits for 6+ consecutive months.' },
    { name: 'Savings Behavior', percentage: 78, weight: '15%', impact: '+8 pts', positive: true, detail: 'Active savings rate of 31% of gross income provides strong buffer protection.' },
    { name: 'Debt Burden (DTI)', percentage: 81, weight: '15%', impact: '-6 pts', positive: false, detail: 'Current monthly EMI obligations (₹8,400) account for 10.7% of income.' },
    { name: 'Transaction Stability', percentage: 86, weight: '10%', impact: '+7 pts', positive: true, detail: 'Low occurrence of impulsive large debits or overdraft penalties.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Page Title Header */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>AI Credit Score Intelligence</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Deterministic multi-factor analysis based on verified financial behavior and alternative signals.
        </p>
      </div>

      {/* Main Grid: Score Gauge + Explanation Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        <CreditScoreCard score={score} rating={rating} trend="+24" />

        {/* Explainable Engine Summary Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Cpu size={20} color="var(--brand-red-bright)" />
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Explainable AI Scoring Architecture</h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Unlike traditional opaque credit scores, AI Credit+ calculates your creditworthiness using transparent, auditable financial rules weighted across 6 core behavior dimensions.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginTop: '20px'
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>NEXT SCORE MILESTONE</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
              820+ (Top 5% Tier)
            </div>
            <div style={{ fontSize: '12px', color: 'var(--accent-green)' }}>
              Estimated 30 days to reach target with current cash flow consistency.
            </div>
          </div>
        </div>
      </div>

      {/* Factor Breakdown List */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
          Factor Breakdown & Score Contributions
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {factorList.map((f, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <span style={{ fontSize: '15px', fontWeight: 700 }}>{f.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>Weight: {f.weight}</span>
                  </div>
                  <span className={`badge ${f.positive ? 'badge-green' : 'badge-red'}`}>
                    {f.impact}
                  </span>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    height: '8px',
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    marginBottom: '12px'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${f.percentage}%`,
                      backgroundColor: f.positive ? 'var(--accent-green)' : 'var(--brand-red)',
                      borderRadius: 'var(--radius-full)'
                    }}
                  />
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {f.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Score Boost Recommendations */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--brand-red-glow)',
          border: '1px solid var(--border-red)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-red-bright)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={20} /> Recommendations to Boost Score by +38 Points
        </h3>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.8 }}>
          <li>Maintain automated payment reminders to ensure 100% on-time utility bill clearance.</li>
          <li>Increase monthly recurring savings transfer to hit a 35% savings rate.</li>
          <li>Pay down existing small EMI balances early to optimize Debt-to-Income (DTI) ratio below 10%.</li>
        </ul>
      </div>

    </div>
  );
}
