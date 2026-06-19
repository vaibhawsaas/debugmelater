'use client';

import { useState } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    siteName: 'DebugMeLater',
    tagline: 'Premium 3D Websites & Source Code Marketplace',
    upiId: '',
    upiName: '',
    cloudinaryCloudName: '',
    cloudinaryApiKey: '',
    cloudinaryApiSecret: '',
    mongodbUri: '',
    jwtSecret: '',
    emailUser: '',
    emailPass: '',
    frontendUrl: 'http://localhost:3000',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggle = (key: string) => setShowPass(p => ({ ...p, [key]: !p[key] }));

  const renderInput = (key: keyof typeof form, label: string, placeholder: string, secret = false) => (
    <div className="form-group" key={key}>
      <label className="form-label" htmlFor={`setting-${key}`}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          id={`setting-${key}`}
          type={secret && !showPass[key] ? 'password' : 'text'}
          className="form-input"
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={{ paddingRight: secret ? 44 : undefined }}
        />
        {secret && (
          <button type="button" onClick={() => toggle(key)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }}>
            {showPass[key] ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Settings</h2>
        {saved && <span style={{ color: 'var(--success)', fontSize: 14 }}>✓ Settings saved!</span>}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Site */}
        <div className="admin-table-wrap" style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>Site Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {renderInput('siteName', 'Site Name', 'DebugMeLater')}
            {renderInput('tagline', 'Tagline', 'Premium Source Code Marketplace')}
            {renderInput('frontendUrl', 'Frontend URL', 'https://debugmelater.com')}
          </div>
        </div>

        {/* UPI */}
        <div className="admin-table-wrap" style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>Payment (UPI)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {renderInput('upiId', 'UPI ID', 'yourupi@bank')}
            {renderInput('upiName', 'UPI Name', 'Your Name')}
          </div>
        </div>

        {/* Cloudinary */}
        <div className="admin-table-wrap" style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>Cloudinary (Media Storage)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {renderInput('cloudinaryCloudName', 'Cloud Name', 'your-cloud-name')}
            {renderInput('cloudinaryApiKey', 'API Key', '123456789')}
            {renderInput('cloudinaryApiSecret', 'API Secret', 'xxxxxxxxxxxx', true)}
          </div>
        </div>

        {/* Email */}
        <div className="admin-table-wrap" style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>Email (Gmail)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {renderInput('emailUser', 'Email Address', 'hello@gmail.com')}
            {renderInput('emailPass', 'App Password', 'xxxx xxxx xxxx xxxx', true)}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="magnetic-btn" id="save-settings-btn" style={{ gap: 8 }}>
            <Save size={16} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
