import { fetchAlgorithms, fetchSortSteps, fetchSearchSteps } from './api.js';
import { state, setInitialArray, resetToInitial, buildHistory } from './state.js';
import { renderBars } from './renderer.js';
import * as player from './player.js';
import * as ui from './ui.js';

const $ = (id) => document.getElementById(id);
const SPEED_DELAYS = [450, 360, 280, 210, 150, 100, 70, 45, 25, 12];
const els = {
  barsContainer: $('bars-container'), arraySizeSlider: $('array-size'), sizeDisplay: $('size-display'),
  btnGenerateRandom: $('btn-random'), btnReset: $('btn-reset'), customArrayInput: $('custom-array-input'),
  btnApplyCustom: $('btn-apply-custom'), categorySelect: $('category-select'), algoSelect: $('algo-select'),
  orderGroup: $('order-group'), orderSelect: $('order-select'), targetGroup: $('target-group'),
  targetInput: $('target-input'), btnSortFirst: $('btn-sort-first'), btnStart: $('btn-start'),
  btnPause: $('btn-pause'), btnResume: $('btn-resume'), btnStepBack: $('btn-step-back'),
  btnStepForward: $('btn-step-forward'), speedSlider: $('speed-slider'), speedLabel: $('speed-label'),
  btnThemeToggle: $('btn-theme-toggle'), errorBox: $('error-box'), statComparisons: $('stat-comparisons'),
  statSwaps: $('stat-swaps'), statCurrentStep: $('stat-current-step'), statTotalSteps: $('stat-total-steps'),
  algoName: $('algo-name'), algoDesc: $('algo-desc'), timeBest: $('time-best'), timeAvg: $('time-avg'),
  timeWorst: $('time-worst'), spaceWorst: $('space-worst'), stepMessage: $('step-message')
};

function generateRandomData(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

function refreshBars() {
  setInitialArray(generateRandomData(Number(els.arraySizeSlider.value)));
  renderBars(els.barsContainer, state.array);
  ui.updateStatsUI(els, -1);
  ui.updateStepMessage(els, 'New random array generated.');
  ui.setPlaybackButtonStates(els, false);
}

function populateAlgoOptions() {
  const cat = els.categorySelect.value;
  state.category = cat;
  els.algoSelect.innerHTML = '';
  const group = state.algorithmsMeta[cat];

  Object.keys(group).forEach((key) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = group[key].name;
    els.algoSelect.appendChild(opt);
  });

  const isSort = cat === 'sorting';
  els.orderGroup.style.display = isSort ? 'flex' : 'none';
  els.targetGroup.style.display = isSort ? 'none' : 'flex';
  state.selectedAlgorithm = els.algoSelect.value;
  ui.updateAlgorithmMetaUI(els, group[state.selectedAlgorithm]);
}

async function handleStart() {
  ui.displayError(els, null);
  player.pause();
  resetToInitial();
  try {
    let data;
    if (state.category === 'sorting') {
      data = await fetchSortSteps(els.algoSelect.value, state.array, els.orderSelect.value);
    } else {
      const targetVal = Number(els.targetInput.value);
      if (Number.isNaN(targetVal)) throw new Error('Target must be a valid number.');
      data = await fetchSearchSteps(els.algoSelect.value, state.array, targetVal);
    }
    state.steps = data.steps;
    buildHistory(state.initialArray, state.steps);
    ui.setPlaybackButtonStates(els, true);
    player.play(els.barsContainer);
  } catch (err) {
    ui.displayError(els, err.message);
    ui.setPlaybackButtonStates(els, false);
  }
}

function handleCustomArray() {
  const raw = els.customArrayInput.value.trim();
  if (!raw) return ui.displayError(els, 'Please enter comma-separated numbers.');
  const parts = raw.split(',').map((s) => Number(s.trim()));
  const hasInvalid = parts.some((n) => Number.isNaN(n));
  if (hasInvalid || parts.length === 0 || parts.length > 100) {
    return ui.displayError(els, 'Invalid input. Provide 1 to 100 valid numbers.');
  }
  ui.displayError(els, null);
  els.arraySizeSlider.value = parts.length;
  els.sizeDisplay.textContent = parts.length;
  setInitialArray(parts);
  renderBars(els.barsContainer, state.array);
  ui.updateStatsUI(els, -1);
  ui.updateStepMessage(els, 'Custom array loaded.');
}

function updateSpeed() {
  const val = Number(els.speedSlider.value);
  const delay = SPEED_DELAYS[val - 1] || 150;
  player.setPlaybackSpeed(delay);
  els.speedLabel.textContent = val <= 3 ? 'Slow' : val <= 7 ? 'Normal' : 'Fast';
}

function setupListeners() {
  els.btnGenerateRandom.addEventListener('click', refreshBars);
  els.arraySizeSlider.addEventListener('input', () => { els.sizeDisplay.textContent = els.arraySizeSlider.value; refreshBars(); });
  els.btnReset.addEventListener('click', () => {
    player.pause(); resetToInitial(); renderBars(els.barsContainer, state.array);
    ui.updateStatsUI(els, -1); ui.updateStepMessage(els, 'Array reset to initial state.'); ui.setPlaybackButtonStates(els, false);
  });
  els.btnApplyCustom.addEventListener('click', handleCustomArray);
  els.categorySelect.addEventListener('change', populateAlgoOptions);
  els.algoSelect.addEventListener('change', () => {
    state.selectedAlgorithm = els.algoSelect.value;
    ui.updateAlgorithmMetaUI(els, state.algorithmsMeta[state.category][state.selectedAlgorithm]);
  });
  els.btnSortFirst.addEventListener('click', () => {
    state.array.sort((a, b) => a - b); setInitialArray(state.array); renderBars(els.barsContainer, state.array);
    ui.updateStepMessage(els, 'Array sorted in ascending order for Binary Search.'); ui.displayError(els, null);
  });
  els.btnStart.addEventListener('click', handleStart);
  els.btnPause.addEventListener('click', () => { player.pause(); ui.setPlaybackButtonStates(els, false); });
  els.btnResume.addEventListener('click', () => { player.resume(els.barsContainer); ui.setPlaybackButtonStates(els, true); });
  els.btnStepForward.addEventListener('click', () => player.stepForward(els.barsContainer));
  els.btnStepBack.addEventListener('click', () => player.stepBackward(els.barsContainer));
  els.speedSlider.addEventListener('input', updateSpeed);
  els.btnThemeToggle.addEventListener('click', () => document.body.classList.toggle('dark-mode'));

  player.registerUpdateCallback((stepIdx) => {
    ui.updateStatsUI(els, stepIdx);
    const step = state.steps[stepIdx];
    ui.updateStepMessage(els, step ? step.message : 'Finished');
    ui.setPlaybackButtonStates(els, state.isPlaying);
  });
}

async function init() {
  try {
    state.algorithmsMeta = await fetchAlgorithms();
    populateAlgoOptions();
    refreshBars();
    updateSpeed();
    setupListeners();
  } catch (err) {
    ui.displayError(els, 'Could not connect to backend server. Make sure server is running on port 3000.');
  }
}

init();
