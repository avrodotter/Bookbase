const request = require('supertest'); // to make HTTP requests to the API
const mongoose = require('mongoose');
const app = require('../app'); // use app.js, not server.js!
const Book = require('../models/Book');
const { connect, clearDatabase, closeDatabase } = require('./setup');

// Connect to the in-memory test database before all tests
beforeAll(connect);

// Clear the database after each test to keep tests isolated
afterEach(clearDatabase);

// Close the DB and stop the server after all tests
afterAll(closeDatabase);

// 📚 Actual tests begin here
describe('📚 Book API Tests', () => {

  // ✅ Create
  it('should create a new book', async () => {
    const res = await request(app).post('/api/books').send({
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-help',
      isRead: true,
      rating: 5
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Atomic Habits');
  });

  // ✅ Read
  it('should fetch all books', async () => {
    await Book.create({
      title: '1984',
      author: 'George Orwell',
      genre: 'Fiction',
      isRead: true,
      rating: 4
    });

    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // ✅ Update
  it('should update a book title', async () => {
    const book = await Book.create({
      title: 'Old Title',
      author: 'Author X',
      genre: 'Genre X',
      isRead: false,
      rating: 2
    });

    const res = await request(app).put(`/api/books/${book._id}`).send({
      title: 'New Title'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('New Title');
  });

  // ✅ Delete
  it('should delete a book', async () => {
    const book = await Book.create({
      title: 'Delete Me',
      author: 'Someone',
      genre: 'Mystery',
      isRead: true,
      rating: 1
    });

    const res = await request(app).delete(`/api/books/${book._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');
  });

});
