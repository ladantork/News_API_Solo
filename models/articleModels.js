const db = require('../db/connection.js')


    exports.articleById = (article_id) => {
        return db
        .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
        .then((result) => {
            return result.rows[0];
          });
        }

    exports.getAllArticles = () => {
        return db
        .query('SELECT * FROM articles;')
            .then((result) => {
                const articlesArray = [];
                // Map each article to a promise that fetches its comment count
                const commentCountPromises = result.rows.map(article => {
                    const articleObject = {
                        author: article.author,
                        title: article.title,
                        article_id: article.article_id,
                        topic: article.topic,
                        created_at: article.created_at,
                        votes: article.votes,
                        article_img_url: article.article_img_url
                    };
                    const countQuery = 'SELECT COUNT(*) AS comment_count FROM comments WHERE article_id = $1;';
                    return db
                    .query(countQuery, [article.article_id])
                        .then((result) => {
                            const parsedCommentCount = parseInt(result.rows[0].comment_count)
                            articleObject.comment_count = parsedCommentCount
                            return articleObject; // Now article object with comment count
                        });
                });
                return Promise.all(commentCountPromises)
                    .then((articlesCounts) => {
                        return articlesCounts;
                    });
            })
           
    }

      exports.patchUpdateArticle = (article_id,{inc_votes})=>{
        return db
        .query(
            'UPDATE articles SET votes = votes +$1 WHERE article_id = $2 RETURNING *',
            [inc_votes,article_id])
            .then(({rows})=>{
                return rows[0]
            })

      }
    
    

    