const Book = require("../schemas/bookSchema");

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { title, author, read } = req.body;

    if (!title || !author || read === undefined) {
      return res.status(400).json({ message: "Title, author and read status are required." });
    }

    const newBook = new Book({ title, author, read });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Book By ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.remove();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search by Title
exports.searchByTitle = async (req, res) => {
  try {
    const results = await Book.find({ title: new RegExp(req.params.title, "i") });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search by Author
exports.searchByAuthor = async (req, res) => {
  try {
    const results = await Book.find({ author: new RegExp(req.params.author, "i") });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

