'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { MONTH_NAMES, formatPrice } from '@/lib/utils';

const REVENUE_DATA = MONTH_NAMES.map((month, i) => ({
  month, revenue: 8000 + Math.sin(i * 0.8) * 4000 + i * 1200,
  orders: 5 + Math.floor(Math.random() * 15),
}));

const STATUS_DATA = [
  { name: 'Approved', value: 89, color: '#22C55E' },
  { name: 'Pending', value: 12, color: '#F59E0B' },
  { name: 'Rejected', value: 8, color: '#EF4444' },
];

const TOP_PROJECTS = [
  { name: '3D Portfolio Pro', sales: 45 },
  { name: 'SaaS Dashboard', sales: 31 },
  { name: 'Landing Page Kit', sales: 28 },
  { name: 'Creative Agency', sales: 22 },
  { name: 'Admin Panel Dark', sales: 19 },
];

export default function AnalyticsClient() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, color: 'var(--text-primary)' }}>Analytics</h2>

      {/* Key metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Avg Order Value', value: '₹1,622' },
          { label: 'Conversion Rate', value: '3.4%' },
          { label: 'Most Viewed', value: '3D Portfolio' },
          { label: 'Best Seller', value: 'DML-001' },
        ].map(({ label, value }) => (
          <div key={label} className="admin-stat-card">
            <p className="admin-stat-card__label">{label}</p>
            <p className="admin-stat-card__value" style={{ fontSize: 20 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Revenue area chart */}
      <div className="admin-table-wrap" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={REVENUE_DATA}>
            <defs>
              <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: '#141720', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }} formatter={(v: number) => [formatPrice(v), 'Revenue']} />
            <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2} fill="url(#ag1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Orders by status */}
        <div className="admin-table-wrap" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>Orders by Status</h3>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <PieChart width={160} height={160}>
              <Pie data={STATUS_DATA} cx={75} cy={75} innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                {STATUS_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STATUS_DATA.map(({ name, value, color }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginLeft: 'auto' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top selling */}
        <div className="admin-table-wrap" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>Top Selling Projects</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={TOP_PROJECTS} layout="vertical" margin={{ left: 0 }}>
              <XAxis type="number" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
              <Tooltip contentStyle={{ background: '#141720', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }} />
              <Bar dataKey="sales" fill="#7C3AED" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
