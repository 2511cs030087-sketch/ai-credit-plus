import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { calculateAlternativeCreditScore } from '../services/api';
import { recentTransactions as defaultTransactions, incomeData as defaultIncomeData } from '../data/mockData';

const StatementContext = createContext(null);

const DEFAULT_FINANCIALS = {
  monthlyIncome: 78500,
  monthlyExpenses: 42300,
  savingsAmount: 24200,
  currentEmi: 8400,
  onTimePaymentRatio: 0.94,
  incomeMonthsConsistent: 6,
};

export function StatementProvider({ children }) {
  const [statementData, setStatementData] = useState(() => {
    const saved = localStorage.getItem('ai_credit_statement');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved statement', e);
      }
    }
    const initialScore = calculateAlternativeCreditScore(DEFAULT_FINANCIALS);
    return {
      fileName: 'HDFC_Bank_Statement_H1_2026.pdf',
      uploadDate: '2026-07-15',
      status: 'verified',
      financials: DEFAULT_FINANCIALS,
      creditScoreData: initialScore,
      transactions: defaultTransactions,
      incomeTrends: defaultIncomeData,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('ai_credit_statement', JSON.stringify(statementData));
    } catch (e) {
      console.error('Failed to save statement data', e);
    }
  }, [statementData]);

  // Helper to extract or generate statement data based on file content/name
  const uploadAndAnalyzeStatement = useCallback(async (file) => {
    return new Promise((resolve) => {
      const fileName = file ? file.name : 'Uploaded_Bank_Statement.pdf';
      const uploadDate = new Date().toISOString().split('T')[0];

      let parsedFinancials = { ...DEFAULT_FINANCIALS };
      let newTransactions = [...defaultTransactions];

      const processData = (extractedText = '') => {
        // Simple deterministic algorithm or heuristics based on file text/name
        let baseIncome = 82000;
        let baseExpenses = 41000;
        let baseSavings = 25000;

        // If file contains custom text or CSV, let's extract values if present
        if (extractedText && (extractedText.includes('salary') || extractedText.includes('income') || extractedText.includes('Credit'))) {
          const numbers = extractedText.match(/\d{4,6}/g);
          if (numbers && numbers.length >= 2) {
            baseIncome = Math.max(50000, Math.min(250000, parseInt(numbers[0], 10)));
            baseExpenses = Math.round(baseIncome * 0.52);
            baseSavings = baseIncome - baseExpenses - 8400;
          }
        } else if (fileName.toLowerCase().includes('freelance') || fileName.toLowerCase().includes('gig')) {
          baseIncome = 96000;
          baseExpenses = 48000;
          baseSavings = 32000;
        } else if (fileName.toLowerCase().includes('business') || fileName.toLowerCase().includes('vendor')) {
          baseIncome = 145000;
          baseExpenses = 82000;
          baseSavings = 42000;
        } else {
          // Dynamic variance based on file size/name length
          const hash = fileName.length * 1337 + (file ? file.size : 5000);
          baseIncome = 75000 + (hash % 45000);
          baseExpenses = Math.round(baseIncome * (0.45 + (hash % 15) / 100));
          baseSavings = Math.max(10000, baseIncome - baseExpenses - 8400);
        }

        parsedFinancials = {
          monthlyIncome: baseIncome,
          monthlyExpenses: baseExpenses,
          savingsAmount: baseSavings,
          currentEmi: 8400,
          onTimePaymentRatio: 0.96,
          incomeMonthsConsistent: 6,
        };

        const calculatedScore = calculateAlternativeCreditScore(parsedFinancials);

        // Generate updated recent transactions
        newTransactions = [
          { id: 101, date: uploadDate, description: `Salary / Inflow (${fileName.split('.')[0]})`, category: 'Income', amount: `+₹${baseIncome.toLocaleString('en-IN')}`, type: 'credit' },
          { id: 102, date: uploadDate, description: 'Primary Housing / Utility Clearing', category: 'Expense', amount: `-₹${Math.round(baseExpenses * 0.4).toLocaleString('en-IN')}`, type: 'debit' },
          { id: 103, date: uploadDate, description: 'HDFC Loan EMI Auto-Debit', category: 'Loan', amount: '-₹8,400', type: 'debit' },
          { id: 104, date: uploadDate, description: 'Recurring SIP Investment', category: 'Savings', amount: `-₹${Math.round(baseSavings * 0.5).toLocaleString('en-IN')}`, type: 'debit' },
          ...defaultTransactions.slice(0, 4)
        ];

        // Generate updated trends
        const newTrends = defaultIncomeData.map((item, idx) => {
          const factor = 0.85 + (idx * 0.05);
          const inc = Math.round(baseIncome * factor);
          const exp = Math.round(baseExpenses * factor);
          return {
            ...item,
            income: inc,
            expense: exp,
            savings: inc - exp
          };
        });

        const newStatementState = {
          fileName,
          uploadDate,
          status: 'verified',
          financials: parsedFinancials,
          creditScoreData: calculatedScore,
          transactions: newTransactions,
          incomeTrends: newTrends,
        };

        setStatementData(newStatementState);
        resolve(newStatementState);
      };

      if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt') || file.type.startsWith('text/'))) {
        const reader = new FileReader();
        reader.onload = (e) => processData(e.target.result);
        reader.onerror = () => processData('');
        reader.readAsText(file);
      } else {
        processData('');
      }
    });
  }, []);

  const resetStatementData = useCallback(() => {
    const initialScore = calculateAlternativeCreditScore(DEFAULT_FINANCIALS);
    const resetState = {
      fileName: 'HDFC_Bank_Statement_H1_2026.pdf',
      uploadDate: '2026-07-15',
      status: 'verified',
      financials: DEFAULT_FINANCIALS,
      creditScoreData: initialScore,
      transactions: defaultTransactions,
      incomeTrends: defaultIncomeData,
    };
    setStatementData(resetState);
    localStorage.removeItem('ai_credit_statement');
  }, []);

  return (
    <StatementContext.Provider value={{
      statementData,
      uploadAndAnalyzeStatement,
      resetStatementData,
    }}>
      {children}
    </StatementContext.Provider>
  );
}

export function useStatement() {
  const context = useContext(StatementContext);
  if (!context) throw new Error('useStatement must be used within StatementProvider');
  return context;
}
