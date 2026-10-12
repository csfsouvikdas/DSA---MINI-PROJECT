const express = require('express');
const { handleSearch } = require('../controllers/searchController');

const router = express.Router();

router.post('/search/:algorithm', handleSearch);

module.exports = router;
