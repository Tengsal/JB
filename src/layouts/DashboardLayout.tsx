import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, User, BarChart, FileText, LogOut, Menu, X, Home 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (!user) {
    navigate('/login');
    return null;
  }

  const navItems = [
    {
      path: user.role === 'employer' ? '/dashboard/employer' : '/dashboard/jobseeker',
      icon: <Home size={20} />,
      text: 'Dashboard'
    },
    {
      path: '/dashboard/profile',
      icon: <User size={20} />,
      text: 'Profile'
    },
    {
      path: '/dashboard/analytics',
      icon: <BarChart size={20} />,
      text: 'Analytics'
    }
  ];

  if (user.role === 'employer') {
    navItems.push({
      path: '/dashboard/post-job',
      icon: <Briefcase size={20} />,
      text: 'Post Job'
    });
  } else {
    navItems.push({
      path: '/text-generator',
      icon: <FileText size={20} />,
      text: 'Resume Generator'
    });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button 
        className="fixed z-50 bottom-5 right-5 p-2 rounded-full bg-blue-600 text-white shadow-lg md:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transition-transform ease-in-out duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-bold text-blue-800">JobPortal</h2>
            <p className="text-sm text-gray-500 mt-1">{user.role === 'employer' ? 'Employer Portal' : 'Job Seeker Portal'}</p>
          </div>

          <nav className="flex-grow p-5 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'hover:bg-gray-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.text}</span>
              </NavLink>
            ))}
            
            <button 
              onClick={logout}
              className="flex items-center w-full px-4 py-3 mt-8 text-red-600 rounded-lg hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </nav>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <motion.main 
          className="p-5 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;