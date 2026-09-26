import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, enableDemoUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoClick = () => {
    enableDemoUser();
    navigate('/dashboard');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'var(--bg-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'all var(--transition-normal)',
        padding: '16px 0'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--brand-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-red)'
            }}
          >
            <Shield size={22} color="#FFFFFF" />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '20px',
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em'
              }}
            >
              AI Credit<span style={{ color: 'var(--brand-red)' }}>+</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px',
            '@media (min-width: 900px)': { display: 'flex' }
          }}
          className="desktop-nav"
        >
          <a href="#home" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Home</a>
          <a href="#how-it-works" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>How It Works</a>
          <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Features</a>
          <a href="#intelligence" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Credit Intelligence</a>
          <a href="#security" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Security</a>
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleDemoClick}
            className="btn btn-outline btn-sm"
            style={{ border: '1px solid var(--brand-red)', color: 'var(--brand-red-bright)' }}
          >
            <Sparkles size={14} />
            Try Demo
          </button>
          
          <ThemeToggle />

          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm">
              Dashboard <ArrowRight size={14} />
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm" style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline-flex' } }}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              padding: '6px'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '24px',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <a href="#home" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}>Home</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>How It Works</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Features</a>
          <a href="#intelligence" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Credit Intelligence</a>
          <a href="#security" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Security</a>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <Link to="/login" className="btn btn-secondary" style={{ flex: 1 }}>Sign In</Link>
            <Link to="/register" className="btn btn-primary" style={{ flex: 1 }}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
