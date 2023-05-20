const express = require("express");
const { signIn, singUp, googleLogIn, editUser, getProfile } = require("../controllers/users.controllers");

const router = express.Router();

router.post("/signIn", signIn);
router.post("/singUp", singUp);
router.post("/googleLogIn", googleLogIn);
router.post("/editUser/:id", editUser);
router.get("/getProfile/:id", getProfile);

module.exports = router;
