
//main -----> reserva computadores
const express = require('express');
const router = express.Router();


const Aula = require('../db/mongo/models/Aula')


router.post('/getDisponibles', async (req, res) => {

    const Disponibles = []
    const body = req.body;
    const aula = await Aula.findOne({codigo : body.aula})

    aula.computadoras.forEach(compu => {
        const disponible = true 
        compu.horariosHoy.forEach(times => {
            if(times.start == Number(body.hora.substring(0,2))){
                disponible = false;
            }
        });
        if(disponible){
            Disponibles.push(compu.idComputador)
        }
    });

    try{
        res.send(Disponibles);
    }catch(e){
        console.log(e);
        console.log("error in get times")
    }
        
})



router.get('/Main', async (req, res) => {
    let horario = [];
    for (let index = 10; index < 20; index++) {
        horario.push(index + '-' + (index + 1))
    }

    try{
        const aulas = await Aula.find({});
        const codigos = []
        aulas.forEach(aulas => {
            codigos.push(aulas.codigo)
        });

        res.render('reservarComputadora', {
            usuario: "tomascaell",
            aulas : codigos,
            horario
        })

    }catch(e){
        console.log("Failed to get aulas number " + e)
    }

})


router.post('/reservar', async (req, res) => {
    const info = req.body
    
    try{

       const aula = await Aula.findOne({
        codigo : info.aula
       })

       aula.computadoras.forEach((cu)=>{
            cu.horariosHoy.push({
                start : Number(info.hora.substring(0,2))
            })
       })

       aula.save(()=>{
         res.status(200)
       }).then((err)=>{
           res.status(404)
           console.log(err)
       })
       
    }catch{
        console.log("failed to create Reserva")
    }

})

router.post('/getSPECS', async (req, res) => {
    const info = req.body;
    console.log(info)
    const aula = await Aula.findOne({codigo : info.aula})

    try{
        aula.computadoras.forEach(compu => {
            if(compu.idComputador == Number(info.id)){
                res.send({ text: `GPU: ${compu.gpu}<br> 
                CPU: ${compu.cpu}<br>
                GBRAM : ${compu.ram}  
                ` 
                })
            }
        });
    }catch{
        console.log("failed to get specs of computer")
    }
})






module.exports = router