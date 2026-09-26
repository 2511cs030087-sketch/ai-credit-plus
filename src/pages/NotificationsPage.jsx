import { notifications } from '../data/mockData';
import { Bell, AlertTriangle, TrendingUp, Banknote, FileCheck } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Notification Center</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Alerts regarding your credit score updates, risk anomalies, and loan pre-approvals.
          </p>
        </div>
        <button className="btn btn-outline btn-sm">Mark All as Read</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className="card"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              borderLeft: n.read ? '1px solid var(--border-color)' : '4px solid var(--brand-red)'
            }}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {n.type === 'risk' ? <AlertTriangle size={18} color="var(--brand-red-bright)" /> : <Bell size={18} color="var(--accent-amber)" />}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{n.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{n.message}</div>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
