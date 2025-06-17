

let routes = require("express");
let router = routes.Router();
let controller = require("../controller/controller.js");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage: storage });
router.get("/",controller.HomePage);
router.get("/Login", controller.loginPage);
router.post("/acceptAdmin",controller.acceptAdminDash);
router.get("/addstudapp", controller.addStudentPage);
router.post("/add-student", controller.addStudent);
router.get("/viewData",controller.viewUserData);
router.get("/deleteUser",controller.deleteUserData);
router.get("/update",controller.updatePage);
router.post("/fUpdate",controller.finalUpdate);
router.get("/GetCat",controller.getCategory);
router.post("/addCategory",controller.addCategory);
router.get("/viewCategory",controller.viewAllCategory);
router.get("/deleteCategory",controller.deleteCategoryData);
router.get("/updateCat",controller.updateCategoryPage);
router.post("/finalUpdateCat",controller.finalUpdateCategory);
router.get("/addBook",controller.addBookPage);
router.post("/InsertBook",upload.single("image"),controller.InsertBookData);
router.get("/viewBook",controller.ViewAllBook);
router.get("/deleteBook",controller.DeleteBooksData);
router.get("/updateBook",controller.updatebook);
router.post("/FinalBookUpdate", upload.single("image"), controller.finalUpdatebook);
router.get("/AuthorWiseBook", controller.AuthorWiseBookPage);
router.post("/AuthorWiseBookData", controller.AuthorWiseBookDataPage);
router.get("/returnBook", controller.returnBookPage);

module.exports = router;
