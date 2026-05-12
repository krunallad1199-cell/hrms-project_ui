import React from 'react';
import { Network, FileText, CheckCircle2 } from 'lucide-react';

export default function EmployeeSelfService() {
  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    card: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #E5E7EB', marginBottom: '1.5rem' },
    treeNode: { padding: '1rem', border: '1px solid #D1D5DB', borderRadius: '0.5rem', backgroundColor: '#F9FAFB', textAlign: 'center', width: '200px', margin: '0 auto' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Employee Self Service</h1>
        <p style={styles.subtitle}>View your reporting hierarchy and quick actions</p>
      </header>

      <div style={styles.card}>
        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Network color="#3B82F6"/> Reporting Chain & Org Chart</h3>
        <div style={{ padding: '2rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <div style={styles.treeNode}>
            <div style={{ fontWeight: 'bold', color: '#111827' }}>Robert Brown</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>CEO</div>
          </div>
          <div style={{ height: '30px', borderLeft: '2px dashed #9CA3AF' }}></div>
          <div style={styles.treeNode}>
            <div style={{ fontWeight: 'bold', color: '#111827' }}>Sarah Williams</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Engineering Head</div>
          </div>
          <div style={{ height: '30px', borderLeft: '2px dashed #9CA3AF' }}></div>
          <div style={{ ...styles.treeNode, backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }}>
            <div style={{ fontWeight: 'bold', color: '#1D4ED8' }}>John Doe (You)</div>
            <div style={{ fontSize: '0.875rem', color: '#3B82F6' }}>Software Engineer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
