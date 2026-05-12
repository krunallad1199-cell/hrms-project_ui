import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Search,
  Filter,
  Edit2,
  Trash2,
  Plus,
  Mail,
  X,
  CheckCircle2,
  XCircle,
  Archive,
  FileText,
  Upload,
  Download,
  Loader2
} from 'lucide-react';

import { 
  getEmployees, 
  upsertEmployee, 
  deleteEmployee, 
  archiveEmployee, 
  getDepartments, 
  getDesignations,
  getEmployeeDocuments,
  uploadDocument,
  deleteDocument
} from '../api/api';

const EMPTY_FORM = {
  Id: 0,
  EmployeeCode: '',
  FirstName: '',
  LastName: '',
  Email: '',
  DeptId: '',
  DesigId: '',
  DateOfJoining: '',
  IsActive: true
};

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [error, setError] = useState('');
  
  // Document Management State
  const [activeModalTab, setActiveModalTab] = useState('details');
  const [empDocs, setEmpDocs] = useState([]);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const fileInputRef = useRef(null);

  const fetchDocs = (empId) => {
    if (!empId) return;
    getEmployeeDocuments(empId)
      .then(res => { if (res.data) setEmpDocs(res.data); })
      .catch(err => console.error("Failed to fetch docs:", err));
  };

  const fetchEmployees = () => {
    setLoading(true);
    getEmployees()
      .then(res => {
        if (res.data) setEmployees(res.data);
      })
      .catch(err => {
        console.error("Failed to load employees:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployees();

    getDepartments()
      .then(res => { if (res.data) setDepartments(res.data); })
      .catch(err => console.error("Failed to load departments:", err));

    getDesignations()
      .then(res => { if (res.data) setDesignations(res.data); })
      .catch(err => console.error("Failed to load designations:", err));
  }, []);

  const openAddModal = () => {
    setFormData({ ...EMPTY_FORM });
    setError('');
    setActiveModalTab('details');
    setEmpDocs([]);
    setIsModalOpen(true);
  };

  const openEditModal = (emp) => {
    setFormData({
      Id: emp.Id || 0,
      EmployeeCode: emp.EmployeeCode || '',
      FirstName: emp.FirstName || '',
      LastName: emp.LastName || '',
      Email: emp.Email || '',
      DeptId: emp.DeptId || '',
      DesigId: emp.DesigId || '',
      DateOfJoining: emp.DateOfJoining
        ? new Date(emp.DateOfJoining).toISOString().split('T')[0]
        : '',
      IsActive: emp.IsActive !== undefined ? emp.IsActive : true
    });
    setError('');
    setActiveModalTab('details');
    fetchDocs(emp.Id);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = window.prompt("Enter Document Type (e.g., Resume, ID Card, Certificate):", "General");
    if (!type) return;

    setUploadingDoc(true);
    const form = new FormData();
    form.append('employeeId', formData.Id);
    form.append('documentType', type);
    form.append('file', file);

    try {
      await uploadDocument(form);
      fetchDocs(formData.Id);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload document.");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleDocDelete = async (docId) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await deleteDocument(docId);
      fetchDocs(formData.Id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleArchive = async (emp) => {
    console.log("Archive requested for:", emp);
    if (!emp || !emp.Id) {
      console.error("Invalid employee object for archive:", emp);
      return;
    }
    
    // Using a simple confirm check that is more reliable
    const fullName = `${emp.FirstName || ''} ${emp.LastName || ''}`.trim() || 'this employee';
    console.log(`Proceeding to archive: ${fullName} (ID: ${emp.Id})`);
    
    try {
      const res = await archiveEmployee(emp.Id);
      console.log("Archive response:", res.data);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to archive employee:", err);
      alert('Failed to archive employee. Check console for details.');
    }
  };

  const handleDelete = async (emp) => {
    console.log("Delete requested for:", emp);
    if (!emp || !emp.Id) {
      console.error("Invalid employee object for delete:", emp);
      return;
    }
    
    const fullName = `${emp.FirstName || ''} ${emp.LastName || ''}`.trim() || 'this employee';
    if (!window.confirm(`Are you sure you want to permanently delete "${fullName}"?`)) return;
    
    try {
      await deleteEmployee(emp.Id);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to delete employee:", err);
      alert('Failed to delete employee. Check console for details.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.EmployeeCode.trim() || !formData.FirstName.trim() || !formData.LastName.trim()) {
      setError('Employee Code, First Name, and Last Name are required.');
      return;
    }
    if (!formData.DeptId) {
      setError('Please select a department.');
      return;
    }
    if (!formData.DesigId) {
      setError('Please select a designation.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        Id: Number(formData.Id) || 0,
        DeptId: Number(formData.DeptId),
        DesigId: Number(formData.DesigId),
        DateOfJoining: formData.DateOfJoining || new Date().toISOString().split('T')[0],
        IsActive: formData.IsActive
      };
      await upsertEmployee(payload);
      setIsModalOpen(false);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to save employee:", err);
      setError('Failed to save employee. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', marginTop: '0.5rem' },
    actions: { display: 'flex', gap: '1rem' },
    btnOutline: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#3B82F6', color: 'white', cursor: 'pointer', fontWeight: '500' },
    btnPrimaryDisabled: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#93C5FD', color: 'white', cursor: 'not-allowed', fontWeight: '500' },
    searchBar: { display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem', border: '1px solid #E5E7EB', borderBottom: 'none' },
    searchInputWrapper: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F9FAFB', padding: '0.5rem 1rem', borderRadius: '0.5rem', width: '100%', maxWidth: '400px', border: '1px solid #E5E7EB' },
    searchInput: { border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', color: '#374151' },
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', border: '1px solid #E5E7EB', borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#374151', fontWeight: '600', fontSize: '0.875rem' },
    td: { padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '0.875rem' },
    avatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.875rem' },
    badge: { display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' },
    badgeInactive: { display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' },
    actionBtn: { background: 'none', border: '1px solid #E5E7EB', borderRadius: '0.25rem', padding: '0.25rem', cursor: 'pointer', color: '#6B7280' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 },
    modalContent: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '0', width: '100%', maxWidth: '700px', position: 'relative', overflow: 'hidden' },
    modalBody: { padding: '2rem' },
    tabs: { display: 'flex', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' },
    tab: (active) => ({ padding: '1rem 1.5rem', cursor: 'pointer', fontWeight: '600', color: active ? '#2563EB' : '#6B7280', borderBottom: active ? '2px solid #2563EB' : 'none', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }),
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.875rem', fontWeight: '500', color: '#374151' },
    input: { padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #D1D5DB', outline: 'none' },
    errorMsg: { color: '#DC2626', fontSize: '0.875rem', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#FEF2F2', borderRadius: '0.25rem', border: '1px solid #FECACA' },
    docRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '0.5rem', marginBottom: '0.75rem' }
  };

  const filtered = employees.filter(e => {
    const fullName = `${e.FirstName || ''} ${e.LastName || ''}`;
    const empCode = e.EmployeeCode || '';
    const dept = e.Department || '';
    return fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dept.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Employee Directory</h1>
          <p style={styles.subtitle}>Manage all your company personnel in one place. ({employees.length} employees)</p>
        </div>
        <div style={styles.actions}>
          <button style={styles.btnPrimary} onClick={openAddModal}><Plus size={18} /> Add New Employee</button>
        </div>
      </header>

      <div style={styles.searchBar}>
        <div style={styles.searchInputWrapper}>
          <Search size={18} color="#9CA3AF" />
          <input 
            type="text" 
            placeholder="Search by name, code or department..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button style={styles.btnOutline}><Filter size={18} /> Filters</button>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>Loading employees...</div>
      ) : (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((emp, idx) => {
            const fullName = `${emp.FirstName || ''} ${emp.LastName || ''}`.trim();
            const initial = fullName ? fullName.split(' ').map(n => n[0]).join('') : '?';
            return (
            <tr key={emp.Id || idx}>
              <td style={styles.td}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={styles.avatar}>{initial.substring(0,2)}</div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{emp.EmployeeCode}</div>
                  </div>
                </div>
              </td>
              <td style={styles.td}>
                <div style={{ fontWeight: '500', color: '#374151' }}>{emp.Department || 'N/A'}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{emp.Designation || 'N/A'}</div>
              </td>
              <td style={styles.td}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4B5563' }}>
                  <Mail size={14} /> {emp.Email || 'N/A'}
                </div>
              </td>
              <td style={styles.td}>
                <span style={emp.IsActive ? styles.badge : styles.badgeInactive}>
                  {emp.IsActive ? <><CheckCircle2 size={12} /> Active</> : <><XCircle size={12} /> Inactive</>}
                </span>
              </td>
              <td style={styles.td}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    style={styles.actionBtn} 
                    onClick={(e) => { e.stopPropagation(); openEditModal(emp); }} 
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    style={{ ...styles.actionBtn, color: '#F59E0B' }} 
                    onClick={(e) => { e.stopPropagation(); handleArchive(emp); }} 
                    title="Archive (Deactivate)"
                  >
                    <Archive size={16} />
                  </button>
                  <button 
                    style={{ ...styles.actionBtn, color: '#EF4444' }} 
                    onClick={(e) => { e.stopPropagation(); handleDelete(emp); }} 
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          )})}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" style={styles.emptyState}>
                {searchTerm ? 'No employees match your search.' : 'No employees found. Click "Add New Employee" to get started.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      )}

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.tabs}>
              <button style={styles.tab(activeModalTab === 'details')} onClick={() => setActiveModalTab('details')}>
                <Users size={18}/> Employee Details
              </button>
              {formData.Id > 0 && (
                <button style={styles.tab(activeModalTab === 'docs')} onClick={() => setActiveModalTab('docs')}>
                  <FileText size={18}/> Documents
                </button>
              )}
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', padding: '1rem', cursor: 'pointer', color: '#6B7280' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              {activeModalTab === 'details' ? (
                <form onSubmit={handleSubmit}>
                  {error && <div style={styles.errorMsg}>{error}</div>}
                  <div style={styles.grid2}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Employee Code*</label>
                      <input type="text" style={styles.input} name="EmployeeCode" value={formData.EmployeeCode} onChange={handleChange} />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Email</label>
                      <input type="email" style={styles.input} name="Email" value={formData.Email} onChange={handleChange} />
                    </div>
                  </div>
                  <div style={styles.grid2}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>First Name*</label>
                      <input type="text" style={styles.input} name="FirstName" value={formData.FirstName} onChange={handleChange} />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Last Name*</label>
                      <input type="text" style={styles.input} name="LastName" value={formData.LastName} onChange={handleChange} />
                    </div>
                  </div>
                  <div style={styles.grid2}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Department*</label>
                      <select style={styles.input} name="DeptId" value={formData.DeptId} onChange={handleChange}>
                        <option value="">Select Department</option>
                        {departments.map(d => <option key={d.Id} value={d.Id}>{d.DeptName || d.Name}</option>)}
                      </select>
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Designation*</label>
                      <select style={styles.input} name="DesigId" value={formData.DesigId} onChange={handleChange}>
                        <option value="">Select Designation</option>
                        {designations.map(d => <option key={d.Id} value={d.Id}>{d.DesigName || d.Name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={styles.grid2}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Date of Joining</label>
                      <input type="date" style={styles.input} name="DateOfJoining" value={formData.DateOfJoining} onChange={handleChange} />
                    </div>
                    <div style={{ ...styles.inputGroup, justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.5rem' }}>
                        <input type="checkbox" id="active" name="IsActive" checked={formData.IsActive} onChange={handleChange} />
                        <label htmlFor="active" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>Account Active</label>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
                    <button type="button" onClick={() => setIsModalOpen(false)} style={styles.btnOutline}>Cancel</button>
                    <button type="submit" disabled={saving} style={saving ? styles.btnPrimaryDisabled : styles.btnPrimary}>
                      {saving ? 'Saving...' : 'Save Employee'}
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0 }}>Employee Documents</h3>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
                    <button style={styles.btnPrimary} onClick={() => fileInputRef.current.click()} disabled={uploadingDoc}>
                      {uploadingDoc ? <Loader2 size={18} className="animate-spin"/> : <Upload size={18}/>} Upload New
                    </button>
                  </div>
                  {empDocs.length > 0 ? empDocs.map((doc) => (
                    <div key={doc.Id} style={styles.docRow}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', color: '#111827' }}>{doc.DocumentType}</h4>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6B7280' }}>{doc.FileName} • {new Date(doc.UploadDate).toLocaleDateString()}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a href={`http://localhost:5005${doc.FilePath}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                          <button style={{ ...styles.actionBtn, color: '#3B82F6' }} title="Download"><Download size={16}/></button>
                        </a>
                        <button style={{ ...styles.actionBtn, color: '#EF4444' }} onClick={() => handleDocDelete(doc.Id)} title="Delete"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  )) : <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>No documents found.</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
