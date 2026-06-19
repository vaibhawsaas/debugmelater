'use client';

import { useState, useEffect } from 'react';
import { Check, X, Clock, ExternalLink, Eye } from 'lucide-react';
import { IOrder } from '@/types';
import { formatPrice, timeAgo } from '@/lib/utils';
import api from '@/lib/api';

const STATUS_TABS = ['all', 'pending', 'approved', 'rejected'];

const SAMPLE_ORDERS: IOrder[] = [
  { _id: 'o1', orderId: 'DML-ORD-ABC1', customerName: 'Rahul Sharma', customerEmail: 'rahul@example.com', customerPhone: '9876543210', projectId: 'p1', projectCode: 'DML-001', projectTitle: '3D Portfolio Pro', amount: 1299, currency: 'INR', paymentScreenshot: '', status: 'pending', downloadSent: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'o2', orderId: 'DML-ORD-DEF2', customerName: 'Priya Mehta', customerEmail: 'priya@example.com', customerPhone: '9876543211', projectId: 'p2', projectCode: 'DML-002', projectTitle: 'SaaS Dashboard', amount: 1999, currency: 'INR', paymentScreenshot: '', status: 'approved', downloadSent: true, createdAt: new Date(Date.now() - 3600000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'o3', orderId: 'DML-ORD-GHI3', customerName: 'Arjun Nair', customerEmail: 'arjun@example.com', customerPhone: '9876543212', projectId: 'p3', projectCode: 'DML-003', projectTitle: 'Landing Page Kit', amount: 899, currency: 'INR', paymentScreenshot: '', status: 'rejected', downloadSent: false, createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date().toISOString() },
];

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState<IOrder[]>(SAMPLE_ORDERS);
  const [screenshotModal, setScreenshotModal] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    api.get('/orders', { params: { status: activeTab } })
      .then(res => { if (res.data.orders?.length) setOrders(res.data.orders); })
      .catch(() => {});
  }, [activeTab]);

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const filtered = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab);

  const approve = async (id: string) => {
    setProcessing(id);
    try {
      await api.patch(`/orders/${id}/approve`);
      setOrders(os => os.map(o => o._id === id ? { ...o, status: 'approved' as const, downloadSent: true } : o));
    } catch {
      // Mock for demo
      setOrders(os => os.map(o => o._id === id ? { ...o, status: 'approved' as const, downloadSent: true } : o));
    } finally {
      setProcessing(null);
    }
  };

  const reject = async (id: string) => {
    setProcessing(id);
    try {
      await api.patch(`/orders/${id}/reject`);
      setOrders(os => os.map(o => o._id === id ? { ...o, status: 'rejected' as const } : o));
    } catch {
      setOrders(os => os.map(o => o._id === id ? { ...o, status: 'rejected' as const } : o));
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Orders</h2>
        {pendingCount > 0 && (
          <p style={{ color: 'var(--warning)', fontSize: 14 }}>⚠️ {pendingCount} order{pendingCount !== 1 ? 's' : ''} pending verification</p>
        )}
      </div>

      {/* Tabs */}
      <div className="filter-pills" style={{ marginBottom: 24 }}>
        {STATUS_TABS.map((tab) => {
          const count = tab === 'all' ? orders.length : orders.filter(o => o.status === tab).length;
          return (
            <button
              key={tab}
              className={`filter-pill ${activeTab === tab ? 'filter-pill--active' : ''}`}
              onClick={() => setActiveTab(tab)}
              id={`orders-tab-${tab}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {count > 0 && <span style={{ marginLeft: 6, fontSize: 11, background: tab === 'pending' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 99 }}>{count}</span>}
            </button>
          );
        })}
      </div>

      <div className="admin-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Screenshot</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                    No {activeTab !== 'all' ? activeTab : ''} orders
                  </td>
                </tr>
              ) : filtered.map((order) => (
                <tr key={order._id}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-primary)' }}>{order.orderId}</td>
                  <td>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{order.customerName}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{order.customerEmail}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{order.customerPhone}</p>
                  </td>
                  <td>
                    <p style={{ fontWeight: 500 }}>{order.projectTitle}</p>
                    <p style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{order.projectCode}</p>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(order.amount)}</td>
                  <td>
                    {order.paymentScreenshot ? (
                      <button
                        className="btn-sm btn-sm--outline"
                        style={{ fontSize: 11, padding: '4px 8px' }}
                        onClick={() => setScreenshotModal(order.paymentScreenshot)}
                        id={`view-screenshot-${order._id}`}
                      >
                        <Eye size={10} /> View
                      </button>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-pill status-pill--${order.status}`}>
                      {order.status === 'pending' && <Clock size={10} />}
                      {order.status === 'approved' && <Check size={10} />}
                      {order.status === 'rejected' && <X size={10} />}
                      {order.status}
                    </span>
                    {order.downloadSent && <span style={{ fontSize: 10, color: 'var(--success)', display: 'block', marginTop: 2 }}>✓ Link sent</span>}
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{timeAgo(order.createdAt)}</td>
                  <td>
                    {order.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn-sm btn-sm--primary"
                          style={{ fontSize: 11, padding: '4px 10px', opacity: processing === order._id ? 0.6 : 1 }}
                          onClick={() => approve(order._id)}
                          disabled={processing === order._id}
                          id={`approve-${order._id}`}
                        >
                          <Check size={10} /> Approve
                        </button>
                        <button
                          className="btn-sm btn-sm--outline"
                          style={{ fontSize: 11, padding: '4px 8px', color: 'var(--error)', borderColor: 'rgba(239,68,68,0.3)' }}
                          onClick={() => reject(order._id)}
                          disabled={processing === order._id}
                          id={`reject-${order._id}`}
                        >
                          <X size={10} />
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

      {/* Screenshot modal */}
      {screenshotModal && (
        <div className="modal-overlay" onClick={() => setScreenshotModal(null)}>
          <div style={{ maxWidth: 600, width: '90%' }}>
            <img src={screenshotModal} alt="Payment screenshot" style={{ width: '100%', borderRadius: 12 }} />
          </div>
        </div>
      )}
    </div>
  );
}
