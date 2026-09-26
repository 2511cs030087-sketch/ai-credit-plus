import { AlertTriangle, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';
import { riskAlerts } from '../data/mockData';

export default function RiskAlertsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Risk Alerts & Anomalies</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Real-time AI detection of unusual transaction velocity, high debt ratio spikes, and cash flow dips.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {riskAlerts.map((alert) => (
          <div
            key={alert.id}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              borderLeft: `4px solid ${alert.level === 'high' ? 'var(--brand-red)' : alert.level === 'medium' ? 'var(--accent-amber)' : 'var(--text-muted)'}`
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: alert.level === 'high' ? 'var(--brand-red-glow)' : 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <AlertTriangle size={20} color={alert.level === 'high' ? 'var(--brand-red-bright)' : 'var(--accent-amber)'} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{alert.title}</h3>
                  <span className={`badge ${alert.level === 'high' ? 'badge-red' : alert.level === 'medium' ? 'badge-amber' : 'badge-green'}`}>
                    {alert.level.toUpperCase()} SEVERITY
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  {alert.description}
                </p>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Detected on {alert.date} at {alert.time}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-outline btn-sm">Dismiss</button>
              <button className="btn btn-secondary btn-sm">Get AI Advice</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
