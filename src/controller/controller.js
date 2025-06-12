let db=require("mysql2");

exports.HomePage=(req,res)=>{
    res.render("HomePage.ejs");
}
exports.loginPage=(req,res)=>{
 res.render("login.ejs");

}
