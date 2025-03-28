const axios = require("axios");

async function sendToGemini(imagePath) {
  try {
    const response = await axios.post(process.env.GEMINI_API_URL, { imagePath });
    console.log("Gemini Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending to Gemini:", error);
  }
}

module.exports = sendToGemini;