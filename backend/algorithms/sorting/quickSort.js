/**
 * Quick Sort selects a pivot element and partitions the array around it,
 * placing smaller elements to the left and larger to the right (vice-versa for descending).
 */
function quickSort(inputArray, order = 'asc') {
  const arr = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function partition(low, high) {
    const pivot = arr[high];
    steps.push({
      type: 'pivot',
      indices: [high],
      message: `Selected pivot ${pivot} at index ${high}`
    });

    let i = low - 1;

    for (let j = low; j < high; j += 1) {
      comparisons += 1;
      steps.push({
        type: 'compare',
        indices: [j, high],
        message: `Comparing element at index ${j} (${arr[j]}) with pivot (${pivot})`
      });

      const shouldSwap = order === 'asc' ? arr[j] <= pivot : arr[j] >= pivot;

      if (shouldSwap) {
        i += 1;
        if (i !== j) {
          swaps += 1;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            type: 'swap',
            indices: [i, j],
            message: `Swapped index ${i} and index ${j} around pivot`
          });
        }
      }
    }

    // Place pivot at its final position
    if (i + 1 !== high) {
      swaps += 1;
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;

      steps.push({
        type: 'swap',
        indices: [i + 1, high],
        message: `Placed pivot ${pivot} into its sorted position at index ${i + 1}`
      });
    }

    steps.push({
      type: 'sorted',
      indices: [i + 1],
      message: `Pivot element at index ${i + 1} is now in its final sorted position`
    });

    return i + 1;
  }

  function sort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    } else if (low === high) {
      steps.push({
        type: 'sorted',
        indices: [low],
        message: `Single element at index ${low} is sorted`
      });
    }
  }

  sort(0, arr.length - 1);

  // Guarantee all elements are marked sorted
  for (let idx = 0; idx < arr.length; idx += 1) {
    steps.push({
      type: 'sorted',
      indices: [idx],
      message: `Array is sorted`
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

module.exports = quickSort;
