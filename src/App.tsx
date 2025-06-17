import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import JobListingsPage from './pages/JobListingsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TextGeneratorPage from './pages/TextGeneratorPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import JobSeekerDashboardPage from './pages/JobSeekerDashboardPage';
import PostJobPage from './pages/PostJobPage';
import AnalyticsPage from './pages/AnalyticsPage';

// Context
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="jobs" element={<JobListingsPage />} />
                <Route path="jobs/:id" element={<JobDetailsPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="text-generator" element={<TextGeneratorPage />} />
              </Route>

              {/* Protected dashboard */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="employer" element={<EmployerDashboardPage />} />
                <Route path="jobseeker" element={<JobSeekerDashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="post-job" element={<PostJobPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </Router>

      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}