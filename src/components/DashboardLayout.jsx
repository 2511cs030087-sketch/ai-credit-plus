import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AIChatDrawer from './AIChatDrawer';
import { useStatement } from '../contexts/StatementContext';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiChatOpen, setAIChatOpen] = useState(false);
  const { statementData } = useStatement();

  const { financials, creditScoreData } = statementData;
  const { monthlyIncome, monthlyExpenses, savingsAmount, currentEmi } = financials;
  const { score } = creditScoreData;

  return (
    <div className="dashboard-wrapper">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <Topbar
          onMenuClick={() => setSidebarOpen(prev => !prev)}
          onOpenAIChat={() => setAIChatOpen(true)}
        />
        <main className="dashboard-content">
          <Outlet context={{ openAIChat: () => setAIChatOpen(true) }} />
        </main>
      </div>

      {/* Floating AI Chat Assistant Drawer */}
      <AIChatDrawer
        isOpen={aiChatOpen}
        onClose={() => setAIChatOpen(false)}
        contextData={{
          score: score || 782,
          income: monthlyIncome || 78500,
          expenses: monthlyExpenses || 42300,
          savings: savingsAmount || 24200,
          emi: currentEmi || 8400
        }}
      />
    </div>
  );
}
