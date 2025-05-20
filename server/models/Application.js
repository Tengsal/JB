import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job is required']
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Applicant is required']
  },
  resume: {
    type: String,
    required: [true, 'Resume is required']
  },
  coverLetter: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'accepted'],
    default: 'pending'
  },
  notes: [{
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
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
ApplicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;