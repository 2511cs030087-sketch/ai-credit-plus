import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, User, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';

export default function AIChatDrawer({ isOpen, onClose, contextData }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am **AI Credit+ Intelligence Assistant**. Ask me anything about your credit score, loan affordability, cash flow, or financial health.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const exampleQuestions = [
    'Why did my score decrease?',
    'How can I improve my credit score?',
    'Can I afford a ₹5 lakh loan?',
    'What is my savings rate?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (questionText) => {
    const query = questionText || input;
    if (!query.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const responseText = await apiService.queryAI(query, contextData);
      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = { id: Date.now() + 1, sender: 'ai', text: 'I encountered an issue processing your query. Please try again.' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '400px',
          height: '560px',
          maxHeight: 'calc(100vh - 48px)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--brand-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-red)'
              }}
            >
              <Bot size={18} color="#FFFFFF" />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Ask AI Credit<span style={{ color: 'var(--brand-red)' }}>+</span>
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Financial Assistant • Context Active</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {m.sender === 'ai' && (
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-red-glow)',
                    border: '1px solid var(--border-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Sparkles size={14} color="var(--brand-red-bright)" />
                </div>
              )}
              <div
                style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: m.sender === 'user' ? 'var(--brand-red)' : 'var(--bg-tertiary)',
                  color: m.sender === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  boxShadow: m.sender === 'user' ? 'var(--shadow-red)' : 'none'
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Sparkles size={14} color="var(--brand-red-bright)" className="animate-spin" />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Analyzing financial profile...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Example Prompts */}
        <div style={{ padding: '8px 12px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {exampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{
            padding: '12px 16px',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '8px'
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Credit+ a financial question..."
            className="input-field"
            style={{ padding: '8px 12px', fontSize: '13px' }}
          />
          <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
            <Send size={14} />
          </button>
        </form>
      </div>
    </AnimatePresence>
  );
}
