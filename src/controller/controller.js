let db=require("mysql2");
let mod=require("../models/regmodel.js");
const e = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "21122112$$55544$";

exports.HomePage=(req,res)=>{
    res.render("HomePage.ejs");
}
exports.loginPage=(req,res)=>{
 res.render("login.ejs");

}
exports.acceptAdminDash = async (req, res) => {
  const { username, password } = req.body;

  // Admin login (hardcoded)
  if (username === "admin" && password === "admin@1643") {
    const token = jwt.sign({ name: "admin", role: "admin" }, JWT_SECRET, { expiresIn: "2h" });
    res.cookie("token", token, { httpOnly: true });
    req.session.user = { name: "admin", role: "admin" };

    // --- Yahan counts fetch karo ---
    const [totalStudents, totalBooks, issuedBooks] = await Promise.all([
      mod.countAllStudents(),    // <-- ye function model me hona chahiye
      mod.countAllBooks(),
      mod.countAllIssuedBooks()
    ]);
    // ------------------------------

    return res.render("dashboard.ejs", {
      main_Content: undefined,
      msg: "",
      user: req.session.user,
      totalStudents,
      totalBooks,
      issuedBooks
    });
  }

  // User login (from DB)
  try {
    const user = await mod.checkLogin(username, password);
    if (user) {
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "2h" });
      res.cookie("token", token, { httpOnly: true });
      req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role };

      // Fetch counts for user profile dashboard
      const [totalBooks, issuedBooks, returnedBooks] = await Promise.all([
        mod.countAllBooks(),
        mod.countIssuedBooksByUser(user.id),
        mod.countReturnedBooksByUser(user.id)
      ]);

      // Pass counts to Userdashboard.ejs
      return res.render("Userdashboard.ejs", {
        main_Content: undefined,
        msg: "",
        user: req.session.user,
        totalBooks,
        issuedBooks,
        returnedBooks
      });
    } else {
      return res.render("login.ejs", { msg: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.render("login.ejs", { msg: "Server error" });
  }
};
exports.addStudentPage=(req,res)=>{
res.render("dashboard.ejs", { main_Content: "addstudent",msg:""  });
}

exports.addStudent = (req, res) => {
  let { name, email, password,role } = req.body;

  let result = mod.AddDataInUserTable(name, email, password,role);

  result
    .then(data => {
      console.log("Student added successfully:", data);
      res.render("dashboard.ejs", { main_Content: "addstudent",msg:"User added successful"  });
    //   res.render("addstudent.ejs");// ors send a success response
   //res.render("dashboard.ejs"); // Redirect to the add student page after successful addition
    })
    .catch(err => {
      console.error("Error adding student:", err);
      res.status(500).send("Error adding student");
    });
};

exports.viewUserData=(req,res)=>{

  let result=mod.fetchDataFromUser();
  result.then((data)=>{
     res.render("dashboard.ejs",{ main_Content: "viewAllUsers",userData:data});
  });
 
};


exports.deleteUserData=(req,res)=>{
  let did=parseInt(req.query.id);
  let result=mod.finaldeleteUser(did);
  result.then((d)=>{
     //res.render("viewAllUsers.ejs",{userData:d});
      res.render("dashboard.ejs",{ main_Content: "viewAllUsers",userData:d});
  });
}

exports.updatePage=(req,res)=>{
  let id=parseInt(req.query.id.trim());
   console.log("ID:", id);
  let result=mod.FetchUserId(id);
 result.then((data)=>{
   //res.render("updateUser.ejs",{d:data[0],msg:""});
   res.render("dashboard.ejs",{ main_Content: "updateUser",d:data[0],msg:""});
 });
}
exports.finalUpdate=(req,res)=>{
  let id=parseInt(req.body.id);
  let {name,email,password,role}=req.body;
  let result=mod.FinalUpdateOfUser(name,email,password,role,id);
  result.then((Udata)=>{
   // res.render("updateUser.ejs",{d:Udata,msg:"Updated Successfully"});
     res.render("dashboard.ejs",{ main_Content: "updateUser",d:Udata,msg:"Updated Successfully"});
  })
}
// Category........
exports.getCategory=(req,res)=>{
  //res.render("addcategory.ejs",{msg:""});
  res.render("dashboard.ejs", { main_Content: "addcategory",msg:"" });
}
exports.addCategory = (req, res) => {
  let name = req.body.name; 
  let result = mod.getCategoryData(name);
  result
    .then((data) => {
      console.log("Category Added Successfully", data);
      //res.render("addcategory.ejs", { msg: "Category Added Successfully" });
      res.render("dashboard.ejs", { main_Content: "addcategory",msg:"Category Added Successfully" });
    })
    .catch((err) => {
      console.log(err);
      //res.render("addcategory.ejs", { msg: "Error Adding Category" });
       res.render("dashboard.ejs", { main_Content: "addcategory",msg:"Error Adding Category" });
    });
};
exports.viewAllCategory = (req, res) => {
  let result = mod.viewCategoryData();
  result
    .then((data) => {
      //res.render("viewCat.ejs", { categoryData: data });
       res.render("dashboard.ejs", { main_Content: "viewCat",categoryData: data });
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
      res.status(500).send("Error fetching categories");
    });
}
exports.deleteCategoryData = (req, res) => {
  let id = parseInt(req.query.id);
  let result = mod.finaldeleteCategory(id);
  result
    .then((data) => {
      //res.render("viewCat.ejs", { categoryData: data });
      res.render("dashboard.ejs", { main_Content: "viewCat",categoryData: data });
    })
    .catch((err) => {
      console.error("Error deleting category:", err);
      res.status(500).send("Error deleting category");
    });
};
exports.updateCategoryPage = (req, res) => {
   let id=parseInt(req.query.id.trim());
    console.log("ID:", id);
  let result=mod.fetchCategoryById(id);
 
 result.then((data)=>{
   //res.render("updateCategory.ejs",{categoryData:data[0],msg:""});
    res.render("dashboard.ejs", { main_Content: "updateCategory",categoryData:data[0],msg:"" });
});
}
exports.finalUpdateCategory = (req, res) => {
  let id = parseInt(req.body.id);
  let name = req.body.name;
  let result = mod.finalUpdateCategoryData(name,id);
  result
    .then((data) => {
      res.render("dashboard.ejs", { main_Content: "updateCategory",categoryData:data,msg:"Updated Successfully" });
      
      //res.render("updateCategory.ejs", { categoryData: data, msg: "Updated Successfully" });
      //console.log("Category updated successfully:", data);
    })
    .catch((err) => {
      console.error("Error updating category:", err);
      res.status(500).send("Error updating category");
    });
}
// Show add book form with categories
// Book Section....

exports.addBookPage = (req, res) => {
  mod.getAllCategories()
    .then(categories => {
      //res.render("AddBook.ejs", { categories, msg: null });
      res.render("dashboard.ejs", { main_Content: "AddBook",categories,msg:"" });
    })
    .catch(err => {
      console.error("Error fetching categories:", err);
      res.status(500).send("Failed to load categories");
    });
};

// Insert book data
exports.InsertBookData = (req, res) => {
  const { title,author,publisher,isbn,category,status,total_copies,available_copies,} = req.body;
  // Image handling (optional)
  let image = req.file ? req.file.filename : null;

  mod.addBookData(title,author,publisher,isbn,category,status,total_copies,available_copies,image )
    .then(data => {
      console.log("Book added successfully:", data);
      return mod.getAllCategories(); // Get categories again for re-render
    })
    .then(categories => {
      //res.render("AddBook.ejs", { msg: "Book added successfully",categories });
      res.render("dashboard.ejs", { main_Content: "AddBook",msg:"Book added successfully",categories });
    })
    .catch(err => {
      console.error("Error adding book:", err);
      res.status(500).send("Error adding book");
    });
};
exports.ViewAllBook=(req,res)=>{
 let result=mod.FetchAllBooks();
  result.then((data)=>{
    //res.render("viewB.ejs",{books:data});
    res.render("dashboard.ejs", { main_Content: "viewB",books:data });
});
};
exports.DeleteBooksData=(req,res)=>{
  let id=req.query.id;
  let result=mod.finaldeleteBooks(id);
  result.then((data)=>{
    //res.render("viewB.ejs",{books:data});
    res.render("dashboard.ejs", { main_Content: "viewB",books:data });
  })

}
exports.updatebook = (req, res) => {
  let id = parseInt(req.query.id.trim());

  let result = mod.UpdateBookRecord(id);
  let catResult = mod.GetAllCategories();
  Promise.all([result, catResult]).then(([bookData, categories]) => {
    //res.render("UpdateBooks.ejs", {books: bookData[0],categories: categories,  msg: "" });
    res.render("dashboard.ejs", { main_Content: "UpdateBooks",books: bookData[0],categories: categories,  msg: ""  });
  });
};

exports.finalUpdatebook = async (req, res) => {
  try {
    let {title,author,publisher,isbn,category,total_copies,available_copies,status,id} = req.body;

    const image = req.file ? req.file.filename : null;
    const created_at = new Date();

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // First: Update the book
    await mod.FinalUpdateBookData(title,author,publisher,isbn,category,total_copies,available_copies,status,image,created_at,id);

    // Then: Fetch updated data and categories
    const [updatedBookData] = await mod.UpdateBookRecord(id);
    const categories = await mod.GetAllCategories();

    //res.render("UpdateBooks.ejs", { books: updatedBookData,categories: categories,msg: "Updated Successfully" });
    res.render("dashboard.ejs", { main_Content: "UpdateBooks",books: updatedBookData,categories: categories,msg: "Updated Successfully"  });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).send("Error updating book.");
  }
};


