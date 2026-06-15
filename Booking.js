const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"]
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  guests: {
    type: Number,
    required: true,
    min: [1, "Guests must be at least 1"],
    max: [100, "Guests cannot exceed 100"]
  },

  specialRequest: {
    type: String,
    default: ""
  }

}, {
  timestamps: true
});

module.exports =
  mongoose.model("Booking", bookingSchema);