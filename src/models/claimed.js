const mongoose = require("mongoose");

const claimedSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    cuadrado: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Cuadrado",
      },
    ],
    User: {
      type: mongoose.Types.ObjectId,
      ref: "Usuario",
    },
    Room: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claimed", claimedSchema);
