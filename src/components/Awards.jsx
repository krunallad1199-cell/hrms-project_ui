import React, { useState, useEffect } from 'react';
import { Award, Plus, Star } from 'lucide-react';
import { getAwards } from '../api/api';

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAwards()
      .then(res => {
        if(res.data) setAwards(res.data);
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
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    card: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '2rem', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Employee Awards</h1>
          <p style={styles.subtitle}>Recognizing excellence across the organization</p>
        </div>
        <button style={styles.btnPrimary}><Plus size={18} /> Nominate/Award</button>
      </header>
      <div style={styles.grid}>
        {awards.map((aw, i) => (
          <div key={aw.Id || i} style={styles.card}>
            <div style={{ width: '64px', height: '64px', backgroundColor: i % 2 === 0 ? '#FEF3C7' : '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              {i % 2 === 0 ? <Award size={32} color="#D97706" /> : <Star size={32} color="#2563EB" />}
            </div>
            <h3 style={{ margin: 0, color: '#111827' }}>{aw.AwardName}</h3>
            <p style={{ color: '#6B7280', margin: '0.5rem 0 1rem 0' }}>{aw.AwardDate ? new Date(aw.AwardDate).toLocaleDateString() : 'N/A'}</p>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>{aw.Description}</p>
            <div style={{ padding: '0.5rem 1rem', backgroundColor: '#F3F4F6', borderRadius: '9999px', fontWeight: '600', color: '#374151' }}>{aw.FirstName ? `${aw.FirstName} ${aw.LastName}` : 'Unknown Employee'}</div>
          </div>
        ))}
        {awards.length === 0 && <p style={{color: '#6B7280'}}>No awards given yet.</p>}
      </div>
    </div>
  );
}
