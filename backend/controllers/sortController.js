const bubbleSort = require('../algorithms/sorting/bubbleSort');
const selectionSort = require('../algorithms/sorting/selectionSort');
const insertionSort = require('../algorithms/sorting/insertionSort');
const mergeSort = require('../algorithms/sorting/mergeSort');
const quickSort = require('../algorithms/sorting/quickSort');
const heapSort = require('../algorithms/sorting/heapSort');
const { validateArray, validateOrder } = require('../utils/validators');

const SORTING_ALGORITHMS = {
  bubble: {
    fn: bubbleSort,
    name: 'Bubble Sort',
    description: 'Compares adjacent elements and swaps them if out of order.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' }
  },
  selection: {
    fn: selectionSort,
    name: 'Selection Sort',
    description: 'Finds minimum in unsorted subarray and swaps it to current position.',
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' }
  },
  insertion: {
    fn: insertionSort,
    name: 'Insertion Sort',
    description: 'Builds sorted array incrementally by shifting larger items to right.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' }
  },
  merge: {
    fn: mergeSort,
    name: 'Merge Sort',
    description: 'Divide-and-conquer algorithm splitting array and merging halves.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' }
  },
  quick: {
    fn: quickSort,
    name: 'Quick Sort',
    description: 'Partitions array around a pivot into smaller and larger elements.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' }
  },
  heap: {
    fn: heapSort,
    name: 'Heap Sort',
    description: 'Builds max/min heap and repeatedly extracts root to end.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' }
  }
};

const SEARCHING_ALGORITHMS_META = {
  linear: {
    name: 'Linear Search',
    description: 'Checks each element in array sequentially until target is found.',
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' }
  },
  binary: {
    name: 'Binary Search',
    description: 'Halves search range by comparing target with middle in sorted array.',
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' }
  }
};

function getAlgorithms(req, res) {
  const sorting = {};
  const searching = {};

  Object.entries(SORTING_ALGORITHMS).forEach(([key, item]) => {
    sorting[key] = { id: key, name: item.name, description: item.description, complexity: item.complexity };
  });

  Object.entries(SEARCHING_ALGORITHMS_META).forEach(([key, item]) => {
    searching[key] = { id: key, name: item.name, description: item.description, complexity: item.complexity };
  });

  return res.json({ sorting, searching });
}

function handleSort(req, res) {
  try {
    const { algorithm } = req.params;
    const { array, order = 'asc' } = req.body;

    const algoDef = SORTING_ALGORITHMS[algorithm];
    if (!algoDef) {
      const available = Object.keys(SORTING_ALGORITHMS).join(', ');
      return res.status(400).json({ error: `Unknown sorting algorithm "${algorithm}". Available: ${available}` });
    }

    const arrayValidation = validateArray(array);
    if (!arrayValidation.valid) {
      return res.status(400).json({ error: arrayValidation.message });
    }

    const orderValidation = validateOrder(order);
    if (!orderValidation.valid) {
      return res.status(400).json({ error: orderValidation.message });
    }

    const outcome = algoDef.fn(array, order);
    return res.json({ steps: outcome.steps, result: outcome.result, stats: outcome.stats });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process sorting request.' });
  }
}

module.exports = {
  getAlgorithms,
  handleSort,
  SORTING_ALGORITHMS,
  SEARCHING_ALGORITHMS_META
};
