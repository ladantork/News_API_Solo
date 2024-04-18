const express = require('express');
const app = express();
const { getTopics, getArticleId, getArticle,getComments, postComments } = require('./controllers/Controller.js');
const{getApi} = require('./controllers/apiController.js')

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api',getApi)
app.get('/api/articles/:article_id', getArticleId)
app.get('/api/articles', getArticle)
app.get('/api/articles/:article_id/comments',getComments)

app.post('/api/articles/:article_id/comments',postComments)



app.use((err, req, res, next) => {
    if (err.code === '23502'&& err.table === 'comments' && err.column === 'body'){
        res.status(400).send({ msg: 'Bad request'}); 
    }else {
        res.status(500).send({ error: 'Internal Server Error' });
    }    
    })

app.use('*',(req, res, next) => {
    res.status(404).send({ msg: 'Not found' });
});


module.exports = app;