const mongoose = require("mongoose");

const cuadradoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: false },
  image: { type: String, required: false, default: "null" },
  coordenadas: [[Number], [Number], [Number], [Number]],
  claimed: {
    type: mongoose.Types.ObjectId,
    ref: "Claimed",
  },
});

module.exports = mongoose.model("Cuadrado", cuadradoSchema);
