/* Import Dependencies */
const router = require("express").Router();

/* Payment Route */
router.use("/", require("./payment"));

module.exports = router;
