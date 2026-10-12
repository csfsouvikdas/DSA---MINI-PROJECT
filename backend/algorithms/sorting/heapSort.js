/**
 * Heap Sort converts the array into a binary heap data structure,
 * repeatedly extracts the root to the end of the array, and rebuilds the heap.
 */
function heapSort(inputArray, order = 'asc') {
  const arr = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  function heapify(size, rootIndex) {
    let extremum = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    if (left < size) {
      comparisons += 1;
      steps.push({
        type: 'compare',
        indices: [left, extremum],
        message: `Comparing left child at index ${left} (${arr[left]}) with root at index ${extremum} (${arr[extremum]})`
      });

      const leftViolates = order === 'asc' ? arr[left] > arr[extremum] : arr[left] < arr[extremum];
      if (leftViolates) {
        extremum = left;
      }
    }

    if (right < size) {
      comparisons += 1;
      steps.push({
        type: 'compare',
        indices: [right, extremum],
        message: `Comparing right child at index ${right} (${arr[right]}) with extremum at index ${extremum} (${arr[extremum]})`
      });

      const rightViolates = order === 'asc' ? arr[right] > arr[extremum] : arr[right] < arr[extremum];
      if (rightViolates) {
        extremum = right;
      }
    }

    if (extremum !== rootIndex) {
      swaps += 1;
      const temp = arr[rootIndex];
      arr[rootIndex] = arr[extremum];
      arr[extremum] = temp;

      steps.push({
        type: 'swap',
        indices: [rootIndex, extremum],
        message: `Swapped index ${rootIndex} and index ${extremum} to maintain heap property`
      });

      heapify(size, extremum);
    }
  }

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    heapify(n, i);
  }

  // Extract elements one by one from heap
  for (let i = n - 1; i > 0; i -= 1) {
    swaps += 1;
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    steps.push({
      type: 'swap',
      indices: [0, i],
      message: `Extracted heap root ${arr[i]} to sorted position at index ${i}`
    });

    steps.push({
      type: 'sorted',
      indices: [i],
      message: `Index ${i} (${arr[i]}) is now sorted`
    });

    heapify(i, 0);
  }

  if (n > 0) {
    steps.push({
      type: 'sorted',
      indices: [0],
      message: `First element at index 0 is now sorted`
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

module.exports = heapSort;
