const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/", require("./routes/heroRoutes"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Server Running at " + PORT);
  }
});
