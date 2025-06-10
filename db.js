let mysql=require("mysql2")

const db=mysql.createConnection({
    // host:process.env.DB_HOST,
    // user:process.env.DB_USER,
    // password:process.env.DB_PASSWORD,
    // database:process.env.DB_NAME,
    host:"localhost",
    user:"root",
    password:"v1643@gmail#",
    database:"lmsdb"
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