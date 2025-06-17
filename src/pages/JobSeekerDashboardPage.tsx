import { Briefcase, Building, FileText, Bell, Search, Star, CheckCircle, MapPin } from 'lucide-react';


interface JobApplication {
  id: number;
  position: string;
  company: string;
  status: 'applied' | 'reviewed' | 'interviewing' | 'offered' | 'rejected';
  dateApplied: string;
}

interface RecommendedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
}

interface StatItem {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
}

const dummyStats: StatItem[] = [
  { id: 1, title: 'Jobs Applied', value: '15', icon: <Briefcase className="h-8 w-8 text-blue-600" />, change: '+20%' },
  { id: 2, title: 'Interviews', value: '3', icon: <CheckCircle className="h-8 w-8 text-green-600" /> },
  { id: 3, title: 'Saved Jobs', value: '8', icon: <Star className="h-8 w-8 text-yellow-600" /> },
  { id: 4, title: 'Success Rate', value: '65%', icon: <FileText className="h-8 w-8 text-purple-600" /> },
];

const dummyApplications: JobApplication[] = [
  { id: 1, position: 'Frontend Developer', company: 'TechCorp', status: 'interviewing', dateApplied: '2024-03-15' },
  { id: 2, position: 'UX Designer', company: 'DesignHub', status: 'reviewed', dateApplied: '2024-03-14' },
  { id: 3, position: 'Product Manager', company: 'InnovateX', status: 'applied', dateApplied: '2024-03-13' },
  { id: 4, position: 'Data Analyst', company: 'DataWorks', status: 'offered', dateApplied: '2024-03-10' },
];

const recommendedJobs: RecommendedJob[] = [
  { id: 1, title: 'Senior React Engineer', company: 'ReactTech', location: 'Remote', type: 'Full-time', salary: '$120k - $150k', posted: '2d ago' },
  { id: 2, title: 'Mobile Developer', company: 'AppWorks', location: 'New York', type: 'Contract', salary: '$90 - $120/hr', posted: '1d ago' },
  { id: 3, title: 'DevOps Engineer', company: 'CloudSystems', location: 'London', type: 'Remote', salary: '£80k - £100k', posted: '3d ago' },
  { id: 4, title: 'UI Developer', company: 'DesignCo', location: 'San Francisco', type: 'Part-time', salary: '$70k - $90k', posted: '5d ago' },
];

export default function JobSeekerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600 mt-2">Here's your job search overview</p>
          </div>
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
            <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                {stat.change && <span className="text-sm text-green-600">{stat.change}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>
            <div className="space-y-4">
              {dummyApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{application.position}</h3>
                    <p className="text-sm text-gray-500">{application.company}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'reviewed' ? 'bg-purple-100 text-purple-800' :
                      application.status === 'interviewing' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'offered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{application.dateApplied}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Recommended Jobs</h2>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <Star className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                    <span>{job.salary}</span>
                    <span className="ml-auto text-gray-500">{job.posted}</span>
                  </div>
                  <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}