const {articleById, getAllArticles,patchUpdateArticle} = require('../models/articleModels.js')



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

exports.getArticle=(req, res, next) =>{
    getAllArticles()
    .then((articles)=>{
        res.status(200).send({articles});
    }).catch (error => {
        next(error);

    })
}


exports.updateArticle =(req,res,next)=>{
    const { article_id } = req.params;
    const  inc_votes  = req.body;
    if (isNaN(parseInt(article_id))) {
        return res.status(400).send( {error: 'Invalid article ID format' });
    } 
patchUpdateArticle(article_id,inc_votes)
.then((article)=>{
   res.status(200).send(article)
   
}).catch(next) 

}
