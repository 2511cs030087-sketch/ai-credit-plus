import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, X, File } from 'lucide-react';

export default function FileUpload({ onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const fileInputRef = useRef(null);

  const processingSteps = [
    'Reading document...',
    'Extracting transactions...',
    'Analyzing patterns...',
    'Generating insights...',
    'Complete!'
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (newFiles) => {
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    setUploading(true);
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise(r => setTimeout(r, 800));
    }
    setUploading(false);
    setUploadComplete(true);
    if (onUpload) onUpload(files);
  };

  const resetUpload = () => {
    setFiles([]);
    setUploadComplete(false);
    setProcessingStep(0);
  };

  if (uploading) {
    return (
      <motion.div
        className="processing-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="processing-spinner" />
        <h4>Processing Your Statement</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 8 }}>
          Our AI is analyzing your financial data
        </p>
        <div className="processing-steps">
          {processingSteps.map((step, i) => (
            <motion.div
              key={i}
              className={`processing-step ${i === processingStep ? 'active' : ''} ${i < processingStep ? 'done' : ''}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {i < processingStep ? <CheckCircle size={16} /> : <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--border)' }} />}
              {step}
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (uploadComplete) {
    return (
      <motion.div
        className="processing-overlay"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <CheckCircle size={64} color="var(--accent)" />
        </motion.div>
        <h3 style={{ marginTop: 20 }}>Statement Processed Successfully!</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 8 }}>
          Your financial data has been analyzed. View your dashboard for insights.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button className="btn btn-primary" onClick={() => window.location.href = '/dashboard'}>
            View Dashboard
          </button>
          <button className="btn btn-secondary" onClick={resetUpload}>
            Upload Another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="upload-icon" size={48} />
        <h4>Drop your bank statement here</h4>
        <p>or click to browse files</p>
        <div className="upload-formats">
          <span>PDF</span>
          <span>CSV</span>
          <span>Excel</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.csv,.xlsx,.xls"
          multiple
          onChange={(e) => handleFiles(Array.from(e.target.files))}
          style={{ display: 'none' }}
        />
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginTop: 20 }}
          >
            {files.map((file, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 8,
              }}>
                <FileText size={20} color="var(--secondary)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{file.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFiles(files.filter((_, j) => j !== i)); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 12 }} onClick={handleUpload}>
              <Upload size={18} />
              Process Statement
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
