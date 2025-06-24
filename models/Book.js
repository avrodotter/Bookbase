const mongoose = require('mongoose');

// Define the structure of a book document
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  isRead: Boolean,
  rating: Number
});

// Export the model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
