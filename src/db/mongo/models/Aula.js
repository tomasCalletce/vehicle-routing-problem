const mongoose = require('mongoose')
const Usuario = require('./Usuario')
const Asistente = require('./AsistenteTecnico')

require('../mongoo')

const Aula = mongoose.model('Aula', {
    codigo: {
        type: Number,
        require: true,

    },
    cupoMaximo: {
        type: Number,
        require: true,
     
    },
    asistente : {
        type : Asistente.schema
    },
    computadoras: [

        {
            idComputador: {
                type : Number,
                require : true,
                
            },
            gpu: {
                type: String,
              
            },
            cpu: {
                type: String,
         
            },
            ram: {
                type: Number,
          
            },
            horariosHoy : [{
                start : {
                    type : Number,
                },
                cliente : {
                    require : Usuario.schema
                }
            }],
            solicitudesMantenimiento: [
                {
                    solitud:{
                        type: String,
                        
                    },
                    fecha:{
                        type: String
                    }
                }
            ]
    }       
        
    ]
})



module.exports = Aula;