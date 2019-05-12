/* Import Dependencies */
const router = require("express").Router();

/* Versions of our API */
router.use("/api/v1", require("./v1"));

module.exports = router;
