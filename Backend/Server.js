const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ MUST BE BEFORE app.use

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Routes
app.use('/students', require('./routes/studentRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send("Backend Running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));