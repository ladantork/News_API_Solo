const {getAllTopics,articleById} = require('../models/Models.js')

exports.getTopics =(req,res,next)=>{
    getAllTopics()
.then((topics)=>{
        
       res.status(200).send(topics) 
})
.catch(err => {
    next(err);   
})

}

exports.getArticleId = (req, res, next) => {
    const { article_id } = req.params;
    
    if (isNaN(parseInt(article_id))) {
        return res.status(400).send({ error: 'Invalid article ID format' });
    }
     articleById(article_id)
     .then((article)=>{
        if (!article) {
            return res.status(404).send({ msg: "Article not found" });
        }
        res.status(200).send(article);
    }) 
    .catch (error => {
        next(error);
    })
}
