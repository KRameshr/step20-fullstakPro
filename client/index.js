const express = require("express");
const path = require("path");
require("dotenv").config();
const session = require("express-session");

const PORT = process.env.PORT || 5000;
const API = process.env.API || "http://localhost:3000";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    name: "fullstack_Dev",
    secret: "zonetocode_secret_key",
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 30 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
  }),
);

app.get("/config", (req, res) => {
  res.json({ API: API });
});

// =======================
// Home
// =======================
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    user: req.session.user || null,
  });
});

// =======================
// Register
// =======================
app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    error: null,
    success: null,
  });
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render("register", {
      title: "Register",
      error: "Passwords do not match!",
      success: null,
    });
  }

  try {
    // ✅ Call server API
    const response = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    const data = await response.json();

    if (data.success) {
      res.render("register", {
        title: "Register",
        error: null,
        success: "Registration Successful! Please login.",
      });
    } else {
      res.render("register", {
        title: "Register",
        error: data.message,
        success: null,
      });
    }
  } catch (err) {
    res.render("register", {
      title: "Register",
      error: "Server error occurred!",
      success: null,
    });
  }
});

// =======================
// Login
// =======================
app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    error: null,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Call server API
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.success) {
      // ✅ Save user in session
      req.session.user = data.user;
      return res.redirect("/dashboard");
    }

    res.render("login", {
      title: "Login",
      error: data.message,
    });
  } catch (err) {
    res.render("login", {
      title: "Login",
      error: "Server error occurred!",
    });
  }
});

// =======================
// Dashboard (Protected)
// =======================
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.sendFile(path.join(__dirname, "public", "dashboard.html")); // ✅
});

// =======================
// Profile (Protected)
// =======================
app.get("/profile", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("profile", {
    title: "My Profile",
    user: req.session.user,
    error: null,
  });
});

app.post("/update-profile", async (req, res) => {
  try {
    const response = await fetch(
      `${API}/auth/update-profile/${req.session.user._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      },
    );
    const data = await response.json();
    if (data.success) {
      req.session.user = data.user;
      res.json({ success: true, user: data.user });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// =======================
// Change Password
// =======================
app.post("/change-password", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  try {
    const response = await fetch(
      `${API}/auth/change-password/${req.session.user._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      },
    );
    const data = await response.json();

    if (data.success) {
      req.session.destroy(() => {
        res.clearCookie("fullstack_Dev");
        res.redirect("/login");
      });
    } else {
      res.render("profile", {
        title: "Profile",
        user: req.session.user,
        error: data.message,
      });
    }
  } catch (err) {
    res.render("profile", {
      title: "Profile",
      user: req.session.user,
      error: "Error occurred.",
    });
  }
});

// =======================
// Logout
// =======================
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/dashboard");
    res.clearCookie("fullstack_Dev");
    res.render("logout", { title: "Logout" });
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Client Running at " + PORT);
  }
});
