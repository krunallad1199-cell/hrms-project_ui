import React, { useState, useEffect } from 'react';
import { CheckSquare, Clock, AlertCircle, Plus } from 'lucide-react';
import { getTasks } from '../api/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then(res => {
        if(res.data) setTasks(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3B82F6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '500' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    column: { backgroundColor: '#F3F4F6', padding: '1rem', borderRadius: '0.5rem', minHeight: '400px' },
    columnTitle: { margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', color: '#374151' },
    taskCard: { backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB', marginBottom: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
    badge: (color, bg) => ({ padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: bg, color: color, display: 'inline-block', marginBottom: '0.5rem' })
  };

  const renderTasks = (statusFilter) => {
    const filtered = tasks.filter(t => (t.Status || 'Pending') === statusFilter);
    if(filtered.length === 0) return <p style={{fontSize:'0.875rem', color:'#9CA3AF'}}>No tasks here.</p>;
    
    return filtered.map((t, i) => (
      <div key={t.Id || i} style={styles.taskCard}>
        <span style={styles.badge(t.Priority === 'High' ? '#D97706' : '#1D4ED8', t.Priority === 'High' ? '#FEF3C7' : '#DBEAFE')}>{t.Priority || 'Medium'}</span>
        <h4 style={{ margin: '0 0 0.5rem 0', textDecoration: t.Status === 'Done' ? 'line-through' : 'none', color: t.Status === 'Done' ? '#9CA3AF' : '#111827' }}>{t.Title}</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6B7280' }}><Clock size={14} style={{display:'inline', verticalAlign:'middle'}}/> Due: {t.DueDate ? new Date(t.DueDate).toLocaleDateString() : 'N/A'}</p>
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Task Board</h1>
          <p style={styles.subtitle}>Manage employee assignments and deliverables</p>
        </div>
        <button style={styles.btnPrimary}><Plus size={18} /> New Task</button>
      </header>
      
      <div style={styles.grid}>
        <div style={styles.column}>
          <h3 style={styles.columnTitle}>To Do <span style={{backgroundColor:'#E5E7EB', padding:'0.1rem 0.5rem', borderRadius:'9999px', fontSize:'0.875rem'}}>{tasks.filter(t => (t.Status || 'Pending') === 'Pending').length}</span></h3>
          {renderTasks('Pending')}
        </div>
        
        <div style={styles.column}>
          <h3 style={styles.columnTitle}>In Progress <span style={{backgroundColor:'#E5E7EB', padding:'0.1rem 0.5rem', borderRadius:'9999px', fontSize:'0.875rem'}}>{tasks.filter(t => t.Status === 'In Progress').length}</span></h3>
          {renderTasks('In Progress')}
        </div>

        <div style={styles.column}>
          <h3 style={styles.columnTitle}>Done <span style={{backgroundColor:'#E5E7EB', padding:'0.1rem 0.5rem', borderRadius:'9999px', fontSize:'0.875rem'}}>{tasks.filter(t => t.Status === 'Done').length}</span></h3>
          {renderTasks('Done')}
        </div>
      </div>
    </div>
  );
}
