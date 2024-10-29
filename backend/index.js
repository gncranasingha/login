const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const { log } = require('console');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routers/authRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    log("MongoDB connected successfully!");
  })
  .catch((error) => {
    log("Error connecting to MongoDB:", error);
  });

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/auth', authRoutes);


// Define the port to run the server on
const port = process.env.PORT || 4001;

// Start the server
app.listen(port, () => log(`App is running on port ${port}`));
