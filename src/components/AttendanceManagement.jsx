import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle, AlertCircle, FileSpreadsheet, Download } from 'lucide-react';

export default function AttendanceManagement() {
  const [activeTab, setActiveTab] = useState('daily');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  const handleCheckIn = () => {
    if (!isCheckedIn) {
      setCheckInTime(new Date().toLocaleTimeString());
      setIsCheckedIn(true);
    } else {
      setIsCheckedIn(false);
      setCheckInTime(null);
    }
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    tabs: { display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #E5E7EB' },
    tab: (active) => ({ padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '500', color: active ? '#2563EB' : '#6B7280', borderBottom: active ? '2px solid #2563EB' : 'none', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }),
    card: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '1.5rem' },
    checkInCard: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', marginBottom: '2rem' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: isCheckedIn ? '#EF4444' : '#10B981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '500', fontSize: '1rem' },
    btnOutline: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#374151', fontWeight: '600' },
    td: { padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' },
    badge: (status) => {
      let bg = '#E5E7EB', color = '#374151';
      if (status === 'Present') { bg = '#D1FAE5'; color = '#065F46'; }
      if (status === 'Absent') { bg = '#FEE2E2'; color = '#991B1B'; }
      if (status === 'Late') { bg = '#FEF3C7'; color = '#92400E'; }
      return { padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', backgroundColor: bg, color: color };
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Attendance Management</h1>
          <p style={styles.subtitle}>Track daily attendance, timesheets, and exports</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={styles.btnOutline}><Download size={18} /> Export Biometric Data</button>
          <button style={styles.btnOutline}><FileSpreadsheet size={18} /> Import CSV</button>
        </div>
      </header>

      <div style={styles.checkInCard}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0F172A' }}>Employee Self-Service</h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748B' }}>
            {isCheckedIn ? `Checked in at ${checkInTime}` : 'You have not checked in today.'}
          </p>
        </div>
        <button style={styles.btnPrimary} onClick={handleCheckIn}>
          <Clock size={20} />
          {isCheckedIn ? 'Check Out' : 'Check In'}
        </button>
      </div>

      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === 'daily')} onClick={() => setActiveTab('daily')}>Daily Attendance</button>
        <button style={styles.tab(activeTab === 'monthly')} onClick={() => setActiveTab('monthly')}>Monthly Reports</button>
      </div>

      <div style={styles.card}>
        {activeTab === 'daily' ? (
          <div>
            <h3 style={{ marginTop: 0 }}>Today's Log (Admin View)</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>Check In</th>
                  <th style={styles.th}>Check Out</th>
                  <th style={styles.th}>Total Hours</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Doe', in: '09:00 AM', out: '06:00 PM', hrs: '9h 0m', status: 'Present' },
                  { name: 'Jane Smith', in: '09:15 AM', out: '--', hrs: '--', status: 'Late' },
                  { name: 'Mike Johnson', in: '--', out: '--', hrs: '--', status: 'Absent' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ ...styles.td, fontWeight: '500', color: '#111827' }}>{row.name}</td>
                    <td style={styles.td}>{row.in}</td>
                    <td style={styles.td}>{row.out}</td>
                    <td style={styles.td}>{row.hrs}</td>
                    <td style={styles.td}><span style={styles.badge(row.status)}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h3 style={{ marginTop: 0 }}>Monthly Summary</h3>
            <p style={{ color: '#6B7280' }}>Select a month to view consolidated attendance data for payroll processing.</p>
            {/* Monthly view placeholder */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <select style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #D1D5DB' }}>
                <option>January 2026</option>
                <option>February 2026</option>
                <option>March 2026</option>
              </select>
              <button style={styles.btnOutline}>Generate Monthly Report</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
