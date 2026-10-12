/**
 * Bubble Sort compares adjacent elements and swaps them if they are in the wrong order.
 * Larger (or smaller in descending) elements bubble to the end of the array.
 */
function bubbleSort(inputArray, order = 'asc') {
  const arr = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  for (let i = 0; i < n - 1; i += 1) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j += 1) {
      comparisons += 1;
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        message: `Comparing indices ${j} and ${j + 1} (${arr[j]} vs ${arr[j + 1]})`
      });

      const shouldSwap = order === 'asc' ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];

      if (shouldSwap) {
        swaps += 1;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          message: `Swapped indices ${j} and ${j + 1} because ${arr[j + 1]} is out of order`
        });
        swapped = true;
      }
    }

    // Element at n - 1 - i is now in its final sorted position
    steps.push({
      type: 'sorted',
      indices: [n - 1 - i],
      message: `Element ${arr[n - 1 - i]} at index ${n - 1 - i} is now sorted`
    });

    if (!swapped) {
      break;
    }
  }

  // Mark all remaining elements as sorted
  for (let k = 0; k < n; k += 1) {
    steps.push({
      type: 'sorted',
      indices: [k],
      message: `Array is fully sorted`
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

module.exports = bubbleSort;
