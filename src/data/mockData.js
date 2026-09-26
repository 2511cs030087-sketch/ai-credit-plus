export const mockUser = {
  name: 'Prathiksha Upadhyay',
  email: 'prathiksha@example.com',
  phone: '+91 98765 43210',
  avatar: 'PU',
  role: 'customer',
  occupation: 'Business Owner',
  company: 'TechVentures Pvt Ltd',
  pan: 'ABCPD1234E',
  aadhaar: '•••• •••• 4321',
  address: 'Bangalore, Karnataka',
  income: '₹12,50,000/yr',
  memberSince: 'Jan 2024',
};

export const mockAdmin = {
  name: 'Admin User',
  email: 'admin@aicreditplus.com',
  avatar: 'AD',
  role: 'admin',
};

export const dashboardStats = [
  { id: 1, label: 'Alternative Credit Score', value: '742', trend: '+12', trendDir: 'up', icon: 'TrendingUp', color: '#2563EB' },
  { id: 2, label: 'Financial Health Score', value: '78%', trend: '+5%', trendDir: 'up', icon: 'Heart', color: '#10B981' },
  { id: 3, label: 'Repayment Probability', value: '94%', trend: '+2%', trendDir: 'up', icon: 'CheckCircle', color: '#8B5CF6' },
  { id: 4, label: 'Business Health', value: 'Good', trend: 'Stable', trendDir: 'up', icon: 'Building2', color: '#06B6D4' },
  { id: 5, label: 'Risk Level', value: 'Low', trend: '-8%', trendDir: 'up', icon: 'Shield', color: '#10B981' },
  { id: 6, label: 'Recommended Loan', value: '₹5.2L', trend: '+₹50K', trendDir: 'up', icon: 'Banknote', color: '#F59E0B' },
  { id: 7, label: 'Current EMI', value: '₹12,450', trend: 'On Track', trendDir: 'up', icon: 'Calendar', color: '#2563EB' },
  { id: 8, label: 'Upcoming EMI', value: '₹12,450', trend: 'Aug 5', trendDir: 'up', icon: 'Clock', color: '#EF4444' },
];

export const incomeData = [
  { month: 'Jan', income: 85000, expense: 52000, savings: 33000 },
  { month: 'Feb', income: 92000, expense: 48000, savings: 44000 },
  { month: 'Mar', income: 78000, expense: 55000, savings: 23000 },
  { month: 'Apr', income: 95000, expense: 51000, savings: 44000 },
  { month: 'May', income: 88000, expense: 47000, savings: 41000 },
  { month: 'Jun', income: 102000, expense: 53000, savings: 49000 },
  { month: 'Jul', income: 98000, expense: 50000, savings: 48000 },
  { month: 'Aug', income: 110000, expense: 58000, savings: 52000 },
  { month: 'Sep', income: 105000, expense: 54000, savings: 51000 },
  { month: 'Oct', income: 115000, expense: 60000, savings: 55000 },
  { month: 'Nov', income: 108000, expense: 56000, savings: 52000 },
  { month: 'Dec', income: 120000, expense: 62000, savings: 58000 },
];

export const cashFlowData = [
  { month: 'Jan', inflow: 85000, outflow: 52000 },
  { month: 'Feb', inflow: 92000, outflow: 48000 },
  { month: 'Mar', inflow: 78000, outflow: 55000 },
  { month: 'Apr', inflow: 95000, outflow: 51000 },
  { month: 'May', inflow: 88000, outflow: 47000 },
  { month: 'Jun', inflow: 102000, outflow: 53000 },
];

export const monthlyTransactions = [
  { month: 'Jan', count: 42 },
  { month: 'Feb', count: 38 },
  { month: 'Mar', count: 55 },
  { month: 'Apr', count: 47 },
  { month: 'May', count: 36 },
  { month: 'Jun', count: 51 },
];

export const riskTimeline = [
  { month: 'Jan', risk: 35 },
  { month: 'Feb', risk: 28 },
  { month: 'Mar', risk: 42 },
  { month: 'Apr', risk: 30 },
  { month: 'May', risk: 22 },
  { month: 'Jun', risk: 18 },
];

