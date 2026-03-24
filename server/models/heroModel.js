const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  title: String,
  firstname: String,
  lastname: String,
  email: String,
  city: String,
});

setTimeout(() => {
  Hero.find()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => console.log("Query Finished!"));
}, 1000);

const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;
