import JwtService from "../services/jwtService";

class Authentication {
  Authentication = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    try {
      const user = JwtService.verifyAccesToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ succes: false, message: "Invalid token", error });
    }
  };

  LoginCheck = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next();
    try {
      JwtService.verifyAccesToken(token);
      return res.status(403).json({
        status: "Forbidden",
        message: "You are already logged in!",
      });
    } catch (error) {
      console.log(error);
      next();
    }
  };

  Authorization = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user)
        // if user does not exists access if unauthorized
        return res.status(401).json({ message: "Unauthorized!" });
      if (!allowedRoles.includes(req.user.role))
        return res.status(403).json({ message: "Forbidden" });
      next();
    };
  };
}

export default Authentication;
