let db=require("mysql2");
let mod=require("../models/regmodel.js");
exports.HomePage=(req,res)=>{
    res.render("HomePage.ejs");
}
exports.loginPage=(req,res)=>{
 res.render("login.ejs");

}
exports.acceptAdminDash=(req,res)=>{
    let {username, password} = req.body;
    if(username=="admin" && password=="admin@1643"){
       res.render("dashboard.ejs");
    }else{
        console.log("Login Faild");
    }
}
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