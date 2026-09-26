import { motion } from 'framer-motion';

export default function ChartCard({ title, children, action }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-header">
        <h4>{title}</h4>
        {action && <div>{action}</div>}
      </div>
      <div className="card-body">
        {children}
      </div>
    </motion.div>
  );
}
