import { verifyAccessToken } from "../utils/jwt.js";

const authenticate = async (req, res, next) => {

  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
    

  if (!accessToken) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
        shouldRefresh: true,
      });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authenticate;
