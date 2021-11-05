const Joi = require("joi");
const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99,
  },
  cilindrata: {
    type: Number,
    required: true,
    min: 1,
    max: 9999,
  },
});

const Model = mongoose.model("Model", modelSchema);

function validateModel(model) {
  const schema = {
    nome: Joi.string().min(3).max(99).required(),
    cilindrata: Joi.number().min(1).max(9999).required(),
  };

  return Joi.validate(model, schema);
}

exports.modelSchema = modelSchema;
exports.Model = Model;
exports.validate = validateModel;
