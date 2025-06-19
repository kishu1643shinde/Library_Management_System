const jwt = require("jsonwebtoken");
const JWT_SECRET = "21122112$$55544$";

exports.verifyToken = (req, res, next) => {
  // Try to get token from cookie or Authorization header
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    return res.status(403).send("Access Denied: No Token Provided!");
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // store user info in request
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Access denied: Admins only");
  }
};
exports.isUser = (req, res, next) => {
  if ((req.user)&& (req.user.role === "student"|| req.user.role === "member" || req.user.role === "librarian")) {
    next();
  } else {
    return res.status(403).send("Access denied. Users only.");
  }
};