import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, DollarSign, Users, Briefcase, CheckCircle, 
  XCircle, Share2, Bookmark, Clock, Building2, Globe, Mail
} from 'lucide-react';

// Dummy job data
const dummyJobs = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: ['Senior Software Engineer', 'UX Designer', 'Product Manager', 'Marketing Specialist', 'Data Scientist'][i % 5],
  company: ['TechCorp', 'DesignHub', 'InnovateCo', 'MarketGenius', 'DataMinds'][i % 5],
  location: ['San Francisco, CA', 'New York, NY', 'Chicago, IL', 'Remote', 'Boston, MA'][i % 5],
  type: ['Full-time', 'Part-time', 'Contract', 'Remote', 'Freelance'][i % 5],
  salary: ['$110K - $140K', '$90K - $120K', '$100K - $130K', '$80K - $100K', '$120K - $150K'][i % 5],
  description: `We are looking for a talented and passionate professional to join our growing team. As a ${['Senior Software Engineer', 'UX Designer', 'Product Manager', 'Marketing Specialist', 'Data Scientist'][i % 5]}, you will be responsible for developing innovative solutions and contributing to our company's success.

The ideal candidate is creative, detail-oriented, and has excellent problem-solving skills. You will work closely with cross-functional teams to deliver high-quality results.

This is an opportunity to make a significant impact in a dynamic environment while growing your career.`,
  requirements: [
    'Bachelor\'s degree in Computer Science, Engineering, or related field',
    '5+ years of experience in software development',
    'Strong knowledge of JavaScript and modern frameworks',
    'Experience with cloud infrastructure (AWS, Azure, GCP)',
    'Excellent problem-solving and communication skills'
  ],
  benefits: [
    'Competitive salary and stock options',
    'Comprehensive health, dental, and vision insurance',
    'Flexible work arrangements and unlimited PTO',
    '401(k) matching',
    'Professional development budget'
  ],
  posted: ['1 day ago', '2 days ago', '3 days ago', '1 week ago', 'Just now'][i % 5],
  logo: `https://ui-avatars.com/api/?name=${['TC', 'DH', 'IC', 'MG', 'DM'][i % 5]}&background=random`,
  skills: [
    ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    ['Figma', 'UI/UX', 'Adobe XD', 'Sketch', 'User Research'],
    ['Product Management', 'Agile', 'JIRA', 'Roadmapping', 'User Stories'],
    ['SEO', 'Content Marketing', 'Social Media', 'Google Analytics', 'Email Marketing'],
    ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics']
  ][i % 5],
  company_info: {
    description: `${['TechCorp', 'DesignHub', 'InnovateCo', 'MarketGenius', 'DataMinds'][i % 5]} is a leading company in the ${['technology', 'design', 'innovation', 'marketing', 'data science'][i % 5]} industry. We are committed to creating cutting-edge solutions that solve real-world problems.`,
    size: ['50-100', '100-250', '250-500', '500-1000', '10-50'][i % 5],
    founded: [2010, 2015, 2005, 2018, 2012][i % 5],
    website: `https://www.${['techcorp', 'designhub', 'innovateco', 'marketgenius', 'dataminds'][i % 5]}.com`
  }
}));

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSaved, setHasSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const foundJob = dummyJobs.find(job => job.id === Number(id));
      setJob(foundJob);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      // Show success message or redirect
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setApplicationForm(prev => ({ ...prev, resume: e.target.files?.[0] || null }));
    }
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/jobs"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/jobs"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            &larr; Back to Jobs
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`} 
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center 
                      ${job.type === 'Full-time' ? 'bg-green-50 text-green-700' : 
                        job.type === 'Part-time' ? 'bg-blue-50 text-blue-700' : 
                        job.type === 'Contract' ? 'bg-purple-50 text-purple-700' :
                        job.type === 'Remote' ? 'bg-teal-50 text-teal-700' : 
                        'bg-orange-50 text-orange-700'}`}
                    >
                      <Briefcase className="h-3 w-3 mr-1" />
                      {job.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mt-1">{job.company}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      Posted {job.posted}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      {job.company_info.size} employees
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setIsApplying(true)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex-1 md:flex-none"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => setHasSaved(!hasSaved)}
                  className={`px-5 py-2 rounded-md transition-colors flex items-center justify-center flex-1 md:flex-none
                    ${hasSaved ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${hasSaved ? 'fill-blue-600' : ''}`} />
                  {hasSaved ? 'Saved' : 'Save Job'}
                </button>
                <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors md:ml-auto">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">{job.description}</p>
              </div>
            </div>
            
            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            className="lg:w-80"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Company Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="flex items-center mb-4">
                <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`} 
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{job.company}</h3>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                {job.company_info.description}
              </p>
              
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{job.company_info.size} employees</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Founded in {job.company_info.founded}</span>
                </div>
                <a 
                  href={job.company_info.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
            
            {/* Job Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium block">Salary</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium block">Job Type</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium block">Posted</span>
                    <span>{job.posted}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {dummyJobs.slice(0, 3).map((similarJob) => (
                  <div key={similarJob.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium text-gray-900">{similarJob.title}</h3>
                    <p className="text-gray-600 text-sm">{similarJob.company}</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{similarJob.location}</span>
                    </div>
                    <div className="mt-2">
                      <Link
                        to={`/jobs/${similarJob.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Job
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Application Modal */}
      {isApplying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Apply for {job.title}</h2>
                <button 
                  onClick={() => setIsApplying(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleApply} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={applicationForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={applicationForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                  <div className="border border-gray-300 rounded-md p-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Mail className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOCX (MAX. 5MB)</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                          accept=".pdf,.docx"
                        />
                      </label>
                    </div>
                    {applicationForm.resume && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected file: {applicationForm.resume.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={applicationForm.coverLetter}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Why are you a good fit for this position?"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;