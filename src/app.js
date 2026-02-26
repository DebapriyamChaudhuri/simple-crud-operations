const express = require("express");
const cors = require("cors");
const app = express();
const crudRoutes = require("./routes/crud.routes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// connect to database
connectDB();

// Routes
app.use("/", crudRoutes);

module.exports = app;
