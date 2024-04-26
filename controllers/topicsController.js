const {getAllTopics} = require('../models/topicModel')
exports.getTopics = (req, res, next) => {
 
    getAllTopics()
        .then((topics) => {
            console.log(topics)
            res.status(200).send({topics} );
        })
        .catch(error => {
            next(error); // Pass the error to the error handling middleware
        });
};
