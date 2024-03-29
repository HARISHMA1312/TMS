const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlRegularExp =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const userSchema = new Schema(
  {
    userName : { type: String, required: true, unique: true }, // String is shorthand for {type: String}
    address: { type: String, required: true },
    busNumber: { type: Number, required: false },
    pickupAddress: { type: String, required: true },
    url: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return urlRegularExp.test(v);
        },
        message: (props) => `${props.value} is not a valid url!`
      }
    },
    regNumber: { type: String, required: true }
  },
  { timestamps: true }
);

const Booking = mongoose.model('user', userSchema, 'users');

module.exports = Booking;
