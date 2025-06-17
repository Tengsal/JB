import { Briefcase, Users, FileText, Clock, Search, Bell, Plus } from 'lucide-react';

interface JobPosting {
  id: number;
  title: string;
  applicants: number;
  status: 'open' | 'closed' | 'draft';
  datePosted: string;
}

interface JobApplication {
  id: number;
  applicantName: string;
  position: string;
  status: 'new' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
  dateApplied: string;
}

interface StatItem {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
}

const dummyStats: StatItem[] = [
  { id: 1, title: 'Total Jobs Posted', value: '24', icon: <Briefcase className="h-12 w-12 text-blue-600 p-3 bg-blue-50 rounded-lg" />, change: '+12%' },
  { id: 2, title: 'Total Applications', value: '189', icon: <FileText className="h-12 w-12 text-blue-600 p-3 bg-blue-50 rounded-lg" />, change: '+24%' },
  { id: 3, title: 'Hiring Rate', value: '68%', icon: <Users className="h-12 w-12 text-blue-600 p-3 bg-blue-50 rounded-lg" />, change: '+8%' },
  { id: 4, title: 'Avg. Time to Hire', value: '23 days', icon: <Clock className="h-12 w-12 text-blue-600 p-3 bg-blue-50 rounded-lg" /> },
];

const dummyJobs: JobPosting[] = [
  { id: 1, title: 'Senior React Developer', applicants: 45, status: 'open', datePosted: '2024-03-15' },
  { id: 2, title: 'UX Designer', applicants: 32, status: 'open', datePosted: '2024-03-10' },
  { id: 3, title: 'DevOps Engineer', applicants: 18, status: 'closed', datePosted: '2024-02-28' },
  { id: 4, title: 'Product Manager', applicants: 0, status: 'draft', datePosted: '2024-03-20' },
];

const dummyApplications: JobApplication[] = [
  { id: 1, applicantName: 'Sarah Johnson', position: 'Senior React Developer', status: 'new', dateApplied: '2024-03-18' },
  { id: 2, applicantName: 'Michael Chen', position: 'UX Designer', status: 'reviewed', dateApplied: '2024-03-16' },
  { id: 3, applicantName: 'Emma Wilson', position: 'DevOps Engineer', status: 'interviewed', dateApplied: '2024-03-12' },
  { id: 4, applicantName: 'David Miller', position: 'Product Manager', status: 'hired', dateApplied: '2024-03-10' },
];

export default function EmployerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dummyStats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                  {stat.change && (
                    <span className="text-sm text-green-600">{stat.change}</span>
                  )}
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Job Postings Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Job Postings</h2>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Plus size={18} />
              New Job Post
            </button>
          </div>

          <div className="space-y-4">
            {dummyJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {job.applicants} applicants • Posted {job.datePosted}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  job.status === 'open' ? 'bg-green-100 text-green-800' :
                  job.status === 'closed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Applicant</th>
                  <th className="pb-3">Position</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {dummyApplications.map((application) => (
                  <tr key={application.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-4">{application.applicantName}</td>
                    <td className="py-4">{application.position}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        application.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        application.status === 'reviewed' ? 'bg-purple-100 text-purple-800' :
                        application.status === 'interviewed' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'hired' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="py-4">{application.dateApplied}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}