import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, ShieldCheck, Sparkles, Loader2, ArrowRight } from 'lucide-react';

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    'Reading document structure...',
    'Extracting recurring transactions...',
    'Categorizing income & expenses...',
    'Analyzing cash flow velocity...',
    'Evaluating financial stability...',
    'Generating credit intelligence...',
    'Finalizing AI Credit Score & Insights!'
  ];

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    setIsProcessing(true);
    setCurrentStage(0);
  };

  useEffect(() => {
    if (isProcessing && currentStage < stages.length) {
      const timer = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isProcessing && currentStage >= stages.length) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
        navigate('/dashboard/credit-score');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, currentStage, stages.length, navigate]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Analyze Your Financial Health</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Upload your bank statement to unlock real-time credit score, cash flow analysis, and AI loan eligibility.
        </p>
      </div>

      {!isProcessing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="card"
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              border: '2px dashed var(--border-highlight)',
              backgroundColor: 'var(--bg-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onClick={() => document.getElementById('file-upload-input').click()}
          >
            <input
              type="file"
              id="file-upload-input"
              accept=".pdf,.csv,.xlsx,.xls"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />

            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-red-glow)',
                border: '1px solid var(--border-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <Upload size={32} color="var(--brand-red-bright)" />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              {file ? file.name : 'Drop your bank statement here'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Supported formats: PDF, CSV, XLSX (Up to 25MB)
            </p>

            <button type="button" className="btn btn-secondary btn-sm">
              Browse Files
            </button>
          </div>

          {/* Action & Security Assurance */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--accent-green)" />
              Your financial data is encrypted (AES-256) and processed securely.
            </div>

            <button
              onClick={startAnalysis}
              className="btn btn-primary btn-lg"
              disabled={false}
            >
              <Sparkles size={18} /> Upload & Analyze Statement
            </button>
          </div>
        </div>
      ) : (
        /* AI Multi-Stage Processing Screen */
        <div className="card" style={{ padding: '40px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-red-glow)',
              border: '1px solid var(--border-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}
          >
            <Loader2 size={28} color="var(--brand-red-bright)" className="animate-spin" />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
            AI is analyzing your financial profile
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            Evaluating cash flow patterns, income stability, and alternative credit risk factors...
          </p>

          {/* Progress Bar */}
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              height: '8px',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              margin: '0 auto 32px'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, Math.round(((currentStage + 1) / stages.length) * 100))}%`,
                backgroundColor: 'var(--brand-red)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.6s ease'
              }}
            />
          </div>

          {/* Live Stages List */}
          <div style={{ maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            {stages.map((stage, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  color: idx < currentStage ? 'var(--accent-green)' : idx === currentStage ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: idx === currentStage ? 600 : 400
                }}
              >
                {idx < currentStage ? (
                  <CheckCircle2 size={18} color="var(--accent-green)" />
                ) : idx === currentStage ? (
                  <Loader2 size={18} color="var(--brand-red-bright)" className="animate-spin" />
                ) : (
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid var(--text-muted)' }} />
                )}
                {stage}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
