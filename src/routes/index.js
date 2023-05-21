const express = require("express");
const users = require("./users");
const build = require("./build");
const admin = require("./admin");

const router = express.Router();

router.use("/users", users);
router.use("/build", build);
router.use("/admin", admin);

module.exports = router;
