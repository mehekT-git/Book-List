import express from 'express';
import mongoose from 'mongoose';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// ✅ GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    console.log('GET /books - fetched all books');
    res.status(200).json(books);
  } catch (error) {
    console.error('GET /books error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ POST - Add one or multiple books
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const books = Array.isArray(data) ? data : [data];

    for (let book of books) {
      if (!book.title || !book.author || !book.publishYear) {
        return res.status(400).json({
          message: 'Each book must have title, author, and publishYear',
        });
      }
    }

    const insertedBooks = await Book.insertMany(books);
    console.log('POST /books - books inserted');
    res.status(201).json(insertedBooks);
  } catch (error) {
    console.error('POST /books error:', error.message);
    res.status(500).json({ message: 'Failed to add books' });
  }
});

// ✅ GET one book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Book ID' });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    console.log(`GET /books/${id} - book found`);
    res.status(200).json(book);
  } catch (error) {
    console.error(`GET /books/${req.params.id} error:`, error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ PUT - Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Book ID' });
    }

    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    console.log(`PUT /books/${id} - book updated`);
    res.status(200).json({ message: 'Book updated successfully', data: result });
  } catch (error) {
    console.error(`PUT /books/${req.params.id} error:`, error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ DELETE - Remove a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Book ID' });
    }

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    console.log(`DELETE /books/${id} - book deleted`);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(`DELETE /books/${req.params.id} error:`, error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
