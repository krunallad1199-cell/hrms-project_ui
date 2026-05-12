import React, { useState, useEffect } from 'react';
import { Box, Plus, Settings } from 'lucide-react';
import { getAssets } from '../api/api';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssets()
      .then(res => {
        if(res.data) setAssets(res.data);
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
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '0.5rem' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#374151', fontWeight: '600' },
    td: { padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' },
    badge: (status) => ({ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', backgroundColor: status === 'Available' ? '#D1FAE5' : '#FEF3C7', color: status === 'Available' ? '#065F46' : '#92400E' })
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Asset Management</h1>
          <p style={styles.subtitle}>Track company laptops, devices, and resources</p>
        </div>
        <button style={styles.btnPrimary}><Plus size={18} /> Assign Asset</button>
      </header>
      <table style={styles.table}>
        <thead>
          <tr><th style={styles.th}>Asset Tag</th><th style={styles.th}>Device Details</th><th style={styles.th}>Assigned To</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr>
        </thead>
        <tbody>
          {assets.map((ast, i) => (
            <tr key={ast.Id || i}>
              <td style={{...styles.td, fontWeight: 'bold'}}>{ast.SerialNumber || `AST-00${ast.Id}`}</td>
              <td style={styles.td}>{ast.AssetName} ({ast.AssetType})</td>
              <td style={styles.td}>{ast.FirstName ? `${ast.FirstName} ${ast.LastName}` : 'Unassigned'}</td>
              <td style={styles.td}><span style={styles.badge(ast.Status)}>{ast.Status || 'Available'}</span></td>
              <td style={styles.td}><button style={{background:'none', border:'none', cursor:'pointer', color:'#3B82F6'}}><Settings size={16}/></button></td>
            </tr>
          ))}
          {assets.length === 0 && <tr><td colSpan="5" style={{padding:'1rem', textAlign:'center', color:'#6B7280'}}>No assets found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
