import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2, PieChart, TrendingUp, Users, Calendar, ArrowUp, ArrowDown, Filter, RefreshCw
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Line chart data - Job Applications Over Time
  const applicationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Applications',
        data: [65, 78, 52, 91, 85, 107, 125],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Interviews',
        data: [28, 35, 21, 42, 38, 54, 63],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Bar chart data - Most In-Demand Skills
  const skillsData = {
    labels: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'SQL', 'UI/UX'],
    datasets: [
      {
        label: 'Job Postings',
        data: [120, 98, 85, 75, 68, 62, 55],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  // Pie chart data - Applications by Category
  const categoryData = {
    labels: ['Technology', 'Marketing', 'Design', 'Finance', 'Healthcare', 'Education'],
    datasets: [
      {
        data: [35, 20, 15, 12, 10, 8],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Applications',
      icon: <BarChart2 className="h-6 w-6 text-blue-500" />,
      value: '325',
      change: '+12.5%',
      trend: 'up',
    },
    {
      title: 'Job Interviews',
      icon: <Users className="h-6 w-6 text-green-500" />,
      value: '42',
      change: '+8.3%',
      trend: 'up',
    },
    {
      title: 'Response Rate',
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      value: '18.2%',
      change: '-2.1%',
      trend: 'down',
    },
    {
      title: 'Avg. Time to Hire',
      icon: <Calendar className="h-6 w-6 text-orange-500" />,
      value: '21 days',
      change: '-3 days',
      trend: 'up',
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your job search performance and insights</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                timeRange === 'week'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                timeRange === 'month'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                timeRange === 'quarter'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Quarter
            </button>
          </div>
          
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
              isRefreshing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-500">{card.title}</h2>
              {card.icon}
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <div className={`flex items-center text-sm ${
                card.trend === 'up' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {card.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {card.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="space-y-6">
        {/* Applications Over Time */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Job Applications Over Time</h2>
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-400 mr-2" />
              <select className="text-sm text-gray-500 border-none focus:ring-0">
                <option>All Applications</option>
                <option>Submitted</option>
                <option>Interviews</option>
                <option>Offers</option>
              </select>
            </div>
          </div>
          <div className="h-80">
            <Line 
              data={applicationData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    align: 'end',
                  },
                  tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1F2937',
                    bodyColor: '#4B5563',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                      labelPointStyle: () => ({
                        pointStyle: 'circle',
                        rotation: 0
                      }),
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                  },
                },
                elements: {
                  point: {
                    radius: 4,
                    hoverRadius: 6,
                  },
                  line: {
                    borderWidth: 3,
                  },
                },
              }}
            />
          </div>
        </motion.div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Chart */}
          <motion.div
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Most In-Demand Skills</h2>
            <div className="h-80">
              <Bar 
                data={skillsData} 
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      grid: {
                        drawBorder: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
          
          {/* Applications by Category */}
          <motion.div
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Applications by Category</h2>
            <div className="h-80 flex items-center justify-center">
              <div className="h-64 w-64">
                <Pie 
                  data={categoryData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Applied to', position: 'Senior Frontend Developer', company: 'TechCorp', time: '2 hours ago' },
              { action: 'Received interview invitation from', position: 'UX Designer', company: 'DesignHub', time: '1 day ago' },
              { action: 'Completed assessment for', position: 'Product Manager', company: 'InnovateCo', time: '2 days ago' },
              { action: 'Updated resume for', position: 'Marketing Specialist', company: 'MarketGenius', time: '3 days ago' },
              { action: 'Saved job posting for', position: 'Data Scientist', company: 'DataMinds', time: '4 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium">{activity.company.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    <span className="text-gray-900 font-medium">You</span> {activity.action} <span className="text-blue-600 font-medium">{activity.position}</span> at <span className="text-gray-900 font-medium">{activity.company}</span>
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;