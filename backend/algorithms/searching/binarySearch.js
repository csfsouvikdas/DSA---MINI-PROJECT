/**
 * Binary Search finds the position of a target value within a sorted array
 * by repeatedly dividing the search interval in half.
 */
function binarySearch(inputArray, target) {
  const arr = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let foundIndex = -1;

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    steps.push({
      type: 'pointer',
      indices: [low, mid, high],
      pointers: { low, mid, high },
      message: `Interval [${low}..${high}]: low=${low}, mid=${mid}, high=${high}`
    });

    comparisons += 1;
    steps.push({
      type: 'compare',
      indices: [mid],
      pointers: { low, mid, high },
      message: `Comparing mid value at index ${mid} (${arr[mid]}) with target (${target})`
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      steps.push({
        type: 'found',
        indices: [mid],
        pointers: { low, mid, high },
        message: `Target ${target} found at mid index ${mid}`
      });
      break;
    }

    if (arr[mid] < target) {
      steps.push({
        type: 'pointer',
        indices: [mid + 1, high],
        pointers: { low: mid + 1, mid, high },
        message: `${arr[mid]} < ${target}: target lies in right half. Updating low to ${mid + 1}`
      });
      low = mid + 1;
    } else {
      steps.push({
        type: 'pointer',
        indices: [low, mid - 1],
        pointers: { low, mid, high: mid - 1 },
        message: `${arr[mid]} > ${target}: target lies in left half. Updating high to ${mid - 1}`
      });
      high = mid - 1;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      type: 'not-found',
      indices: [],
      message: `Target ${target} was not found in the array`
    });
  }

  return {
    steps,
    result: { found: foundIndex !== -1, index: foundIndex },
    stats: {
      comparisons,
      swaps: 0,
      totalSteps: steps.length
    }
  };
}

module.exports = binarySearch;
