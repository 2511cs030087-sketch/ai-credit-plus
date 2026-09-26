import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AIChatDrawer from './AIChatDrawer';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiChatOpen, setAIChatOpen] = useState(false);

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
          score: 782,
          income: 78500,
          expenses: 42300,
          savings: 24200,
          emi: 8400
        }}
      />
    </div>
  );
}
