let books= [];
let currentId = 1;

module.exports = {
    books,
    getNextId: () => currentId++
};

