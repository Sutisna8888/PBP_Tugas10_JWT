const jwt = require("jsonwebtoken");
const { db } = require("../database/db");

const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({
      error: "Username, email, password atau confirm password harus dipenuhi",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      error: "Password dan Confirm Password harus sama",
    });
  }

  db.query(
    "INSERT INTO pengguna (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Gagal menyimpan data pengguna" });
      }
      return res.status(201).json({
        status: "201",
        message: "Berhasil registrasi",
        data: { username, email },
      });
    }
  );
};

const getUsers = (req, res) => {
  db.query("SELECT id, username, email FROM pengguna", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data pengguna" });
    }

    return res.status(200).json({
      message: "Berhasil mendapatkan data pengguna",
      data: result,
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password harus diisi" });
  }

  db.query(
    "SELECT * FROM pengguna WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(401).json({ error: "Email atau password salah" });
      }

      const user = result[0];
      const token = jwt.sign(
        { userid: user.id, username: user.username },
        "SandiRahasia",
        { expiresIn: "1h" }
      );

      const decodedToken = jwt.decode(token);

      return res.status(200).json({
        message: "Berhasil login",
        token,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      });
    }
  );
};

const updateUserEmailById = (req, res) => {
  const { userid } = req.user;
  const { newEmail } = req.body;

  if (!newEmail) {
    return res.status(400).json({ error: "Email baru harus diisi" });
  }

  db.query(
    "UPDATE pengguna SET email = ? WHERE id = ?",
    [newEmail, userid],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Gagal memperbarui email" });
      }

      return res.status(200).json({
        message: "Email berhasil diperbarui",
      });
    }
  );
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUserEmailById,
};
