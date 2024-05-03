const express = require('express');
const app = express();

const cors = require('cors');
const {getArticleId, getArticle,updateArticle} = require('./controllers/articleController.js');
const {getTopics} = require('./controllers/topicsController.js')
const{getComments, postComments,deleteComment} = require('./controllers/commentControllers.js')
const{getUsers} = require('./controllers/userController.js')
const{getApi} = require('./controllers/apiController.js')
const errorHandlers = require('./middleware/errorHandlers.js');
//const { DatabaseError } = require('pg');

app.use(express.json());
app.use(cors());

app.get('/api/topics', getTopics);
app.get('/api',getApi)
app.get('/api/articles/:article_id', getArticleId)
app.get('/api/articles', getArticle)
app.get('/api/articles/:article_id/comments',getComments)
app.post('/api/articles/:article_id/comments',postComments)
app.patch('/api/articles/:article_id', updateArticle)
app.delete('/api/comments/:comment_id',deleteComment)
app.get('/api/users',getUsers)


app.use((req, res, next) => {
    res.status(404).send({ msg: 'Not found'})
})

app.use(errorHandlers.customErrors)
app.use(errorHandlers.serverErrors)
app.use(errorHandlers.databaseError)


module.exports = app;