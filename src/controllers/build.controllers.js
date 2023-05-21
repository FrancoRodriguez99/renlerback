const mongoose = require("mongoose");
const Cuadrado = require("../models/cuadrado");
const Claimed = require("../models/claimed");
const Recurso = require("../models/recurso");

const generateMap = async (req, res) => {
  try {
    for (let i = 0; i < 600; i += 10) {
      for (let j = 0; j < 600; j += 10) {
        const positions = [
          [i, j],
          [i + 10, j],
          [i + 10, j + 10],
          [i, j + 10],
        ];

        const cuadrado = new Cuadrado({
          _id: new mongoose.Types.ObjectId(),
          coordenadas: positions,
        });

        await cuadrado.save();
      }
    }

    res.status(201).json({ ok: true });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getMap = async (req, res) => {
  try {
    const cuadrados = await Cuadrado.find({}).populate("claimed");

    res.status(200).json(cuadrados);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const deleteSomething = async (req, res) => {
  try {
    const a = await Recurso.deleteMany({});
    res.status(201).json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const generateClaim = async (req, res) => {
  try {
    const { title, cuadrados, User } = req.body;

    const land = new Claimed({
      _id: new mongoose.Types.ObjectId(),
      title,
      cuadrado: cuadrados,
      User,
    });

    await land.save();

    await Cuadrado.updateMany({ _id: { $in: cuadrados } }, { claimed: land._id });

    res.status(201).json({ land });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

module.exports = { getMap, generateMap, deleteSomething, generateClaim };
