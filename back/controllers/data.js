const { json } = require('sequelize');
const db = require('../models')
const keyModel = db.key;
const userModel = db.user;
const fileModel = db.file;
require('addmonths/auto')

exports.getdata = (req, res, next) => {
    async function data(){
        const file = await fileModel.findAll({where :{userId: req.auth}, order:[ ['createdAt', 'DESC'] ], paranoid:false})
        if(file){
            res.status(200).send(file)
        }else{
            res.status(400).json({message:"impossible de trouvé les cookies"})
        }
        
    }
   data()
}

exports.getkey = (req, res, next) => {
    async function getkey(){
        const account = await userModel.findOne({where : {id: req.auth}})
        if(account){
            
            const key = await keyModel.findOne({where :{id: account.keyId}, order:[ ['createdAt', 'DESC'] ], paranoid:false})
            if(key){
                res.status(200).send(key)
            }else{
                res.status(400).json({message: "impossible de trouvé la clé"})
            }
        }else{
            res.status(400).json({message:"le compte n'existe pas"})
        }
        
    }
   getkey()
}

exports.getalldata = (req, res, next) => {
    async function data(){
        const user = await userModel.findOne({where : {id : req.auth}, paranoid: false})

        if(user.isAdmin == 1){
            const file = await fileModel.findAll({order:[ ['createdAt', 'DESC'] ]})
            res.status(200).send(file)
        }else{
            const file = await fileModel.findAll({where :{userId: req.auth}, order:[ ['createdAt', 'DESC'] ], paranoid:false})
            res.status(200).send(file)
        }
        
   }
   data()
}

exports.download = (req, res, next) => {
    async function downloadI(){
        if(req.params.id){
            const file = await fileModel.findOne({where : {id: req.params.id}})
            const user = await userModel.findOne({where: {id : req.auth}})
            if(file){
                if((req.auth == file.userId) || (user.isAdmin == 1)){
                    res.download(file.path)
                    res.status(200);
                }else{
                    res.status(401).json({message: "vous n'etes pas autoriser a télécharger ce fichier"})
                }
            }else{
                res.status(400).json({message:"ce fichier n'existe pas"})
            }
            
        }    
   }
   downloadI()
}


exports.getalluserkey= (req, res, next) => {
    async function alluserkey(){
        account = await userModel.findOne({where: {id : req.auth}});
        if(account.isAdmin == 1){
            keyModel.findAll({paranoid:false, include: [{model: userModel, attributes: {exclude: ['password']}}]})
            .then((data) => res.send(data))
            .catch((error) => res.status(500).send(error))
        }else{
            res.status(401).json({message:"vous n'êtes pas autoriser"})
        }
    }
    alluserkey();
}


exports.removekey= (req, res, next) => {
    async function removeKey(){
        const account = await userModel.findOne({where : {id: req.auth}})
        if(account.isAdmin == 1){
            if(req.params.id){
                const key = await keyModel.findOne({where :{id : req.params.id}})
                if(key){
                    key.update({
                        expire: "2000-12-12"
                    }).then(() => res.status(200).json({ message: 'key removed'}))
                    .catch(error => res.status(400).json({message:"une erreur est survenue"}));
                }else{
                    res.status(400).json({message:"la key n'existe pas"})
                }
            }
        }else{
            res.status(401).json({message:"vous n'êtes pas autoriser"})
        }
    }
    removeKey();
}

exports.addtime= (req, res, next) => {
    async function addTime(){
        const account = await userModel.findOne({where : {id: req.auth}})
        if(account.isAdmin == 1){
            if(req.params.id){
                const key = await keyModel.findOne({where :{id : req.params.id}})
                
                if(key){
                    if(req.body.add == "1 mois"){
                        const dat = JSON.stringify(key.expire)
                        let today = new Date(dat);
                        const exp0 = today.addMonths(1)
                        const exp = exp0.toISOString().slice(0, 10)
                        key.update({
                            expire: exp
                        }).then(() => res.status(200).json({ message: 'ajout de 1 mois'}))
                        .catch(error => res.status(400).json({message:"une erreur est survenue"}));
                    }else{
                        if(req.body.add == "3 mois"){
                            const dat = JSON.stringify(key.expire)
                            let today = new Date(dat);
                            const exp0 = today.addMonths(3)
                            const exp = exp0.toISOString().slice(0, 10)
                            key.update({
                                expire: exp
                            }).then(() => res.status(200).json({ message: 'ajout de 3 mois'}))
                            .catch(error => res.status(400).json({message:"une erreur est survenue"}));
                        }else{
                            if(req.body.add == "lifetime"){
                                key.update({
                                    expire: "2150-12-12"
                                }).then(() => res.status(200).json({ message: 'ajout lifetime'}))
                                .catch(error => res.status(400).json({message:"une erreur est survenue"}));
                            }else{
                                res.status(400).json({message:"impossible d'ajouter ce temps a la clé"})
                            }
                        }
                    }
                }else{
                    res.status(400).json({message:"la key n'existe pas"})
                }
            }
        }else{
            res.status(401).json({message:"vous n'êtes pas autoriser"})
        }
    }
    addTime();
}
