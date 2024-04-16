const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topicsController.js');
const{getApi} = require('./controllers/apiController.js')



app.use(express.json());


app.get('/api/topics', getTopics);
app.get('/api',getApi)


app.use((err, req, res, next) => {
    res.status(500).send({ error: 'Internal Server Error' });
});

app.use('*',(req, res, next) => {
    res.status(404).send({ msg: 'Not found' });
});


module.exports = app;