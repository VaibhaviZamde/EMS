// controllers/authController.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// LOGIN CONTROLLER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email, password); // For debugging

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found, return error
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Compare the password with the hashed password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Send the token and user data in the response
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// VERIFY CONTROLLER
export const verify = async (req, res) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, error: 'Token not provided' });
    }

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the full user based on the decoded user ID
    const user = await User.findById(decoded.id).select('-password'); // Don't return password

    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    // Return the user data if verification is successful
    return res.status(200).json({ success: true, user });

  } catch (error) {
    console.error("Token verification failed:", error);
    // Handle different JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, error: 'Token expired' });
    }
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
