/**
 * Selection Sort repeatedly finds the extremum (minimum for ascending, maximum for descending)
 * in the unsorted subarray and places it at the current boundary index.
 */
function selectionSort(inputArray, order = 'asc') {
  const arr = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  for (let i = 0; i < n; i += 1) {
    let targetIndex = i;

    for (let j = i + 1; j < n; j += 1) {
      comparisons += 1;
      steps.push({
        type: 'compare',
        indices: [targetIndex, j],
        message: `Comparing current extremum index ${targetIndex} (${arr[targetIndex]}) with index ${j} (${arr[j]})`
      });

      const isNewTarget = order === 'asc' ? arr[j] < arr[targetIndex] : arr[j] > arr[targetIndex];

      if (isNewTarget) {
        targetIndex = j;
        steps.push({
          type: 'pivot',
          indices: [targetIndex],
          message: `New extremum found at index ${targetIndex} with value ${arr[targetIndex]}`
        });
      }
    }

    if (targetIndex !== i) {
      swaps += 1;
      const temp = arr[i];
      arr[i] = arr[targetIndex];
      arr[targetIndex] = temp;

      steps.push({
        type: 'swap',
        indices: [i, targetIndex],
        message: `Swapped index ${i} with new sorted element at index ${targetIndex}`
      });
    }

    steps.push({
      type: 'sorted',
      indices: [i],
      message: `Index ${i} (${arr[i]}) is now sorted`
    });
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

module.exports = selectionSort;
