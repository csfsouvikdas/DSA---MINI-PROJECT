import { state } from './state.js';
import { renderBars } from './renderer.js';

let timerId = null;
let updateCallback = null;

export function registerUpdateCallback(cb) {
  updateCallback = cb;
}

export function setPlaybackSpeed(delayMs) {
  state.speed = delayMs;
}

export function play(container) {
  if (state.currentStepIndex >= state.steps.length - 1) {
    state.currentStepIndex = -1;
  }
  state.isPlaying = true;
  tick(container);
}

export function pause() {
  state.isPlaying = false;
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
}

export function resume(container) {
  if (!state.isPlaying && state.currentStepIndex < state.steps.length - 1) {
    state.isPlaying = true;
    tick(container);
  }
}

export function stepForward(container) {
  pause();
  if (state.currentStepIndex < state.steps.length - 1) {
    applyStep(state.currentStepIndex + 1, container);
  }
}

export function stepBackward(container) {
  pause();
  if (state.currentStepIndex > 0) {
    applyStep(state.currentStepIndex - 1, container);
  } else if (state.currentStepIndex === 0) {
    state.currentStepIndex = -1;
    renderBars(container, state.initialArray, null, new Set());
    if (updateCallback) updateCallback(-1);
  }
}

export function applyStep(stepIndex, container) {
  state.currentStepIndex = stepIndex;
  const currentArray = state.history[stepIndex + 1] || state.initialArray;
  const activeStep = state.steps[stepIndex] || null;

  // Compute all indices marked as sorted up to this step
  const sortedSet = new Set();
  for (let i = 0; i <= stepIndex; i += 1) {
    const s = state.steps[i];
    if (s.type === 'sorted' && s.indices) {
      s.indices.forEach((idx) => sortedSet.add(idx));
    }
  }

  renderBars(container, currentArray, activeStep, sortedSet);

  if (updateCallback) {
    updateCallback(stepIndex);
  }
}

function tick(container) {
  if (!state.isPlaying) return;

  if (state.currentStepIndex < state.steps.length - 1) {
    applyStep(state.currentStepIndex + 1, container);
    timerId = setTimeout(() => tick(container), state.speed);
  } else {
    state.isPlaying = false;
    timerId = null;
    if (updateCallback) updateCallback(state.currentStepIndex);
  }
}
