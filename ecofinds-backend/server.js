const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");       // 1. require cors
const User = require("./models/User");

const app = express();               // 2. initialize app

app.use(express.json());             // 3. JSON middleware
app.use(cors());                     // 4. CORS middleware

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ecofinds", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("EcoFinds API is running...");
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
