const db = require('../../db.js');


exports.AddDataInUserTable = (...userData) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, password,role) VALUES (?, ?, ?,?)",
      userData,
      (err, result) => {
        if (err) {
          console.error("Error inserting users:", err);
          reject(err);
        } else {
          console.log("Users added successfully:", result);
          resolve(result);
        }
      }
    );
  });
};

exports.fetchDataFromUser=()=>{
  return new Promise((resolve,reject)=>{
    db.query("select *from users",(err,result)=>{
      if(err)
      {
        reject(err);
      }
      else
      {
        resolve(result);
      }
    });
  })
}


exports.finaldeleteUser=(did)=>{
  return new Promise((resolve,reject)=>{
    db.query("delete from users where id=?",[did],(err,result)=>{
      if(err){
        reject(err);
      }else{
        resolve("Delete User SuccesFully....");
      }
    });
  });
}