// .....issude Book 

// exports.issudeFromDisplay=(req,res)=>{
//    //res.render("IssudeBook.ejs");
//    mod.getAllCategories()
//     .then(categories => {
     
//       //res.render("dashboard.ejs", { main_Content: "AddBook",categories,msg:"" });
//       res.render("IssudeBook.ejs",{categories,msg:""});
//     })
//     .catch(err => {
//       console.error("Error fetching categories:", err);
//       res.status(500).send("Failed to load categories");
//     });
// };

// exports.issudeBookForUser=(req, res)=>{
//   let userEmail=req.body.email;
//   console.log("Email is: "+userEmail);

//   let result=mod.checkEmailForUser(userEmail);
//   result.then((r)=>{
//     console.log(result);
    
//   });
// };



//...
// Show form with all categories


exports.showForm = (req, res) => {
    mod.getCategories((err, categories) => {
        if (err) return res.status(500).send("Error loading categories");
        //res.render('IssudeBook', { categories });
        res.render("dashboard.ejs", { main_Content: "IssudeBook",categories,msg:"" });
    });
};

exports.getBooksByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    mod.getBooksByCategory(categoryId, (err, books) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(books);
    });
};

exports.issueBook = (req, res) => {
    const { book1, email, issue_date, return_date, status } = req.body;
    console.log("dd", book1, email, issue_date, return_date, status);

    // Fetch user ID from email
    

        // Pass correct fields to model
        mod.issueBook({ book1, email, issue_date, return_date, status }, (err) => {
            if (err) {
                console.error("IssueBook Error:", err);
                return res.status(500).send("Error issuing book");
            }else {
              res.render("dashboard.ejs", { main_Content: "IssudeBook",categories:[],msg:"Book issued successfully" });
            }
            console.log("Book issued successfully");
            //res.send("Book issued successfully!");
        });
    
};

