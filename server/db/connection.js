const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  const dbString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.${process.env.DB_STRING}.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`;

  mongoose
    .connect(dbString)
    .then(() => console.log("DB Connected ✅"))
    .catch((err) => console.log("DB Error:", err));
};

module.exports = connectDB;
