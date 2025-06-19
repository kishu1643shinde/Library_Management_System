let express=require("express");
let mysql=require("mysql2");
let bodyparser=require("body-parser");
const cookieParser = require("cookie-parser");
let router=require("./routes/router.js");
const session = require('express-session');
let app=express();
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.set("view engine","ejs");

app.use(session({
  secret:' 1111###56',
  resave: false,
  saveUninitialized: true
}));

app.use("/",router);
app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));

module.exports=app;