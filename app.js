const express = require('express');
const app = express();
const { getTopics, getArticleId, getArticle,getComments } = require('./controllers/Controller.js');
const{getApi} = require('./controllers/apiController.js')

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api',getApi)
app.get('/api/articles/:article_id', getArticleId)
app.get('/api/articles', getArticle)
app.get('/api/articles/:article_id/comments',getComments)



app.use((err, req, res, next) => {
  
        res.status(500).send({ error: 'Internal Server Error' });
    })

app.use('*',(req, res, next) => {
    res.status(404).send({ msg: 'Not found' });
});


module.exports = app;