const { Model } = require("./models/model");
const { Vespa } = require("./models/vespa");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    nome: "Piaggio Vespa Granturismo 200",
    cilindrata: 200,
    vespe: [
      { km: 100, tariffe: 150 },
      { km: 3454, tariffe: 120 },
      { km: 100345, tariffe: 60 },
      { km: 92234, tariffe: 60 },
    ],
  },
  {
    nome: "Piaggio Vespa PX 125",
    cilindrata: 125,
    vespe: [
      { km: 23000, tariffe: 45 },
      { km: 300, tariffe: 65 },
      { km: 0, tariffe: 80 },
    ],
  },
  {
    nome: "Noleggio Vespa 50",
    cilindrata: 50,
    vespe: [
      { km: 0, tariffe: 50 },
      { km: 12340, tariffe: 30 },
    ],
  },
  {
    nome: "Vespa Sprint 125 3V Sport",
    cilindrata: 124,
    vespe: [
      { km: 456, tariffe: 100 },
      { km: 9876, tariffe: 80 },
    ],
  },
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Vespa.deleteMany({});
  await Model.deleteMany({});

  for (let model of data) {
    const { _id: modelloId } = await new Model({
      nome: model.nome,
      cilindrata: model.cilindrata,
    }).save();
    const vespe = model.vespe.map(vespa => ({
      ...vespa,
      modello: {
        _id: modelloId,
        nome: model.nome,
        cilindrata: model.cilindrata,
      },
    }));
    await Vespa.insertMany(vespe);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
