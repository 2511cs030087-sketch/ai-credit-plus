import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
        padding: '8px 12px',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'all var(--transition-fast)'
      }}
    >
      {theme === 'dark' ? (
        <>
          <Sun size={16} color="#F59E0B" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={16} color="#3B82F6" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
