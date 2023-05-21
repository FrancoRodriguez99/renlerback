const mongoose = require("mongoose");

const edificioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, required: true },
  icono: { type: String, required: false, default: "null" },
  descripcion: { type: String, required: true },
  bonificacion: { type: String, required: true },
  bonificacionNumero: { type: String, required: true },
  size: { type: String, required: true },
  receta: [
    {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "Habitacion",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  time: { type: String },
  ganancias: [
    {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "Recurso",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Edificio", edificioSchema);
