
const mongoose = require('mongoose')
require('../mongoo')

const AsistenteTecnico = mongoose.model('AsistenteTecnico', {
    nombre : {
        type: String,
        require: true,
        trim : true

    },
    correo : {
        type: String,
        require: true,
        trim: true

    },
    celular :{
        type : Number,
        require: true,
        trim : true
    },
    idAsistente :{
        type : Number,
        require : true,
        trim : true
    }
})


module.exports = AsistenteTecnico;