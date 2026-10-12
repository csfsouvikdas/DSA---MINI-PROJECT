const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const bubbleSort = require('../algorithms/sorting/bubbleSort');
const selectionSort = require('../algorithms/sorting/selectionSort');
const insertionSort = require('../algorithms/sorting/insertionSort');
const mergeSort = require('../algorithms/sorting/mergeSort');
const quickSort = require('../algorithms/sorting/quickSort');
const heapSort = require('../algorithms/sorting/heapSort');
const linearSearch = require('../algorithms/searching/linearSearch');
const binarySearch = require('../algorithms/searching/binarySearch');
const { validateArray, isSorted } = require('../utils/validators');

describe('Sorting Algorithms', () => {
  const algorithms = [
    { name: 'Bubble Sort', fn: bubbleSort },
    { name: 'Selection Sort', fn: selectionSort },
    { name: 'Insertion Sort', fn: insertionSort },
    { name: 'Merge Sort', fn: mergeSort },
    { name: 'Quick Sort', fn: quickSort },
    { name: 'Heap Sort', fn: heapSort }
  ];

  algorithms.forEach(({ name, fn }) => {
    test(`${name} sorts ascending correctly with duplicates and negatives`, () => {
      const input = [12, -5, 3, 0, 12, -8, 20];
      const { result, steps } = fn(input, 'asc');
      assert.deepEqual(result, [-8, -5, 0, 3, 12, 12, 20]);
      assert.ok(steps.length > 0);
    });

    test(`${name} sorts descending correctly`, () => {
      const input = [4, 1, 9, -2, 7];
      const { result } = fn(input, 'desc');
      assert.deepEqual(result, [9, 7, 4, 1, -2]);
    });

    test(`${name} handles single element array`, () => {
      const input = [42];
      const { result } = fn(input, 'asc');
      assert.deepEqual(result, [42]);
    });

    test(`${name} handles already sorted array`, () => {
      const input = [1, 2, 3, 4, 5];
      const { result } = fn(input, 'asc');
      assert.deepEqual(result, [1, 2, 3, 4, 5]);
    });

    test(`${name} handles reverse sorted array`, () => {
      const input = [5, 4, 3, 2, 1];
      const { result } = fn(input, 'asc');
      assert.deepEqual(result, [1, 2, 3, 4, 5]);
    });
  });
});

describe('Searching Algorithms', () => {
  test('Linear search finds element in unsorted array', () => {
    const input = [10, 50, 30, 70, 80, 20];
    const outcome = linearSearch(input, 30);
    assert.equal(outcome.result.found, true);
    assert.equal(outcome.result.index, 2);
  });

  test('Linear search returns not found for absent element', () => {
    const input = [10, 20, 30];
    const outcome = linearSearch(input, 99);
    assert.equal(outcome.result.found, false);
    assert.equal(outcome.result.index, -1);
  });

  test('Binary search finds element in sorted array', () => {
    const input = [-10, -3, 0, 5, 12, 45, 90];
    const outcome = binarySearch(input, 12);
    assert.equal(outcome.result.found, true);
    assert.equal(outcome.result.index, 4);
    assert.ok(outcome.steps.length > 0);
  });

  test('Binary search returns not found for absent element in sorted array', () => {
    const input = [2, 4, 6, 8, 10];
    const outcome = binarySearch(input, 7);
    assert.equal(outcome.result.found, false);
    assert.equal(outcome.result.index, -1);
  });
});

describe('Validation Utilities', () => {
  test('validateArray rejects non-arrays and empty arrays', () => {
    assert.equal(validateArray('hello').valid, false);
    assert.equal(validateArray([]).valid, false);
  });

  test('validateArray rejects non-numeric entries', () => {
    assert.equal(validateArray([1, 2, 'three']).valid, false);
  });

  test('isSorted detects sorted and unsorted sequences', () => {
    assert.equal(isSorted([1, 2, 3, 4]), true);
    assert.equal(isSorted([4, 2, 3]), false);
  });
});
