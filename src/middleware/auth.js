const jwt = require("jsonwebtoken");
const JWT_SECRET = "21122112$$55544$";

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

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
