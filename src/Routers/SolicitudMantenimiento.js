
const express = require('express')
const router = express.Router()


const Aula = require('../db/mongo/models/Aula')


router.get('/getInfo', (req, res) => {

})

router.get('/Solicitud',async (req, res) => {

    try {

        const aulas = await Aula.find({});
        const codigos = []
        aulas.forEach(aulas => {
        codigos.push(aulas.codigo)
        })

        res.render('SolicitudMante',{
            aulas : codigos
        })

    } catch(e){
        console.log(e)
    }
   
})

router.post('/solicitar', async (req, res) => {
    const info  = req.body
    
    try {
        const aula = await Aula.findOne({codigo : info.aula})

        aula.computadoras.forEach((compu)=>{
            if(compu.idComputador == info.idComputador){
                compu.solicitudesMantenimiento.push({
                    solitud : info.solicitud,
                })
            }
        })

        aula.save((d)=>{
            res.status(404)
        }).catch((err)=>{
            res.status(200)
            console.log(err)
        })

    } catch (e) {
        console.log(e)
    }

})

router.post('/getComputadores',async (req, res) => {
    const info = req.body

    try {
        const idCompus = []
        const aula = await Aula.findOne({codigo : info.aula})

        aula.computadoras.forEach(compu => {
            idCompus.push(compu.idComputador)
        });

        res.send(idCompus)

    } catch (e) {
        res.status(404)
        console.log(e)
    }
    
})


router.delete('/finalizarServicio', (req, res) => {
    console.log('borrar el de mantenimiento de la tabla de la clase y editar al de mantenimiento como disponible')
    //BORRAR EL ATRIBUTO DE MANTENIMIENTO DE LA TABLA DE LA CLASE, PUES YA NO VA A HABER PERSONAL ALLÁ
})



module.exports = router