const db = require('../models')
const userModel = db.user;
const keyModel = db.key;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize');

// if(new Date(today) < new Date(exp)){
//     console.log('oui')
// }

exports.signup = (req, res, next) => {
     async function signup(){
        if(req.body.username && req.body.password && req.body.key){
            const verif = await keyModel.findOne({ where: { key: req.body.key }, paranoid: false });
            const verifUser = await userModel.findOne({where : {username: req.body.username}, paranoid: false});
            if(!verifUser){
                if(verif != null){
                    if(verif.userId == null){
                        bcrypt.hash(req.body.password, 10)
                            .then(hash => {
                                const user = userModel.build({ username: req.body.username, password: hash, isAdmin: 0, cle: req.body.key, keyId:verif.id});
                                user.save()
                                    .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
                                    .catch(error => res.status(400).json({ error }));
                                
                            }).catch(error => res.status(500).json({ error }));
                    }else{
                        res.status(401).json({message:"la clé est deja utilisé"})
                    }
                }else{
                    res.status(400).json({message: "la clé n'existe pas"})
                }
            }else{
                res.status(400).json({message:"cet username existe deja"})
            }
        }else{
            res.status(400).json({message :"il manque des informations"})
        }
    }
    signup()
}

exports.newKey = (req, res, next) => {
    async function newkey(){
        const userId = req.auth;
        const account = await userModel.findOne({where : {id: userId}, paranoid: false});
        if(account.isAdmin == 1){
            if(req.body.key && req.body.plan){
                const verif = await keyModel.findOne({ where: { key: req.body.key }, paranoid: false });
                if(verif == null){
                    if(req.body.plan == "basic"){
                        let today = new Date().toISOString().slice(0, 10)
                        let d = new Date(today);
                        d.setMonth(d.getMonth() + 1);
                        const exp = d.toISOString().slice(0, 10)
                        const key = keyModel.build({key: req.body.key, expire: exp, plan: req.body.plan});
                            key.save()
                                .then(() => res.status(200).json({ message: 'Key enregistré !'}))
                                .catch(error => res.status(400).json({ error }));
                    }else{
                        if(req.body.plan == "gold"){
                            let today = new Date().toISOString().slice(0, 10)
                            let d = new Date(today);
                            d.setMonth(d.getMonth() + 3);
                            const exp = d.toISOString().slice(0, 10)
                            const key = keyModel.build({key: req.body.key, expire: exp, plan: req.body.plan});
                            key.save()
                                .then(() => res.status(200).json({ message: 'Key enregistré !'}))
                                .catch(error => res.status(400).json({ error }));
                        }else{
                            if(req.body.plan == "ultimate"){
                                exp = "2150-12-12"
                                const key = keyModel.build({key: req.body.key, expire: exp, plan: req.body.plan});
                                key.save()
                                    .then(() => res.status(200).json({ message: 'Key enregistré !'}))
                                    .catch(error => res.status(400).json({ error }));
                            }else{
                                res.status(400).json({message: "ce plan n'existe pas"})
                            }
                        }
                    }
                    
                }else{
                    res.status(400).json({message: "la clé existe deja"})
                }
           }else{
            res.status(400).json({message: "il manque des infos"})
           }
        }else{
            res.status(401).json({message: "vous n'etes pas autoriser a crée une clé"})
        }
       
   }
   newkey()
}

exports.signin = (req, res, next) => {
    async function login() {
        if(req.body.username && req.body.password){
            const account = await userModel.findOne({ where: { username: req.body.username }, paranoid: false });
            if(account){
                bcrypt.compare(req.body.password, account.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' });
                        }
                        res.status(200).json({
                            userId: account.id,
                            username: account.username,
                            admin: account.isAdmin,
                            token: jwt.sign(
                                {
                                    userId: account.id
                                },
                                process.env.JWTPRIV8,
                                { expiresIn: '24h' }
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error: " oui" }));
            }else{
                res.status(400).json({message:"ce compte n'existe pas"})
            }
        }else{
            res.status(400).json({message:"il manque des informations"})
        }
    }
    login();
}

exports.change = (req, res, next) => {
    async function change() {
        
        if(req.body.ancienpass && req.body.newpass){
            const account = await userModel.findOne({ where: { id: req.auth }, paranoid: false });
            if(account){
                bcrypt.compare(req.body.ancienpass, account.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'le mot de passe ne correspond pas' });
                        }

                        bcrypt.hash(req.body.newpass, 10)
                            .then(hash => {
                                account.update({
                                    password: hash
                                }).then(() => res.status(200).json({ message: 'mot de passe changé'}))
                                .catch(error => res.status(400).json({message:"une erreur est survenue"}));
                                
                            }).catch(error => res.status(500).json({message:"une erreur est survenue"}));
                    })
                    .catch(error => res.status(500).json({ error: "oui" }));
            }else{
                res.status(400).json({message:"ce compte n'existe pas"})
            }
        }else{
            res.status(400).json({message: "il manque des informations"})
        }
    }
    change();
}