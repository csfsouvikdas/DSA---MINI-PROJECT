/**
 * Linear Search sequentially checks each element of the array
 * until a match is found or the entire array has been traversed.
 */
function linearSearch(inputArray, target) {
  const arr = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let foundIndex = -1;

  for (let i = 0; i < arr.length; i += 1) {
    comparisons += 1;
    steps.push({
      type: 'compare',
      indices: [i],
      message: `Checking index ${i}: comparing ${arr[i]} with target ${target}`
    });

    if (arr[i] === target) {
      foundIndex = i;
      steps.push({
        type: 'found',
        indices: [i],
        message: `Target ${target} found at index ${i}`
      });
      break;
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

module.exports = linearSearch;
