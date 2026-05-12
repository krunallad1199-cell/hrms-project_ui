import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  FileText, 
  PieChart, 
  Calendar,
  Users,
  TrendingUp,
  FileSpreadsheet,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Reports() {
  const [reportType, setReportType] = useState('organization');

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    btnGroup: { display: 'flex', gap: '1rem' },
    btnExport: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#10B981', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '500' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' },
    statCard: { backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    statTitle: { color: '#6B7280', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    statValue: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    card: { backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '2px solid #E5E7EB', color: '#374151', fontWeight: '600' },
    td: { padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#6B7280' },
    badge: (status) => ({ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', backgroundColor: status === 'Active' ? '#D1FAE5' : '#FEE2E2', color: status === 'Active' ? '#065F46' : '#991B1B' })
  };

  const handleExportPDF = () => {
    alert("Generating PDF Report for " + reportType + "...");
    // Real implementation would use html2pdf or similar to generate the report
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Reports & Analytics</h1>
          <p style={styles.subtitle}>Organizational summaries and data exports</p>
        </div>
        <div style={styles.btnGroup}>
          <select 
            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB' }}
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="organization">Organization Overview</option>
            <option value="attendance">Attendance Summary</option>
            <option value="payroll">Payroll Costs</option>
          </select>
          <button style={styles.btnExport} onClick={handleExportPDF}>
            <Download size={20} /> Export to PDF
          </button>
        </div>
      </header>

      {/* High Level Stats */}
      <div style={styles.grid}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.statCard}>
          <div style={styles.statTitle}><Users size={18} color="#3B82F6"/> Total Employees</div>
          <p style={styles.statValue}>142</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={styles.statCard}>
          <div style={styles.statTitle}><TrendingUp size={18} color="#10B981"/> Active Goals</div>
          <p style={styles.statValue}>89%</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={styles.statCard}>
          <div style={styles.statTitle}><Calendar size={18} color="#F59E0B"/> Avg Attendance</div>
          <p style={styles.statValue}>96.4%</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={styles.statCard}>
          <div style={styles.statTitle}><FileSpreadsheet size={18} color="#8B5CF6"/> Payroll Processed</div>
          <p style={styles.statValue}>$245k</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={styles.card}>
        <h3 style={styles.cardTitle}><FileText size={24} color="#3B82F6" /> Detailed Department Summary</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Headcount</th>
              <th style={styles.th}>Avg Performance</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { dept: 'Engineering', count: 45, perf: '4.8/5.0', status: 'Active' },
              { dept: 'Product', count: 12, perf: '4.5/5.0', status: 'Active' },
              { dept: 'Marketing', count: 28, perf: '4.2/5.0', status: 'Active' },
              { dept: 'HR & Operations', count: 15, perf: '4.6/5.0', status: 'Active' },
            ].map((row, idx) => (
              <tr key={idx}>
                <td style={{...styles.td, fontWeight: '500', color: '#111827'}}>{row.dept}</td>
                <td style={styles.td}>{row.count}</td>
                <td style={styles.td}>{row.perf}</td>
                <td style={styles.td}><span style={styles.badge(row.status)}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
