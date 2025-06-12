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

