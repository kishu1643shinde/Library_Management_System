const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");
const auth = require("../middleware/auth.js");
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

// Public routes
router.get("/", controller.HomePage);
router.get("/Login", controller.loginPage);
router.post("/acceptAdmin", controller.acceptAdminDash);

// Admin-only routes (protected)
router.get("/addstudapp", auth.verifyToken, auth.isAdmin, controller.addStudentPage);
router.post("/add-student", auth.verifyToken, auth.isAdmin, controller.addStudent);
router.get("/viewData", auth.verifyToken, auth.isAdmin, controller.viewUserData);
router.get("/deleteUser", auth.verifyToken, auth.isAdmin, controller.deleteUserData);
router.get("/update", auth.verifyToken, auth.isAdmin, controller.updatePage);
router.post("/fUpdate", auth.verifyToken, auth.isAdmin, controller.finalUpdate);

// Category management (admin)
router.get("/GetCat", auth.verifyToken, auth.isAdmin, controller.getCategory);
router.post("/addCategory", auth.verifyToken, auth.isAdmin, controller.addCategory);
router.get("/viewCategory", auth.verifyToken, auth.isAdmin, controller.viewAllCategory);
router.get("/deleteCategory", auth.verifyToken, auth.isAdmin, controller.deleteCategoryData);
router.get("/updateCat", auth.verifyToken, auth.isAdmin, controller.updateCategoryPage);
router.post("/finalUpdateCat", auth.verifyToken, auth.isAdmin, controller.finalUpdateCategory);

// Book management (admin)
router.get("/addBook", auth.verifyToken, auth.isAdmin, controller.addBookPage);
router.post("/InsertBook", auth.verifyToken, auth.isAdmin, upload.single("image"), controller.InsertBookData);
router.get("/viewBook", auth.verifyToken, auth.isAdmin, controller.ViewAllBook);
router.get("/deleteBook", auth.verifyToken, auth.isAdmin, controller.DeleteBooksData);
router.get("/updateBook", auth.verifyToken, auth.isAdmin, controller.updatebook);
router.post("/FinalBookUpdate", auth.verifyToken, auth.isAdmin, upload.single("image"), controller.finalUpdatebook);
// Issue book form
router.get('/issuebook', auth.verifyToken, auth.isAdmin, controller.showForm);
router.get('/get-books/:categoryId', auth.verifyToken, auth.isAdmin, controller.getBooksByCategory);
router.post('/issuebooks', auth.verifyToken, auth.isAdmin, controller.issueBook);
router.post('/returnBook/:id', auth.verifyToken, auth.isAdmin, controller.returnBook);
// router.get('/dashboard', controller.acceptAdminDash);

router.get("/returnIssuedBook", controller.returnIssuedBookData);

// User-only routes (protected, but not admin-only)
router.get("/viewAllBookLoginUser", auth.verifyToken, controller.ViewAllBookLoginU);


//my issued books....
router.get("/myIssuedBook", auth.verifyToken, auth.isUser, controller.myIssuedBooks);
router.get("/userdashboard", auth.verifyToken, auth.isUser, controller.userDashboard);

// Logout (protected)
router.get("/logout", auth.verifyToken, controller.logout);

module.exports = router;