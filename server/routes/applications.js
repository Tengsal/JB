import express from 'express';
import Application from '../models/Application.js';
import User from '../models/User.js';
import Job from '../models/Job.js'; // Make sure this model exists

const router = express.Router();

// @route   POST /api/applications
// @desc    Submit a new job application
router.post('/', async (req, res) => {
  try {
    const { job, applicant, resume, coverLetter } = req.body;

    // Basic validation
    if (!job || !applicant || !resume) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const application = await Application.create({
      job,
      applicant,
      resume,
      coverLetter
    });

    // Add application to user
    await User.findByIdAndUpdate(applicant, {
      $push: { applications: application._id }
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: 'Failed to apply for job', error: err.message });
  }
});

// @route   GET /api/applications/user/:userId
// @desc    Get all applications by user
router.get('/user/:userId', async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.params.userId })
      .populate('job')
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user applications', error: err.message });
  }
});

// @route   GET /api/applications/job/:jobId
// @desc    Get all applications for a job
router.get('/job/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job applications', error: err.message });
  }
});

// @route   PATCH /api/applications/:id
// @desc    Update application status or notes
router.patch('/:id', async (req, res) => {
  try {
    const { status, noteContent, authorId } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;

    if (noteContent && authorId) {
      updateFields.$push = {
        notes: {
          content: noteContent,
          author: authorId
        }
      };
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application', error: err.message });
  }
});

export default router;
