const jwt = require("jsonwebtoken");
const JWT_SECRET = "21122112$$55544$";

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    // API request ke liye JSON, browser ke liye redirect
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    // return res.redirect("/Login");
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    // return res.redirect("/Login");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(403).json({ success: false, message: "Admins only" });
    }
    // return res.redirect("/Login");
  }
};

exports.isUser = (req, res, next) => {
  if (req.user && (req.user.role === "student" || req.user.role === "member" || req.user.role === "librarian")) {
    next();
  } else {
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(403).json({ success: false, message: "Users only" });
    }
    // return res.redirect("/Login");
  }
};