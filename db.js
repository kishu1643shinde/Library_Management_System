let mysql=require("mysql2")
require("dotenv").config();
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
    // host:"localhost",
    // user:"root",
    // password:"root",
    // database:"lmsdb"
});
db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Database Is Connected....");
        console.log("You can now use the database");
    }
});
module.exports=db;