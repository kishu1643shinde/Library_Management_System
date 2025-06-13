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
// exports.updateUserData=(userId, name, email, password, role)=>{
//   return new Promise((resolve, reject) => {
//     db.query(
//       "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?",
//       [name, email, password, role, userId],
//       (err, result) => {
//         if (err) {
//           console.error("Error updating user:", err);
//           reject(err);
//         } else {
//           console.log("User updated successfully:", result);
//           resolve(result);
//         }
//       }
//     );
//   });
// }

exports.FetchUserId=(id)=>{
  return new Promise((resolve, reject) => {
    db.query("SELECT  * FROM users where id=?",[id],(err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
exports.FinalUpdateOfUser=(...da)=>{
  return new Promise((resolve,reject)=>{
    db.query("update users set name=?,email=?,password=?,role=? where id=?",[...da],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    });
  
  })

}
