import React from 'react';
import { Settings as SettingsIcon, Shield, Users, Lock, Key } from 'lucide-react';

export default function Settings() {
  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    grid: { display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' },
    menu: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    menuItem: (active) => ({ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '0.5rem', cursor: 'pointer', backgroundColor: active ? '#EFF6FF' : 'transparent', color: active ? '#1D4ED8' : '#4B5563', fontWeight: '500' }),
    card: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #E5E7EB' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#374151', fontWeight: '600' },
    td: { padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>System Settings</h1>
        <p style={styles.subtitle}>Configure roles, permissions, and company preferences</p>
      </header>

      <div style={styles.grid}>
        <div style={styles.menu}>
          <div style={styles.menuItem(true)}><Shield size={20}/> User Roles & Access</div>
          <div style={styles.menuItem(false)}><Users size={20}/> Department Mapping</div>
          <div style={styles.menuItem(false)}><Lock size={20}/> Security & Auth</div>
        </div>
        <div style={styles.card}>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Role-Based Access Control (RBAC)</h3>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Manage what different users can see and do within the HRMS.</p>
          <table style={styles.table}>
            <thead><tr><th style={styles.th}>Role Name</th><th style={styles.th}>Description</th><th style={styles.th}>Users Assigned</th><th style={styles.th}>Actions</th></tr></thead>
            <tbody>
              <tr><td style={{...styles.td, fontWeight:'bold'}}>Admin</td><td style={styles.td}>Full system access</td><td style={styles.td}>2 Users</td><td style={styles.td}><button style={{background:'none', border:'none', color:'#3B82F6', cursor:'pointer'}}>Edit Permissions</button></td></tr>
              <tr><td style={{...styles.td, fontWeight:'bold'}}>HR Manager</td><td style={styles.td}>Manage employees, payroll, leave approvals</td><td style={styles.td}>4 Users</td><td style={styles.td}><button style={{background:'none', border:'none', color:'#3B82F6', cursor:'pointer'}}>Edit Permissions</button></td></tr>
              <tr><td style={{...styles.td, fontWeight:'bold'}}>Employee</td><td style={styles.td}>Self-service portal access only</td><td style={styles.td}>136 Users</td><td style={styles.td}><button style={{background:'none', border:'none', color:'#3B82F6', cursor:'pointer'}}>Edit Permissions</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
