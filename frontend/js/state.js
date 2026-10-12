/**
 * Central state store for the visualizer.
 */
export const state = {
  array: [],
  initialArray: [],
  steps: [],
  history: [], // Precomputed array snapshots for each step
  currentStepIndex: -1,
  isPlaying: false,
  speed: 150, // ms delay
  category: 'sorting', // 'sorting' | 'searching'
  selectedAlgorithm: 'bubble',
  order: 'asc',
  target: 25,
  algorithmsMeta: null
};

export function setInitialArray(newArray) {
  state.initialArray = [...newArray];
  state.array = [...newArray];
  state.steps = [];
  state.history = [[...newArray]];
  state.currentStepIndex = -1;
  state.isPlaying = false;
}

export function resetToInitial() {
  state.array = [...state.initialArray];
  state.currentStepIndex = -1;
  state.isPlaying = false;
}

/**
 * Precomputes snapshot of array values at each step so that backward
 * and forward stepping are instantaneous and deterministic.
 */
export function buildHistory(initialArr, steps) {
  const history = [[...initialArr]];
  const current = [...initialArr];

  for (let i = 0; i < steps.length; i += 1) {
    const step = steps[i];

    if (step.type === 'swap' && step.indices && step.indices.length === 2) {
      const [idxA, idxB] = step.indices;
      const temp = current[idxA];
      current[idxA] = current[idxB];
      current[idxB] = temp;
    } else if (step.type === 'overwrite' && step.indices && step.value !== undefined) {
      const [idx] = step.indices;
      current[idx] = step.value;
    }

    history.push([...current]);
  }

  state.history = history;
}

export function getStepStats(stepIndex) {
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i <= stepIndex; i += 1) {
    const step = state.steps[i];
    if (!step) continue;
    if (step.type === 'compare') {
      comparisons += 1;
    } else if (step.type === 'swap' || step.type === 'overwrite') {
      swaps += 1;
    }
  }

  return { comparisons, swaps };
}
