const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    details: { type: String, required: true },
    status: { type: String, enum: ["unread", "read", "replied"], default: "unread" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);