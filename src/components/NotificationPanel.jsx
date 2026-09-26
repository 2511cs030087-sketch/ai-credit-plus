import { notifications as initialNotifications } from '../data/mockData';
import { Bell, AlertTriangle, TrendingUp, Banknote, FileCheck, Check } from 'lucide-react';

export default function NotificationPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'risk': return <AlertTriangle size={16} color="var(--brand-red-bright)" />;
      case 'loan': return <Banknote size={16} color="var(--accent-amber)" />;
      case 'emi': return <TrendingUp size={16} color="var(--accent-green)" />;
      default: return <FileCheck size={16} color="var(--text-primary)" />;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50px',
        right: 0,
        width: '360px',
        maxHeight: '440px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Notifications</h4>
        <span className="badge badge-red" style={{ fontSize: '10px' }}>6 New</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {initialNotifications.map((n) => (
          <div
            key={n.id}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '6px',
              backgroundColor: n.read ? 'transparent' : 'var(--bg-tertiary)',
              border: `1px solid ${n.read ? 'transparent' : 'var(--border-highlight)'}`,
              display: 'flex',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {getIcon(n.type)}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{n.message}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
