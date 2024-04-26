const db = require('../db/connection.js')
exports.getAllTopics = () => {
    return db
        .query('SELECT * FROM topics;')
        .then(({rows} ) => {
           console.log(rows)
            return rows;
        })
        .catch(error => {
            console.log(error)
            next(error); // Pass the error to the error handling middleware
        });
      
};