// Show initial page with authors only

exports.returnBookPage = (req, res) => {
  res.render("ReturnBook",{msg:""});
};

//return book page


exports.returnIssuedBookData = (req, res) => {
  mod.fetchIssuedBooks()
    .then((data) => {
      console.log("Issued Books Data:", data);
      //res.render("ViewIssuedBook.ejs", { categories: data }); // Using the correct data
      res.render("dashboard.ejs", { main_Content: "ViewIssuedBook", categories: data, msg: "" });
    })
    .catch((err) => {
      console.error("Error fetching issued books:", err);
      res.status(500).send("Error fetching issued books");
    });
};

exports.returnBook = (req, res) => {
  const id = req.params.id;
  mod.returnBook(id, (err) => {
    if (err) {
      console.error("Error returning book:", err);
      return res.status(500).send("Error returning book");
    }
    // Redirect to the issued books list after returning
    res.redirect("/returnIssuedBook");
  });
};

// User Module start.......

exports.ViewAllBookLoginU = (req, res) => {
  const { type, q } = req.query;
  mod.FetchAllBooksLoginU(type, q)
    .then((data) => {
      res.render("Userdashboard.ejs", { main_Content: "viewAllBookLoginUser", books: data, user: req.session.user });
    });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  req.session.destroy(() => {
    res.redirect("/Login");
  });
};
// user show issued books
exports.myIssuedBooks = (req, res) => {
  const userId = req.user.id; // JWT se user id mil jayegi
  mod.fetchIssuedBooksByUser(userId)
    .then((books) => {
      //res.render("Userdashboard.ejs", { main_Content: "myIssuedBook", issuedBooks: books, user: req.session.user });
      //res.render("myIssuedBook.ejs", { issuedBooks: books, user: req.session.user  });
      res.render("Userdashboard.ejs", { main_Content: "myIssuedBook", books_issued: books, user: req.session.user });
    })
    .catch((err) => {
      console.error("Error fetching user's issued books:", err);
      res.status(500).send("Error fetching issued books");
    });
};
// user profiles counts..
exports.userDashboard = async (req, res) => {
  const userId = req.user.id;
  try {
    const [totalBooks, issuedBooks, returnedBooks] = await Promise.all([
      mod.countAllBooks(),
      mod.countIssuedBooksByUser(userId),
      mod.countReturnedBooksByUser(userId)
    ]);

    return res.render("Userdashboard.ejs", {
      main_Content: undefined,
      msg: "",
      user: req.session.user,
      totalBooks,
      issuedBooks,
      returnedBooks
    });
  } catch (err) {
    res.status(500).send("Error loading dashboard");
  }
};
//my profile page
exports.userProfilePage = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await mod.getUserById(userId); // You should have this function in your model
    //res.render("myProfile.ejs", { user });
    res.render("Userdashboard.ejs", { main_Content: "myProfile", user });
  } catch (err) {
    res.status(500).send("Error loading profile");
  }
};
