const express = require("express");

const generalControllers = require("../controllers/general-controllers");

const router = express.Router();

// RUTA PARA LOGIN

router.post("/login", generalControllers.login);

module.exports = router;
