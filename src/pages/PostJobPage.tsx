import { useState } from 'react';
import { Briefcase, Building, MapPin, Clock, DollarSign, FileText, BookOpen, Send } from 'lucide-react';

interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  applyMethod: string;
  contactEmail: string;
}

export default function PostJobPage() {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    salary: '',
    description: '',
    requirements: '',
    applyMethod: 'email',
    contactEmail: ''
  });

  const [errors, setErrors] = useState<Partial<JobFormData>>({});
  const [dummyIndex, setDummyIndex] = useState(0);

  const generateDummyJob = (i: number): JobFormData & { id: number } => ({
    id: i + 1,
    title: ['Senior Software Engineer', 'UX Designer', 'Product Manager', 'Marketing Specialist', 'Data Scientist'][i % 5],
    company: ['TechCorp', 'DesignHub', 'InnovateCo', 'MarketGenius', 'DataMinds'][i % 5],
    location: ['San Francisco, CA', 'New York, NY', 'Chicago, IL', 'Remote', 'Boston, MA'][i % 5],
    type: ['full-time', 'part-time', 'contract', 'remote', 'internship'][i % 5],
    salary: ['$110K - $140K', '$90K - $120K', '$100K - $130K', '$80K - $100K', '$120K - $150K'][i % 5],
    description: `We are looking for a talented ${['software engineer', 'UX designer', 'product manager', 'marketing specialist', 'data scientist'][i % 5]} to join our team.`,
    requirements: 'Bachelor\'s degree, 3+ years experience, strong communication skills',
    applyMethod: 'email',
    contactEmail: `careers@${['techcorp', 'designhub', 'innovateco', 'marketgenius', 'dataminds'][i % 5]}.com`
  });

  const validateForm = () => {
    const newErrors: Partial<JobFormData> = {};
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.requirements) newErrors.requirements = 'Requirements are required';
    if (formData.applyMethod === 'email' && !formData.contactEmail) {
      newErrors.contactEmail = 'Contact email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newJob = { ...formData, id: Date.now() };
      console.log('Submitting job:', newJob);
      // Reset form after submission
      setFormData({
        title: '',
        company: '',
        location: '',
        type: 'full-time',
        salary: '',
        description: '',
        requirements: '',
        applyMethod: 'email',
        contactEmail: ''
      });
      alert('Job posted successfully!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof JobFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGenerateDummy = () => {
    const dummyJob = generateDummyJob(dummyIndex);
    setDummyIndex(prev => (prev + 1) % 5);
    setFormData({
      title: dummyJob.title,
      company: dummyJob.company,
      location: dummyJob.location,
      type: dummyJob.type,
      salary: dummyJob.salary,
      description: dummyJob.description,
      requirements: dummyJob.requirements,
      applyMethod: dummyJob.applyMethod,
      contactEmail: dummyJob.contactEmail
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-blue-600" />
            Post a New Job
          </h1>
          <button
            type="button"
            onClick={handleGenerateDummy}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Generate Dummy Data
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              Job Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="e.g. Senior React Developer"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Company & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Building className="w-5 h-5 text-gray-500" />
                Company Name
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.company ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="Company name"
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.location ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="e.g. Remote, New York, etc."
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Job Type & Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gray-500" />
                Salary Range
              </label>
              <input
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                placeholder="e.g. $80,000 - $120,000"
              />
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                errors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="Describe the job responsibilities and expectations..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                errors.requirements ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="List the required skills, experience, and qualifications..."
            />
            {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
          </div>

          {/* Application Method */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How to Apply</label>
              <select
                name="applyMethod"
                value={formData.applyMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
              >
                <option value="email">Email Application</option>
                <option value="website">Company Website</option>
                <option value="platform">Through Platform</option>
              </select>
            </div>

            {formData.applyMethod === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                    errors.contactEmail ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="careers@company.com"
                />
                {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Send className="w-5 h-5" />
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}