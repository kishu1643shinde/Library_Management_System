let express=require("express");
let mysql=require("mysql2");
let bodyparser=require("body-parser");
let cookieParser=require("cookie-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.set("view engine","ejs");
app.use(express.static("public"));
let app=express();

module.exports=app;