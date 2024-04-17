const db = require('../db/connection.js')

exports.getAllTopics = () => {
  return db
      .query(`SELECT * FROM topics;`)
      .then((result) => {
          const topics = result.rows.map(row => ({
              slug: row.slug,
              description: row.description
          }));
          return topics;
      })
    }
    exports.articleById = (article_id) => {
        return db
        .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
        .then((result) => {
         
            return result.rows[0];
          });
        }