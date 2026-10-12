import { state, getStepStats } from './state.js';

export function updateStatsUI(elements, stepIndex) {
  const { comparisons, swaps } = getStepStats(stepIndex);
  elements.statComparisons.textContent = comparisons;
  elements.statSwaps.textContent = swaps;
  elements.statCurrentStep.textContent = Math.max(0, stepIndex + 1);
  elements.statTotalSteps.textContent = state.steps.length;
}

export function updateAlgorithmMetaUI(elements, meta) {
  if (!meta) return;
  elements.algoName.textContent = meta.name;
  elements.algoDesc.textContent = meta.description;
  elements.timeBest.textContent = meta.complexity.best;
  elements.timeAvg.textContent = meta.complexity.average;
  elements.timeWorst.textContent = meta.complexity.worst;
  elements.spaceWorst.textContent = meta.complexity.space;
}

export function updateStepMessage(elements, message) {
  elements.stepMessage.textContent = message || 'Ready to run algorithm.';
}

export function setPlaybackButtonStates(elements, isRunning) {
  elements.btnStart.disabled = isRunning;
  elements.btnPause.disabled = !isRunning;
  elements.btnResume.disabled = isRunning || state.currentStepIndex >= state.steps.length - 1;
  elements.btnStepBack.disabled = isRunning || state.currentStepIndex <= -1;
  elements.btnStepForward.disabled = isRunning || state.currentStepIndex >= state.steps.length - 1;

  elements.arraySizeSlider.disabled = isRunning;
  elements.btnGenerateRandom.disabled = isRunning;
  elements.btnApplyCustom.disabled = isRunning;
  elements.customArrayInput.disabled = isRunning;
  elements.algoSelect.disabled = isRunning;
  elements.categorySelect.disabled = isRunning;
  elements.orderSelect.disabled = isRunning;
  elements.targetInput.disabled = isRunning;
}

export function displayError(elements, msg) {
  elements.errorBox.textContent = msg || '';
  elements.errorBox.style.display = msg ? 'block' : 'none';
}
