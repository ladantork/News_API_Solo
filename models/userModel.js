const db = require('../db/connection.js')

exports.getAllUsers=()=>{
    return db
    .query('SELECT * FROM users ;')
    .then(({rows})=>{
       
        return rows;
    })
}