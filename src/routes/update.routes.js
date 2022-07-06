const { Router } = require("express");
const router = Router();

const updateController = require("../controllers/update.controller");

router.get("/", updateController.forceUpdateAll);
router.get("/naver", updateController.forceUpdateNaver);

module.exports = router;
