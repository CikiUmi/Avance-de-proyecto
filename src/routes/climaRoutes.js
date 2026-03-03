const express = require("express");
const router = express.Router();
const climaController = require("../controllers/climaController");

router.get("/recomendacion", climaController.obtenerRecomendacion);

module.exports = router;
