const express = require("express");
const router = express.Router();
const Availability = require("../models/Availability");
const Business = require("../models/Business");
const auth = require("../middleware/auth");

// Get availability for a business (private)
router.get("/mine", auth, async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.userId });
    if (!business) {
      return res.status(404).json({ error: "Business not found!" });
    }

    const availability = await Availability.findOne({ business: business._id });
    res.json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update availability (private)
router.put("/update", auth, async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.userId });
    if (!business) {
      return res.status(404).json({ error: "Business not found!" });
    }

    const availability = await Availability.findOneAndUpdate(
      { business: business._id },
      { ...req.body },
      { new: true }
    );

    res.json({ message: "Availability updated successfully!", availability });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get availability for a business (public)
router.get("/public/:businessId", async (req, res) => {
  try {
    const availability = await Availability.findOne({ business: req.params.businessId });
    res.json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;