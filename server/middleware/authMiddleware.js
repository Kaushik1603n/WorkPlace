import { verifyAccessToken } from '../utils/jwt.js';
// import User from '../models/User.js';

const authenticate = async (req, res, next) => {
  // Get token from cookies or header
  const accessToken = req.cookies?.accessToken || 
                     req.header('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    // Access token expired - try refreshing
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Access token expired",
        shouldRefresh: true
      });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authenticate;