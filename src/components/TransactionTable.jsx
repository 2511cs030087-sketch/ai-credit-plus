import { motion } from 'framer-motion';

export default function TransactionTable({ transactions }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <motion.tr
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{tx.date}</td>
              <td style={{ fontWeight: 500 }}>{tx.description}</td>
              <td>
                <span className={`badge ${tx.type === 'credit' ? 'badge-success' : 'badge-danger'}`}>
                  {tx.category}
                </span>
              </td>
              <td style={{
                fontWeight: 700,
                color: tx.type === 'credit' ? 'var(--accent)' : 'var(--risk-high)',
                fontVariantNumeric: 'tabular-nums'
              }}>
                {tx.amount}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
