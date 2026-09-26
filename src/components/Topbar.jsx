import { useState } from 'react';
import { Menu, Bell, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationPanel from './NotificationPanel';

export default function Topbar({ onMenuClick, onOpenAIChat }) {
  const { user, isDemoMode } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header
      style={{
        height: '72px',
        padding: '0 32px',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 80
      }}
    >
      {/* Greeting & Subheadline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onMenuClick}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {getGreeting()}, {user?.name || 'Prathiksha'}
            {isDemoMode && (
              <span className="badge badge-red" style={{ fontSize: '10px', padding: '2px 8px' }}>
                <Sparkles size={10} /> DEMO
              </span>
            )}
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Here's your financial intelligence overview.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
        {/* Floating AI Launcher Trigger */}
        <button
          onClick={onOpenAIChat}
          className="btn btn-outline btn-sm"
          style={{
            border: '1px solid var(--border-red)',
            color: 'var(--brand-red-bright)',
            backgroundColor: 'var(--brand-red-glow)'
          }}
        >
          <Bot size={16} />
          <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } }}>Ask AI Assistant</span>
        </button>

        {/* Notifications Icon Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotificationsOpen(prev => !prev)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            title="Notifications"
          >
            <Bell size={18} />
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-red)'
              }}
            />
          </button>

          <NotificationPanel
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />
        </div>

        {/* User Avatar */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--brand-red)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: 'var(--shadow-red)',
            cursor: 'pointer'
          }}
          title={user?.name || 'User Profile'}
        >
          {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : 'PU')}
        </div>
      </div>
    </header>
  );
}
