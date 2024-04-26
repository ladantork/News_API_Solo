const {getAllUsers} = require('../models/userModel.js')

exports.getUsers=(req, res, next) =>{
     
    getAllUsers()
   .then((users)=>{
        res.status(200).send({users});
    }).catch (next)
}

// exports.getUser(req,res,next) {
//     const {username} = req.params
//     selectUser(username)
//     .then((user)=>{
//       res.status(200).send({user})
//     })
//     .catch((err)=>{
//       next(err)
//     })
//   }