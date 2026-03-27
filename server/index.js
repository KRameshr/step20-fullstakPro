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

// ✅ Root route stays here - it's the API map
app.get("/", (req, res) => {
  res.json({
    message: "API Running ✅",
    routes: {
      heroes: {
        getAll: "GET    /heroes/data",
        getOne: "GET    /heroes/getone/:id",
        create: "POST   /heroes/save",
        update: "PUT    /heroes/update/:id",
        delete: "DELETE /heroes/delete/:id",
      },
      auth: {
        register: "POST /auth/register",
        login: "POST /auth/login",
        updateProfile: "PUT  /auth/update-profile/:id",
        changePassword: "PUT  /auth/change-password/:id",
      },
    },
  });
});

app.use("/heroes", require("./routes/heroRoutes"));
app.use("/auth", require("./routes/authRoutes"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Server Running at " + PORT);
  }
});
