const mongoose = require("mongoose");

const habitacionSchema = mongoose.Schema({
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
        ref: "Recurso",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  recetaMejora: {
    type: mongoose.Types.ObjectId,
    ref: "Habitacion",
    required: false,
  },
  upgradeable: { type: Boolean },
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

module.exports = mongoose.model("Habitacion", habitacionSchema);
