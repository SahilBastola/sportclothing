const express = require("express");
const { registerUser, authUser } = require("../Controllers/auth");

const router = express.Router();



router.post("/registeruser", registerUser);
router.post("/loginuser", authUser);

module.exports = router;