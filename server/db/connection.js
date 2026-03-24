const mongoose = require("mongoose");
const config = require("../config.json");

const connectDB = () => {
  let dbString =
    "mongodb+srv://{{uname}}:{{upassword}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?appName=Cluster0";
  dbString = dbString
    .replace("{{uname}}", config.dbUsername)
    .replace("{{upassword}}", config.dbPassword)
    .replace("{{dbstring}}", config.dbString)
    .replace("{{dbname}}", config.dbName);
  mongoose
    .connect(dbString)
    .then(() => console.log("DB Connected ✅"))
    .catch((err) => console.log("DB Error:", err));
};

module.exports = connectDB;
