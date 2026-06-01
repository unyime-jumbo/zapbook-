const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Business = require("../models/Business");
const Service = require("../models/Service");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { sendBookingConfirmation, sendBusinessNotification } = require("../config/email");

// Create booking (public)
router.post("/create", async (req, res) => {
  try {
    const { businessId, serviceId, customerName, customerEmail, customerPhone, date, time, notes } = req.body;

    // Check if slot is already booked
    const existingBooking = await Booking.findOne({
      business: businessId,
      date,
      time,
      status: { $ne: "cancelled" }
    });

    if (existingBooking) {
      return res.status(400).json({ error: "This time slot is already booked!" });
    }

    // Create booking
    const booking = new Booking({
      business: businessId,
      service: serviceId,
      customerName,
      customerEmail,
      customerPhone,
      date,
      time,
      notes: notes || ""
    });
    await booking.save();

    // Get business and service details for email
    const business = await Business.findById(businessId);
    const service = await Service.findById(serviceId);
    const businessOwner = await User.findById(business.user);

    // Send confirmation emails
    await sendBookingConfirmation(
      customerEmail,
      customerName,
      business.name,
      service.name,
      date,
      time
    );

    await sendBusinessNotification(
      businessOwner.email,
      business.name,
      customerName,
      service.name,
      date,
      time
    );

    res.json({ message: "Booking confirmed!", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings for a business (private)
router.get("/mine", auth, async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.userId });
    if (!business) {
      return res.status(404).json({ error: "Business not found!" });
    }

    const bookings = await Booking.find({ business: business._id })
      .populate("service")
      .sort({ date: 1, time: 1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get booked slots for a business on a specific date (public)
router.get("/slots/:businessId/:date", async (req, res) => {
  try {
    const bookings = await Booking.find({
      business: req.params.businessId,
      date: req.params.date,
      status: { $ne: "cancelled" }
    });

    const bookedSlots = bookings.map(b => b.time);
    res.json(bookedSlots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking status (private)
router.put("/status/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ message: "Booking updated!", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;