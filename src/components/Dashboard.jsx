import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  UserCheck, 
  TrendingUp,
  Clock,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getDashboardStats } from '../api/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    departments: 0,
    presentToday: 0,
    onLeave: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(res => {
        if(res.data) setStats(res.data);
      })
      .catch(err => console.error("Error fetching dashboard stats", err))
      .finally(() => setLoading(false));
  }, []);

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
    statCard: { backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    iconWrapper: (color, bg) => ({ width: '48px', height: '48px', borderRadius: '0.5rem', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }),
    statInfo: { display: 'flex', flexDirection: 'column' },
    statLabel: { fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' },
    statValue: { fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    chartsGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' },
    chartCard: { backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #E5E7EB', minHeight: '300px' },
    chartTitle: { fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginTop: 0, marginBottom: '1.5rem' },
    trend: (isPositive) => ({ fontSize: '0.75rem', color: isPositive ? '#10B981' : '#EF4444', fontWeight: '600' })
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>HR Analytics Dashboard</h1>
        <p style={styles.subtitle}>Real-time overview of your workforce and operations.</p>
      </header>

      <div style={styles.statsGrid}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.statCard}>
          <div style={styles.iconWrapper('#3B82F6', '#EFF6FF')}>
            <Users size={24} />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statLabel}>Total Employees</span>
            <div style={styles.statValue}>142 <span style={styles.trend(true)}>+12%</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={styles.statCard}>
          <div style={styles.iconWrapper('#10B981', '#ECFDF5')}>
            <Clock size={24} />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statLabel}>Average Attendance</span>
            <div style={styles.statValue}>96.4% <span style={styles.trend(true)}>+0.5%</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={styles.statCard}>
          <div style={styles.iconWrapper('#F59E0B', '#FFFBEB')}>
            <TrendingUp size={24} />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statLabel}>Active Personnel</span>
            <div style={styles.statValue}>138 <span style={{...styles.trend(true), color: '#EF4444'}}>5 on Leave</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={styles.statCard}>
          <div style={styles.iconWrapper('#8B5CF6', '#F5F3FF')}>
            <CreditCard size={24} />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statLabel}>Current Payroll</span>
            <div style={styles.statValue}>₹2.4L <span style={styles.trend(true)}>+4%</span></div>
          </div>
        </motion.div>
      </div>

      <div style={styles.chartsGrid}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Weekly Attendance Trends</h3>
          <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
             {/* Visual placeholder for the line chart seen in the screenshot */}
             <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
               <path d="M 0 100 Q 125 150 250 50 T 500 150" fill="none" stroke="#3B82F6" strokeWidth="3" />
               <circle cx="0" cy="100" r="5" fill="#3B82F6" />
               <circle cx="125" cy="125" r="5" fill="#3B82F6" />
               <circle cx="250" cy="50" r="5" fill="#3B82F6" />
               <circle cx="375" cy="100" r="5" fill="#3B82F6" />
               <circle cx="500" cy="150" r="5" fill="#3B82F6" />
             </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280', fontSize: '0.75rem', marginTop: '1rem', padding: '0 10px' }}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Department Wise Headcount</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ width: '40px', height: '80%', backgroundColor: '#3B82F6', borderRadius: '4px 4px 0 0' }}></div>
            <div style={{ width: '40px', height: '40%', backgroundColor: '#10B981', borderRadius: '4px 4px 0 0' }}></div>
            <div style={{ width: '40px', height: '60%', backgroundColor: '#F59E0B', borderRadius: '4px 4px 0 0' }}></div>
            <div style={{ width: '40px', height: '30%', backgroundColor: '#8B5CF6', borderRadius: '4px 4px 0 0' }}></div>
          </div>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={styles.chartCard}>
        <h3 style={styles.chartTitle}>Monthly Payroll Distribution</h3>
        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
           Detailed distribution chart rendering area
        </div>
      </motion.div>
    </div>
  );
}
