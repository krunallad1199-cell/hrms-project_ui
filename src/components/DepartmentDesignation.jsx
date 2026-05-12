import React, { useState, useEffect } from 'react';
import { Building2, Briefcase, Plus, Edit2, Trash2 } from 'lucide-react';
import { getDepartments, getDesignations } from '../api/api';

export default function DepartmentDesignation() {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDepartments(), getDesignations()])
      .then(([deptRes, desigRes]) => {
        if(deptRes.data) setDepartments(deptRes.data);
        if(desigRes.data) setDesignations(desigRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
    card: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #E5E7EB' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3B82F6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '500' },
    list: { listStyle: 'none', padding: 0, margin: 0 },
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #F3F4F6' },
    badge: (active) => ({ padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: active ? '#D1FAE5' : '#FEE2E2', color: active ? '#065F46' : '#991B1B' })
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Company Structure</h1>
          <p style={styles.subtitle}>Manage departments and map designations</p>
        </div>
      </header>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building2 size={20} color="#3B82F6"/> Departments</h3>
            <button style={styles.btnPrimary}><Plus size={16}/> Add Dept</button>
          </div>
          <ul style={styles.list}>
            {departments.length === 0 && <p style={{color:'#6B7280'}}>No departments loaded.</p>}
            {departments.map((d, i) => (
              <li key={d.Id || i} style={styles.listItem}>
                <div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>{d.DepartmentName || d.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Head: {d.HeadName || d.head || 'N/A'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={styles.badge(d.IsActive !== false)}>{d.IsActive !== false ? 'Active' : 'Inactive'}</span>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}><Edit2 size={16}/></button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Briefcase size={20} color="#10B981"/> Designations</h3>
            <button style={styles.btnPrimary}><Plus size={16}/> Add Designation</button>
          </div>
          <ul style={styles.list}>
            {designations.length === 0 && <p style={{color:'#6B7280'}}>No designations loaded.</p>}
            {designations.map((d, i) => (
              <li key={d.Id || i} style={styles.listItem}>
                <div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>{d.DesignationName || d.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Dept: {d.DepartmentName || d.dept || 'N/A'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}><Edit2 size={16}/></button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={16}/></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
