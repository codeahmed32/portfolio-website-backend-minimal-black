const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// Get all projects for Frontend
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch projects." });
  }
});

// Create new project entry
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    return res.status(400).json({ error: "Invalid project payload." });
  }
});

module.exports = router;