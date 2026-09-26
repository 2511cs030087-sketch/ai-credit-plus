import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Upload, Heart, TrendingUp, Banknote,
  Calculator, AlertTriangle, Lightbulb, Bell, User, LogOut,
  Shield, Sparkles, FileText, Settings, ArrowLeftRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const navItems = [
  {
    section: 'OVERVIEW',
    items: [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/dashboard/upload', icon: Upload, label: 'Upload Statement' },
    ]
  },
  {
    section: 'INTELLIGENCE',
    items: [
      { path: '/dashboard/credit-score', icon: TrendingUp, label: 'AI Credit Score' },
      { path: '/dashboard/financial-health', icon: Heart, label: 'Financial Health' },
      { path: '/dashboard/transactions', icon: ArrowLeftRight, label: 'Transactions' },
    ]
  },
  {
    section: 'FINANCE & LOANS',
    items: [
      { path: '/dashboard/loans', icon: Banknote, label: 'Loan Offers' },
      { path: '/dashboard/emi-planner', icon: Calculator, label: 'EMI Planner' },
    ]
  },
  {
    section: 'INSIGHTS & REPORTS',
    items: [
      { path: '/dashboard/risk-alerts', icon: AlertTriangle, label: 'Risk Alerts' },
      { path: '/dashboard/report', icon: FileText, label: 'AI Credit Report' },
    ]
  },
  {
    section: 'ACCOUNT',
    items: [
      { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
      { path: '/dashboard/profile', icon: User, label: 'Profile' },
      { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ]
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout, isDemoMode, toggleDemoMode } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 90
          }}
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '260px',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 95,
          transition: 'transform var(--transition-normal)',
          transform: isOpen ? 'translateX(0)' : undefined
        }}
        className={`sidebar-nav-container ${isOpen ? 'open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--brand-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-red)'
              }}
            >
              <Shield size={20} color="#FFFFFF" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)' }}>
              AI Credit<span style={{ color: 'var(--brand-red)' }}>+</span>
            </span>
          </NavLink>
        </div>

        {/* Demo Mode Switch Badge */}
        <div style={{ padding: '12px 20px 0' }}>
          <button
            onClick={toggleDemoMode}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: isDemoMode ? 'var(--brand-red-glow)' : 'var(--bg-tertiary)',
              border: `1px solid ${isDemoMode ? 'var(--border-red)' : 'var(--border-color)'}`,
              borderRadius: 'var(--radius-sm)',
              color: isDemoMode ? 'var(--brand-red-bright)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} />
              {isDemoMode ? 'Demo Mode Active' : 'Enable Demo Mode'}
            </span>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isDemoMode ? 'var(--brand-red-bright)' : 'var(--text-muted)'
              }}
            />
          </button>
        </div>

        {/* Navigation Sections */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
          {navItems.map((section) => (
            <div key={section.section} style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  padding: '0 12px 6px'
                }}
              >
                {section.section}
              </div>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--brand-red)' : 'transparent',
                    boxShadow: isActive ? 'var(--shadow-red)' : 'none',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                    marginBottom: '2px'
                  })}
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <ThemeToggle style={{ width: '100%', justifyContent: 'center' }} />
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
