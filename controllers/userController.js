const {getAllUsers} = require('../models/userModel.js')

exports.getUsers=(req, res, next) =>{
   
    getAllUsers()
   .then((users)=>{
    if (users.length === 0) {
        return res.status(404).send({msg: 'Not found'});
    }
        res.status(200).send({users});
    }).catch (error => {
        next(error);

    })
}