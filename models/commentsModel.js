const db = require('../db/connection.js')

exports.getAllComments = (article_id)=>{

   if (isNaN(parseInt(article_id))) {
    return Promise.reject({ status: 400, msg: 'Invalid comment ID format' });}
    return db
    .query('SELECT * FROM comments WHERE article_id = $1  ORDER BY created_at DESC;', [article_id])
    .then(({rows}) => { 
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'No comments found for the specified article' });
    }
    return rows;
});
    }
exports.insertComments = (article_id, author, body) => {
  if (isNaN(parseInt(article_id))) {
    return Promise.reject({ status: 400, msg: 'Invalid comment ID format' });}
  return db
      .query(
        'INSERT INTO comments (article_id,author, body) VALUES ($1, $2, $3)RETURNING *;',[article_id, author, body])
      .then((result) => {
        return result.rows[0];
      
      });
  };

  exports.deleteCommentModel = (comment_id)=>{
  if (isNaN(parseInt(comment_id))) {
    return Promise.reject({ status: 400, msg: 'Invalid comment ID format' });
}
    return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
    .then((result)=>{
      const comment = result.rows[0];
      if(!comment) {
        return Promise.reject({status: 404, msg: 'Comment not found'})
      }
      console.log(comment)
      return(comment)
    })
    .catch(error => {
      throw error; 
  
  })

}