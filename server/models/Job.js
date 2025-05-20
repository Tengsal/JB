import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide job title'],
    trim: true,
    maxlength: 100
  },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true,
    maxlength: 100
  },
  location: {
    type: String,
    required: [true, 'Please provide job location'],
    trim: true,
    maxlength: 100
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Remote', 'Freelance', 'Internship'],
    default: 'Full-time'
  },
  category: {
    type: String,
    required: [true, 'Please provide job category'],
    enum: [
      'Technology', 'Marketing', 'Design', 'Finance', 
      'Healthcare', 'Education', 'Engineering', 'Customer Service', 
      'Sales', 'HR', 'Legal', 'Other'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please provide job description'],
    trim: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  responsibilities: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  salaryMin: {
    type: Number,
    default: 0
  },
  salaryMax: {
    type: Number,
    default: 0
  },
  salaryCurrency: {
    type: String,
    default: 'USD'
  },
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'],
    default: 'Entry Level'
  },
  education: {
    type: String,
    enum: ['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate', 'Not Required'],
    default: 'Not Required'
  },
  applicationDeadline: {
    type: Date
  },
  companyLogo: {
    type: String,
    default: ''
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide employer']
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    default: 'published'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
JobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create text indexes for search
JobSchema.index({ 
  title: 'text', 
  company: 'text', 
  description: 'text', 
  location: 'text',
  skills: 'text'
});

const Job = mongoose.model('Job', JobSchema);

export default Job;