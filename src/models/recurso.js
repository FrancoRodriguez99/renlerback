const mongoose = require("mongoose");

const recursoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, required: true },
  icono: { type: String, required: false, default: "null" },
  descripcion: { type: String, required: true },
  receta: [
    {
      recurso: {
        type: mongoose.Types.ObjectId,
        ref: "ClaimedItem",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  time: { type: String },
});

module.exports = mongoose.model("Recurso", recursoSchema);
