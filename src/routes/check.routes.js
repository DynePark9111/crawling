const { Router } = require("express");
const router = Router();

const checkController = require("../controllers/check.controller");

router.get("/", checkController.checkAll);
router.get("/naver", checkController.checkNaver);
router.get("/kakao", checkController.checkKakao);
router.get("/db", checkController.checkAllDB);
router.get("/db/:platform", checkController.checkDB);

module.exports = router;
