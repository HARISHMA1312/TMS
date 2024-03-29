const Booking = require("../models/user")

module.exports.userList = (req, res) => {
  Booking.find({})
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

module.exports.fetchSingleUser = (req, res) => {
  Booking.find({ _id: req.params.id })
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

module.exports.addUser = (req, res) => {
  const userInfo = req.body;
  Booking.create(userInfo)
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

module.exports.updateUser = (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;
  console.log(req.body);
  Booking.updateOne({ _id: id }, userInfo)
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

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  Booking.deleteOne({ _id: id })
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
