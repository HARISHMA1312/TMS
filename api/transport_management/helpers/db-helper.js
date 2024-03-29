const mongoose = require('mongoose');
//const app = require('../config').app;

module.exports.connection = () => {
  return mongoose.connect(
    `mongodb://localhost:27017/Transport-management`
  );
};
