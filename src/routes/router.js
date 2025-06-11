
let routes = require("express");
let router = routes.Router();
let controller = require("../controller/controller.js");


router.get("/Login", controller.loginPage);

module.exports = router;