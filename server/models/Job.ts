import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  applyMethod: string;
  contactEmail?: string;
  websiteUrl?: string;
  postedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote']
  },
  salary: { type: String },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  applyMethod: {
    type: String,
    required: true,
    enum: ['email', 'website', 'platform']
  },
  contactEmail: { 
    type: String,
    required: function() {
      return (this as any).applyMethod === 'email';
    }
  },
  websiteUrl: { 
    type: String,
    required: function() {
      return (this as any).applyMethod === 'website';
    }
  },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);