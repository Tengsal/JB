// server/recommender.js
const express = require('express');
const router = express.Router();

const data = [
  { user: 'A', item: 'Matrix', rating: 5 },
  { user: 'A', item: 'Titanic', rating: 4 },
  { user: 'B', item: 'Matrix', rating: 5 },
  { user: 'B', item: 'Avengers', rating: 2 },
  { user: 'C', item: 'Titanic', rating: 5 },
];

router.get('/recommend/:user', (req, res) => {
  const user = req.params.user;
  const recommended = data.filter(d => d.user !== user && d.rating >= 4);
  res.json(recommended.map(r => r.item));
});

module.exports = router;
