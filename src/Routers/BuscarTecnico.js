const express = require('express')
const router = express.Router()


const Aula = require('../db/mongo/models/Aula')

router.get('/buscarTecnico', async (req, res) => {

    try {
        const aulas = await Aula.find({});
        const codigos = []
        aulas.forEach(aulas => {
            codigos.push(aulas.codigo)
        });

        res.render('buscarTecnico',{
            aulas : codigos
        })
        
    } catch (e) {
        console.log(res)
    }
    
})

router.post('/getAsistente',async (req,res)=>{
    const info = req.body
    console.log(info)
    try {
        const aula = await Aula.findOne({
            codigo : info.aula
        })

        res.send({
            Nombre : aula.asistente.nombre,
            text : `cell : ${aula.asistente.celular} <br>
            correo: ${aula.asistente.correo}`
        })
    
    } catch (e) {
        console.log(e)
    }
})


module.exports = router;