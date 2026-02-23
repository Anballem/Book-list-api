const Book = require("../models/bookModels");

// Add Book
exports.addBook = async(req, res) => {
  const { title, author, read } = req.body;

  if (!title || !author || read === undefined) {
    return res.status(400).json({ message: "Title, author and read status are required." });
  }

  const newBook = new Book({ title, author, read });
  await newBook.save();
  res.status(201).json(newBook);
};

// Get All Books
exports.getAllBooks = (req, res) => {
  res.json(Book.getAllBooks());
};

// Get Book By ID
exports.getBookById = async(req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  res.json(book);
};

// Update Book
exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  Object.assign(book, req.body);
  await book.save();
  res.json(book);
};

// Update Book
exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  Object.assign(book, req.body);
  await book.save();
  res.json(book);
};

// Delete Book
exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  await book.remove();
  res.json({ message: "Book deleted successfully" });

  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json({ message: "Book deleted successfully" });
};

// Search by Title
exports.searchByTitle = async (req, res) => {
  const results = await Book.find({ title: new RegExp(req.params.title, "i") });
  res.json(results);
};

// Search by Author
exports.searchByAuthor = async (req, res) => {
  const results = await Book.find({ author: new RegExp(req.params.author, "i") });
  res.json(results);
};
