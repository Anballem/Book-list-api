const Book = require("../schemas/bookSchema");
const mongoose = require("mongoose");
const { books, getNextId } = require("../data/books");

const isMongoReady = () => mongoose.connection.readyState === 1;

const mapMemoryBook = (book) => ({
  _id: String(book.id),
  title: book.title,
  author: book.author,
  read: book.read,
  amazonLink: book.amazonLink || "",
  description: book.description || "",
  createdAt: book.createdAt,
  updatedAt: book.updatedAt
});

const findMemoryBookById = (id) => books.find((book) => String(book.id) === String(id));
const searchRegex = (value) => new RegExp(value, "i");

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { title, author, read, amazonLink, description } = req.body;

    if (!title || !author || read === undefined) {
      return res.status(400).json({ message: "Title, author and read status are required." });
    }

    if (!isMongoReady()) {
      const now = new Date().toISOString();
      const memoryBook = {
        id: getNextId(),
        title,
        author,
        read,
        amazonLink,
        description,
        createdAt: now,
        updatedAt: now
      };
      books.push(memoryBook);
      return res.status(201).json(mapMemoryBook(memoryBook));
    }

    const newBook = new Book({ title, author, read, amazonLink, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Books
exports.getBooks = async (req, res) => {
  try {
    if (!isMongoReady()) {
      return res.json(books.map(mapMemoryBook));
    }

    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Book By ID
exports.getBookById = async (req, res) => {
  try {
    if (!isMongoReady()) {
      const book = findMemoryBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }
      return res.json(mapMemoryBook(book));
    }

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
    if (!isMongoReady()) {
      const book = findMemoryBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      Object.assign(book, req.body);
      book.updatedAt = new Date().toISOString();
      return res.json(mapMemoryBook(book));
    }

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
    if (!isMongoReady()) {
      const index = books.findIndex((book) => String(book.id) === String(req.params.id));
      if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
      }

      books.splice(index, 1);
      return res.json({ message: "Book deleted successfully" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search by Title
exports.searchByTitle = async (req, res) => {
  try {
    if (!isMongoReady()) {
      const results = books.filter((book) => searchRegex(req.params.title).test(book.title));
      return res.json(results.map(mapMemoryBook));
    }

    const results = await Book.find({ title: new RegExp(req.params.title, "i") });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search by Author
exports.searchByAuthor = async (req, res) => {
  try {
    if (!isMongoReady()) {
      const results = books.filter((book) => searchRegex(req.params.author).test(book.author));
      return res.json(results.map(mapMemoryBook));
    }

    const results = await Book.find({ author: new RegExp(req.params.author, "i") });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
