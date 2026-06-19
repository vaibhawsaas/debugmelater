'use client';

import { useState, useEffect } from 'react';
import { Download, Clock, Check, AlertTriangle } from 'lucide-react';
import { IDownload } from '@/types';
import { timeAgo } from '@/lib/utils';
import api from '@/lib/api';

const SAMPLE: IDownload[] = [
  { _id: 'd1', orderId: 'DML-ORD-1', projectId: '1', customerId: 'c1', signedUrl: '#', expiresAt: new Date(Date.now() + 3600000 * 20).toISOString(), downloadCount: 1, maxDownloads: 3, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: 'd2', orderId: 'DML-ORD-2', projectId: '2', customerId: 'c2', signedUrl: '#', expiresAt: new Date(Date.now() - 3600000).toISOString(), downloadCount: 3, maxDownloads: 3, createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState<IDownload[]>(SAMPLE);

  useEffect(() => {
    api.get('/downloads/admin').then(res => { if (res.data.downloads?.length) setDownloads(res.data.downloads); }).catch(() => {});
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, color: 'var(--text-primary)' }}>Downloads</h2>
      <div className="admin-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Project</th>
                <th>Downloads</th>
                <th>Status</th>
                <th>Expires</th>
                <th>Created</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {downloads.map((dl) => {
                const expired = new Date(dl.expiresAt) < new Date();
                const exhausted = dl.downloadCount >= dl.maxDownloads;
                return (
                  <tr key={dl._id}>
                    <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{typeof dl.orderId === 'string' ? dl.orderId : dl.orderId?._id ?? ""}</td>
                    <td style={{ fontSize: 12 }}>{typeof dl.projectId === 'string' ? dl.projectId : dl.projectId.title}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Download size={12} style={{ color: 'var(--text-muted)' }} />
                        <span>{dl.downloadCount}/{dl.maxDownloads}</span>
                      </div>
                    </td>
                    <td>
                      {expired ? (
                        <span className="status-pill status-pill--rejected"><AlertTriangle size={10} /> Expired</span>
                      ) : exhausted ? (
                        <span className="status-pill status-pill--pending"><Check size={10} /> Used</span>
                      ) : (
                        <span className="status-pill status-pill--approved"><Check size={10} /> Active</span>
                      )}
                    </td>
                    <td style={{ fontSize: 12, color: expired ? 'var(--error)' : 'var(--text-muted)' }}>{new Date(dl.expiresAt).toLocaleString('en-IN')}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{timeAgo(dl.createdAt)}</td>
                    <td>
                      <a href={dl.signedUrl} target="_blank" rel="noopener noreferrer" className="btn-sm btn-sm--outline" style={{ fontSize: 11 }}>
                        <Download size={10} /> Open
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
