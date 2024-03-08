const express = require('express');
const dbHelper = require('./helpers/db-helper');
const bodyParser = require('body-parser');
const {
  bookList,
  addBook,
  deleteBook,
  updateBook
} = require('./book/controllers/book-controller');
const app = express();

app.use(bodyParser.json());

app.listen(3000, (err) => {
  if (err) {
    console.log('console error', err);
    return;
  }
  console.log('Express framework started here');
  dbHelper
    .connection()
    .then(() => {
      console.log(`DB Connected`);
      app.get('/api/book/', bookList);
      app.post('/api/book/', addBook);
      app.put('/api/book/:id', updateBook);
      app.delete('/api/book/:id', deleteBook);
    })
    .catch((err) => {
      console.log('DB connection failed. The error is', err);
    });
});
