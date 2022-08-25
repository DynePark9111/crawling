const { Router } = require("express");
const router = Router();

const dbController = require("../controllers/db.controller");

router.get("/", dbController.checkAllDB);
router.get("/:platform", dbController.checkDB);

module.exports = router;
