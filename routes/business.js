const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const Availability = require("../models/Availability");
const auth = require("../middleware/auth");

// Create business profile
router.post("/create", auth, async (req, res) => {
  try {
    const { name, description, category, phone, address, color } = req.body;

    // Generate slug from business name
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");

    // Check if slug exists
    const existingBusiness = await Business.findOne({ slug });
    if (existingBusiness) {
      return res.status(400).json({ error: "Business name already taken!" });
    }

    // Create business
    const business = new Business({
      user: req.user.userId,
      name,
      slug,
      description,
      category,
      phone,
      address,
      color: color || "#7C3AED"
    });
    await business.save();

    // Create default availability
    const availability = new Availability({ business: business._id });
    await availability.save();

    res.json({ message: "Business created successfully!", business });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get business profile
router.get("/me", auth, async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.userId });
    if (!business) {
      return res.status(404).json({ error: "Business not found!" });
    }
    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update business profile
router.put("/update", auth, async (req, res) => {
  try {
    const business = await Business.findOneAndUpdate(
      { user: req.user.userId },
      { ...req.body },
      { new: true }
    );
    res.json({ message: "Business updated successfully!", business });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get business by slug (public)
router.get("/:slug", async (req, res) => {
  try {
    const business = await Business.findOne({ slug: req.params.slug, isActive: true });
    if (!business) {
      return res.status(404).json({ error: "Business not found!" });
    }
    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;