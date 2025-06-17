// server/routes/analytics.js
import express from 'express';

const router = express.Router();

router.get('/analytics-data', (req, res) => {
  // Replace this with real data or DB call
  res.json({
    applications: [65, 78, 52, 91, 85, 107, 125],
    interviews: [28, 35, 21, 42, 38, 54, 63],
  });
});

export default router;
