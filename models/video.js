const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  filename: String,
  filepath: String,  // Local server path
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", VideoSchema);