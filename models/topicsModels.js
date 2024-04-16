const db = require('../db/connection.js')

exports.getAllTopics =()=>{

    return db
    .query(`SELECT * FROM topics; `)
    .then(topics => {
        return topics.rows;
      })
      .catch(err => {
        throw new Error('Failed to fetch topics')
      })
}
