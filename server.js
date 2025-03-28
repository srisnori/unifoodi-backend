const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const videoRoutes = require("./routes/videoRoutes");
const frameRoutes = require("./routes/frameRoutes");

app.use("/videos", videoRoutes);
app.use("/frames", frameRoutes);

// Connect to MongoDB Cloud Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => console.log("Backend running on port 5000"));
