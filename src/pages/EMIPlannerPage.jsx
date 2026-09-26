import { useState } from 'react';
import { calculateEMI } from '../services/api';
import { Calculator, ShieldAlert, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function EMIPlannerPage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenureMonths, setTenureMonths] = useState(48);

  const monthlyIncome = 78500;
  const currentEmi = 8400;

  const { emi, totalPayment, totalInterest } = calculateEMI(loanAmount, interestRate, tenureMonths);

  const totalMonthlyEmi = currentEmi + emi;
  const dti = Math.round((totalMonthlyEmi / monthlyIncome) * 100);

  let affordability = 'Healthy';
  let badgeClass = 'badge-green';
  if (dti > 50) {
    affordability = 'High Risk';
    badgeClass = 'badge-red';
  } else if (dti > 35) {
    affordability = 'Moderate Risk';
    badgeClass = 'badge-amber';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Interactive EMI & Affordability Planner</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Simulate loan repayment scenarios against your actual monthly income & Debt-to-Income ratio.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Sliders Input Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Loan Parameters</h3>

          {/* Loan Amount Slider */}
          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="input-label">Loan Amount</label>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--brand-red-bright)' }}>
                ₹{loanAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="25000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-red)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>₹50,000</span>
              <span>₹20,00,000</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="input-label">Annual Interest Rate (%)</label>
              <span style={{ fontSize: '16px', fontWeight: 700 }}>{interestRate}%</span>
            </div>
            <input
              type="range"
              min="7.5"
              max="24.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-red)', cursor: 'pointer' }}
            />
          </div>

          {/* Tenure Slider */}
          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="input-label">Loan Tenure ({Math.round(tenureMonths / 12)} Years)</label>
              <span style={{ fontSize: '16px', fontWeight: 700 }}>{tenureMonths} Months</span>
            </div>
            <input
              type="range"
              min="12"
              max="84"
              step="6"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-red)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Calculation Output Card */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
            border: '1px solid var(--border-color)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>CALCULATED REPAYMENT</span>
              <span className={`badge ${badgeClass}`}>{affordability}</span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ESTIMATED MONTHLY EMI</div>
              <div style={{ fontSize: '40px', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-display)', margin: '4px 0' }}>
                ₹{emi.toLocaleString('en-IN')}<span style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: 500 }}>/mo</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TOTAL INTEREST PAYABLE</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--brand-red-bright)', marginTop: '4px' }}>
                  ₹{totalInterest.toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TOTAL PAYMENT (P + I)</div>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>
                  ₹{totalPayment.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* DTI Affordability Indicator */}
            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Projected Debt-to-Income (DTI)</span>
                <span style={{ fontWeight: 800, color: dti > 50 ? 'var(--brand-red)' : 'var(--text-primary)' }}>{dti}%</span>
              </div>
              <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, dti)}%`,
                    backgroundColor: dti > 50 ? 'var(--brand-red)' : dti > 35 ? 'var(--accent-amber)' : 'var(--accent-green)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
