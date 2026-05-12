import React, { useState, useEffect } from 'react';
import { CalendarDays, Check, X, FileText, Activity } from 'lucide-react';

import { getLeaves, updateLeaveStatus } from '../api/api';

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaves()
      .then(res => {
        if(res.data) setLeaves(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateStatus = (id, status) => {
    updateLeaveStatus({ LeaveId: id, Status: status, ApprovedBy: 1 }) // Hardcoded ApprovedBy for now
      .then(() => {
        setLeaves(prev => prev.map(l => l.Id === id ? {...l, Status: status} : l));
      })
      .catch(err => console.error(err));
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
    balanceCard: (color, bg) => ({ backgroundColor: bg, border: `1px solid ${color}`, borderRadius: '0.5rem', padding: '1.5rem', textAlign: 'center' }),
    cardTitle: { margin: 0, fontSize: '0.875rem', color: '#374151', fontWeight: '600', textTransform: 'uppercase' },
    cardValue: { margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#111827' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3B82F6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '500' },
    section: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#374151', fontWeight: '600' },
    td: { padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' },
    badge: (status) => {
      let bg = '#FEF3C7', color = '#92400E';
      if (status === 'Approved') { bg = '#D1FAE5'; color = '#065F46'; }
      if (status === 'Rejected') { bg = '#FEE2E2'; color = '#991B1B'; }
      return { padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', backgroundColor: bg, color: color };
    },
    actionBtn: (color) => ({ background: 'none', border: `1px solid ${color}`, borderRadius: '0.25rem', padding: '0.25rem', cursor: 'pointer', color: color })
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Leave Management</h1>
          <p style={styles.subtitle}>Manage leave applications, balances, and approvals</p>
        </div>
        <button style={styles.btnPrimary}><FileText size={18} /> Apply for Leave</button>
      </header>

      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>My Leave Balances</h3>
      <div style={styles.grid}>
        <div style={styles.balanceCard('#93C5FD', '#EFF6FF')}>
          <h4 style={styles.cardTitle}>Casual Leave</h4>
          <p style={styles.cardValue}>8 <span style={{fontSize:'1rem', color:'#6B7280'}}>/ 12</span></p>
        </div>
        <div style={styles.balanceCard('#A7F3D0', '#ECFDF5')}>
          <h4 style={styles.cardTitle}>Sick Leave</h4>
          <p style={styles.cardValue}>5 <span style={{fontSize:'1rem', color:'#6B7280'}}>/ 8</span></p>
        </div>
        <div style={styles.balanceCard('#FDE68A', '#FFFBEB')}>
          <h4 style={styles.cardTitle}>Paid Leave</h4>
          <p style={styles.cardValue}>12 <span style={{fontSize:'1rem', color:'#6B7280'}}>/ 15</span></p>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="#3B82F6"/> Pending Approvals (Manager View)
        </h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee</th>
              <th style={styles.th}>Leave Type</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.filter(l => l.Status === 'Pending').map((l, i) => (
            <tr key={l.Id || i}>
              <td style={{ ...styles.td, fontWeight: '500', color: '#111827' }}>{l.FirstName ? `${l.FirstName} ${l.LastName}` : (l.EmployeeName || 'Employee')}</td>
              <td style={styles.td}>{l.LeaveType || 'Sick Leave'}</td>
              <td style={styles.td}>{new Date(l.StartDate).toLocaleDateString()} - {new Date(l.EndDate).toLocaleDateString()}</td>
              <td style={styles.td}>{l.Reason || 'N/A'}</td>
              <td style={styles.td}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleUpdateStatus(l.Id, 'Approved')} style={styles.actionBtn('#10B981')} title="Approve"><Check size={16} /></button>
                  <button onClick={() => handleUpdateStatus(l.Id, 'Rejected')} style={styles.actionBtn('#EF4444')} title="Reject"><X size={16} /></button>
                </div>
              </td>
            </tr>
            ))}
            {leaves.filter(l => l.Status === 'Pending').length === 0 && <tr><td colSpan="5" style={{padding:'1rem', color:'#6B7280'}}>No pending requests.</td></tr>}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>My Leave History</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Leave Type</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}>Applied On</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((row, i) => (
              <tr key={row.Id || i}>
                <td style={{ ...styles.td, fontWeight: '500' }}>{row.LeaveType}</td>
                <td style={styles.td}>{new Date(row.StartDate).toLocaleDateString()} - {new Date(row.EndDate).toLocaleDateString()}</td>
                <td style={styles.td}>{new Date(row.AppliedOn || new Date()).toLocaleDateString()}</td>
                <td style={styles.td}><span style={styles.badge(row.Status)}>{row.Status}</span></td>
              </tr>
            ))}
            {leaves.length === 0 && <tr><td colSpan="4" style={{padding:'1rem', color:'#6B7280'}}>No history available.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
