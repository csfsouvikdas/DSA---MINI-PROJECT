const express = require('express');
const { getAlgorithms, handleSort } = require('../controllers/sortController');

const router = express.Router();

router.get('/algorithms', getAlgorithms);
router.post('/sort/:algorithm', handleSort);

module.exports = router;
