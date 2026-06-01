const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const Business = require("../models/Business");
const auth = require("../middleware/auth");

// Add service
router.post("/add", auth, async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.userId });
    if (!business) {
      return res.status(404).json({ error: "Business not found!" });
    }

    const { name, description, duration, price, currency } = req.body;

    const service = new Service({
      business: business._id,
      name,
      description,
      duration,
      price,
      currency: currency || "NGN"
    });
    await service.save();

    res.json({ message: "Service added successfully!", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all services for a business (private)
router.get("/mine", auth, async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.userId });
    if (!business) {
      return res.status(404).json({ error: "Business not found!" });
    }

    const services = await Service.find({ business: business._id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all services for a business (public)
router.get("/public/:businessId", async (req, res) => {
  try {
    const services = await Service.find({
      business: req.params.businessId,
      isActive: true
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update service
router.put("/update/:id", auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json({ message: "Service updated successfully!", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete service
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;