/* Importação de dependencias */
const router = require("express").Router();

router.use("/", require("./payment"));

module.exports = router;
