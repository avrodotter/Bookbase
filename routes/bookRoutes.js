const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create a new book
router.post('/books', async (req, res) => {
  const book = new Book(req.body);         // create a book using request body
  await book.save();                        // save to MongoDB
  res.status(201).json(book);               // send back saved book
});

// Get all books
router.get('/books', async (req, res) => {
  const books = await Book.find();          // fetch all books
  res.json(books);                          // send them as JSON
});

// Update a book by ID
router.put('/books/:id', async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);                    // return updated book
});

// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
