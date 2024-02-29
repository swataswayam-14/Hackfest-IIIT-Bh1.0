const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or invalid" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "secret");
      console.log(decoded);
      req.userId = decoded.user_id;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
  
module.exports = authMiddleware;