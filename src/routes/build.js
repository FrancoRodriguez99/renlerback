const express = require("express");
const { getMap, generateMap, deleteSomething, generateClaim } = require("../controllers/build.controllers");

const router = express.Router();

router.get("/getMap", getMap);
router.post("/generateMap", generateMap);
router.post("/claim", generateClaim);
router.delete("/deleteSomething", deleteSomething);

module.exports = router;
