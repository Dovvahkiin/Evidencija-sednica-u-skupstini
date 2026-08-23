import JwtService from "../services/jwtService.js";

export const verifyRefreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Refresh token is missing!" });

  try {
    req.user = JwtService.verifyRefreshToken(token);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid refresh token!",
      error: error,
    });
  }
};
