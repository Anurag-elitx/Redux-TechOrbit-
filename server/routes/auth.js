const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Password validation helper
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
};

// Email validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Register - Professional bcrypt implementation
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: "All fields are required" 
      });
    }

    // Email validation
    if (!validateEmail(email)) {
      return res.status(400).json({ 
        message: "Please enter a valid email address" 
      });
    }

    // Password validation
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: "Username or email already exists" 
      });
    }

    // Hash password with bcrypt (salt rounds = 12)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword, // Store hashed password
    });

    const savedUser = await newUser.save();
    
    // Don't send password in response
    const { password: userPassword, ...userWithoutPassword } = savedUser._doc;
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login - Professional bcrypt implementation
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({ 
        message: "Username and password are required" 
      });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    // Don't send password in response
    const { password: userPassword, ...userWithoutPassword } = user._doc;
    return res.status(200).json({ 
      message: "Login successful",
      user: userWithoutPassword, 
      accessToken 
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.cookie('accessToken', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
