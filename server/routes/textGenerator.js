// server/routes/textGenerator.js
import express from 'express';

const router = express.Router();

router.post('/generate-text', (req, res) => {
  res.json({ message: 'Generated text!' });
});

export default router; // ✅ This is crucial
