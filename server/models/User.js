import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['jobseeker', 'employer', 'admin'],
    default: 'jobseeker'
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100,
    default: ''
  },
  position: {
    type: String,
    trim: true,
    maxlength: 100,
    default: ''
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100,
    default: ''
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  resume: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    website: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
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

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update timestamp on save
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;