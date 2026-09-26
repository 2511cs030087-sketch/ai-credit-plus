import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CreditGauge({ score = 742, min = 300, max = 900 }) {
  const [animatedScore, setAnimatedScore] = useState(min);
  const percentage = ((score - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 750) return '#10B981';
    if (s >= 650) return '#2563EB';
    if (s >= 550) return '#F59E0B';
    return '#EF4444';
  };

  const getRating = (s) => {
    if (s >= 750) return 'Excellent';
    if (s >= 650) return 'Good';
    if (s >= 550) return 'Fair';
    return 'Poor';
  };

  const color = getColor(score);
  const radius = 120;
  const strokeWidth = 18;
  const cx = 140;
  const cy = 140;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="credit-gauge-container">
      <div className="credit-gauge" style={{ width: 280, height: 180 }}>
        <svg viewBox="0 0 280 180" width="280" height="180">
          {/* Background arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Score arc */}
          <motion.path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
          {/* Gradient overlay dots */}
          {[0.2, 0.4, 0.6, 0.8].map((p, i) => {
            const a = Math.PI - (p * Math.PI);
            const x = cx + radius * Math.cos(a);
            const y = cy - radius * Math.sin(a);
            return <circle key={i} cx={x} cy={y} r={2} fill="var(--border)" opacity={0.3} />;
          })}
        </svg>
        <div className="gauge-score">
          <motion.div
            className="score-value"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {animatedScore}
          </motion.div>
          <div className="score-label">{getRating(score)}</div>
        </div>
      </div>
      <div className="gauge-range">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
