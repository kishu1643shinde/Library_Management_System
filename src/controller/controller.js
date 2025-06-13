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
    res.render("addStudent.ejs");
}

exports.addStudent = (req, res) => {
  let { name, email, password,role } = req.body;

  let result = mod.AddDataInUserTable(name, email, password,role);

  result
    .then(data => {
      console.log("Student added successfully:", data);
    //   res.render("addstudent.ejs");// ors send a success response
   res.render("dashboard.ejs"); // Redirect to the add student page after successful addition
    })
    .catch(err => {
      console.error("Error adding student:", err);
      res.status(500).send("Error adding student");
    });
};

exports.viewUserData=(req,res)=>{

  let result=mod.fetchDataFromUser();
  result.then((data)=>{
     res.render("viewAllUsers.ejs",{userData:data});
  });
 
};



exports.updatePage=(req,res)=>{
  let id=parseInt(req.query.id.trim());
  let result=mod.FetchUserId(id);
 result.then((data)=>{
   res.render("updateUser.ejs",{d:data[0],msg:""});
 });
}
exports.finalUpdate=(req,res)=>{
  let id=parseInt(req.body.id);
  let {name,email,password,role}=req.body;
  let result=mod.FinalUpdateOfUser(name,email,password,role,id);
  result.then((Udata)=>{
    res.render("updateUser.ejs",{d:Udata,msg:"Updated Successfully"});
  })
}

