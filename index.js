const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoute");
const sessionRoute = require("./routes/sessionRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const connectDB = require("./db/db");
const signupLimiter = require("./middleware/limiter");
const mockStripe = require("./nock/paymentsNock");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(signupLimiter);

// nock payment
mockStripe();

// routes
app.use("/api", authRoutes);
app.use("/api", sessionRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use("/api", paymentRoute);

// db
connectDB();

const PORT = process.env.PORT || 4000;

// server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
