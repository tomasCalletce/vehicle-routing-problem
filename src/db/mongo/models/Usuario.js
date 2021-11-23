const mongoose = require('mongoose');

require('../mongoo')

const Usuario = mongoose.model('Usuario', {
    nombre: {
        type: String,
        require: true,
        trim : true

    },
    email: {
        type: String,
        require: true,
        trim: true

    },
    codigo:{
        type : Number,
        require: true,
        trim : true
    },
    pasword:{
        type : String,
        require : true,
        trim : true
    },
    isAdmin:{
        type : Boolean,
        require : true,
    },
    reservas:[
        {
            idComputador : {
                type : Number
            }
        }
    ]
})


module.exports = Usuario;