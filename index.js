const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoute");
const sessionRoute = require("./routes/sessionRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const connectDB = require("./db/db");
const signupLimiter = require("./middleware/limiter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(signupLimiter);

app.use("/api", authRoutes);
app.use("/api", sessionRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
