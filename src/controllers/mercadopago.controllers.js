const mongoose = require("mongoose");
const Bill = require("../models/bill");
const User = require("../models/user");

require("dotenv").config();
var request = require("request");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

const generateBill = async (req, res) => {
  try {
    const { carro, idUser, idAddress } = req.body;
    var buyMe = [];

    var items = {
      productos: carro.productos,
      extra: carro.extras,
      bebida: carro.bebidas,
    };

    const newBill = new Bill({
      _id: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      total: carro.total,
      items,
      address: idAddress,
      user: idUser,
    });

    await User.updateMany({ _id: { $in: idUser } }, { $push: { bills: newBill._id } });

    carro.productos
      .concat(carro.extras)
      .concat(carro.bebidas)
      .forEach((element) => {
        buyMe.push({
          title: element.title,
          unit_price: parseInt(element.price),
          quantity: element.quantity,
          id: element._id,
        });
      });

    var preference = {
      items: buyMe,
      auto_return: "approved",
      notification_url: "https://ledw.onrender.com/mercadopago/payed",
      external_reference: newBill._id.toString(),
      back_urls: {
        success: "http://192.168.1.124:3000",
        pending: "http://192.168.1.124:3000",
        failure: "http://192.168.1.124:3000",
      },
    };

    try {
      var q = "";
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso

      await mercadopago.preferences
        .create(preference)
        .then((response) => {
          q = response.body.init_point;
        })
        .catch((e) => console.log(e));
      newBill.type = q;
      await newBill.save();
      res.status(200).json(q);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const checkOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Bill.findById(id).populate("user").populate("address").exec();
    const orderObject = order.toObject();

    if (order.type) {
      const a = await mercadopago.preferences.findById(order.type);
    }
    res.status(200).json(orderObject);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const generateBillEfectivo = async (req, res) => {
  try {
    const { carro, idUser, idAddress } = req.body;

    var items = {
      productos: carro.productos,
      extra: carro.extras,
      bebida: carro.bebidas,
    };

    const newBill = new Bill({
      _id: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      total: carro.total,
      items,
      address: idAddress,
      user: idUser,
      pagado: true,
    });
    await newBill.save();
    await User.updateOne({ _id: { $in: idUser } }, { $push: { bills: newBill._id } });

    res.status(200).json(newBill);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const payed = async (req, res) => {
  try {
    console.log("asd");
    console.log(req.body);
    console.log(req.params);
    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { generateBill, checkOrder, generateBillEfectivo, payed };
