import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5005/api'
});

export const getDashboardStats = () => api.get('/Dashboard/stats');
export const getDeptDistribution = () => api.get('/Dashboard/dept-distribution');

export const getEmployees = () => api.get('/Employee');
export const upsertEmployee = (data) => api.post('/Employee', data);
export const deleteEmployee = (id) => api.delete(`/Employee/${id}`);
export const archiveEmployee = (id) => api.put(`/Employee/archive/${id}`);

export const getDepartments = () => api.get('/Master/departments');
export const getDesignations = () => api.get('/Master/designations');

export const getDailyAttendance = (date) => api.get(`/Attendance/daily/${date}`);
export const upsertAttendance = (data) => api.post('/Attendance/upsert', data);

export const getAllPayslips = (month, year) => api.get(`/Payroll/payslips/${month}/${year}`);
export const getPayslipsByEmployee = (employeeId) => api.get(`/Payroll/employee-payslips/${employeeId}`);
export const upsertEmployeeSalary = (data) => api.post('/Payroll/upsert-salary', data);

export const getLeaves = () => api.get('/Leave');
export const applyLeave = (data) => api.post('/Leave/apply', data);
export const updateLeaveStatus = (data) => api.post('/Leave/status', data);

export const getAssets = () => api.get('/Asset');
export const upsertAsset = (data) => api.post('/Asset', data);

export const getTasks = () => api.get('/Task');
export const upsertTask = (data) => api.post('/Task', data);

export const getAwards = () => api.get('/Award');
export const upsertAward = (data) => api.post('/Award', data);

export const getNotifications = (employeeId) => api.get(`/Notification/${employeeId}`);
export const markNotificationRead = (id) => api.post(`/Notification/read/${id}`);

export const getEmployeeDocuments = (employeeId) => api.get(`/Document/${employeeId}`);
export const uploadDocument = (formData) => api.post('/Document/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteDocument = (id) => api.delete(`/Document/${id}`);

export const login = (data) => api.post('/Auth/login', data);

export default api;
