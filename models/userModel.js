const db = require('../db/connection.js')

exports.getAllUsers=()=>{
 
    return db
    .query('SELECT * FROM users ;')
    .then(({rows})=>{
    
        return rows;
    })
}

// exports.selectUser(username) {
//     return db.query(`
//       SELECT username, name, avatar_url 
//       FROM users 
//       WHERE username = $1`, [username])
//     .then(({rows})=>{
//       if(rows.length === 0) {
//         return Promise.reject({status: 404, msg: "Not found"})
//       }
//       return rows[0]
//     })
//   }