import express from 'express';
import Job from '../models/Job.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const { 
      keyword, location, type, category, 
      experienceLevel, salaryMin, salaryMax 
    } = req.query;

    let query = {};

    if (keyword) {
      query.$text = { $search: keyword };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    if (salaryMin) {
      query.salaryMin = { $gte: parseInt(salaryMin) };
    }

    if (salaryMax) {
      query.salaryMax = { $lte: parseInt(salaryMax) };
    }

    const jobs = await Job.find(query)
      .populate('employer', 'name company')
      .sort('-createdAt');

    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employer', 'name company location')
      .populate('applications');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create job
router.post('/', protect, authorize('employer'), async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      employer: req.user.id
    });

    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update job
router.put('/:id', protect, authorize('employer'), async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is job owner
    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json(job);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete job
router.delete('/:id', protect, authorize('employer'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is job owner
    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await job.remove();

    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;