/**
 * Renderer module for drawing array bars and updating highlights.
 */

export function renderBars(container, array, activeStep = null, sortedIndices = new Set()) {
  container.innerHTML = '';
  if (!array || array.length === 0) return;

  const minVal = Math.min(...array);
  const maxVal = Math.max(...array);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;
  const showValues = array.length <= 28;

  // Calculate dynamic bar width based on container width and array size
  const barWidth = Math.max(3, Math.floor((container.clientWidth - array.length * 4) / array.length));

  array.forEach((val, idx) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.dataset.index = idx;

    // Normalize height between 24px and 300px (or medium height if all equal)
    const normalizedHeight = maxVal === minVal
      ? 140
      : Math.max(24, Math.round(((val - minVal) / range) * 270 + 24));

    bar.style.height = `${normalizedHeight}px`;
    bar.style.width = `${barWidth}px`;

    // Apply persistent sorted style if already placed
    if (sortedIndices.has(idx)) {
      bar.classList.add('is-sorted');
    }

    // Apply active step state highlights
    if (activeStep) {
      applyStepHighlight(bar, idx, activeStep);
    }

    if (showValues) {
      const valLabel = document.createElement('span');
      valLabel.className = 'bar-value';
      valLabel.textContent = val;
      bar.appendChild(valLabel);
    }

    // Render pointer badge (L, M, H) for binary search
    if (activeStep && activeStep.pointers) {
      const badges = [];
      if (idx === activeStep.pointers.low) badges.push('L');
      if (idx === activeStep.pointers.mid) badges.push('M');
      if (idx === activeStep.pointers.high) badges.push('H');
      if (badges.length > 0) {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'pointer-badge';
        badgeEl.textContent = badges.join('/');
        bar.appendChild(badgeEl);
      }
    }

    bar.title = `Index: ${idx}, Value: ${val}`;
    container.appendChild(bar);
  });
}

function applyStepHighlight(bar, index, step) {
  const isTargetIndex = step.indices && step.indices.includes(index);

  if (step.pointers) {
    if (index === step.pointers.low) bar.classList.add('is-low');
    if (index === step.pointers.mid) bar.classList.add('is-mid');
    if (index === step.pointers.high) bar.classList.add('is-high');
  }

  if (step.type === 'compare' && isTargetIndex) {
    bar.classList.add('is-comparing');
  } else if ((step.type === 'swap' || step.type === 'overwrite') && isTargetIndex) {
    bar.classList.add('is-swapping');
  } else if (step.type === 'pivot' && isTargetIndex) {
    bar.classList.add('is-pivot');
  } else if (step.type === 'found' && isTargetIndex) {
    bar.classList.add('is-found');
  }
}
