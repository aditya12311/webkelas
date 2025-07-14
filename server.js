const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

app.use(express.static(path.join(__dirname, "public")));

const admins = [
  {
    username: "admin",
    hashedPassword:
      "$2b$10$E/f.gJ2gL6XkZq8r8bJ8qO/rY.iW.eN6zS.C.mB.gH3qI.oP.eP.e",
  },
];
const plainPasswords = {
  admin: "insider2024",
  ketua_kelas: "rahasia123",
  bendahara: "keuanganaman",
};

function logAttempt(ip, username, success) {
  const timestamp = new Date().toISOString();
  const status = success ? "BERHASIL" : "GAGAL";
  console.log(
    `[${timestamp}] IP: ${ip} | User: '${username}' | Status: ${status}`
  );
}

app.get("/", (req, res) => {
  // Mengirim file login.html yang ada di dalam folder public/admin
  res.sendFile(path.join(__dirname, "public", "admin", "login.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip;

  const adminUser = admins.find((user) => user.username === username);

  if (!adminUser) {
    logAttempt(ip, username, false);
    return res
      .status(401)
      .json({ success: false, message: "Username atau password salah!" });
  }

  const isMatch = plainPasswords[username] === password;

  if (isMatch) {
    logAttempt(ip, username, true);
    res.json({ success: true, message: "Login berhasil! Mengalihkan..." });
  } else {
    logAttempt(ip, username, false);
    res
      .status(401)
      .json({ success: false, message: "Username atau password salah!" });
  }
});

app.listen(port, () => {
  console.log(`Server admin INSIDER berjalan di http://localhost:${port}`);
  console.log(
    "Halaman utama sekarang tersedia. Menunggu upaya login untuk dicatat..."
  );
});
