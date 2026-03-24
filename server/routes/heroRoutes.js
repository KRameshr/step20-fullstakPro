const express = require("express");
const router = express.Router();
const Hero = require("../models/heroModel");

// READ - Get All Heroes

router.get("/data", (req, res) => {
  Hero.find()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

// READ ONE - Get Single Hero

router.get("/getone/:id", (req, res) => {
  Hero.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

// CREATE

router.post("/save", (req, res) => {
  const hero = new Hero({
    title: req.body.title,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    city: req.body.city,
  });

  hero
    .save()
    .then((result) => {
      console.log("Saved:", result);
      res.send(result);
    })
    .catch((err) => res.status(500).send(err));
});

// UPDATE

router.put("/update/:id", (req, res) => {
  Hero.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      city: req.body.city,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

// DELETE

router.delete("/delete/:id", (req, res) => {
  Hero.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log("Deleted:", result);
      res.send(result);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
