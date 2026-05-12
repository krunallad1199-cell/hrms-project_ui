import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, FileText, Upload, Download, Trash2, Phone, Mail, MapPin, Save, X, Loader2 } from 'lucide-react';
import { getEmployees, upsertEmployee, getEmployeeDocuments, uploadDocument, deleteDocument } from '../api/api';

export default function EmployeeProfile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profile, setProfile] = useState({
    Id: 0,
    EmployeeCode: 'EMP001',
    FirstName: '',
    LastName: '',
    Email: '',
    DeptId: 1,
    DesigId: 1,
    DateOfJoining: '',
    IsActive: true,
    dob: '1990-08-15',
    gender: 'Male',
    maritalStatus: 'Single',
    bloodGroup: 'O+',
    address: '123 Main Street, Tech Park, City'
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const fetchDocuments = (empId) => {
    getEmployeeDocuments(empId)
      .then(res => { if (res.data) setDocuments(res.data); })
      .catch(err => console.error("Failed to load documents:", err));
  };

  useEffect(() => {
    setLoading(true);
    getEmployees()
      .then(res => {
        const myData = res.data?.find(e => e.EmployeeCode === 'EMP001');
        if (myData) {
          const syncedProfile = { ...profile, ...myData };
          setProfile(syncedProfile);
          setTempProfile(syncedProfile);
          fetchDocuments(syncedProfile.Id);
        }
      })
      .catch(err => console.error("Failed to sync profile:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        Id: profile.Id,
        EmployeeCode: profile.EmployeeCode,
        FirstName: tempProfile.FirstName,
        LastName: tempProfile.LastName,
        Email: tempProfile.Email,
        DeptId: profile.DeptId,
        DesigId: profile.DesigId,
        DateOfJoining: profile.DateOfJoining || new Date().toISOString(),
        IsActive: profile.IsActive
      };
      await upsertEmployee(payload);
      setProfile({ ...tempProfile });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = window.prompt("Enter Document Type (e.g., Resume, ID Card, Certificate):", "General");
    if (!type) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('employeeId', profile.Id);
    formData.append('documentType', type);
    formData.append('file', file);

    try {
      await uploadDocument(formData);
      fetchDocuments(profile.Id);
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  const handleDocDelete = async (docId) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await deleteDocument(docId);
      fetchDocuments(profile.Id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' },
    header: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB' },
    avatar: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' },
    title: { fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    subtitle: { color: '#6B7280', margin: '0.25rem 0 0 0' },
    tabs: { display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #E5E7EB' },
    tab: (active) => ({ padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '500', color: active ? '#2563EB' : '#6B7280', borderBottom: active ? '2px solid #2563EB' : 'none', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }),
    card: { backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #E5E7EB', marginBottom: '1.5rem' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' },
    label: { fontSize: '0.875rem', fontWeight: '500', color: '#6B7280' },
    value: { fontSize: '1rem', color: '#111827', fontWeight: '500' },
    input: { padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' },
    btnOutline: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#3B82F6', color: 'white', cursor: 'pointer', fontWeight: '500' },
    docRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '0.5rem', marginBottom: '0.75rem' }
  };

  const initials = `${(profile.FirstName || 'J')[0]}${(profile.LastName || 'D')[0]}`;

  if (loading) return <div style={styles.container}>Loading profile data...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}>{initials}</div>
        <div>
          <h1 style={styles.title}>{profile.FirstName} {profile.LastName}</h1>
          <p style={styles.subtitle}>{profile.EmployeeCode} • Software Engineer • Engineering</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
          {isEditing ? (
            <>
              <button style={styles.btnOutline} onClick={() => setIsEditing(false)} disabled={saving}><X size={18}/> Cancel</button>
              <button style={styles.btnPrimary} onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} Save Changes
              </button>
            </>
          ) : (
            <button style={{ ...styles.btnPrimary }} onClick={handleEdit}>Edit Profile</button>
          )}
        </div>
      </div>

      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === 'personal')} onClick={() => setActiveTab('personal')}><User size={18}/> Personal & Contact</button>
        <button style={styles.tab(activeTab === 'job')} onClick={() => setActiveTab('job')}><Briefcase size={18}/> Job Details</button>
        <button style={styles.tab(activeTab === 'docs')} onClick={() => setActiveTab('docs')}><FileText size={18}/> Documents</button>
      </div>

      {activeTab === 'personal' && (
        <div style={styles.grid2}>
          <div style={styles.card}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Personal Details</h3>
            <div style={styles.grid2}>
              <div style={styles.fieldGroup}>
                <span style={styles.label}>First Name</span>
                {isEditing ? <input style={styles.input} name="FirstName" value={tempProfile.FirstName} onChange={handleChange} /> : <span style={styles.value}>{profile.FirstName}</span>}
              </div>
              <div style={styles.fieldGroup}>
                <span style={styles.label}>Last Name</span>
                {isEditing ? <input style={styles.input} name="LastName" value={tempProfile.LastName} onChange={handleChange} /> : <span style={styles.value}>{profile.LastName}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'job' && (
        <div style={styles.card}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Job Details</h3>
          <div style={styles.grid2}>
            <div style={styles.fieldGroup}><span style={styles.label}>Employee ID</span><span style={styles.value}>{profile.EmployeeCode}</span></div>
            <div style={styles.fieldGroup}><span style={styles.label}>Date of Joining</span><span style={styles.value}>{new Date(profile.DateOfJoining).toLocaleDateString()}</span></div>
          </div>
        </div>
      )}

      {activeTab === 'docs' && (
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
            <h3 style={{ margin: 0 }}>Secure Documents</h3>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
            <button style={styles.btnOutline} onClick={() => fileInputRef.current.click()} disabled={uploading}>
              {uploading ? <Loader2 size={18} className="animate-spin"/> : <Upload size={18}/>} Upload Document
            </button>
          </div>
          
          {documents.length > 0 ? documents.map((doc, i) => (
            <div key={doc.Id} style={styles.docRow}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#111827' }}>{doc.DocumentType}</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6B7280' }}>{doc.FileName} • Uploaded on {new Date(doc.UploadDate).toLocaleDateString()}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href={`http://localhost:5005${doc.FilePath}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{ ...styles.btnOutline, padding: '0.5rem', color: '#3B82F6', borderColor: '#BFDBFE', backgroundColor: '#EFF6FF' }}><Download size={16}/></button>
                </a>
                <button style={{ ...styles.btnOutline, padding: '0.5rem', color: '#EF4444', borderColor: '#FECACA', backgroundColor: '#FEF2F2' }} onClick={() => handleDocDelete(doc.Id)}><Trash2 size={16}/></button>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>No documents uploaded yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
