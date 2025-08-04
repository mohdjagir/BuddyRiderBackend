const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');

router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
