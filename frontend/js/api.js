/**
 * API client module for communicating with the Node.js Express backend.
 */
const API_BASE = window.location.origin.startsWith('http')
  ? `${window.location.origin}/api`
  : 'http://localhost:3000/api';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Server request failed.');
  }
  return data;
}

export async function fetchAlgorithms() {
  const response = await fetch(`${API_BASE}/algorithms`);
  return handleResponse(response);
}

export async function fetchSortSteps(algorithm, array, order = 'asc') {
  const response = await fetch(`${API_BASE}/sort/${algorithm}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ array, order })
  });
  return handleResponse(response);
}

export async function fetchSearchSteps(algorithm, array, target) {
  const response = await fetch(`${API_BASE}/search/${algorithm}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ array, target })
  });
  return handleResponse(response);
}
