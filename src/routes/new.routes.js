const { Router } = require("express");
const router = Router();

const newController = require("../controllers/new.controller");

router.get("/", newController.newAll);
router.get("/naver", newController.newNaver);
router.get("/kakao", newController.newKakao);

module.exports = router;
