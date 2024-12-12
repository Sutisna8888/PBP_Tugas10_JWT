const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  updateUserEmailById,
} = require("../Controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/", getUsers);

router.put("/update-email", verifyToken, updateUserEmailById);

module.exports = router;
