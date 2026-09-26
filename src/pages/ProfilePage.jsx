import { useState } from 'react';
import { User, Mail, Phone, Building, ShieldCheck, CheckCircle2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Prathiksha Upadhyay',
    email: user?.email || 'prathiksha@example.com',
    phone: user?.phone || '+91 98765 43210',
    occupation: user?.occupation || 'Business Owner',
    company: user?.company || 'TechVentures Pvt Ltd',
    pan: user?.pan || 'ABCPD1234E',
    income: user?.income || '₹12,50,000/yr'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Profile & Financial Preferences</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Manage your verified applicant details, security consents, and connected financial signals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Personal & Professional Information</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Occupation Category</label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Company / Organization</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">PAN Card</label>
            <input
              type="text"
              value={formData.pan}
              onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
          {saved && (
            <span style={{ fontSize: '13px', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={16} /> Profile information updated!
            </span>
          )}
          <button type="submit" className="btn btn-primary" style={{ marginLeft: 'auto' }}>
            <Save size={16} /> Save Profile Updates
          </button>
        </div>
      </form>
    </div>
  );
}
