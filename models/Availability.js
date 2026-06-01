const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true
  },
  monday: { open: { type: Boolean, default: true }, start: { type: String, default: "09:00" }, end: { type: String, default: "17:00" } },
  tuesday: { open: { type: Boolean, default: true }, start: { type: String, default: "09:00" }, end: { type: String, default: "17:00" } },
  wednesday: { open: { type: Boolean, default: true }, start: { type: String, default: "09:00" }, end: { type: String, default: "17:00" } },
  thursday: { open: { type: Boolean, default: true }, start: { type: String, default: "09:00" }, end: { type: String, default: "17:00" } },
  friday: { open: { type: Boolean, default: true }, start: { type: String, default: "09:00" }, end: { type: String, default: "17:00" } },
  saturday: { open: { type: Boolean, default: false }, start: { type: String, default: "09:00" }, end: { type: String, default: "17:00" } },
  sunday: { open: { type: Boolean, default: false }, start: { type: String, default: "09:00" }, end: { type: String, default: "17:00" } },
  slotDuration: {
    type: Number,
    default: 30
  }
}, { timestamps: true });

module.exports = mongoose.model("Availability", availabilitySchema);