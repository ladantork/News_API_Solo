const{getAllComments,insertComments,deleteCommentModel} = require('../models/commentsModel.js')

exports.getComments =(req,res,next)=>{
    const{article_id} = req.params
    getAllComments(article_id)
    .then((comments)=>{
    res.status(200).send({comments})
    }).catch (error => {
        next(error);

    })
}
exports.postComments=(req,res,next)=>{
    const {article_id} = req.params;
    const { username: author, body }  = req.body; 
    insertComments(article_id,author, body)
        .then((comments)=>{
        res.status(201).send(comments)
}).catch(next)
}

exports.deleteComment=(req,res,next)=>{
    const {comment_id} = req.params;
    console.log(req.params)
  return deleteCommentModel(comment_id)
 
    .then(()=>{
        console.log(comment_id)
        res.status(204).send()
     }).catch(error => {
        
        next(error);
    });
}
 