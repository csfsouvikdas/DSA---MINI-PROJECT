/**
 * Merge Sort is a divide-and-conquer algorithm that recursively splits
 * the array into halves and merges sorted subarrays back using overwrite steps.
 */
function mergeSort(inputArray, order = 'asc') {
  const arr = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0; // count of overwrites

  function merge(start, mid, end) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      comparisons += 1;
      steps.push({
        type: 'compare',
        indices: [start + i, mid + 1 + j],
        message: `Comparing left element (${left[i]}) with right element (${right[j]})`
      });

      const chooseLeft = order === 'asc' ? left[i] <= right[j] : left[i] >= right[j];

      if (chooseLeft) {
        arr[k] = left[i];
        swaps += 1;
        steps.push({
          type: 'overwrite',
          indices: [k],
          value: left[i],
          message: `Overwriting index ${k} with left element ${left[i]}`
        });
        i += 1;
      } else {
        arr[k] = right[j];
        swaps += 1;
        steps.push({
          type: 'overwrite',
          indices: [k],
          value: right[j],
          message: `Overwriting index ${k} with right element ${right[j]}`
        });
        j += 1;
      }
      k += 1;
    }

    while (i < left.length) {
      arr[k] = left[i];
      swaps += 1;
      steps.push({
        type: 'overwrite',
        indices: [k],
        value: left[i],
        message: `Overwriting index ${k} with remaining left element ${left[i]}`
      });
      i += 1;
      k += 1;
    }

    while (j < right.length) {
      arr[k] = right[j];
      swaps += 1;
      steps.push({
        type: 'overwrite',
        indices: [k],
        value: right[j],
        message: `Overwriting index ${k} with remaining right element ${right[j]}`
      });
      j += 1;
      k += 1;
    }
  }

  function divideAndConquer(start, end) {
    if (start >= end) {
      return;
    }
    const mid = Math.floor((start + end) / 2);
    divideAndConquer(start, mid);
    divideAndConquer(mid + 1, end);
    merge(start, mid, end);
  }

  divideAndConquer(0, arr.length - 1);

  // Mark all elements as sorted upon completion
  for (let idx = 0; idx < arr.length; idx += 1) {
    steps.push({
      type: 'sorted',
      indices: [idx],
      message: `Index ${idx} is confirmed sorted`
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

module.exports = mergeSort;
