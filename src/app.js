let express=require("express");
let mysql=require("mysql2");
let bodyparser=require("body-parser");
let cookieParser=require("cookie-parser");
let router=require("./routes/router.js");
let app=express();
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.set("view engine","ejs");

app.use("/",router);
app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));

module.exports=app;