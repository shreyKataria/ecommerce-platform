const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoute");
const sessionRoute = require("./routes/sessionRoute");
const connectDB = require("./db/db");
const signupLimiter = require("./middleware/limiter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(signupLimiter);

app.use("/api", authRoutes);
app.use("/api", sessionRoute);

connectDB();

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
