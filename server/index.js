import connectDB from './config/connectDB.js';
import dotenv from "dotenv";
import express from 'express';
import router from './routes/postRoutes.js';
import logger from './middleware/logger.js';
import cors from 'cors';

// const express = require('express');
// const logger = require('logger');
// const router = require('router');
// const dotenv = require('dotenv');
// const connectDB = require('connectDB');

const app = express();
dotenv.config();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(logger);


app.use('/api/posts', router);

app.get("/", (req, res) => {
  res.send("API is working ✅");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is listning on PORT ${PORT}`);
});