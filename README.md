# Array Visualizer - DSA Mini Project

An interactive educational web application designed to demonstrate and visualize fundamental sorting and searching algorithms step-by-step. The project is structured with a decoupled client-server architecture: the Node.js + Express backend runs the algorithm logic and generates discrete execution steps, while the vanilla JavaScript frontend animates the state transitions.

## Data Structures & Algorithms Concepts Covered

1. **Comparison-Based Sorting**:
   - **Bubble Sort**: Iterative adjacent pairwise comparisons and swaps ($O(n^2)$).
   - **Selection Sort**: Unsorted subarray minimum extraction ($O(n^2)$).
   - **Insertion Sort**: Online incremental shifting into sorted prefix ($O(n^2)$).
   - **Merge Sort**: Divide-and-conquer recursive partitioning and merging ($O(n \log n)$).
   - **Quick Sort**: Partitioning using Lomuto partition scheme around a pivot ($O(n \log n)$ average).
   - **Heap Sort**: Complete binary tree max/min heap construction and extraction ($O(n \log n)$).

2. **Searching Algorithms**:
   - **Linear Search**: Sequential exhaustive search across arbitrary arrays ($O(n)$).
   - **Binary Search**: Logarithmic interval bisection using low, mid, and high pointers ($O(\log n)$) on sorted data.

## Folder Structure

```text
array-visualizer/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   │   ├── sortRoutes.js
│   │   └── searchRoutes.js
│   ├── controllers/
│   │   ├── sortController.js
│   │   └── searchController.js
│   ├── algorithms/
│   │   ├── sorting/
│   │   │   ├── bubbleSort.js
│   │   │   ├── selectionSort.js
│   │   │   ├── insertionSort.js
│   │   │   ├── mergeSort.js
│   │   │   ├── quickSort.js
│   │   │   └── heapSort.js
│   │   └── searching/
│   │       ├── linearSearch.js
│   │       └── binarySearch.js
│   ├── utils/
│   │   └── validators.js
│   └── tests/
│       └── algorithms.test.js
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   └── components.css
│   └── js/
│       ├── main.js
│       ├── api.js
│       ├── state.js
│       ├── renderer.js
│       ├── player.js
│       └── ui.js
├── README.md
└── .gitignore
```

## How to Install and Run

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 2. Backend Installation and Startup
Open your terminal and run:

```bash
cd array-visualizer/backend
npm install
npm start
```

The Express server will start on `http://localhost:3000`.

### 3. Running Unit Tests
To run the automated algorithm test suite:

```bash
cd array-visualizer/backend
npm test
```

### 4. Opening the Frontend
Since Express serves the `frontend` folder as static files, simply navigate to:

```text
http://localhost:3000
```

Alternatively, you can open `array-visualizer/frontend/index.html` directly in any web browser.

## API Endpoints

### 1. GET `/api/algorithms`
Returns the metadata, description, and asymptotic complexity for all algorithms.

**Response (200 OK):**
```json
{
  "sorting": {
    "bubble": {
      "id": "bubble",
      "name": "Bubble Sort",
      "description": "Compares adjacent elements and swaps them if out of order.",
      "complexity": { "best": "O(n)", "average": "O(n²)", "worst": "O(n²)", "space": "O(1)" }
    }
  },
  "searching": {
    "binary": {
      "id": "binary",
      "name": "Binary Search",
      "description": "Halves the search range at each step.",
      "complexity": { "best": "O(1)", "average": "O(log n)", "worst": "O(log n)", "space": "O(1)" }
    }
  }
}
```

### 2. POST `/api/sort/:algorithm`
Computes the sequence of animation steps to sort an array.

**Request:**
```bash
POST /api/sort/bubble
Content-Type: application/json

{
  "array": [30, 10, 20],
  "order": "asc"
}
```

**Response (200 OK):**
```json
{
  "steps": [
    { "type": "compare", "indices": [0, 1], "message": "Comparing indices 0 and 1 (30 vs 10)" },
    { "type": "swap", "indices": [0, 1], "message": "Swapped indices 0 and 1 because 10 is out of order" },
    { "type": "sorted", "indices": [2], "message": "Element 30 at index 2 is now sorted" }
  ],
  "result": [10, 20, 30],
  "stats": {
    "comparisons": 2,
    "swaps": 1,
    "totalSteps": 5
  }
}
```

### 3. POST `/api/search/:algorithm`
Executes linear or binary search and records interval adjustments and matches.

**Request:**
```bash
POST /api/search/binary
Content-Type: application/json

{
  "array": [10, 20, 30, 40, 50],
  "target": 30
}
```

**Response (200 OK):**
```json
{
  "steps": [
    {
      "type": "pointer",
      "indices": [0, 2, 4],
      "pointers": { "low": 0, "mid": 2, "high": 4 },
      "message": "Interval [0..4]: low=0, mid=2, high=4"
    },
    {
      "type": "found",
      "indices": [2],
      "pointers": { "low": 0, "mid": 2, "high": 4 },
      "message": "Target 30 found at mid index 2"
    }
  ],
  "result": { "found": true, "index": 2 },
  "stats": { "comparisons": 1, "swaps": 0, "totalSteps": 2 }
}
```

## Algorithm Complexity Reference

| Algorithm | Best Time | Average Time | Worst Time | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ |
| **Linear Search** | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ |
| **Binary Search** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ |

## Key Architectural Design Decision

### Separation of Algorithm Execution (Backend) and Animation (Frontend)
In traditional student visualizers, algorithms are tightly coupled to DOM manipulations using asynchronous sleeps (`await new Promise(r => setTimeout(r, delay))`) directly inside nested loops. 

This project decouples computation from rendering:
1. **Purity of Logic**: Backend functions operate strictly on data in memory without any DOM or timing dependencies. They record an immutable event log (`steps`) describing each state change (`compare`, `swap`, `overwrite`, `sorted`, `pointer`).
2. **Reversible Playback**: Because the frontend receives the full series of transitions, it precomputes array snapshots for each step. This allows instantaneous, error-free **Step Backward** and **Step Forward** without having to re-execute or invert logic.
3. **Network Efficiency & Testability**: Algorithms are 100% unit-testable using standard assertions, and client performance is not degraded during algorithmic execution.
