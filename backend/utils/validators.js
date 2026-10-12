const MAX_ARRAY_SIZE = 100;
const MIN_ARRAY_SIZE = 1;

function validateArray(arr) {
  if (!Array.isArray(arr)) {
    return { valid: false, message: 'Input must be an array.' };
  }

  if (arr.length < MIN_ARRAY_SIZE) {
    return { valid: false, message: 'Array must contain at least one element.' };
  }

  if (arr.length > MAX_ARRAY_SIZE) {
    return {
      valid: false,
      message: `Array size cannot exceed ${MAX_ARRAY_SIZE} elements.`
    };
  }

  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (typeof val !== 'number' || !Number.isFinite(val)) {
      return {
        valid: false,
        message: `Element at index ${i} is not a valid number.`
      };
    }
  }

  return { valid: true };
}

function validateOrder(order) {
  if (order !== 'asc' && order !== 'desc') {
    return {
      valid: false,
      message: 'Order must be either "asc" or "desc".'
    };
  }
  return { valid: true };
}

function validateTarget(target) {
  if (target === undefined || target === null || typeof target !== 'number' || !Number.isFinite(target)) {
    return {
      valid: false,
      message: 'Target must be a valid number.'
    };
  }
  return { valid: true };
}

function isSorted(arr, order = 'asc') {
  for (let i = 1; i < arr.length; i += 1) {
    if (order === 'asc' && arr[i] < arr[i - 1]) {
      return false;
    }
    if (order === 'desc' && arr[i] > arr[i - 1]) {
      return false;
    }
  }
  return true;
}

module.exports = {
  MAX_ARRAY_SIZE,
  MIN_ARRAY_SIZE,
  validateArray,
  validateOrder,
  validateTarget,
  isSorted
};