export const recentTransactions = [
  { id: 1, date: '2026-07-15', description: 'Payment from Client ABC', category: 'Income', amount: '+₹45,000', type: 'credit' },
  { id: 2, date: '2026-07-14', description: 'Office Rent Payment', category: 'Expense', amount: '-₹25,000', type: 'debit' },
  { id: 3, date: '2026-07-13', description: 'Software Subscription', category: 'Expense', amount: '-₹4,999', type: 'debit' },
  { id: 4, date: '2026-07-12', description: 'Freelance Project', category: 'Income', amount: '+₹18,500', type: 'credit' },
  { id: 5, date: '2026-07-11', description: 'EMI Payment - HDFC', category: 'Loan', amount: '-₹12,450', type: 'debit' },
  { id: 6, date: '2026-07-10', description: 'GST Refund', category: 'Income', amount: '+₹8,200', type: 'credit' },
  { id: 7, date: '2026-07-09', description: 'Utility Bills', category: 'Expense', amount: '-₹3,800', type: 'debit' },
  { id: 8, date: '2026-07-08', description: 'Client Payment - XYZ Corp', category: 'Income', amount: '+₹62,000', type: 'credit' },
];

export const aiSuggestions = [
  { id: 1, title: 'Reduce Discretionary Spending', description: 'Your entertainment expenses increased 23% this month. Consider setting a monthly budget of ₹5,000.', type: 'expense', icon: 'TrendingDown', color: '#EF4444' },
  { id: 2, title: 'Start SIP Investment', description: 'With your current savings of ₹48,000/month, investing ₹15,000 in SIP could yield 12-15% annual returns.', type: 'savings', icon: 'PiggyBank', color: '#10B981' },
  { id: 3, title: 'Credit Score Improvement', description: 'Pay credit card bills before due date. Your on-time payment rate is 89%, improving to 100% can boost your score by 30+ points.', type: 'credit', icon: 'TrendingUp', color: '#2563EB' },
  { id: 4, title: 'Business Growth Opportunity', description: 'Revenue growth trend is positive at 8% MoM. Consider reinvesting 10% of profits into marketing.', type: 'business', icon: 'Rocket', color: '#8B5CF6' },
  { id: 5, title: 'Emergency Fund Alert', description: 'Your emergency fund covers only 2.5 months of expenses. Aim for at least 6 months coverage.', type: 'savings', icon: 'AlertTriangle', color: '#F59E0B' },
];

export const loanRecommendation = {
  eligibility: 'Eligible',
  amount: '₹5,20,000',
  interestRate: '10.5%',
  emi: '₹12,450',
  tenure: '48 months',
  approvalStatus: 'Pre-Approved',
  reasons: [
    'Consistent income growth over 6 months',
    'Low debt-to-income ratio (22%)',
    'Strong repayment history',
    'Business revenue trending upward',
  ],
};

export const creditScoreData = {
  score: 742,
  range: { min: 300, max: 900 },
  rating: 'Good',
  positiveFactors: [
    { factor: 'On-time Payment History', impact: 'High Positive', detail: '94% on-time payments in last 12 months' },
    { factor: 'Low Credit Utilization', impact: 'High Positive', detail: 'Using only 28% of available credit' },
    { factor: 'Diverse Income Sources', impact: 'Medium Positive', detail: '3 verified income streams detected' },
    { factor: 'Consistent Savings Pattern', impact: 'Medium Positive', detail: 'Average monthly savings of ₹48,000' },
  ],
  negativeFactors: [
    { factor: 'High Monthly Expenses', impact: 'Medium Negative', detail: 'Expense-to-income ratio at 52%' },
    { factor: 'Recent Credit Inquiry', impact: 'Low Negative', detail: '2 hard inquiries in last 6 months' },
  ],
  suggestions: [
    'Maintain on-time payments to reach 750+ score',
    'Reduce credit utilization below 25%',
    'Avoid new credit applications for 3 months',
    'Build emergency fund to 6 months of expenses',
  ],
};

export const financialHealthData = {
  incomeStability: 85,
  savingsScore: 72,
  expenseScore: 68,
  cashFlowScore: 78,
  businessRevenue: 82,
  debtRatio: 22,
};

