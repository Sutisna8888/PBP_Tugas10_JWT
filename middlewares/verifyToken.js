const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, Token tidak ada" });
  }

  try {
    const decoded = jwt.verify(token, "SandiRahasia");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

module.exports = verifyToken;
