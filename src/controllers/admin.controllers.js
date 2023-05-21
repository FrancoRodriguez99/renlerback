const mongoose = require("mongoose");
const Recurso = require("../models/recurso");
const Habitacion = require("../models/habitacion");
const Edificio = require("../models/edificio");

const generateRecurso = async (req, res) => {
  /*
  try {
    const { id, recetaID, quantity } = req.body;

    const recurso = await Recurso.findById(id);

    recurso.receta = [{ recurso: new mongoose.Types.ObjectId(recetaID), quantity }];

    await recurso.save();

    res.status(201).json({ message: "Recurso generated successfully", recurso });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "An error occurred while generating the recurso" });
  }*/
};

const generateHabitacion = async (req, res) => {
  try {
    const { datos, ganancias, recetas, mejorable, paraMejorarRequiero } = req.body;

    const habitacion = new Habitacion({
      _id: new mongoose.Types.ObjectId(),
      ...datos,
      upgradeable: mejorable,
      recetaMejora: paraMejorarRequiero,
      bonificacion: datos.bonificadores,
      receta: recetas.map((x) => {
        return {
          id: new mongoose.Types.ObjectId(x.name.split("//")[0]),
          quantity: x.quantity,
        };
      }),
      ganancias: ganancias.map((x) => {
        return {
          id: new mongoose.Types.ObjectId(x.name.split("//")[0]),
          quantity: x.quantity,
        };
      }),
    });

    await habitacion.save();

    res.status(200).json({ habitacion, ok: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

const generateEdificio = async (req, res) => {
  try {
    const { datos, ganancias, recetas } = req.body;

    const edificio = new Edificio({
      _id: new mongoose.Types.ObjectId(),
      ...datos,
      bonificacion: datos.bonificadores,
      receta: recetas.map((x) => {
        return {
          id: new mongoose.Types.ObjectId(x.name.split("//")[0]),
          quantity: x.quantity,
        };
      }),
      ganancias: ganancias.map((x) => {
        return {
          id: new mongoose.Types.ObjectId(x.name.split("//")[0]),
          quantity: x.quantity,
        };
      }),
    });

    await edificio.save();

    res.status(200).json({ edificio, ok: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

const deleteHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const a = await Habitacion.deleteOne({ _id: id });

    res.status(201).json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const deleteEdificio = async (req, res) => {
  try {
    const { id } = req.params;
    const a = await Edificio.deleteOne({ _id: id });

    res.status(201).json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const getAll = async (req, res) => {
  try {
    const recursos = await Recurso.find({});
    const habitaciones = await Habitacion.find({}).populate("receta.id").populate("ganancias.id").populate("recetaMejora");
    const edificios = await Edificio.find({}).populate("receta.id").populate("ganancias.id");
    res.status(200).json({ recursos, habitaciones, edificios });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e });
  }
};

module.exports = { generateRecurso, generateHabitacion, generateEdificio, getAll, deleteHabitacion, deleteEdificio };
