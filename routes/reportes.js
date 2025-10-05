const express = require("express");
const router = express.Router();
const { poliSP } = require("../controllers/reportes");

router.get("/poli", poliSP);

module.exports = router;
