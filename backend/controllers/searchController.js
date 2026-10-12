const linearSearch = require('../algorithms/searching/linearSearch');
const binarySearch = require('../algorithms/searching/binarySearch');
const { validateArray, validateTarget, isSorted } = require('../utils/validators');

const SEARCHING_ALGORITHMS = {
  linear: linearSearch,
  binary: binarySearch
};

function handleSearch(req, res) {
  try {
    const { algorithm } = req.params;
    const { array, target } = req.body;

    const searchFn = SEARCHING_ALGORITHMS[algorithm];
    if (!searchFn) {
      return res.status(400).json({
        error: `Unknown searching algorithm "${algorithm}". Available: ${Object.keys(SEARCHING_ALGORITHMS).join(', ')}`
      });
    }

    const arrayValidation = validateArray(array);
    if (!arrayValidation.valid) {
      return res.status(400).json({ error: arrayValidation.message });
    }

    const targetValidation = validateTarget(target);
    if (!targetValidation.valid) {
      return res.status(400).json({ error: targetValidation.message });
    }

    if (algorithm === 'binary' && !isSorted(array, 'asc')) {
      return res.status(400).json({
        error: 'Binary search requires an array sorted in ascending order. Please sort the array first.'
      });
    }

    const outcome = searchFn(array, target);

    return res.json({
      steps: outcome.steps,
      result: outcome.result,
      stats: outcome.stats
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process search request.' });
  }
}

module.exports = {
  handleSearch
};
