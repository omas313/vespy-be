const Joi = require("joi");
const mongoose = require("mongoose");
const { modelSchema } = require("./model");

const Vespa = mongoose.model(
  "Vespe",
  new mongoose.Schema({
    modello: {
      type: modelSchema,
      required: true,
    },
    km: {
      type: Number,
      required: true,
      min: 0,
      max: 999999,
    },
    tariffe: {
      type: Number,
      required: true,
      min: 1,
      max: 9999,
    },
  })
);

function validateVespa(vespa) {
  const schema = {
    modelloId: Joi.objectId().required(),
    km: Joi.number().min(0).max(999999).required(),
    tariffe: Joi.number().min(1).max(9999).required(),
  };

  return Joi.validate(vespa, schema);
}

exports.Vespa = Vespa;
exports.validate = validateVespa;
