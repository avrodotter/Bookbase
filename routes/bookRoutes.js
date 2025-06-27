const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create
router.post('/', async (req, res) => {
  const book = await Book.create(req.body);
  res.status(200).json(book);
});

// Read
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

// Update
router.put('/:id', async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedBook);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Book deleted successfully' });
});

module.exports = router;
