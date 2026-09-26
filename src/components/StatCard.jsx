import { motion } from 'framer-motion';
import {
  TrendingUp, Heart, CheckCircle, Building2, Shield, Banknote,
  Calendar, Clock, ArrowUp, ArrowDown
} from 'lucide-react';

const iconMap = {
  TrendingUp, Heart, CheckCircle, Building2, Shield, Banknote, Calendar, Clock
};

const colorBgs = {
  '#2563EB': 'rgba(37, 99, 235, 0.1)',
  '#10B981': 'rgba(16, 185, 129, 0.1)',
  '#8B5CF6': 'rgba(139, 92, 246, 0.1)',
  '#06B6D4': 'rgba(6, 182, 212, 0.1)',
  '#F59E0B': 'rgba(245, 158, 11, 0.1)',
  '#EF4444': 'rgba(239, 68, 68, 0.1)',
};

export default function StatCard({ label, value, trend, trendDir, icon, color, index = 0 }) {
  const IconComponent = iconMap[icon] || TrendingUp;

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="stat-icon" style={{ background: colorBgs[color] || 'rgba(37,99,235,0.1)' }}>
        <IconComponent size={22} color={color} />
      </div>
      <div className="stat-info">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        <div className={`stat-trend ${trendDir === 'up' ? 'up' : 'down'}`}>
          {trendDir === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {trend}
        </div>
      </div>
    </motion.div>
  );
}
