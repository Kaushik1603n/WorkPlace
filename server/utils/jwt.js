import jwt from 'jsonwebtoken';

const generateTokens = (userId, email, role) => {
  const accessToken = jwt.sign(
    { userId, email, role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } 
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } 
  );

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

export { generateTokens, verifyAccessToken, verifyRefreshToken };