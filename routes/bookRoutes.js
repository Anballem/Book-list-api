const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/books", bookController.addBook);
router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBookById);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

router.get("/search/title/:title", bookController.searchByTitle);
router.get("/search/author/:author", bookController.searchByAuthor);

module.exports = router;
