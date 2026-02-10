const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { profile, earnings, referrals } = require("../controllers/user.controller");

router.get("/profile", auth, profile);
router.get("/earnings", auth, earnings);
router.get("/referrals", auth, referrals);

module.exports = router;
