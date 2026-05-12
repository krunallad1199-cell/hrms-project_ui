import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Clock, Coffee, CreditCard, Box, Award, BarChart3, Settings, LogOut, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import Reports from './components/Reports';
import PerformanceManagement from './components/PerformanceManagement';
import AttendanceManagement from './components/AttendanceManagement';
import LeaveManagement from './components/LeaveManagement';
import PayrollModule from './components/PayrollModule';
import EmployeeProfile from './components/EmployeeProfile';
import DepartmentDesignation from './components/DepartmentDesignation';
import Assets from './components/Assets';
import Tasks from './components/Tasks';
import Awards from './components/Awards';
import SettingsView from './components/Settings';
import EmployeeSelfService from './components/EmployeeSelfService';
import Notifications from './components/Notifications';

function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Employees', icon: Users, path: '/employees' },
    { name: 'Self Service', icon: Users, path: '/self-service' },
    { name: 'Attendance', icon: Clock, path: '/attendance' },
    { name: 'Leaves', icon: Coffee, path: '/leaves' },
    { name: 'Payroll', icon: CreditCard, path: '/payroll' },
    { name: 'Assets', icon: Box, path: '/assets' },
    { name: 'Tasks', icon: LayoutDashboard, path: '/tasks' },
    { name: 'Awards', icon: Award, path: '/awards' },
    { name: 'Departments', icon: BarChart3, path: '/departments' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Performance', icon: BarChart3, path: '/performance' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <div style={{ width: '250px', backgroundColor: 'white', borderRight: '1px solid #E5E7EB', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#3B82F6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box color="white" size={20} />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1E3A8A' }}>HRMS Pro</span>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', textDecoration: 'none',
                  backgroundColor: location.pathname === item.path ? '#EFF6FF' : 'transparent',
                  color: location.pathname === item.path ? '#1D4ED8' : '#4B5563',
                  fontWeight: location.pathname === item.path ? '600' : '500'
                }}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid #E5E7EB' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', color: '#4B5563', fontWeight: '500', cursor: 'pointer', width: '100%' }}>
          <LogOut size={20} /> Sign Out
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/self-service" element={<EmployeeSelfService />} />
            <Route path="/attendance" element={<AttendanceManagement />} />
            <Route path="/leaves" element={<LeaveManagement />} />
            <Route path="/payroll" element={<PayrollModule />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/departments" element={<DepartmentDesignation />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/performance" element={<PerformanceManagement />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<div style={{padding:'2rem'}}><h2>Module Under Construction</h2></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
