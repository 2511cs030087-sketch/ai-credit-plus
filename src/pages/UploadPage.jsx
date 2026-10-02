import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileText, CheckCircle2, ShieldCheck, Sparkles, Loader2,
  FileSpreadsheet, FileCode, X, ArrowRight, Play
} from 'lucide-react';
import { useStatement } from '../contexts/StatementContext';

export default function UploadPage() {
  const navigate = useNavigate();
  const { uploadAndAnalyzeStatement } = useStatement();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const stages = [
    'Reading bank statement structure & metadata...',
    'Extracting recurring salary & business credit deposits...',
    'Categorizing monthly living expenses & utility debits...',
    'Analyzing net cash flow velocity & savings rate...',
    'Evaluating debt obligation ratio (DTI) & EMI consistency...',
    'Calculating multi-factor alternative credit score...',
    'Finalizing AI Credit Score & Explainable Recommendations!'
  ];

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      validateAndSetFile(selected);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      validateAndSetFile(selected);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    setErrorMsg('');
    const validExtensions = ['.pdf', '.csv', '.xlsx', '.xls', '.txt', '.json'];
    const hasValidExt = validExtensions.some(ext => selectedFile.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setErrorMsg('Unsupported format. Please upload a PDF, CSV, Excel, or Text bank statement.');
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setErrorMsg('File size exceeds 25MB limit.');
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSampleStatement = () => {
    const sampleFile = new File(['Date,Description,Category,Amount\n2026-07-01,Salary Credit,Income,88000\n2026-07-03,Rent Payment,Expense,22000\n2026-07-05,HDFC EMI,Loan,8400'], 'HDFC_Salary_Account_Statement_2026.csv', { type: 'text/csv' });
    setFile(sampleFile);
  };

  const startAnalysis = async () => {
    setIsProcessing(true);
    setCurrentStage(0);
    // Trigger statement parsing and context update
    await uploadAndAnalyzeStatement(file);
  };

  useEffect(() => {
    if (isProcessing && currentStage < stages.length) {
      const timer = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else if (isProcessing && currentStage >= stages.length) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
        navigate('/dashboard/credit-score');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, currentStage, stages.length, navigate]);

  const getFileIcon = () => {
    if (!file) return <Upload size={32} color="var(--brand-red-bright)" />;
    if (file.name.endsWith('.pdf')) return <FileText size={32} color="var(--brand-red-bright)" />;
    if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) return <FileSpreadsheet size={32} color="var(--accent-green)" />;
    return <FileCode size={32} color="var(--brand-red-bright)" />;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Analyze Your Financial Health</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Upload your bank statement to unlock real-time alternative credit scoring, cash flow velocity, and AI loan eligibility.
        </p>
      </div>

      {!isProcessing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {errorMsg && (
            <div style={{ padding: '12px 16px', backgroundColor: 'var(--brand-red-glow)', border: '1px solid var(--border-red)', borderRadius: 'var(--radius-sm)', color: 'var(--brand-red-bright)', fontSize: '13px' }}>
              {errorMsg}
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="card"
            style={{
              padding: '44px 24px',
              textAlign: 'center',
              border: file ? '2px solid var(--accent-green)' : '2px dashed var(--border-highlight)',
              backgroundColor: file ? 'rgba(22, 163, 74, 0.04)' : 'var(--bg-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onClick={handleBrowseClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.csv,.xlsx,.xls,.txt,.json"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />

            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: file ? 'rgba(22, 163, 74, 0.15)' : 'var(--brand-red-glow)',
                border: file ? '1px solid var(--accent-green)' : '1px solid var(--border-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              {getFileIcon()}
            </div>

            {file ? (
              <div>
                <span className="badge badge-green" style={{ marginBottom: '8px' }}>
                  <CheckCircle2 size={12} /> Statement Selected
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '6px 0' }}>
                  {file.name}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Size: {(file.size / 1024).toFixed(1)} KB • Verified Format
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button type="button" onClick={removeFile} className="btn btn-secondary btn-sm" style={{ border: '1px solid var(--border-red)', color: 'var(--brand-red-bright)' }}>
                    <X size={14} /> Remove File
                  </button>
                  <button type="button" onClick={handleBrowseClick} className="btn btn-outline btn-sm">
                    Change Statement
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                  Drop your bank statement here
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Supported formats: PDF, CSV, XLSX, TXT (Up to 25MB)
                </p>

                <button type="button" onClick={handleBrowseClick} className="btn btn-secondary btn-sm">
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {/* Preset Sample Statement Quick Action */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>Don't have a statement handy?</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Load our sample salary bank statement for instant demonstration.</div>
            </div>
            <button type="button" onClick={handleSampleStatement} className="btn btn-outline btn-sm" style={{ gap: '6px' }}>
              <Play size={14} color="var(--brand-red-bright)" /> Load Sample Statement
            </button>
          </div>

          {/* Action & Security Assurance */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--accent-green)" />
              Your financial data is encrypted (AES-256) and processed locally.
            </div>

            <button
              type="button"
              onClick={startAnalysis}
              className="btn btn-primary btn-lg"
              disabled={isProcessing}
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
            AI is analyzing {file ? file.name : 'your bank statement'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            Extracting transaction patterns, cash flow stability, and alternative credit risk factors...
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
                transition: 'width 0.4s ease'
              }}
            />
          </div>

          {/* Live Stages List */}
          <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
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
