const express = require('express')
const router = express.Router()
const dbFuncs = require('../db/db')


const Usuario = require('../db/mongo/models/Usuario')


router.get('/login', (req, res) => {
    res.render('Ingreso', {
        title: "SZS"
    })

})

 router.post('/auth',async (req, res) => {
    const user = req.body
    try{
        const usuario = await Usuario.findOne({
            email : user.username,
            pasword : user.password
        })
        if(usuario.isAdmin){
            res.send(true)
        }else if(!usuario.isAdmin){
            res.send(false)
        }else{
            res.send(null)
        }
        
    }catch(e){
        console.log(e)
        res.status(404)
    }
    

})







module.exports = router