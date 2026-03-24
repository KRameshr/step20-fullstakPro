const express = require("express");
const path = require("path");
require("dotenv").config(); // ✅ Load .env

const PORT = process.env.PORT || 5000;
const API = process.env.API || "http://localhost:3000";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/config", (req, res) => {
  res.json({ API: API });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Client Running at " + PORT);
  }
});
