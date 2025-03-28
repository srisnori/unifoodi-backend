const express = require("express");
const fs = require("fs");
const path = require("path");
const extractFrame = require("../services/frameExtractor");
const sendToGemini = require("../services/geminiService");

const router = express.Router();

// Process frame and send to Gemini
router.get("/process", async (req, res) => {
  const videoPath = path.join(__dirname, "../videos/latest.mp4");
  const framePath = path.join(__dirname, "../frames/frame.jpg");

  const extractedFrame = await extractFrame(videoPath, framePath);
  const result = await sendToGemini(extractedFrame);

  res.json(result);
});

// **Run every 15 seconds**
setInterval(async () => {
  const videoPath = path.join(__dirname, "../videos/latest.mp4");
  const framePath = path.join(__dirname, "../frames/frame.jpg");

  if (fs.existsSync(videoPath)) {
    const extractedFrame = await extractFrame(videoPath, framePath);
    await sendToGemini(extractedFrame);
  }
}, 15000);

module.exports = router;