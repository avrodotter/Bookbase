// app.js
const express = require('express');
const bookRoutes = require('./routes/bookRoutes'); // ✅ correct relative path

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes); // ✅ This attaches /api/books routes

app.get('/', (req, res) => {
  res.send('📚 Book Tracker API is running');
});

module.exports = app;
