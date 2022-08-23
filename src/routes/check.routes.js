const { Router } = require("express");
const router = Router();

const checkController = require("../controllers/check.controller");

router.get("/", checkController.checkUpdates);
router.get("/naver", checkController.checkNaver);
router.get("/db", checkController.checkAllDB);
router.get("/db/:platform", checkController.checkDB);

module.exports = router;
