import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function RegisterPage() {
  const { register, enableDemoUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'Individual',
    agreeTerms: true
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    try {
      const success = await register(formData);
      if (success) {
        setSuccessMsg('Account created successfully! Navigating to dashboard...');
        setTimeout(() => navigate('/dashboard'), 400);
      } else {
        setError('Registration failed. Please check your information.');
      }
    } catch (err) {
      setError('Registration error occurred. Entering fallback dashboard mode...');
      setTimeout(() => navigate('/dashboard'), 500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-primary)' }}>
      {/* Left Branding Banner */}
      <div
        style={{
          flex: 1,
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          padding: '60px',
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '@media (min-width: 900px)': { display: 'flex' }
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
            <Sparkles size={12} /> Financial Inclusion Engine
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.15, marginBottom: '16px' }}>
            Unlock your <span className="text-gradient-red">alternative credit profile.</span>
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Join thousands of individuals, freelancers, and small business owners leveraging AI cash flow intelligence to access fair financial credit.
          </p>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          © 2026 AI Credit+ Inc. • RBI Guidelines Compliant
        </div>
      </div>

      {/* Right Register Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: '460px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Create an Account</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Get started with your free AI Credit+ profile
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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="input-field"
                placeholder="Prathiksha Upadhyay"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="name@example.com"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">User Category</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="input-field"
                style={{ appearance: 'auto' }}
              >
                <option value="Individual">Salaried / Individual</option>
                <option value="Freelancer">Freelancer / Independent</option>
                <option value="Gig Worker">Gig Economy Worker</option>
                <option value="Business Owner">Small Business / Vendor</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              <input
                type="checkbox"
                name="agreeTerms"
                id="terms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                style={{ accentColor: 'var(--brand-red)' }}
              />
              <label htmlFor="terms">I agree to the Terms of Service & Privacy Policy</label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'} <ArrowRight size={16} />
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--brand-red-bright)', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
