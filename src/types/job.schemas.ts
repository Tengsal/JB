// src/types/job.schemas.ts
export interface JobFormData {
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

export interface JobPosting extends JobFormData {
  id: number;
}