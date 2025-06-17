const e = require('express');
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


exports.finaldeleteUser=(did)=>{
  return new Promise((resolve,reject)=>{
    db.query("delete from users where id=?",[did],(err,result)=>{
      if(err){

      }else{
        db.query("select * from users",(err1,result1)=>{
        if(err1){
        reject(err1);
      }else{
        resolve(result1);
      }
      });
      }
    });
  });
}
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
exports.getCategoryData = (name) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO categories  (name)VALUES (?)", [name], (err, result) => {
      if (err) {
        console.error("Error inserting category:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.viewCategoryData = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories", (err, result) => {
      if (err) {
        console.error("Error fetching categories:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
exports.finaldeleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Error deleting category:", err);
        reject(err);
      } else {
        db.query("SELECT * FROM categories", (err1, result1) => {
          if (err1) {
            reject(err1);
          } else {
            resolve(result1);
          }
        });
      }
    });
  });
};
exports.fetchCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Error fetching category by ID:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.finalUpdateCategoryData = (name, id) => {
  return new Promise((resolve,reject)=>{
    db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id], (err, result) =>{
      if(err){
        console.error("Error updating category:", err);
        reject(err);
      }
      else{
        resolve(result);
        console.log("Category updated successfully:", result);
      }
    })
  })
};
exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT name FROM categories", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.addBookData = (
  title,
  author,
  publisher,
  isbn,
  category,
  status,
  total_copies,
  available_copies,
  image
) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO books 
      (title, author, publisher, isbn, category, status, total_copies, available_copies, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      title,
      author,
      publisher,
      isbn,
      category,
      status,
      total_copies,
      available_copies,
      image
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting book:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
 
exports.FetchAllBooks=()=>{
return new Promise((resolve,reject)=>{
  db.query("select *from books ",(err,result)=>{
    if(err){
      reject(err);
    }
    else{
      resolve(result);
    }
  });
})
}


exports.finaldeleteBooks = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Error deleting category:", err);
        reject(err);
      } else {
        db.query("SELECT * FROM books", (err1, result1) => {
          if (err1) {
            reject(err1);
          } else {
            resolve(result1);
          }
        });
      }
    });
  });
};
exports.UpdateBookRecord=(id)=>{
return new Promise((resolve, reject) => {
    db.query("SELECT  * FROM books where id=?",[id],(err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });}
  exports.GetAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

  exports.FinalUpdateBookData=(...dataupdate)=>{
    return new Promise((resolve,reject)=>{
    db.query("update books set title=?,author=?,publisher=?,isbn=?,category=?,total_copies=?,available_copies=?,status=?,image=?,created_at=? where id=?",[...dataupdate],(err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
        
      }
    });
  
  })
  };
 

exports.getAllAuthors = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT author AS name FROM books", (err, result) => {
      if (err) {
        console.error("Error fetching authors:", err);
        reject(err);
      } else {
        resolve(result); // [{name: 'Author1'}, {name: 'Author2'}, ...]
      }
    });
  });
};