export const businessHealthData = {
  revenueData: [
    { month: 'Jan', revenue: 320000, profit: 85000 },
    { month: 'Feb', revenue: 350000, profit: 92000 },
    { month: 'Mar', revenue: 310000, profit: 78000 },
    { month: 'Apr', revenue: 380000, profit: 105000 },
    { month: 'May', revenue: 365000, profit: 98000 },
    { month: 'Jun', revenue: 420000, profit: 118000 },
  ],
  growthRate: 8.2,
  cashFlow: 'Positive',
  businessRisk: 'Low',
  inventoryTurnover: 4.5,
  businessStability: 'Stable',
};

export const riskAlerts = [
  { id: 1, level: 'high', title: 'Unusual Large Transaction', description: 'A transaction of ₹1,50,000 was detected, 3x above your average.', date: '2026-07-15', time: '14:30' },
  { id: 2, level: 'medium', title: 'EMI Payment Due Soon', description: 'Your HDFC loan EMI of ₹12,450 is due on July 20th.', date: '2026-07-14', time: '09:00' },
  { id: 3, level: 'low', title: 'Credit Utilization Increase', description: 'Credit card utilization increased from 25% to 32% this month.', date: '2026-07-12', time: '11:15' },
  { id: 4, level: 'medium', title: 'Cash Flow Dip Detected', description: 'Monthly cash flow decreased by 15% compared to last month.', date: '2026-07-10', time: '16:45' },
  { id: 5, level: 'low', title: 'New Recurring Expense', description: 'New subscription of ₹2,499/month detected from streaming service.', date: '2026-07-08', time: '08:20' },
  { id: 6, level: 'high', title: 'Multiple Failed Transactions', description: '3 failed debit transactions detected in last 24 hours.', date: '2026-07-06', time: '19:10' },
];

export const notifications = [
  { id: 1, type: 'emi', title: 'EMI Reminder', message: 'Your HDFC loan EMI of ₹12,450 is due on July 20th.', time: '2 hours ago', read: false },
  { id: 2, type: 'risk', title: 'Risk Alert', message: 'Unusual spending pattern detected in your account.', time: '5 hours ago', read: false },
  { id: 3, type: 'loan', title: 'Loan Pre-Approved', message: 'You are pre-approved for a business loan of ₹5.2L at 10.5% interest.', time: '1 day ago', read: true },
  { id: 4, type: 'document', title: 'Document Verified', message: 'Your bank statement for June 2026 has been verified successfully.', time: '2 days ago', read: true },
  { id: 5, type: 'emi', title: 'EMI Paid Successfully', message: 'EMI of ₹12,450 for HDFC loan debited successfully.', time: '5 days ago', read: true },
  { id: 6, type: 'loan', title: 'Loan Application Update', message: 'Your personal loan application is under review.', time: '1 week ago', read: true },
];

export const adminStats = [
  { id: 1, label: 'Total Users', value: '12,847', trend: '+342', trendDir: 'up', icon: 'Users', color: '#2563EB' },
  { id: 2, label: 'Loans Approved', value: '3,241', trend: '+89', trendDir: 'up', icon: 'CheckCircle', color: '#10B981' },
  { id: 3, label: 'Loans Rejected', value: '892', trend: '-12', trendDir: 'up', icon: 'XCircle', color: '#EF4444' },
  { id: 4, label: 'Avg Credit Score', value: '698', trend: '+8', trendDir: 'up', icon: 'BarChart3', color: '#8B5CF6' },
  { id: 5, label: 'Total Risk Alerts', value: '1,247', trend: '-56', trendDir: 'up', icon: 'AlertTriangle', color: '#F59E0B' },
  { id: 6, label: 'Business Health Avg', value: '74%', trend: '+3%', trendDir: 'up', icon: 'Activity', color: '#06B6D4' },
];

export const adminLoanData = [
  { month: 'Jan', approved: 245, rejected: 78, pending: 34 },
  { month: 'Feb', approved: 268, rejected: 82, pending: 29 },
  { month: 'Mar', approved: 290, rejected: 65, pending: 42 },
  { month: 'Apr', approved: 312, rejected: 71, pending: 38 },
  { month: 'May', approved: 278, rejected: 68, pending: 31 },
  { month: 'Jun', approved: 335, rejected: 59, pending: 45 },
];

export const adminScoreDistribution = [
  { range: '300-400', count: 420 },
  { range: '400-500', count: 1250 },
  { range: '500-600', count: 2840 },
  { range: '600-700', count: 3920 },
  { range: '700-800', count: 3180 },
  { range: '800-900', count: 1237 },
];

