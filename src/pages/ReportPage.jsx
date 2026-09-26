import { Download, Printer, ShieldCheck, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ReportPage() {
  const { user } = useAuth();

  const handleDownload = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Action Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Financial Intelligence Report</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Comprehensive AI Credit Score & Risk Audit Document
          </p>
        </div>

        <button onClick={handleDownload} className="btn btn-primary">
          <Download size={16} /> Download PDF Report
        </button>
      </div>

      {/* Printable Report Document Card */}
      <div
        className="card"
        style={{
          padding: '40px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-highlight)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
      >
        {/* Document Header Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border-color)', paddingBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              AI Credit<span style={{ color: 'var(--brand-red)' }}>+</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Alternative Credit Assessment Platform
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="badge badge-green">VERIFIED REPORT</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
              Date: Sept 26, 2026 • Ref ID: AIC-98742
            </div>
          </div>
        </div>

        {/* User Profile Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>APPLICANT NAME</div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>{user?.name || 'Prathiksha Upadhyay'}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CATEGORY</div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>{user?.occupation || 'Business Owner'}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PAN / ID</div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>{user?.pan || 'ABCPD1234E'}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ESTIMATED ANNUAL INCOME</div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>{user?.income || '₹12,50,000/yr'}</div>
          </div>
        </div>

        {/* Score & Health Metrics Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ border: '1px solid var(--border-red)', backgroundColor: 'var(--brand-red-glow)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>AI CREDIT SCORE</div>
            <div style={{ fontSize: '42px', fontWeight: 900, color: 'var(--text-primary)', margin: '6px 0' }}>782</div>
            <span className="badge badge-green">Excellent Rating</span>
          </div>

          <div style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>FINANCIAL HEALTH SCORE</div>
            <div style={{ fontSize: '42px', fontWeight: 900, color: 'var(--accent-green)', margin: '6px 0' }}>82%</div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Low Risk Profile</span>
          </div>
        </div>

        {/* Score Factor Contribution Table */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Score Factor Breakdown</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px' }}>Evaluation Factor</th>
                <th style={{ padding: '10px' }}>Weight</th>
                <th style={{ padding: '10px' }}>Score</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                { factor: 'Payment Behavior', weight: '25%', score: '92%', impact: '+14 pts' },
                { factor: 'Cash Flow Stability', weight: '20%', score: '84%', impact: '+11 pts' },
                { factor: 'Income Consistency', weight: '15%', score: '88%', impact: '+12 pts' },
                { factor: 'Savings Behavior', weight: '15%', score: '78%', impact: '+8 pts' },
                { factor: 'Debt Burden (DTI)', weight: '15%', score: '81%', impact: '-6 pts' },
                { factor: 'Transaction Stability', weight: '10%', score: '86%', impact: '+7 pts' }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{row.factor}</td>
                  <td style={{ padding: '10px' }}>{row.weight}</td>
                  <td style={{ padding: '10px' }}>{row.score}</td>
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700, color: row.impact.startsWith('+') ? 'var(--accent-green)' : 'var(--brand-red)' }}>
                    {row.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Recommendations */}
        <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>AI Advisor Summary & Key Findings</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The applicant exhibits high payment discipline, healthy monthly savings rate (31%), and low debt obligations (10.7% DTI). Recommended for pre-approved loan products up to ₹8,00,000 at prime interest rates (9.4%–12.5%).
          </p>
        </div>
      </div>
    </div>
  );
}
