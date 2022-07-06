const { Router } = require("express");
const router = Router();

const testController = require("../controllers/test.controller");

router.get("/", testController.test);
router.get("/reset/:platform", testController.reset);

module.exports = router;
