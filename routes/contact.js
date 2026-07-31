const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_GMAIL_APP_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  const { name, email, details } = req.body;

  if (!name || !email || !details) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // 1. Save to MongoDB
    const newInquiry = await Inquiry.create({ name, email, details });

    // 2. Dispatch Email Notification
    const mailOptions = {
      from: `"Portfolio Inquiry" <${process.env.MY_EMAIL}>`, // Fixed: Always use your authenticated email
      to: process.env.MY_EMAIL,
      replyTo: email, // Direct reply will still go to the user
      subject: `[NOIR Portfolio] New Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f4; border-left: 4px solid #000; padding: 10px;">
            ${details}
          </blockquote>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "Inquiry stored in DB and email dispatched successfully.",
      data: newInquiry
    });

  } catch (error) {
    console.error("Contact route error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;