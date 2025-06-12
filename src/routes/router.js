
let routes = require("express");
let router = routes.Router();
let controller = require("../controller/controller.js");

router.get("/",controller.HomePage);
router.get("/Login", controller.loginPage);
router.post("/acceptAdmin",controller.acceptAdminDash);

module.exports = router;