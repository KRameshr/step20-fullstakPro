const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// =======================
// REGISTER
// POST /auth/register
// =======================
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({
      success: true,
      message: "Registration Successful!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Email already exists!",
    });
  }
});

// =======================
// LOGIN
// POST /auth/login
// =======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Find user by email
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      // ✅ Compare password
      const isMatch = await bcrypt.compare(password, foundUser.password);

      if (isMatch) {
        return res.json({
          success: true,
          user: {
            _id: foundUser._id,
            firstname: foundUser.firstname,
            lastname: foundUser.lastname,
            email: foundUser.email,
          },
        });
      }
    }

    res.status(401).json({
      success: false,
      message: "Invalid email or password!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Database error occurred.",
    });
  }
});

// =======================
// UPDATE PROFILE
// PUT /auth/update-profile/:id
// =======================
router.put("/update-profile/:id", async (req, res) => {
  const { firstname, lastname, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email },
      { new: true },
    );

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// =======================
// CHANGE PASSWORD
// PUT /auth/change-password/:id
// =======================
router.put("/change-password/:id", async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // ✅ Find user
    const user = await User.findById(req.params.id);

    // ✅ Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is wrong!",
      });
    }

    // ✅ Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred.",
    });
  }
});

module.exports = router;
