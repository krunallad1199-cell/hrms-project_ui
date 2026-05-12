import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  Plus, 
  History, 
  Star, 
  ChevronRight,
  MessageSquare,
  Award,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const MOCK_EMPLOYEES = [
  { id: 1, name: 'Alice Smith', role: 'Software Engineer', department: 'Engineering' },
  { id: 2, name: 'Bob Johnson', role: 'Product Manager', department: 'Product' },
  { id: 3, name: 'Charlie Davis', role: 'UX Designer', department: 'Design' }
];

const MOCK_REVIEWS = [
  { id: 1, date: '2025-12-01', reviewer: 'Manager Name', technical: 4, communication: 5, leadership: 4, feedback: 'Excellent work this quarter.' },
  { id: 2, date: '2025-06-15', reviewer: 'Manager Name', technical: 4, communication: 4, leadership: 3, feedback: 'Good progress, needs to take more initiative.' }
];

const MOCK_GOALS = [
  { id: 1, title: 'Complete Frontend Migration', deadline: '2026-08-01', progress: 75, status: 'On Track' },
  { id: 2, title: 'Mentorship Program', deadline: '2026-12-01', progress: 30, status: 'At Risk' }
];

export default function PerformanceManagement() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [selectedEmp, setSelectedEmp] = useState(MOCK_EMPLOYEES[0]);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form state
  const [newReview, setNewReview] = useState({ technical: 0, communication: 0, leadership: 0, feedback: '' });

  const handleCreateReview = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      reviewer: 'Current User',
      ...newReview
    };
    setReviews([review, ...reviews]);
    setIsModalOpen(false);
    setNewReview({ technical: 0, communication: 0, leadership: 0, feedback: '' });
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={16} fill={i < rating ? '#F59E0B' : 'transparent'} color={i < rating ? '#F59E0B' : '#D1D5DB'} />
    ));
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    select: { padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', fontSize: '1rem', outline: 'none', minWidth: '250px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    card: { backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #E5E7EB' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' },
    button: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3B82F6', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '500', transition: 'background-color 0.2s' },
    progressBg: { backgroundColor: '#E5E7EB', borderRadius: '9999px', height: '0.75rem', overflow: 'hidden', marginTop: '0.5rem' },
    progressFill: (percent) => ({ backgroundColor: percent > 50 ? '#10B981' : '#F59E0B', height: '100%', width: `${percent}%`, transition: 'width 1s ease-in-out' }),
    reviewItem: { borderBottom: '1px solid #E5E7EB', paddingBottom: '1.5rem', marginBottom: '1.5rem' },
    badge: { padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#EFF6FF', color: '#1D4ED8' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 },
    modalContent: { backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '2rem', width: '100%', maxWidth: '500px', position: 'relative' },
    inputGroup: { marginBottom: '1.5rem' },
    label: { display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' },
    textarea: { width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', minHeight: '100px', outline: 'none' },
    ratingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Performance Management</h1>
          <p style={styles.subtitle}>Track employee goals, reviews, and growth</p>
        </div>
        <select 
          style={styles.select}
          value={selectedEmp.id}
          onChange={(e) => setSelectedEmp(employees.find(emp => emp.id === parseInt(e.target.value)))}
        >
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
          ))}
        </select>
      </header>

      <div style={styles.grid}>
        {/* Employee Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E3A8A', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {selectedEmp.name.charAt(0)}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>{selectedEmp.name}</h2>
              <p style={{ margin: 0, color: '#6B7280' }}>{selectedEmp.role} • {selectedEmp.department}</p>
            </div>
          </div>
          <button style={{ ...styles.button, width: '100%', justifyContent: 'center' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> New Performance Review
          </button>
        </motion.div>

        {/* Goals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={styles.card}>
          <h3 style={styles.cardTitle}><Target size={24} color="#8B5CF6" /> Strategic Goals</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {goals.map(goal => (
              <div key={goal.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '500', color: '#374151' }}>{goal.title}</span>
                  <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>{goal.progress}%</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} /> Due: {new Date(goal.deadline).toLocaleDateString()}
                </div>
                <div style={styles.progressBg}>
                  <div style={styles.progressFill(goal.progress)} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Review History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ ...styles.card, gridColumn: '1 / -1' }}>
          <h3 style={styles.cardTitle}><History size={24} color="#3B82F6" /> Performance History</h3>
          <div>
            {reviews.map((review, idx) => (
              <div key={review.id} style={idx === reviews.length - 1 ? { paddingBottom: 0, borderBottom: 'none' } : styles.reviewItem}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <span style={styles.badge}>Review on {new Date(review.date).toLocaleDateString()}</span>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>Reviewer: {review.reviewer}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#4B5563', display: 'block', marginBottom: '0.25rem' }}>Technical Skills</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>{renderStars(review.technical)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#4B5563', display: 'block', marginBottom: '0.25rem' }}>Communication</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>{renderStars(review.communication)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#4B5563', display: 'block', marginBottom: '0.25rem' }}>Leadership</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>{renderStars(review.leadership)}</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '0.5rem', color: '#4B5563', fontSize: '0.95rem' }}>
                  <MessageSquare size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle', color: '#9CA3AF' }} />
                  {review.feedback}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* New Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={styles.modalContent}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
              >
                <X size={24} />
              </button>
              <h2 style={{ marginTop: 0, color: '#111827', fontSize: '1.5rem', marginBottom: '1.5rem' }}>New Performance Review</h2>
              <form onSubmit={handleCreateReview}>
                
                {['Technical', 'Communication', 'Leadership'].map(skill => (
                  <div key={skill} style={styles.ratingRow}>
                    <span style={styles.label}>{skill} Skills</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button 
                          key={rating}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, [skill.toLowerCase()]: rating })}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          <Star size={24} fill={newReview[skill.toLowerCase()] >= rating ? '#F59E0B' : 'transparent'} color={newReview[skill.toLowerCase()] >= rating ? '#F59E0B' : '#D1D5DB'} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Detailed Feedback</label>
                  <textarea 
                    style={styles.textarea}
                    placeholder="Enter detailed feedback here..."
                    value={newReview.feedback}
                    onChange={(e) => setNewReview({ ...newReview, feedback: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', color: '#374151', cursor: 'pointer', fontWeight: '500' }}>
                    Cancel
                  </button>
                  <button type="submit" style={styles.button}>
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
