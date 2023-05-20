const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// ------ register ------
const singUp = async (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((u) => {
      if (u) {
        return res.status(409).json({ message: "Email already exists" });
      } else {
        // Hash password and create new Usuario
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new Usuario({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({ message: "User created successfully" });
              })
              .catch((error) => {
                res.status(500).json({ error: error });
              });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// ------ login ------
const signIn = async (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((u) => {
      if (!u) {
        return res.status(401).json({ message: "email" });
      }
      bcrypt.compare(req.body.password, u.password, (err, result) => {
        console.log(result);
        if (err) {
          return res.status(401).json({ message: "pass" });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: u.email,
              UserId: u._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({ message: "ok", data: { token, u } });
        }
        return res.status(401).json({ message: "conection" });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};

const googleLogIn = async (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((u) => {
      if (u) {
        const token = jwt.sign(
          {
            email: u.email,
            UserId: u._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({ message: "Authentication successful", data: { token, u } });
      } else {
        // Hash password and create new Usuario
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new Usuario({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              avatar: req.body.avatar,
            });
            user
              .save()
              .then((result) => {
                const token = jwt.sign(
                  {
                    email: u.email,
                    UserId: u._id,
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1h",
                  }
                );
                return res.status(200).json({ message: "Authentication successful", data: { token, User: { email: user.email, id: user._id, name: user.name, avatar: user.avatar } } });
              })
              .catch((error) => {
                res.status(500).json({ error: error });
              });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

const editUser = async (req, res) => {
  try {
    let mody = {};

    if (req.body.name) mody.name = req.body.name;
    if (req.body.email) mody.email = req.body.email;
    if (req.body.avatar) mody.avatar = req.body.avatar[0];

    await Usuario.findByIdAndUpdate(req.params.id, mody);
    res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const a = await Usuario.findById(req.params.id).populate("bills");
    res.status(201).json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

module.exports = { singUp, signIn, googleLogIn, editUser, getProfile };
