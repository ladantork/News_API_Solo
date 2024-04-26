const {articleById, getAllArticles,patchUpdateArticle} = require('../models/articleModels.js')



exports.getArticleId = (req, res, next) => {
    const { article_id } = req.params;
  
     articleById(article_id)
     .then((article)=>{
        res.status(200).send(article);
    }) 
    .catch (error => {
   
        next(error);
    })
}

// server.js

// exports.getArticle = (req, res, next) => {
//     const topic = req.query.topic;

//     getAllArticles(topic)
//         .then((articles) => {
//             if (!topic) {
//                 return res.status(200).send({ articles: [] });
//             }
//             if (articles.length === 0) {
//                 return res.status(404).send({ msg: 'No articles found for the specified topic' });
//             }
//             res.status(200).send({ articles });
//         })
//         .catch(error => {
//             console.error(error); // Log the error for debugging
//             res.status(500).send({ msg: 'Internal Server Error' });
//         });
// };
exports.getArticle = (req, res, next) => {
    const topic = req.query.topic;
//  if (isNaN(parseInt(article_id))) {
//         return res.status(400).send({ error: 'Invalid article ID format' });
//     } I need to test for FK now >>>>>>>>>>>>>>>>>>>>>>>>>>>>.
    getAllArticles(topic)
        .then((articles) => {
            // if (articles.length === 0 && topic) {
            //     return res.status(404).send({ msg: 'No articles found for the specified topic' });
            // }
            res.status(200).send({ articles });
        })
        .catch(error => {
            next(error);
        });
};






exports.updateArticle =(req,res,next)=>{
    const { article_id } = req.params;
    const  inc_votes  = req.body;
   
patchUpdateArticle(article_id,inc_votes)
.then((article)=>{
 res.status(200).send(article)
    
}).catch(next) 

}

