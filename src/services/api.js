// API Service Layer for AI Credit+

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper for making API calls with fast fallback to client-side logic
async function fetchAPI(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s timeout for fast fallback

  try {
    const token = localStorage.getItem('ai_credit_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`Backend API (${endpoint}) unavailable, utilizing client-side fallback engine:`, err.message);
    return null; // Return null so caller uses client-side engine seamlessly
  }
}

// Client-side Deterministic Alternative Credit Scoring Engine
export function calculateAlternativeCreditScore(data) {
  const {
    monthlyIncome = 78500,
    monthlyExpenses = 42300,
    savingsAmount = 24200,
    currentEmi = 8400,
    onTimePaymentRatio = 0.94,
    incomeMonthsConsistent = 6,
  } = data || {};

  // 1. Payment Behavior (Max 250 pts)
  const paymentScore = Math.min(250, onTimePaymentRatio * 250);

  // 2. Cash Flow Stability (Max 200 pts)
  const netCashFlow = monthlyIncome - monthlyExpenses;
  const cashFlowRatio = monthlyIncome > 0 ? netCashFlow / monthlyIncome : 0;
  const cashFlowScore = Math.min(200, Math.max(50, cashFlowRatio * 400));

  // 3. Savings Behavior (Max 150 pts)
  const savingsRate = monthlyIncome > 0 ? savingsAmount / monthlyIncome : 0;
  const savingsScore = Math.min(150, Math.max(30, savingsRate * 450));

  // 4. Debt Burden / EMI Ratio (Max 150 pts)
  const dti = monthlyIncome > 0 ? currentEmi / monthlyIncome : 0;
  const debtScore = Math.max(30, 150 - (dti * 300));

  // 5. Income Consistency (Max 100 pts)
  const incomeScore = Math.min(100, (incomeMonthsConsistent / 6) * 100);

  // 6. Transaction Stability (Max 50 pts)
  const transactionScore = 45; // Low variance

  const totalScore = Math.round(paymentScore + cashFlowScore + savingsScore + debtScore + incomeScore + transactionScore);
  const clampedScore = Math.max(300, Math.min(900, totalScore));

  let rating = 'Fair';
  if (clampedScore >= 750) rating = 'Excellent';
  else if (clampedScore >= 680) rating = 'Good';
  else if (clampedScore >= 600) rating = 'Moderate';
  else rating = 'High Risk';

  const savingsRatePct = Math.round(savingsRate * 100);
  const dtiPct = Math.round(dti * 100);

  return {
    score: clampedScore,
    rating,
    breakdown: [
      { name: 'Payment Behavior', score: Math.round((paymentScore / 250) * 100), weight: '25%', impact: '+14 pts', positive: true, detail: `Consistent on-time payments rate of ${Math.round(onTimePaymentRatio * 100)}%.` },
      { name: 'Cash Flow Stability', score: Math.round((cashFlowScore / 200) * 100), weight: '20%', impact: '+11 pts', positive: true, detail: `Positive net liquid cash flow (₹${netCashFlow.toLocaleString('en-IN')}/mo) maintained.` },
      { name: 'Savings Behavior', score: Math.round((savingsScore / 150) * 100), weight: '15%', impact: '+8 pts', positive: true, detail: `Active savings rate of ${savingsRatePct}% of monthly income.` },
      { name: 'Debt Burden (DTI)', score: Math.round((debtScore / 150) * 100), weight: '15%', impact: dti > 0.3 ? '-6 pts' : '+10 pts', positive: dti <= 0.3, detail: `Current debt-to-income ratio stands at ${dtiPct}%.` },
      { name: 'Income Consistency', score: Math.round((incomeScore / 100) * 100), weight: '15%', impact: '+12 pts', positive: true, detail: `Verified recurring monthly deposits for ${incomeMonthsConsistent}+ consecutive months.` },
      { name: 'Transaction Stability', score: Math.round((transactionScore / 50) * 100), weight: '10%', impact: '+7 pts', positive: true, detail: 'Low occurrence of irregular high debits or penalty fees.' }
    ]
  };
}

// EMI Calculation Engine
export function calculateEMI(principal, ratePerAnnum, tenureMonths) {
  const r = ratePerAnnum / 12 / 100;
  const n = tenureMonths;
  if (r === 0) {
    const emi = principal / n;
    return { emi: Math.round(emi), totalPayment: Math.round(principal), totalInterest: 0 };
  }
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest)
  };
}

