const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: String, default: "Internal / Studio" },
    year: { type: String, default: "2024" },
    tags: [{ type: String }],
    imageUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);