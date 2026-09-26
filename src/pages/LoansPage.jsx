import { useState } from 'react';
import { Banknote, CheckCircle2, Info, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoansPage() {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const loans = [
    {
      id: 1,
      type: 'Personal Credit Line',
      amount: '₹8,00,000',
      interest: '9.4% – 12.5%',
      emi: '₹17,200/mo',
      tenure: '5 years',
      eligibility: 'High (Pre-Approved)',
      matchScore: '96%',
      badgeColor: 'badge-green',
      details: 'Designed for personal liquidity based on your 6-month consistent salary deposits & low DTI.'
    },
    {
      id: 2,
      type: 'Business Expansion Loan',
      amount: '₹12,00,000',
      interest: '10.2% – 13.0%',
      emi: '₹25,400/mo',
      tenure: '4 years',
      eligibility: 'High',
      matchScore: '91%',
      badgeColor: 'badge-green',
      details: 'Tailored for small business working capital requirements with flexible repayment schedules.'
    },
    {
      id: 3,
      type: 'Micro EMI Credit Line',
      amount: '₹1,50,000',
      interest: '8.9% – 11.5%',
      emi: '₹4,800/mo',
      tenure: '3 years',
      eligibility: 'Very High',
      matchScore: '98%',
      badgeColor: 'badge-green',
      details: 'Instant micro credit facility with zero collateral requirement.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Loans That Fit Your Financial Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Simulated pre-approved offers matched dynamically against your AI Credit Score (782).
          </p>
        </div>

        <span className="badge badge-amber" style={{ padding: '6px 12px' }}>
          <Info size={14} /> Simulated / Demo Credit Offers
        </span>
      </div>

      {/* Loans Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {loans.map((loan) => (
          <div
            key={loan.id}
            className="card card-interactive"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '3px solid var(--brand-red)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className={`badge ${loan.badgeColor}`}>{loan.eligibility}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>AI Match {loan.matchScore}</span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>{loan.type}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>{loan.details}</p>

              <div
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '20px'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ELIGIBLE AMOUNT</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--brand-red-bright)' }}>{loan.amount}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ESTIMATED INTEREST</div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{loan.interest}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ESTIMATED EMI</div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{loan.emi}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TENURE</div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{loan.tenure}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setSelectedLoan(loan)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                View Offer Details
              </button>
              <Link to="/dashboard/emi-planner" className="btn btn-outline">
                <Calculator size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Loan Modal Details */}
      {selectedLoan && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setSelectedLoan(null)}
        >
          <div
            className="card"
            style={{ maxWidth: '500px', width: '100%', backgroundColor: 'var(--bg-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>{selectedLoan.type} Details</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Simulated loan offer powered by AI Credit+ Risk Engine.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Approved Amount</span>
                <span style={{ fontWeight: 800, color: 'var(--brand-red-bright)' }}>{selectedLoan.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Interest Rate</span>
                <span style={{ fontWeight: 700 }}>{selectedLoan.interest}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Monthly EMI</span>
                <span style={{ fontWeight: 700 }}>{selectedLoan.emi}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tenure</span>
                <span style={{ fontWeight: 700 }}>{selectedLoan.tenure}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setSelectedLoan(null)} className="btn btn-secondary" style={{ flex: 1 }}>
                Close
              </button>
              <button onClick={() => { alert('Demo loan application submitted!'); setSelectedLoan(null); }} className="btn btn-primary" style={{ flex: 1 }}>
                Apply (Demo)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
