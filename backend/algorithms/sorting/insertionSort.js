/**
 * Insertion Sort builds the sorted array one item at a time by shifting
 * elements greater (or smaller in descending) than the key to the right.
 */
function insertionSort(inputArray, order = 'asc') {
  const arr = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  // First element is trivially sorted relative to itself
  steps.push({
    type: 'sorted',
    indices: [0],
    message: `Index 0 is trivially sorted in subarray of size 1`
  });

  for (let i = 1; i < n; i += 1) {
    let j = i;

    steps.push({
      type: 'pivot',
      indices: [i],
      message: `Selecting index ${i} (${arr[i]}) as insertion key`
    });

    while (j > 0) {
      comparisons += 1;
      steps.push({
        type: 'compare',
        indices: [j - 1, j],
        message: `Comparing predecessor index ${j - 1} (${arr[j - 1]}) with key index ${j} (${arr[j]})`
      });

      const shouldShift = order === 'asc' ? arr[j - 1] > arr[j] : arr[j - 1] < arr[j];

      if (!shouldShift) {
        break;
      }

      // Swap adjacent elements to bubble key down to its sorted position
      swaps += 1;
      const temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;

      steps.push({
        type: 'swap',
        indices: [j - 1, j],
        message: `Shifted index ${j - 1} rightward into index ${j}`
      });

      j -= 1;
    }

    for (let k = 0; k <= i; k += 1) {
      steps.push({
        type: 'sorted',
        indices: [k],
        message: `Subarray [0..${i}] is now sorted`
      });
    }
  }

  return {
    steps,
    result: arr,
    stats: {
      comparisons,
      swaps,
      totalSteps: steps.length
    }
  };
}

module.exports = insertionSort;
