const express = require("express");
const connectDB = require("./db/connection");
const config = require("./config.json");
const cors = require("cors");

const PORT = process.env.PORT || config.PORT;
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5000",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/", require("./routes/heroRoutes"));

// Start  web Server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("localhost is Running at " + PORT);
  }
});

// ### 💡 Interview Answer:

// > **"CORS is a security mechanism enforced by the browser that blocks requests between different origins. We enable it on the backend server using the `cors` middleware to tell the browser which origins are allowed to access our API."**

// ---

// ### 📖 Key Points:

// | Point | Detail |
// |---|---|
// | Who blocks? | **Browser** blocks it |
// | Who fixes? | **Backend** server fixes it |
// | Frontend needed? | ❌ No |
// | Backend needed? | ✅ Yes |
// | Which package? | `npm install cors` |
// | Where to add? | `server/index.js` only
