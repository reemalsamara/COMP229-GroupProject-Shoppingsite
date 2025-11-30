const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret_key_here";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admins only" });
};

const isCustomer = (req, res, next) => {
  if (req.user && req.user.role === "customer") return next();
  return res.status(403).json({ message: "Customers only" });
};

module.exports = {
  authMiddleware,
  isAdmin,
  isCustomer
};
