const {getAllTopics} = require('../models/topicModel')
exports.getTopics =(req,res,next)=>{
    getAllTopics()
.then((topics)=>{
        
       res.status(200).send(topics) 
})
.catch(err => {
    next(err);   
})

}