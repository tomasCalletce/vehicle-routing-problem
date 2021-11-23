
// require('./db/db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');
const hbs = require('hbs');
const { Router } = express()
const app = express()



const login = require('./Routers/Ingreso')
const register = require('./Routers/Register')
const solicitudMantenimiento = require('./Routers/SolicitudMantenimiento')
const reserva = require('./Routers/Main')
const buscarTecnico = require('./Routers/BuscarTecnico')
const admin = require('./Routers/Admin')
//env variables

require('dotenv').config();
const port = process.env.PORT || 3000


app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

//paths a las carpetas de los partials, views y archivos estáticos como el css
const pathToPartials = path.join(__dirname, "/templates/partials");
const pathToViews = path.join(__dirname, "/templates/views");
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));


//routers
app.use(login)
app.use(register)
app.use(solicitudMantenimiento)
app.use(reserva)
app.use(buscarTecnico)
app.use(admin)

hbs.registerHelper('isdefined', function (value) {
    return value !== undefined;
});


app.set('view engine', 'hbs');
app.set("views", pathToViews);
hbs.registerPartials(pathToPartials);
app.get('', (req, res) => {
    res.send('sizas')
})
app.listen(port, () => console.log('listening on port: ' + port))