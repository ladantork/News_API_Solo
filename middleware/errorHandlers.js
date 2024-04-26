

exports.customErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }else{
        next(err)
    }    
}
exports.databaseError = (err, req, res, next) => {
    if (err.code) {
       
        if (err.code === '22P02' || err.code === '23502') {
           
            return res.status(400).send({ msg: 'bad request' });
        }
        if (err.code === '23503') {
        
            return res.status(404).send({ msg: msg });
        }
    }
    next(err);
};


exports.serverErrors = (err, req, res, next) => {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: 'Internal Server Error' });
};