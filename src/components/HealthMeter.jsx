import { motion } from 'framer-motion';

export default function HealthMeter({ label, value, color = '#2563EB', suffix = '%' }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color }}>{value}{suffix}</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-bar-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}
