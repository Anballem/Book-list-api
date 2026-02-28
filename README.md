# 📚 Book List API

A RESTful Book List API built with **Node.js**, **Express**, and **MongoDB**.  
This project allows users to create, read, update, delete, and search books using a clean and scalable backend architecture.

---

## 🚀 Live Demo

Deployed API:  
https://book-list-api-omn7.onrender.com

GitHub Repository:  
https://github.com/Anballem/Book-list-api

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (:contentReference[oaicite:0]{index=0})
- Mongoose
- REST API principles
- MVC Architecture
- dotenv
- UUID (for earlier version)

---

## ✨ Features

- Add a book
- View all books
- View a book by ID
- Update book details
- Delete a book
- Search books by title
- Search books by author
- Persistent data storage using MongoDB
- Timestamps for created and updated records

---

## 📂 Project Structure

book-list-api/
│
├── controllers/
│ └── bookController.js
│
├── models/
│ └── Book.js
│
├── routes/
│ └── bookRoutes.js
│
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md

This structure follows **MVC best practices** and keeps the codebase maintainable and scalable.

---

## 📌 API Endpoints

| Method | Endpoint                           | Description      |
| ------ | ---------------------------------- | ---------------- |
| GET    | `/api/books`                       | Get all books    |
| GET    | `/api/books/:id`                   | Get a book by ID |
| POST   | `/api/books`                       | Add a new book   |
| PUT    | `/api/books/:id`                   | Update a book    |
| DELETE | `/api/books/:id`                   | Delete a book    |
| GET    | `/api/books/search/title/:title`   | Search by title  |
| GET    | `/api/books/search/author/:author` | Search by author |

---

## 🧪 Example Request

### Create a Book

**POST** `/api/books`

````json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "read": true,
  "amazonLink": "https://amazon.co.uk/...",
  "review": "A practical and motivating book on building habits."
}



▶️ Run Locally
git clone https://github.com/Anballem/book-list-api
cd book-list-api
npm install
npm run dev


⚙️ Configuration
Create a `.env` file in the root directory and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string_here
````

You can get your MongoDB connection string from MongoDB Atlas or use a local MongoDB instance.

🌍 Deployment
This API is deployed using Render
with a MongoDB Atlas cloud database.

📈 Future Improvements
User authentication (JWT)
User-specific book lists
Pagination and filtering
API documentation with Swagger
Unit testing with Jest
Docker support
Frontend client (MERN stack)

👩🏽‍💻 Author
Annette Ballet
Aspiring Full-Stack / Backend Developer

```

```
