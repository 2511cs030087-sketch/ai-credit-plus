import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const { login, googleLogin, enableDemoUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('prathiksha@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        setSuccessMsg('Authenticated successfully! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 300);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Authentication failed. Entering fallback mode...');
      setTimeout(() => navigate('/dashboard'), 500);
    }
  };

  const handleGoogleClick = async () => {
    setError('');
    try {
      await googleLogin();
      navigate('/dashboard');
    } catch (err) {
      setError('Google Sign-In failed.');
    }
  };

  const handleDemoClick = () => {
    enableDemoUser();
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      {/* Left Branding Side (Desktop) */}
      <div
        style={{
          flex: 1,
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          padding: '60px',
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="auth-left-banner"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={22} color="#FFFFFF" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--text-primary)' }}>
              AI Credit<span style={{ color: 'var(--brand-red)' }}>+</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>

        <div style={{ maxWidth: '480px' }}>
          <span className="badge badge-red" style={{ marginBottom: '16px' }}>
            <Sparkles size={12} /> Alternative Financial Intelligence
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.15, marginBottom: '16px' }}>
            Understand your <span className="text-gradient-red">financial strength.</span>
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Access your AI Credit Score, cash flow analysis, and explainable credit recommendations powered by alternative financial signals.
          </p>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          © 2026 AI Credit+ Inc. • Bank-Grade Security (AES-256)
        </div>
      </div>

      {/* Right Login Form Side */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px'
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Welcome back</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Sign in to your AI Credit+ dashboard
            </p>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', backgroundColor: 'var(--brand-red-glow)', border: '1px solid var(--border-red)', borderRadius: 'var(--radius-sm)', color: 'var(--brand-red-bright)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {successMsg && (
            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.3)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-green)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <CheckCircle size={16} /> {successMsg}
            </div>
          )}

          {/* Quick Demo Mode Trigger */}
          <button
            type="button"
            onClick={handleDemoClick}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'var(--brand-red-glow)',
              border: '1px solid var(--border-red)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--brand-red-bright)',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-red)'
            }}
          >
            <Sparkles size={16} /> Instant Demo Access (No Password Required)
          </button>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="name@example.com"
              />
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="input-label">Password</label>
                <a href="#forgot" style={{ fontSize: '12px', color: 'var(--brand-red-bright)', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--brand-red)' }}
              />
              <label htmlFor="remember" style={{ cursor: 'pointer' }}>Remember me on this device</label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>OR</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          </div>

          <button
            type="button"
            onClick={handleGoogleClick}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Continue with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--brand-red-bright)', fontWeight: 600, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
