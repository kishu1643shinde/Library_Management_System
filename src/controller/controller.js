let db=require("mysql2");

exports.HomePage=(req,res)=>{
    res.render("HomePage.ejs");
}
exports.loginPage=(req,res)=>{
 res.render("login.ejs");

}
exports.acceptAdminDash=(req,res)=>{
    let {username, password} = req.body;
    if(username=="admin" && password=="admin@1643"){
       
       
    }else{
        
    }
}





