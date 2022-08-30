const { Router } = require("express");
const router = Router();

const dbController = require("../controllers/db.controller");

router.get("/", dbController.getAllDB);
router.get("/:platform", dbController.getDB);
router.delete("/", dbController.deleteAllDB);
router.delete("/:platform", dbController.deleteDB);

module.exports = router;
