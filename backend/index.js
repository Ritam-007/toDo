import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from 'cors';                                     // Cross-Origin Resource Sharing (CORS) is a security mechanism that allows web applications to make requests to a server located at a different domain, but it also restricts these requests to prevent unauthorized access. In React applications, CORS issues commonly arise when the frontend and backend are hosted on different domains or ports.

import todoRoute from "../backend/routes/todo.route.js";    // for connecting the route of todo
import userRoute from "../backend/routes/user.route.js";    // fro connecting the route of user
import cookieParser from 'cookie-parser';

const app = express();
//

dotenv.config();

// Add middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,                                      // by using "credentials: true", all requests comming from "FRONTEND_URL" will be accepted
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]       // to allow all the request coming from the frontend local host
}))

const PORT = process.env.PORT || 4000;  // connecting port number here from .env file
const DB_URI= process.env.MONGODB_URI;  // connecting the URI of mongo database here from .env file

// Async function to connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDb Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
}

// Connect to DB before starting the server
connectDB();

// Defining Routes
app.use(express.json());
app.use(cookieParser());
app.use("/todo", todoRoute);
app.use("/user", userRoute);

// Basic error handling middleware for express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Process-level error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown:', error);
  // Application specific logging, cleanup or exit
  process.exit(1);
});

// Backend server running code
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