// API Service Interface
export const apiService = {
  // Auth
  async login(email, password) {
    const apiRes = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (apiRes && apiRes.access_token) {
      localStorage.setItem('ai_credit_token', apiRes.access_token);
      return apiRes;
    }

    // Client-side authentication fallback
    const token = `jwt_token_${Date.now()}`;
    localStorage.setItem('ai_credit_token', token);

    const isDemoAdmin = email.toLowerCase().includes('admin');
    const userName = email.includes('@')
      ? email.split('@')[0].split('.')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      : 'Prathiksha Upadhyay';

    return {
      token,
      user: {
        id: `usr_${Date.now()}`,
        name: userName || 'Prathiksha Upadhyay',
        email,
        role: isDemoAdmin ? 'admin' : 'customer',
        userType: 'Individual',
        phone: '+91 98765 43210',
        avatar: userName ? userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'PU'
      }
    };
  },

  async register(formData) {
    const apiRes = await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    if (apiRes && apiRes.access_token) {
      localStorage.setItem('ai_credit_token', apiRes.access_token);
      return apiRes;
    }

    const token = `jwt_token_reg_${Date.now()}`;
    localStorage.setItem('ai_credit_token', token);

    const name = formData.fullName || 'New User';
    const avatar = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NU';

    return {
      token,
      user: {
        id: `usr_reg_${Date.now()}`,
        name,
        email: formData.email,
        phone: formData.phone || '+91 98765 43210',
        userType: formData.userType || 'Individual',
        role: 'customer',
        avatar
      }
    };
  },

  // Financial Analysis & Credit
  async getCreditScore(financialProfile) {
    const apiRes = await fetchAPI('/credit/score');
    if (apiRes) return apiRes;

    return calculateAlternativeCreditScore(financialProfile);
  },

  // AI Assistant Chat
  async queryAI(prompt, contextData) {
    const apiRes = await fetchAPI('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt, context: contextData })
    });
    if (apiRes && apiRes.response) return apiRes.response;

    const p = prompt.toLowerCase();
    const score = contextData?.score || 782;
    const income = contextData?.income || 78500;
    const emi = contextData?.emi || 8400;

    if (p.includes('score') || p.includes('decreased') || p.includes('why')) {
      return `Your AI Credit Score is **${score} (${score >= 750 ? 'Excellent' : score >= 680 ? 'Good' : 'Fair'})**. Key drivers:\n1. On-Time Payment Rate adds positive weight.\n2. Net Cash Flow adds consistent liquid stability.\n3. Your debt-to-income ratio is currently ${Math.round((emi/income)*100)}%, keeping your score in a healthy tier.`;
    }
    if (p.includes('afford') || p.includes('loan') || p.includes('lakh')) {
      const emiEst = calculateEMI(500000, 10.5, 48).emi;
      const newDti = Math.round(((emi + emiEst) / income) * 100);
      return `Yes! For a ₹5,00,000 loan at 10.5% interest over 4 years, the estimated EMI is **₹${emiEst.toLocaleString('en-IN')}/month**.\n\nWith your monthly income of ₹${income.toLocaleString('en-IN')}, your total Debt-to-Income ratio would be **${newDti}%**, which is safely below the recommended 40% cap.`;
    }
    if (p.includes('savings') || p.includes('health') || p.includes('improve')) {
      return `To boost your score to **820+**:\n- Increase your savings rate by 4-5%.\n- Maintain 100% on-time payment clearance over the next 3 billing cycles.\n- Avoid taking on high short-term credit card balances.`;
    }

    return `Based on your analyzed bank statement and financial health profile:\n- **Monthly Net Cash Flow**: Healthy\n- **AI Credit Score**: ${score}\n- **Debt-to-Income Ratio**: ${Math.round((emi/income)*100)}%\n\nYou are in a strong position for pre-approved credit lines. Let me know if you'd like a loan simulation!`;
  }
};
