const express = require("express");
const users = require("./users");
const build = require("./build");

const router = express.Router();

router.use("/users", users);
router.use("/build", build);

module.exports = router;
