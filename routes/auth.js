const User = require("../models/user");
const { generateToken } = require("../service/JWTService");
const upload = require("../service/UploadService");

const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.render("signup", { error: err.message });
      }
      const { name, email, password } = req.body;

      const available = await User.findOne({ email });

      if (available) {
        return res.render("signup", { error: "user already exist" });
      }

      const user = await User.create({
        name,
        email,
        password,
        profileUrl: req.file?.filename || "p1.png",
      });
      const token = generateToken({
        email,
        userId: user._id,
        role: user.role,
        name: user.name,
        profileUrl: user.profileUrl,
      });
      res.cookie("token", token).redirect("/");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const result = await User.matchPassword(email, password);
  if (!result) {
    return res.render("signin", {
      error: "wrong credentials",
    });
  }
  const token = generateToken(result);
  res.cookie("token", token).redirect("/");
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").redirect("/signin");
});

module.exports = router;
