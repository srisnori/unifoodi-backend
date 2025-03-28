const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

async function extractFrame(videoFile, outputImage) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoFile)
      .screenshots({
        timestamps: [15], // Extract frame every 15 sec
        filename: outputImage,
        folder: path.join(__dirname, "../frames/"),
        size: "640x480",
      })
      .on("end", () => resolve(outputImage))
      .on("error", reject);
  });
}

module.exports = extractFrame;