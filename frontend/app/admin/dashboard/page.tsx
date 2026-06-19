'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Package, ClipboardList, Users, Check, X, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatPrice, MONTH_NAMES, timeAgo } from '@/lib/utils';
import api from '@/lib/api';

// Sample data for when API is unavailable
const SAMPLE_REVENUE = MONTH_NAMES.map((month, i) => ({
  month, revenue: 8000 + Math.sin(i * 0.8) * 4000 + i * 1200 + Math.random() * 2000,
  orders: 5 + Math.floor(Math.random() * 15),
}));

const SAMPLE_ORDERS = [
  { orderId: 'DML-ORD-1', customerName: 'Rahul Sharma', customerEmail: 'rahul@example.com', projectTitle: '3D Portfolio Pro', amount: 1299, status: 'pending', createdAt: new Date().toISOString() },
  { orderId: 'DML-ORD-2', customerName: 'Priya Mehta', customerEmail: 'priya@example.com', projectTitle: 'SaaS Dashboard', amount: 1999, status: 'approved', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { orderId: 'DML-ORD-3', customerName: 'Arjun Nair', customerEmail: 'arjun@example.com', projectTitle: 'Landing Page Kit', amount: 899, status: 'pending', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { orderId: 'DML-ORD-4', customerName: 'Sneha Reddy', customerEmail: 'sneha@example.com', projectTitle: 'Nebula 3D Site', amount: 2499, status: 'rejected', createdAt: new Date(Date.now() - 86400000).toISOString() },
];

interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 240000, monthRevenue: 42000, revenueGrowth: '12.5',
    totalOrders: 148, pendingOrders: 12, totalProjects: 52, publishedProjects: 48, totalDownloads: 892,
  });
  const [revenueData, setRevenueData] = useState(SAMPLE_REVENUE);
  const [recentOrders, setRecentOrders] = useState(SAMPLE_ORDERS);

  useEffect(() => {
    api.get('/analytics/dashboard')
      .then(res => {
        if (res.data.stats) setStats(res.data.stats);
        if (res.data.revenueByMonth?.length) {
          setRevenueData(res.data.revenueByMonth.map((d: { _id: { month: number }, revenue: number, orders: number }) => ({
            month: MONTH_NAMES[d._id.month - 1],
            revenue: d.revenue,
            orders: d.orders,
          })));
        }
        if (res.data.recentOrders?.length) setRecentOrders(res.data.recentOrders);
      })
      .catch(() => { });
  }, []);

  const STAT_CARDS: StatCard[] = [
    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), change: `↑ ${stats.revenueGrowth}%`, positive: true, icon: <TrendingUp size={20} />, color: '#7C3AED' },
    { label: 'Total Projects', value: `${stats.totalProjects}`, change: `${stats.publishedProjects} published`, positive: true, icon: <Package size={20} />, color: '#3B82F6' },
    { label: 'Total Orders', value: `${stats.totalOrders}`, change: `${stats.pendingOrders} pending`, positive: stats.pendingOrders === 0, icon: <ClipboardList size={20} />, color: '#06B6D4' },
    { label: 'Downloads', value: `${stats.totalDownloads}`, change: 'Total deliveries', positive: true, icon: <Users size={20} />, color: '#22C55E' },
  ];

  const approveOrder = async (orderId: string) => {
    try {
      await api.patch(`/orders/${orderId}/approve`);
      setRecentOrders(orders => orders.map(o => o.orderId === orderId ? { ...o, status: 'approved' } : o));
    } catch { }
  };

  const rejectOrder = async (orderId: string) => {
    try {
      await api.patch(`/orders/${orderId}/reject`);
      setRecentOrders(orders => orders.map(o => o.orderId === orderId ? { ...o, status: 'rejected' } : o));
    } catch { }
  };

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, color: 'var(--text-primary)' }}>Dashboard</h2>

      {/* Stats */}
      <div className="admin-stats-grid">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="admin-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p className="admin-stat-card__label">{card.label}</p>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${card.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color }}>
                {card.icon}
              </div>
            </div>
            <p className="admin-stat-card__value">{card.value}</p>
            <p className={`admin-stat-card__change ${card.positive ? 'admin-stat-card__change--up' : 'admin-stat-card__change--down'}`}>
              {card.change}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="admin-table-wrap" style={{ padding: 24, marginBottom: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>Revenue — Last 12 Months</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: '#141720', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F8FAFC' }}
              formatter={(value: any) => [
                formatPrice(value ?? 0),
                "Revenue",
              ]}
            />
            <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2} fill="url(#revenueGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent orders */}
      <div className="admin-table-wrap">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Recent Orders</h3>
          <a href="/admin/orders" style={{ fontSize: 13, color: 'var(--accent-violet)' }}>View all →</a>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.orderId}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-primary)' }}>{order.orderId}</td>
                  <td>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{order.customerName}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{order.customerEmail}</p>
                  </td>
                  <td>{order.projectTitle}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(order.amount)}</td>
                  <td>
                    <span className={`status-pill status-pill--${order.status}`}>
                      {order.status === 'pending' && <Clock size={10} />}
                      {order.status === 'approved' && <Check size={10} />}
                      {order.status === 'rejected' && <X size={10} />}
                      {order.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{timeAgo(order.createdAt)}</td>
                  <td>
                    {order.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn-sm btn-sm--primary"
                          style={{ fontSize: 11, padding: '4px 10px' }}
                          onClick={() => approveOrder(order.orderId)}
                          id={`approve-${order.orderId}`}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-sm btn-sm--outline"
                          style={{ fontSize: 11, padding: '4px 10px', color: 'var(--error)', borderColor: 'rgba(239,68,68,0.3)' }}
                          onClick={() => rejectOrder(order.orderId)}
                          id={`reject-${order.orderId}`}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
