const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  claimed: {
    type: mongoose.Types.ObjectId,
    ref: "Claimed",
  },
  cuadrado: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cuadrado",
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
