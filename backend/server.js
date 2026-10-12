const express = require('express');
const cors = require('cors');
const path = require('path');
const sortRoutes = require('./routes/sortRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable cross-origin requests and JSON request parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files for convenient single-server usage
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api', sortRoutes);
app.use('/api', searchRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`Array Visualizer backend listening on http://localhost:${PORT}`);
});

module.exports = app;
