import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve token from authorization header
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);  // Debug log the decoded token
    
    if (!decoded) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    // Find the user by the ID decoded from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;  
    next();

  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      console.error('Invalid token error:', error);  // Debug invalid token error
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired error:', error);  // Debug token expiration error
      return res.status(401).json({ success: false, error: "Token expired" });
    }
    res.status(500).json({ success: false, error: "Authentication failed" });
  }
};

export default authMiddleware;
