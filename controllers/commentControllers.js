const{getAllComments,insertComments,deleteCommentModel} = require('../models/commentsModel.js')
exports.getComments =(req,res,next)=>{
    const{article_id} = req.params
    if (isNaN(parseInt(article_id))) {
        return res.status(400).send({ error: 'Invalid article ID format' });
    }
    
   getAllComments(article_id)
    .then((comments)=>{
       const resStatus = comments.length ? 200:404;
       const resData = comments.length ? {comments}:{ error: 'No comments found for this article' }
        res.status(resStatus).send(resData);
    }).catch (error => {
        next(error);

    })
}
exports.postComments=(req,res,next)=>{
    const {article_id} = req.params;
    const { username: author, body }  = req.body; 
   if (isNaN(parseInt(article_id))) {
        return res.status(400).send( {error: 'Invalid article ID format' });
    } 
    insertComments(article_id,author, body)
        .then((comments)=>{
        res.status(201).send(comments)
}).catch(next)
}

exports.deleteComment=(req,res,next)=>{
    const {comment_id} = req.params;
    if (isNaN(parseInt(comment_id))) {
        return res.status(400).send( {error: 'Invalid comment ID format' });
    } 
  deleteCommentModel(comment_id)
    .then(()=>{
        
        res.status(204).send()
     }).catch (error => {
        next(error);

    })
}
 