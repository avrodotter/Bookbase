const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // loads DB URL from .env

const app = express();
app.use(express.json()); // lets express read JSON from body
app.use(cors());         // allows frontend to connect

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB error ❌', err));

// Import routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes); // all routes will be prefixed with /api

// Start server
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('📚 Welcome to Book Tracker API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
