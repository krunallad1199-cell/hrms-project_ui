import React, { useState } from 'react';
import { CreditCard, Download, Printer, Settings, CheckCircle2 } from 'lucide-react';

export default function PayrollModule() {
  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3B82F6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '500' },
    btnOutline: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500' },
    section: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#374151', fontWeight: '600' },
    td: { padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' },
    badge: { padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#D1FAE5', color: '#065F46' },
    salaryRow: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #F3F4F6' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Payroll Management</h1>
          <p style={styles.subtitle}>Salary structures, payslip generation, and payroll exports</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={styles.btnOutline}><Settings size={18} /> Component Setup</button>
          <button style={styles.btnPrimary}><CreditCard size={18} /> Generate Payslips</button>
        </div>
      </header>

      <div style={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Monthly Payroll Overview (Admin View)</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #D1D5DB' }}>
              <option>April 2026</option>
              <option>March 2026</option>
            </select>
            <button style={styles.btnOutline}><Download size={18} /> Export CSV</button>
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee</th>
              <th style={styles.th}>Gross Salary</th>
              <th style={styles.th}>Deductions</th>
              <th style={styles.th}>Net Pay</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Payslip</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'John Doe', gross: '₹40,000', ded: '₹2,000', net: '₹38,000' },
              { name: 'Jane Smith', gross: '₹60,000', ded: '₹3,000', net: '₹57,000' },
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ ...styles.td, fontWeight: '500', color: '#111827' }}>{row.name}</td>
                <td style={styles.td}>{row.gross}</td>
                <td style={styles.td} style={{ color: '#EF4444' }}>{row.ded}</td>
                <td style={{ ...styles.td, fontWeight: 'bold' }}>{row.net}</td>
                <td style={styles.td}><span style={styles.badge}><CheckCircle2 size={12} style={{display:'inline', marginRight:'4px'}}/>Paid</span></td>
                <td style={styles.td}>
                  <button style={{ ...styles.btnOutline, padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}><Printer size={14} /> PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.grid2}>
        <div style={styles.section}>
          <h3 style={{ marginTop: 0, borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>My Salary Structure (Employee View)</h3>
          
          <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>Earnings</h4>
          <div style={styles.salaryRow}><span>Basic Salary</span> <span style={{fontWeight:'500'}}>₹25,000</span></div>
          <div style={styles.salaryRow}><span>HRA</span> <span style={{fontWeight:'500'}}>₹10,000</span></div>
          <div style={styles.salaryRow}><span>Special Allowance</span> <span style={{fontWeight:'500'}}>₹5,000</span></div>
          
          <h4 style={{ color: '#374151', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Deductions</h4>
          <div style={styles.salaryRow}><span>PF</span> <span style={{color: '#EF4444', fontWeight:'500'}}>₹1,800</span></div>
          <div style={styles.salaryRow}><span>Professional Tax</span> <span style={{color: '#EF4444', fontWeight:'500'}}>₹200</span></div>
          
          <div style={{ ...styles.salaryRow, borderTop: '2px solid #E5E7EB', marginTop: '1rem', paddingTop: '1rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>Net Salary</span> 
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10B981' }}>₹38,000</span>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={{ marginTop: 0, borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>My Payslips</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['March 2026', 'February 2026', 'January 2026'].map((month) => (
              <li key={month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #E5E7EB' }}>
                <span style={{ fontWeight: '500', color: '#374151' }}>Payslip for {month}</span>
                <button style={{ ...styles.btnOutline, color: '#3B82F6', borderColor: '#BFDBFE', backgroundColor: '#EFF6FF' }}>
                  <Download size={16} /> Download PDF
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
