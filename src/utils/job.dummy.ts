// src/utils/job.dummy.ts
import { JobPosting } from '../types/job.schemas';

export const generateDummyJob = (i: number): JobPosting => ({
  id: i + 1,
  title: ['Senior Software Engineer', 'UX Designer', 'Product Manager', 'Marketing Specialist', 'Data Scientist'][i % 5],
  company: ['TechCorp', 'DesignHub', 'InnovateCo', 'MarketGenius', 'DataMinds'][i % 5],
  location: ['San Francisco, CA', 'New York, NY', 'Chicago, IL', 'Remote', 'Boston, MA'][i % 5],
  type: ['Full-time', 'Part-time', 'Contract', 'Remote', 'Freelance'][i % 5],
  salary: ['$110K - $140K', '$90K - $120K', '$100K - $130K', '$80K - $100K', '$120K - $150K'][i % 5],
  description: `We are looking for a talented ${['software engineer', 'UX designer', 'product manager', 'marketing specialist', 'data scientist'][i % 5]} to join our team.`,
  requirements: 'Bachelor\'s degree, 3+ years experience, strong communication skills',
  applyMethod: 'email',
  contactEmail: `careers@${['techcorp', 'designhub', 'innovateco', 'marketgenius', 'dataminds'][i % 5]}.com`
});

export const generateDummyJobs = (count: number): JobPosting[] => 
  Array.from({ length: count }, (_, i) => generateDummyJob(i));