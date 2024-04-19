const db = require('../db/connection.js')


    exports.articleById = (article_id) => {
        return db
        .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
        .then((result) => {
            return result.rows[0];
          });
        }

    exports.getAllArticles = (topic) => {
        let query = 'SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id';
        const values = [];
    
        if (topic) {
            query += ' WHERE articles.topic = $1';
            values.push(topic);
        }
    
        query += ' GROUP BY articles.article_id';
    
        return db.query(query, values)
            .then((result) => {
                const articles = result.rows.map(article => ({
                    author: article.author,
                    title: article.title,
                    article_id: article.article_id,
                    topic: article.topic,
                    created_at: article.created_at,
                    votes: article.votes,
                    article_img_url: article.article_img_url,
                    comment_count: parseInt(article.comment_count) || 0 
                }));
                if (articles.length === 0) {
                    return [];
                }
                return articles;
            })
            
    };
    

      exports.patchUpdateArticle = (article_id,{inc_votes})=>{
        return db
        .query(
            'UPDATE articles SET votes = votes +$1 WHERE article_id = $2 RETURNING *',
            [inc_votes,article_id])
            .then(({rows})=>{
                return rows[0]
            })

      }
    

    