const book = require('../models/book');

module.exports.bookList = (req, res) => {
  book
    .find({})
    .then((data) => {
      res.status(200).send({
        success: true,
        payload: data
      });
    })
    .catch(() => {
      res.status(200).send({
        success: true,
        payload: []
      });
    });
};

module.exports.addBook = (req, res) => {
  const bookInfo = req.body;
  bookInfo.releaseDate = new Date(bookInfo.releaseDate);
  book
    .create(bookInfo)
    .then((doc) => {
      res.status(201).send({
        success: true,
        payload: doc
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        error: {
          message: err
        }
      });
    });
};

module.exports.updateBook = (req, res) => {
  const id = req.params.id;
  const bookInfo = req.body;
  book
    .updateOne({ _id: id }, bookInfo)
    .then((dbData) => {
      res.status(200).send({
        success: true,
        payload: dbData
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        error: {
          message: err
        }
      });
    });
};

module.exports.deleteBook = (req, res) => {
  const id = req.params.id;
  book
    .deleteOne({ _id: id })
    .then((dbInfo) => {
      res.status(200).send({
        success: true,
        payload: dbInfo
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        error: {
          message: err
        }
      });
    });
};
