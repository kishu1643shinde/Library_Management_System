

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
router.get("/update",controller.updatePage);
router.post("/fUpdate",controller.finalUpdate);
router.get("/GetCat",controller.getCategory);
router.post("/addCategory",controller.addCategory);
router.get("/viewCategory",controller.viewAllCategory);
router.get("/deleteCategory",controller.deleteCategoryData);
router.get("/updateCat",controller.updateCategoryPage);
router.post("/finalUpdateCat",controller.finalUpdateCategory);
module.exports = router;
