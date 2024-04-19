const db = require('../db/connection.js')

exports.getAllComments = (article_id)=>{
    return db
    .query('SELECT * FROM comments WHERE article_id = $1  ORDER BY created_at DESC;', [article_id])
    .then((result) => {
        const comments = result.rows
        return comments;
        
      })
    }
exports.insertComments = (article_id, author, body) => {
  return db
      .query(
        'INSERT INTO comments (article_id,author, body) VALUES ($1, $2, $3)RETURNING *;',[article_id, author, body])
      .then((result) => {
        return result.rows[0];
      
      });
  };

  exports.deleteCommentModel = (comment_id)=>{
    return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
    .then(({rows})=>{
    
    return rows
  })
  }