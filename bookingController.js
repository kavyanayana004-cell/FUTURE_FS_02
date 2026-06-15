const Booking = require("../models/Booking");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {

    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Table booked successfully",
      booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL BOOKINGS (ADMIN)
const getBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// CUSTOMER CANCEL BOOKING
const cancelBooking = async (req, res) => {
  try {

    const { email, date } = req.body;

    const booking = await Booking.findOne({
      email,
      date
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    const bookingDateTime = new Date(
      `${booking.date} ${booking.time}`
    );

    const now = new Date();

    const diffHours =
      (bookingDateTime - now) / (1000 * 60 * 60);

    if (diffHours < 1) {
      return res.status(400).json({
        message:
          "Booking can only be cancelled at least 1 hour before reservation time."
      });
    }

    await Booking.findByIdAndDelete(
      booking._id
    );

    res.status(200).json({
      message: "Booking cancelled successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  cancelBooking
};