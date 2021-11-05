const { Vespa, validate } = require("../models/vespa");
const { Model } = require("../models/model");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const vespe = await Vespa.find().select("-__v").sort("tariffe");
  res.send(vespe);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const modello = await Model.findById(req.body.modelloId);
  if (!modello) return res.status(400).send("Invalid modello.");

  const vespa = new Vespa({
    modello: {
      _id: modello._id,
      nome: modello.nome,
      cilindrata: modello.cilindrata,
    },
    km: req.body.km,
    tariffe: req.body.tariffe,
    publishDate: moment().toJSON(),
  });
  await vespa.save();

  res.send(vespa);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const modello = await Model.findById(req.body.modelloId);
  if (!modello) return res.status(400).send("Invalid modello.");

  const vespa = await Vespa.findByIdAndUpdate(
    req.params.id,
    {
      modello: {
        _id: modello._id,
        nome: modello.nome,
        cilindrata: modello.cilindrata,
      },
      km: req.body.km,
      tariffe: req.body.tariffe,
    },
    { new: true }
  );

  if (!vespa)
    return res.status(404).send("The vespa with the given ID was not found.");

  res.send(vespa);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const vespa = await Vespa.findByIdAndRemove(req.params.id);

  if (!vespa)
    return res.status(404).send("The vespa with the given ID was not found.");

  res.send(vespa);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const vespa = await Vespa.findById(req.params.id).select("-__v");

  if (!vespa)
    return res.status(404).send("The vespa with the given ID was not found.");

  res.send(vespa);
});

module.exports = router;
