import { useState } from 'react';
import { Shield, Lock, Bell, Eye, Save } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function SettingsPage() {
  const [dataConsent, setDataConsent] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Account & Privacy Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Configure security protocols, consent permissions, and notification preferences.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Data Privacy & Security Consent</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Alternative Credit Data Processing Consent</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Allow AI Credit+ engine to analyze anonymized bank statements for credit scoring.
            </div>
          </div>
          <input
            type="checkbox"
            checked={dataConsent}
            onChange={(e) => setDataConsent(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--brand-red)' }}
          />
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Real-Time Risk Alerts</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Receive instant notifications when unusual transaction anomalies or high debt burden is detected.
            </div>
          </div>
          <input
            type="checkbox"
            checked={riskAlerts}
            onChange={(e) => setRiskAlerts(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--brand-red)' }}
          />
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Interface Theme</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Toggle between Dark Mode (Default) and Light Mode appearance.
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
