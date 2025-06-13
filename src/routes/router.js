
let routes = require("express");
let router = routes.Router();
let controller = require("../controller/controller.js");

router.get("/",controller.HomePage);
router.get("/Login", controller.loginPage);
router.post("/acceptAdmin",controller.acceptAdminDash);
router.get("/addstudapp", controller.addStudentPage);
router.post("/add-student", controller.addStudent);

router.get("/viewData",controller.viewUserData);
// router.post("/fetchUser",controller.acceptDataFromuser);

router.get("/deleteUser",controller.deleteUserData);
module.exports = router;