export const adminIncomeDistribution = [
  { range: '<3L', count: 1820 },
  { range: '3-5L', count: 3240 },
  { range: '5-10L', count: 4150 },
  { range: '10-20L', count: 2430 },
  { range: '>20L', count: 1207 },
];

export const adminUsers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', score: 785, status: 'Active', loanStatus: 'Approved', risk: 'Low' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', score: 652, status: 'Active', loanStatus: 'Pending', risk: 'Medium' },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', score: 498, status: 'Active', loanStatus: 'Rejected', risk: 'High' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', score: 721, status: 'Active', loanStatus: 'Approved', risk: 'Low' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', score: 610, status: 'Inactive', loanStatus: 'Pending', risk: 'Medium' },
  { id: 6, name: 'Ananya Gupta', email: 'ananya@example.com', score: 834, status: 'Active', loanStatus: 'Approved', risk: 'Low' },
  { id: 7, name: 'Karthik Nair', email: 'karthik@example.com', score: 445, status: 'Active', loanStatus: 'Rejected', risk: 'High' },
  { id: 8, name: 'Meera Joshi', email: 'meera@example.com', score: 756, status: 'Active', loanStatus: 'Approved', risk: 'Low' },
];

export const fraudAlerts = [
  { id: 1, user: 'Amit Kumar', type: 'Suspicious Activity', description: 'Multiple login attempts from different locations', severity: 'High', date: '2026-07-15' },
  { id: 2, user: 'Unknown', type: 'Document Fraud', description: 'Tampered bank statement uploaded', severity: 'Critical', date: '2026-07-14' },
  { id: 3, user: 'Vikram Singh', type: 'Identity Mismatch', description: 'PAN and Aadhaar name mismatch detected', severity: 'Medium', date: '2026-07-12' },
];

export const faqs = [
  {
    question: 'What is an Alternative Credit Score?',
    answer: 'An Alternative Credit Score uses non-traditional data like bank statements, transaction history, income patterns, and business activity to assess creditworthiness. Unlike traditional credit scores that rely on credit bureau data, our AI analyzes your financial behavior for a more comprehensive evaluation.'
  },
  {
    question: 'How does AI Credit+ assess my creditworthiness?',
    answer: 'AI Credit+ uses advanced machine learning algorithms to analyze your bank statements, income patterns, spending behavior, savings habits, and business metrics. This gives a holistic view of your financial health beyond just credit history.'
  },
  {
    question: 'Is my data secure with AI Credit+?',
    answer: 'Absolutely. We use bank-grade encryption (AES-256) and follow RBI guidelines for data security. Your data is never shared with third parties without your explicit consent. We are also SOC 2 Type II certified.'
  },
  {
    question: 'How quickly can I get a loan recommendation?',
    answer: 'Once you upload your bank statement, our AI processes it in under 2 minutes. You will receive your credit score, financial health analysis, and personalized loan recommendations almost instantly.'
  },
  {
    question: 'What file formats are supported for bank statements?',
    answer: 'We support PDF, CSV, and Excel (.xlsx, .xls) formats for bank statement uploads. Most banks provide statements in at least one of these formats through their net banking portals.'
  },
  {
    question: 'Can I use AI Credit+ if I don\'t have a traditional credit history?',
    answer: 'Yes! That\'s exactly what we\'re built for. AI Credit+ is designed to help individuals and businesses who may not have extensive credit bureau records. We use alternative data to build your financial profile.'
  },
];

export const testimonials = [
  {
    name: 'Rajesh Mehta',
    role: 'Small Business Owner',
    avatar: 'RM',
    quote: 'AI Credit+ helped me get a business loan when traditional banks rejected my application. Their alternative credit assessment truly understands small business finances.',
  },
  {
    name: 'Anita Desai',
    role: 'Freelance Designer',
    avatar: 'AD',
    quote: 'As a freelancer, getting credit was always a challenge. AI Credit+ analyzed my income patterns and helped me secure a personal loan with great terms.',
  },
  {
    name: 'Suresh Kumar',
    role: 'Startup Founder',
    avatar: 'SK',
    quote: 'The financial health insights are incredibly detailed. The AI suggestions helped me improve my credit score by 85 points in just 4 months.',
  },
];
