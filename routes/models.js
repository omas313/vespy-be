const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Model, validate } = require("../models/model");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const models = await Model.find().select("-__v").sort("name");
  res.send(models);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let model = new Model({
    nome: req.body.nome,
    cilindrata: req.body.cilindrata,
  });
  model = await model.save();

  res.send(model);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const model = await Model.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      cilindrata: req.body.cilindrata,
    },
    {
      new: true,
    }
  );

  if (!model)
    return res.status(404).send("The model with the given ID was not found.");

  res.send(model);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const model = await Model.findByIdAndRemove(req.params.id);

  if (!model)
    return res.status(404).send("The model with the given ID was not found.");

  res.send(model);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const model = await Model.findById(req.params.id).select("-__v");

  if (!model)
    return res.status(404).send("The model with the given ID was not found.");

  res.send(model);
});

module.exports = router;
