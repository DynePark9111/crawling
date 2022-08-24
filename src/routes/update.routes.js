const { Router } = require("express");
const router = Router();

const updateController = require("../controllers/update.controller");

router.get("/", updateController.forceUpdateAll);
router.get("/naver", updateController.forceUpdateNaver);
router.get("/kakao", updateController.forceUpdateKakao);

module.exports = router;
