import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';

export default function ExplainablePanel({ isOpen, onClose, score = 782, rating = 'Excellent' }) {
  if (!isOpen) return null;

  const factors = [
    {
      title: 'Payment Behavior',
      score: 92,
      impact: '+14 pts',
      positive: true,
      explanation: 'Your consistent monthly utility and loan repayments over the past 12 months demonstrate high payment discipline.'
    },
    {
      title: 'Cash Flow Stability',
      score: 84,
      impact: '+11 pts',
      positive: true,
      explanation: 'Positive net liquid cash flow (₹36,200/mo) maintained consistently across all billing cycles.'
    },
    {
      title: 'Income Consistency',
      score: 88,
      impact: '+12 pts',
      positive: true,
      explanation: 'Verified regular salary / revenue deposits for 6 consecutive months without significant dips.'
    },
    {
      title: 'Savings Behavior',
      score: 78,
      impact: '+8 pts',
      positive: true,
      explanation: 'Active savings rate of 31% of gross income provides strong buffer protection.'
    },
    {
      title: 'Debt Burden (DTI Ratio)',
      score: 81,
      impact: '-6 pts',
      positive: false,
      explanation: 'Current monthly EMI obligations (₹8,400) account for 10.7% of income. Slightly reduces potential liquidity margin.'
    },
    {
      title: 'Transaction Stability',
      score: 86,
      impact: '+7 pts',
      positive: true,
      explanation: 'Low occurrence of impulsive large debits or overdraft penalties.'
    }
  ];

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          style={{
            width: '100%',
            maxWidth: '540px',
            height: '100%',
            backgroundColor: 'var(--bg-card)',
            borderLeft: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-lg)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Panel Header */}
          <div
            style={{
              padding: '24px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--brand-red-glow)',
                  border: '1px solid var(--border-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Cpu size={20} color="var(--brand-red-bright)" />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Why is your score {score}?</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Transparent Explainable AI Credit Decision Engine</p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Panel Content Body */}
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Summary Badge Banner */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>CURRENT AI CREDIT RATING</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>{score}</span>
                  <span className="badge badge-green">{rating}</span>
                </div>
              </div>
              <ShieldCheck size={36} color="var(--brand-red-bright)" />
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Score Factor Contribution Analysis
            </h4>

            {/* Factor List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {factors.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.title}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({item.score}%)</span>
                    </div>
                    <span className={`badge ${item.positive ? 'badge-green' : 'badge-red'}`}>
                      {item.impact}
                    </span>
                  </div>

                  {/* Horizontal Progress Bar */}
                  <div
                    style={{
                      height: '6px',
                      width: '100%',
                      backgroundColor: 'var(--bg-input)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                      marginBottom: '10px'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${item.score}%`,
                        backgroundColor: item.positive ? 'var(--accent-green)' : 'var(--brand-red)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 1s ease'
                      }}
                    />
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>

            {/* AI Recommendation Note */}
            <div
              style={{
                backgroundColor: 'var(--brand-red-glow)',
                border: '1px solid var(--border-red)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginTop: '8px'
              }}
            >
              <h5 style={{ fontSize: '13px', color: 'var(--brand-red-bright)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} /> How to reach 820+ Score
              </h5>
              <p style={{ fontSize: '12px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5' }}>
                Reducing your current EMI obligation by paying off small credit debts early will boost your Debt Burden factor, unlocking +15 additional score points within 30 days.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
