import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, TrendingUp, Sparkles, CheckCircle2, ArrowRight, Activity,
  Lock, Brain, Wallet, Users, AlertTriangle, FileText, ChevronDown, ChevronUp,
  Cpu, Award, Building, CreditCard
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { faqs, testimonials } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const { enableDemoUser } = useAuth();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const handleTryDemo = () => {
    enableDemoUser();
    navigate('/dashboard');
  };

  return (
    <div className="app-container" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* Hero Section */}
      <section id="home" style={{ padding: '80px 24px 100px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 60px' }}>
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge badge-red"
            style={{ marginBottom: '24px', fontSize: '13px', padding: '6px 16px' }}
          >
            <Sparkles size={14} /> AI-powered • Explainable • Secure
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}
          >
            Credit Intelligence <span className="text-gradient-red">Beyond Traditional Scores.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '36px' }}
          >
            AI-powered financial intelligence that evaluates real financial behavior, cash flow and alternative signals to create a clearer picture of creditworthiness.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
          >
            <Link to="/register" className="btn btn-primary btn-lg">
              Check My Credit <ArrowRight size={18} />
            </Link>
            <button onClick={handleTryDemo} className="btn btn-secondary btn-lg">
              <Sparkles size={18} color="var(--brand-red-bright)" /> Explore Platform Demo
            </button>
          </motion.div>
        </div>

        {/* Hero Interactive Visual Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="card"
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '32px',
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
            border: '1px solid var(--border-highlight)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Visual Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--brand-red)' }} />
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Financial Intelligence Overview</span>
              <span className="badge badge-green">Live Analysis</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Updated 2 mins ago</span>
          </div>

          {/* Score & Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            {/* Score Highlight Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-red)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-red)'
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>AI CREDIT SCORE</div>
              <div style={{ margin: '12px 0' }}>
                <span style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>782</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-red-bright)', marginLeft: '8px' }}>Excellent</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +24 pts this month
              </div>
            </div>

            {/* Income */}
            <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>MONTHLY INCOME</div>
              <div style={{ fontSize: '26px', fontWeight: 800, margin: '10px 0' }}>₹78,500</div>
              <span style={{ fontSize: '12px', color: 'var(--accent-green)' }}>Verified Inflows</span>
            </div>

            {/* Monthly Expenses */}
            <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>MONTHLY EXPENSES</div>
              <div style={{ fontSize: '26px', fontWeight: 800, margin: '10px 0' }}>₹42,300</div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Expense-to-Income 54%</span>
            </div>

            {/* Savings & Cash Flow */}
            <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>SAVINGS RATE</div>
              <div style={{ fontSize: '26px', fontWeight: 800, margin: '10px 0', color: 'var(--accent-green)' }}>31%</div>
              <span style={{ fontSize: '12px', color: 'var(--accent-green)' }}>Cash Flow: Healthy</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Target Audience Section */}
      <section style={{ padding: '60px 24px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-red-bright)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Empowering Financial Inclusion
          </h3>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '40px' }}>
            Designed for People with Limited Formal Credit History
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {[
              'Students & First Earners', 'Salaried Individuals', 'Freelancers & Gig Workers',
              'Farmers & Rural Earners', 'Street Vendors & Sellers', 'Micro Business Owners'
            ].map((target, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  fontSize: '14px',
                  textAlign: 'center'
                }}
              >
                {target}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>
            Traditional credit scores don't tell the whole financial story.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Millions of creditworthy individuals are rejected by traditional banks due to a lack of formal CIBIL records.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Limited Credit History', desc: 'No past loans or credit cards means an empty score file.' },
            { title: 'Informal Income Streams', desc: 'Cash or irregular UPI revenues are ignored by legacy systems.' },
            { title: 'Gig Economy Workers', desc: 'Variable monthly cash flows trigger false high-risk flags.' },
            { title: 'Small Business Owners', desc: 'Operational revenues aren\'t evaluated by standard credit bureaus.' }
          ].map((item, idx) => (
            <div key={idx} className="card">
              <AlertTriangle size={24} color="var(--brand-red-bright)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" style={{ padding: '100px 24px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>
              Meet AI Credit<span style={{ color: 'var(--brand-red)' }}>+</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Our multi-factor scoring engine analyzes real-time financial behavior to calculate an unbiased alternative credit score.
            </p>
          </div>

          {/* Process Flow Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Bank Statement', desc: 'Upload PDF/CSV bank statement securely.' },
              { step: '02', title: 'Behavior Analysis', desc: 'Extract income, expenses, and savings stability.' },
              { step: '03', title: 'AI Scoring Engine', desc: 'Deterministic multi-factor score calculation.' },
              { step: '04', title: 'Explainable Score', desc: 'See exact reasons behind your credit score.' },
              { step: '05', title: 'Loan Insights', desc: 'Receive pre-approved simulated loan options.' }
            ].map((step, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  position: 'relative',
                  borderTop: '3px solid var(--brand-red)'
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--brand-red)', marginBottom: '12px' }}>{step.step}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>
            Built for Modern Financial Intelligence
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Comprehensive tools to evaluate, improve, and leverage your financial health.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {[
            { icon: TrendingUp, title: 'AI Credit Score', desc: 'Analyze financial behavior and generate a fair alternative credit score.' },
            { icon: Activity, title: 'Financial Health', desc: 'Understand income, spending, savings and cash flow stability in real time.' },
            { icon: AlertTriangle, title: 'AI Risk Analysis', desc: 'Detect unusual transaction anomalies and high debt-burden patterns.' },
            { icon: Wallet, title: 'Loan Recommendations', desc: 'Explore simulated loan options tailored to your repayment capacity.' },
            { icon: CreditCard, title: 'EMI Planner', desc: 'Interactive EMI calculator with affordability safety indicators.' },
            { icon: Brain, title: 'AI Financial Assistant', desc: 'Ask contextual questions about your score, loan eligibility, and savings.' }
          ].map((feature, idx) => (
            <div key={idx} className="card card-interactive">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--brand-red-glow)',
                  border: '1px solid var(--border-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <feature.icon size={22} color="var(--brand-red-bright)" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{feature.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="security" style={{ padding: '80px 24px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, textAlign: 'center', marginBottom: '40px' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700, fontSize: '16px' }}>
                  <span>{faq.question}</span>
                  {activeFaq === idx ? <ChevronUp size={20} color="var(--brand-red)" /> : <ChevronDown size={20} />}
                </div>
                {activeFaq === idx && (
                  <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer style={{ padding: '60px 24px', backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>
            Ready to discover your true credit potential?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Join AI Credit+ today and unlock AI-powered credit intelligence.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Now <ArrowRight size={18} />
            </Link>
          </div>
          <div style={{ marginTop: '40px', fontSize: '12px', color: 'var(--text-muted)' }}>
            © 2026 AI Credit+. All rights reserved. • Simulated Demo & Production Financial Engine
          </div>
        </div>
      </footer>
    </div>
  );
}
