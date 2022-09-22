const db = require('../models')
const keyModel = db.key;
const userModel = db.user;
const fileModel = db.file;


exports.getuser = (req, res, next) => {
    async function user(){
        const user = await userModel.findOne({where : {id : req.auth}, attributes: {exclude: ['password']}})
        res.status(200).send(user)
    }
   user()
}

exports.getallfile = (req, res, next) => {
    async function allFile(){
        const user = await userModel.findOne({where : {id : req.auth}})
        if(user.isAdmin == 1){
            const allfile = await fileModel.findAll({where: {fileAdmin:0} , order:[ ['createdAt', 'DESC'] ]})
            res.status(200).send(allfile)
        }else{
            
            res.status(200).json({message:"vous n'etes pas autoriser"})
        }
   }
   allFile()
}
