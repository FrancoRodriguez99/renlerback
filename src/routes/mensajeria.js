const express = require("express");
const { contacto } = require("../controllers/mensajeria.controllers");

const router = express.Router();

router.post("/contacto", contacto);

module.exports = router;
