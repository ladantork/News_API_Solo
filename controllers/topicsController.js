const {getAllTopics} = require('../models/topicsModels.js')

exports.getTopics =(req,res,next)=>{
    getAllTopics()
.then((topics)=>{
        
       res.status(200).send(topics) 
})

.catch(err => {
    next(err);
    // pass the error to middleware
})

}
