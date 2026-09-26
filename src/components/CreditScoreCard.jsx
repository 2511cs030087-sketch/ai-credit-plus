import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, HelpCircle, ShieldCheck, Info } from 'lucide-react';
import ExplainablePanel from './ExplainablePanel';

export default function CreditScoreCard({ score = 782, rating = 'Excellent', trend = '+24' }) {
  const [explainOpen, setExplainOpen] = useState(false);

  // Score percentage calculation (300 to 900 range)
  const scorePercent = Math.min(100, Math.max(0, ((score - 300) / 600) * 100));
  const strokeDashoffset = 440 - (440 * scorePercent) / 100;

  return (
    <>
      <div
        className="card card-interactive"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Subtle Background Glow Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--brand-red-glow) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--brand-red-bright)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                AI Credit Score
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Alternative Multi-Factor Evaluation
            </p>
          </div>

          <span className="badge badge-green">
            <TrendingUp size={12} /> {trend} pts this month
          </span>
        </div>

        {/* Main Gauge Visual & Rating */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: '24px 0',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          {/* Circular SVG Score Gauge */}
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--bg-input)"
                strokeWidth="12"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--brand-red)"
                strokeWidth="12"
                strokeDasharray="440"
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '38px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                {score}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-red-bright)', marginTop: '2px' }}>
                {rating}
              </span>
            </div>
          </div>

          {/* Quick Metrics Breakdown Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '180px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Score Range</span>
              <span style={{ fontWeight: 600 }}>300 – 900</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>On-time Payments</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-green)' }}>94%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Cash Flow Stability</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-green)' }}>Healthy</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Risk Level</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-green)' }}>Low</span>
            </div>
          </div>
        </div>

        {/* Explainable AI Action Button */}
        <button
          onClick={() => setExplainOpen(true)}
          className="btn btn-outline"
          style={{
            width: '100%',
            borderColor: 'var(--border-red)',
            color: 'var(--brand-red-bright)',
            backgroundColor: 'var(--brand-red-glow)',
            fontSize: '13px'
          }}
        >
          <HelpCircle size={16} /> Why is my score {score}?
        </button>
      </div>

      {/* Explainable AI Modal Drawer */}
      <ExplainablePanel
        isOpen={explainOpen}
        onClose={() => setExplainOpen(false)}
        score={score}
        rating={rating}
      />
    </>
  );
}
