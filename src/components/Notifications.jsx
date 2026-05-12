import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertCircle, Clock, Info } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../api/api';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded for now. In a real app, this comes from context/auth
  const currentEmployeeId = 1;

  useEffect(() => {
    getNotifications(currentEmployeeId)
      .then(res => {
        if(res.data) setNotifications(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkRead = (id) => {
    markNotificationRead(id).then(() => {
      setNotifications(prev => prev.map(n => n.Id === id ? { ...n, IsRead: true } : n));
    });
  };

  const getIcon = (type) => {
    switch((type || '').toLowerCase()) {
      case 'approval': return { icon: <CheckCircle2 color="#16A34A" />, bg: '#DCFCE7' };
      case 'alert': return { icon: <AlertCircle color="#DC2626" />, bg: '#FEE2E2' };
      case 'payroll': return { icon: <Clock color="#2563EB" />, bg: '#DBEAFE' };
      default: return { icon: <Info color="#4B5563" />, bg: '#F3F4F6' };
    }
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    card: { backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' },
    notificationItem: (unread) => ({ display: 'flex', gap: '1rem', padding: '1.5rem', borderBottom: '1px solid #E5E7EB', backgroundColor: unread ? '#F0FDF4' : 'white', cursor: unread ? 'pointer' : 'default' }),
    iconWrapper: (color, bg) => ({ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }),
    btnOutline: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Notifications</h1>
          <p style={styles.subtitle}>Stay updated on approvals, tasks, and system alerts.</p>
        </div>
        <button style={styles.btnOutline}><CheckCircle2 size={16} /> Mark all as read</button>
      </header>

      <div style={styles.card}>
        {notifications.map((n, i) => {
          const { icon, bg } = getIcon(n.Type);
          return (
            <div key={n.Id || i} style={styles.notificationItem(!n.IsRead)} onClick={() => !n.IsRead && handleMarkRead(n.Id)}>
              <div style={styles.iconWrapper(null, bg)}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h4 style={{ margin: 0, color: '#111827', fontWeight: !n.IsRead ? 'bold' : '500' }}>{n.Title}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{new Date(n.CreatedAt).toLocaleDateString()}</span>
                </div>
                <p style={{ margin: 0, color: '#4B5563', fontSize: '0.875rem' }}>{n.Description}</p>
              </div>
            </div>
          )
        })}
        {notifications.length === 0 && <p style={{padding:'2rem', textAlign:'center', color:'#6B7280'}}>You have no new notifications.</p>}
      </div>
    </div>
  );
}
