# Project: Book Tracker API

## Step 1: Project Setup
### Initialize the Node.js project

Open your terminal and type:

```bash

mkdir book-tracker-api

cd book-tracker-api

npm init -y

```

> This sets up a new Node.js project with a `package.json` file.

### Install necessary packages:

```bash

npm install express mongoose cors dotenv

```


**What they do:**

* `express`: to create the server and handle API routes

* `mongoose`: to connect and interact with MongoDB

* `cors`: allows requests from different frontend apps

* `dotenv`: to securely use environment variables (like DB URL)

---

## Step 2: Create Project Structure

```bash

mkdir models routes

touch server.js .env

touch models/Book.js

touch routes/bookRoutes.js

```

Directory structure:

```

book-tracker-api/

├── models/

│   └── Book.js       ← MongoDB schema for books

├── routes/

│   └── bookRoutes.js ← Book API endpoints

├── .env              ← Secrets like DB URL

├── server.js         ← Starts server & connects all parts

```
---

## Step 3: Define Book Schema

### models/Book.js

```js

const mongoose = require('mongoose');

  

// This defines how each book should look in the database

const bookSchema = new mongoose.Schema({

  title: String,            // Book name

  author: String,           // Author name

  genre: String,            // e.g., Fiction, Non-fiction, Sci-Fi

  isRead: Boolean,          // true if finished

  rating: Number            // your rating out of 5

});

  

// This exports the model so we can use it in other files

module.exports = mongoose.model('Book', bookSchema);

```

> It creates a **blueprint** for how each book should be stored in MongoDB.

---

## Step 4: Create API Endpoints

### routes/bookRoutes.js

```js

const express = require('express');

const router = express.Router();

const Book = require('../models/Book');

  

// Create a new book

router.post('/books', async (req, res) => {

  const book = new Book(req.body);         // create a book using request body

  await book.save();                        // save to MongoDB

  res.status(201).json(book);               // send back saved book

});

  

// Get all books

router.get('/books', async (req, res) => {

  const books = await Book.find();          // fetch all books

  res.json(books);                          // send them as JSON

});

  

// Update a book by ID

router.put('/books/:id', async (req, res) => {

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.json(updatedBook);                    // return updated book

});

  

// Delete a book by ID

router.delete('/books/:id', async (req, res) => {

  await Book.findByIdAndDelete(req.params.id);

  res.json({ message: 'Book deleted' });

});

  

module.exports = router;

```

> **What this does:**

> Defines the **4 core API routes** (Create, Read, Update, Delete) for the Book Tracker.

---

## Step 5: Connect Everything in server.js

### server.js

```js

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config(); // loads DB URL from .env

  

const app = express();

app.use(express.json()); // lets express read JSON from body

app.use(cors());         // allows frontend to connect

  

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log('MongoDB connected ✅'))

  .catch(err => console.error('MongoDB error ❌', err));

  

// Import routes

const bookRoutes = require('./routes/bookRoutes');

app.use('/api', bookRoutes); // all routes will be prefixed with /api

  

// Start server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);

});

```

---
## Step 6: Setup Environment Variables

### .env

```

MONGO_URI=[your url that is stored in .env]

PORT=5000

```
---
## Step 7: Test Your API (with curl or Postman)

### Add a book

```bash

curl -X POST http://localhost:5000/api/books \

  -H "Content-Type: application/json" \

  -d '{"title":"1984", "author":"George Orwell", "genre":"Dystopian", "isRead":true, "rating":5}'

```

Structure of a book data:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "isRead": true,
  "rating": 4
}
```
---

### Get all books

```bash

curl http://localhost:5000/api/books

```
### Update a book

```bash

curl -X PUT http://localhost:5000/api/books/<BOOK_ID> \

  -H "Content-Type: application/json" \

  -d '{"rating":4, "isRead":false}'

```
### Delete a book

```bash

curl -X DELETE http://localhost:5000/api/books/<BOOK_ID>

```
---

## Summary

| Feature               | Description                                   |
| --------------------- | --------------------------------------------- |
| Custom API         | 4 endpoints: POST, GET, PUT, DELETE           |
| Database           | MongoDB to manage item data                   |
| Optional Frontend | React app to visualize and use APIs           |
| Optional Docs      | Markdown or Swagger-based API documentation   |
| Testing            | curl/Postman to verify endpoint functionality |
