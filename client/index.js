const express = require("express");
const path = require("path");
const config = require("./config.json");

const PORT = process.env.PORT || config.PORT;
const app = express();

// ✅ Serve public folder correctly
app.use(express.static(path.join(__dirname, "public")));

// ✅ Send index.html for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Client Running at " + PORT);
  }
});
