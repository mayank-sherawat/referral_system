const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { makePurchase } = require("../controllers/purchase.controller");

router.post("/", auth, makePurchase);

module.exports = router;
