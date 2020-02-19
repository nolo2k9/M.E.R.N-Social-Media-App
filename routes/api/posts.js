// Handles posts users make

const express = require('express');
const router = express.Router();

// GET api/posts - Test route - is Public
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;