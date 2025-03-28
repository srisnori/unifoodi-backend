const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Video = require("../models/Video");

const router = express.Router();
const upload = multer({ dest: "videos/" }); // Store in server's "videos" folder

// Upload video to server
router.post("/upload", upload.single("video"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = path.join(__dirname, "../videos", req.file.filename);
  const newVideo = new Video({ filename: req.file.originalname, filepath: filePath });

  await newVideo.save();
  res.status(200).json({ message: "Video uploaded", filepath: filePath });
});

// Stream video from server
router.get("/stream/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../videos", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.sendFile(filePath);
});

module.exports = router;