const express = require('express');
const dbHelper = require('./helpers/db-helper');
const bodyParser = require('body-parser');
const {
  userList,
  addUser,
  deleteUser,
  updateUser,
  fetchSingleUser
} = require('./user/controllers/user-controller');
const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  next();
});

app.listen(3001, (err) => {
  if (err) {
    console.log('console error', err);
    return;
  }
  console.log('Express framework started here');
  dbHelper
    .connection()
    .then(() => {
      console.log(`DB Connected`);
      app.get('/api/booking/', userList);
      app.post('/api/booking/', addUser);
      app.get('/api/booking/:id', fetchSingleUser);
      app.put('/api/booking/:id', updateUser);
      app.delete('/api/booking/:id', deleteUser);
    })
    .catch((err) => {
      console.log('DB connection failed. The error is', err);
    });
});
