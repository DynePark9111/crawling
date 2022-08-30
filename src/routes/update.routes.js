const { Router } = require("express");
const router = Router();

const updateController = require("../controllers/update.controller");

router.get("/", updateController.UpdateAll);
router.get("/naver", updateController.UpdateNaver);
router.get("/kakao", updateController.UpdateKakao);

module.exports = router;
