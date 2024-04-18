const db = require('../db/connection.js')

exports.getAllTopics = () => {
  return db
      .query('SELECT * FROM topics;')
      .then((result) => {
          const topics = result.rows.map(row => ({
              slug: row.slug,
              description: row.description
          }));
          return topics;
      })
    }