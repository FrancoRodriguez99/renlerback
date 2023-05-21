const express = require("express");
const { generateRecurso, generateHabitacion, generateEdificio, getAll, deleteHabitacion, deleteEdificio } = require("../controllers/admin.controllers");

const router = express.Router();

router.post("/generateRecurso", generateRecurso);
router.post("/generateHabitacion", generateHabitacion);
router.post("/generateEdificio", generateEdificio);
router.delete("/deleteHabitacion/:id", deleteHabitacion);
router.delete("/deleteEdificio/:id", deleteEdificio);
router.get("/all", getAll);

module.exports = router;
